import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
await loadEnv(path.join(root, ".env"));
const apiKey = process.env.OPENAI_API_KEY;
const model = process.env.OPENAI_MODEL || "gpt-5.4-mini";
const reasoningEffort = process.env.OPENAI_REASONING_EFFORT || "low";
const startMarker = "{/* ai-summary:start */}";
const endMarker = "{/* ai-summary:end */}";
const regenerate = process.argv.includes("--regenerate");
const collections = [
  {
    kind: "social",
    label: "social media",
    dir: path.join(root, "src", "content", "content-work"),
    generatedFrontmatterField: null
  },
  {
    kind: "photography",
    label: "photography",
    dir: path.join(root, "src", "content", "photography"),
    generatedFrontmatterField: "summary"
  }
];

if (!apiKey) {
  console.log("AI summary generation skipped: OPENAI_API_KEY is not set.");
  process.exit(0);
}

let updated = 0;

for (const collection of collections) {
  const files = (await readdir(collection.dir)).filter((file) => file.endsWith(".md") || file.endsWith(".mdx")).sort();

  for (const file of files) {
    const filePath = path.join(collection.dir, file);
    const raw = await readFile(filePath, "utf8");
    const parsed = matter(raw);
    const data = parsed.data || {};

    if (isExplicitlyDisabled(data.autoSummary) || data.publishStatus === "draft") continue;
    if (collection.kind === "social" && data.contentType !== "embed" && data.autoSummary !== true && data.autoSummary !== "true") continue;

    const needsTitle = needsGeneratedTitle(data);
    const needsSummary = regenerate || (collection.kind === "photography" ? !cleanString(data.summary) : !hasGeneratedBlock(parsed.content));

    const nextData = { ...data };
    let nextBody = parsed.content.trim();
    let didChange = false;

    if (isPlaceholderTitle(nextData.title)) {
      delete nextData.title;
    }

    if (collection.kind === "photography" && hasGeneratedBlock(nextBody)) {
      nextBody = stripGeneratedBlock(nextBody);
      didChange = true;
    }

    if (!needsTitle && !needsSummary && !didChange) continue;

    if (needsTitle) {
      const generatedTitle = await generateTitle(data, collection.kind);
      if (generatedTitle) {
        nextData.generatedTitle = generatedTitle;
        didChange = true;
        console.log(`Generated ${collection.label} title: ${file}`);
      }
    }

    if (needsSummary) {
      const generated = dedupeRepeatedSentences(await generateCopy(data, collection.kind));
      if (!generated) {
        // Keep any generated title from this pass; summary generation is non-blocking.
      } else if (!isUsableCopy(generated)) {
        console.warn(`AI summary generation ignored for "${displayLogTitle(data, file)}": output was too short or incomplete.`);
        console.warn(`Rejected output: ${generated || "[empty]"}`);
      } else {
        if (collection.generatedFrontmatterField) {
          nextData[collection.generatedFrontmatterField] = generated;
        }

        nextBody = collection.kind === "photography"
          ? stripGeneratedBlock(nextBody)
          : replaceGeneratedBlock(nextBody, generated);
        didChange = true;
        console.log(`Generated ${collection.label} summary: ${file}`);
      }
    }

    if (!didChange) continue;

    const nextFile = matter.stringify(nextBody, nextData);

    if (nextFile !== raw) {
      await writeFile(filePath, nextFile);
      updated += 1;
    }
  }
}

console.log(`AI summary generation complete. Updated ${updated} file${updated === 1 ? "" : "s"}.`);

function hasGeneratedBlock(body) {
  return body.includes(startMarker) && body.includes(endMarker);
}

function isExplicitlyDisabled(value) {
  return value === false || value === "false";
}

function getGuidance(data) {
  return String(data.guidedContext || "").trim();
}

function needsGeneratedTitle(data) {
  if (hasUserTitle(data)) return false;
  return regenerate || !cleanString(data.generatedTitle);
}

function hasUserTitle(data) {
  return Boolean(cleanString(data.title)) && !isPlaceholderTitle(data.title);
}

function displayLogTitle(data, file = "untitled") {
  return cleanString(data.title) || cleanString(data.generatedTitle) || file;
}

function cleanString(value) {
  return typeof value === "string" && value.trim() ? value.trim() : "";
}

function isPlaceholderTitle(value) {
  const title = cleanString(value);
  if (!title) return false;
  return /^real estate instagram feature\s*\d*$/i.test(title)
    || /^untitled(?:\s+(?:gallery|content piece|post|project))?$/i.test(title)
    || /^(?:corporate shoot|cosplay)\s+test$/i.test(title)
    || /^joash pics$/i.test(title);
}

async function generateTitle(data, kind) {
  const metrics = Array.isArray(data.metrics)
    ? data.metrics.map((metric) => `${metric.value} ${metric.label}`).join(", ")
    : "";
  const platformContext = await fetchPlatformContext(data);
  const prompt = buildTitlePrompt(data, metrics, platformContext, kind);
  const title = sanitizeGeneratedTitle(await requestOpenAIText(data, prompt, "title"));

  if (!title) {
    console.warn(`AI title generation ignored for "${displayLogTitle(data)}": output was empty or unusable.`);
  }

  return title;
}

async function generateCopy(data, kind) {
  const metrics = Array.isArray(data.metrics)
    ? data.metrics.map((metric) => `${metric.value} ${metric.label}`).join(", ")
    : "";
  const platformContext = await fetchPlatformContext(data);
  const prompt = buildPrompt(data, metrics, platformContext, kind);
  const guidance = getGuidance(data);

  const incompleteRetryInstruction = [
    "",
    "The previous attempt was incomplete or too short.",
    "Now return exactly two complete sentences.",
    "Use 26 to 48 words total.",
    "Make the copy sound like polished portfolio writing, not a literal description.",
    "Lead with the impact on the audience, brand, or client.",
    "Do not use the structure 'By doing X, it achieved Y' or any close variation.",
    "Use a more natural sentence rhythm, as if written by a thoughtful human portfolio owner.",
    "Do not start with a fragment such as This, A, An, or The unless it forms a complete sentence.",
    "Do not add any explanation before or after the copy."
  ].join("\n");

  const verbatimRetryInstruction = [
    "",
    "The previous attempt repeated wording from guidedContext, the existing description, or the platform caption too closely.",
    "Rewrite it with clearly different phrasing. Keep the same meaning and facts, but do not reuse any run of 6 or more consecutive words from the source text.",
    "Do not add any explanation before or after the copy."
  ].join("\n");

  const maxAttempts = 3;
  let attemptPrompt = prompt;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const rawCopy = await requestOpenAIText(data, attemptPrompt, "summary");

    if (!rawCopy) {
      console.warn(`AI summary generation got an empty response for "${displayLogTitle(data)}" (attempt ${attempt}/${maxAttempts}).`);
      continue;
    }

    if (!isUsableCopy(rawCopy)) {
      console.warn(`AI summary generation retrying for "${displayLogTitle(data)}" (attempt ${attempt}/${maxAttempts}): output was incomplete.`);
      console.warn(`Output: ${rawCopy}`);
      attemptPrompt = prompt + incompleteRetryInstruction;
      continue;
    }

    if (isTooVerbatim(rawCopy, guidance) || isTooVerbatim(rawCopy, data.platformCaption)) {
      console.warn(`AI summary generation retrying for "${displayLogTitle(data)}" (attempt ${attempt}/${maxAttempts}): output copied source wording too closely.`);
      attemptPrompt = prompt + verbatimRetryInstruction;
      continue;
    }

    return dedupeRepeatedSentences(rawCopy);
  }

  console.warn(`AI summary generation gave up for "${displayLogTitle(data)}" after ${maxAttempts} attempts.`);
  return "";
}

function buildTitlePrompt(data, metrics, platformContext, kind) {
  const contextLines = kind === "photography"
    ? [
        `Photography type: ${data.photographyType || ""}`,
        data.venue ? `Venue: ${data.venue}` : "",
        data.client ? `Client: ${data.client}` : "",
        Array.isArray(data.services) && data.services.length > 0 ? `Services: ${data.services.join(", ")}` : "",
        Array.isArray(data.tags) && data.tags.length > 0 ? `Tags: ${data.tags.join(", ")}` : "",
        data.description ? `Existing description: ${data.description}` : ""
      ]
    : [
        `Category: ${data.socialCategory || ""}`,
        `Platform: ${data.platform || ""}`,
        data.platformCaption ? `Platform caption or transcript: ${data.platformCaption}` : "",
        platformContext ? `Best-effort platform metadata: ${platformContext}` : "",
        metrics ? `Metrics: ${metrics}` : ""
      ];

  return [
    kind === "photography"
      ? "Write a short portfolio title for a photography gallery."
      : "Write a short portfolio title for a social media content piece.",
    "Use the context to infer a specific, useful title.",
    "Return only the title.",
    "Use 3 to 8 words.",
    "Use title case only where it feels natural.",
    "Do not use generic placeholders such as Feature, Test, Untitled, Instagram Feature, Content Piece, or Gallery.",
    "Do not include emojis, hashtags, quotation marks, markdown, or a period.",
    "Prefer concrete nouns from the context, such as client, campaign type, property, audience, venue, or content angle.",
    "",
    hasUserTitle(data) ? `Existing user title: ${data.title}` : "",
    ...contextLines,
    getGuidance(data) ? `guidedContext, highest priority: ${getGuidance(data)}` : "",
    data.summary ? `Fallback summary: ${data.summary}` : ""
  ]
    .filter(Boolean)
    .join("\n");
}

function buildPrompt(data, metrics, platformContext, kind) {
  const taskLine = kind === "photography"
    ? "Write concise portfolio copy for a photography gallery."
    : "Write concise portfolio copy for a social media video.";
  const guidedContextInstruction =
    kind === "photography"
      ? [
          "guidedContext below is written by the photographer and contains two things: specific, real scene details from the gallery (what actually happened, who was there, what it looked like), and guidance on the story to tell about it.",
          "Use the scene details only as background so you understand what really happened. Do not restate them as a list of what was captured, and do not describe the gallery scene-by-scene like reciting answers in an oral exam.",
          "The actual sentences you write should be about client or stakeholder impact and the story behind why the event mattered, not a walkthrough of what is visible.",
          "Use the title together with guidedContext to understand who this is for and why it happened.",
          ""
        ]
      : [];
  const contextLines = kind === "photography"
    ? [
        `Photography type: ${data.photographyType || ""}`,
        data.venue ? `Venue: ${data.venue}` : "",
        data.client ? `Client: ${data.client}` : "",
        Array.isArray(data.services) && data.services.length > 0 ? `Services: ${data.services.join(", ")}` : "",
        Array.isArray(data.tags) && data.tags.length > 0 ? `Tags: ${data.tags.join(", ")}` : "",
        data.description ? `Existing description: ${data.description}` : ""
      ]
    : [
        `Category: ${data.socialCategory || ""}`,
        `Platform: ${data.platform || ""}`,
        data.platformCaption ? `Platform caption or transcript: ${data.platformCaption}` : "",
        platformContext ? `Best-effort platform metadata: ${platformContext}` : "",
        metrics ? `Metrics to mention naturally: ${metrics}` : ""
      ];

  const photographyExample =
    kind === "photography"
      ? [
          "This is the target quality bar. Match its warmth, specificity, and shape as closely as you can, using this gallery's own real facts:",
          '"Visa\'s international leadership team had a meaningful session at the night safari, where they explored the impact of their sustainability efforts on the creatures of the wild. The gallery gives them a real, usable record of that evening to share with stakeholders and future guests."',
          "It names the client and the actual reason the event mattered to them, in plain spoken language, not a corporate activity label.",
          "It closes on one concrete, usable outcome the photography gives the client, not a mood word.",
          "",
          "This is the failure mode to avoid — technically correct shape, but flat and corporate:",
          '"A senior payments leadership team spent the night safari strengthening client relationships and talking through priorities off-site. The gallery keeps that after-dark outing on record with discretion and polish."',
          "That example fails because it hides behind a job-title description instead of naming the client, and 'on record with discretion and polish' is the same stiff marketing register you must avoid.",
          "The good example's specific claims (sustainability commitments, wildlife impact) belong to that illustration only. They are not facts about the gallery below. Copy its sentence shape and tone, never its content, unless this gallery's own guidedContext independently says the same thing.",
          ""
        ]
      : [];

  return [
    taskLine,
    "Write in third person, the way a portfolio site describes its own work, not like ad copy and not like a first-person diary entry.",
    "Do not use first-person pronouns such as I, me, my, we, us, or our. Never refer to the photographer as a person in the sentence.",
    ...guidedContextInstruction,
    ...photographyExample,
    "Name the client plainly by name when it is known from the context. Do not hide behind a generic role or industry description instead.",
    "Ground sentence 1 in the real purpose or theme of the event from guidedContext, not a generic activity category like 'networking' or 'coverage'.",
    "Do not invent facts that are not in the context, such as named animals, exact quotes, or precise headcounts not mentioned in guidedContext.",
    "Write 2 to 3 short sentences, most under 18 words each.",
    "Write 30 to 55 words total.",
    "Return complete sentences only.",
    "Vary sentence structure across outputs so the copy does not feel templated.",
    "Avoid formulaic cause-and-effect phrasing such as 'By doing X, it achieved Y', 'By pairing X with Y', or 'This helped X feel Y'.",
    "Avoid stacking three or more details into one sentence, such as 'X, Y, and Z were captured with W'. Split ideas across separate short sentences instead.",
    "Avoid stiff noun-phrase marketing language like 'premium event coverage', 'polished record', or 'curated experience'.",
    "Avoid vague mood filler with no concrete content, such as 'had room to connect', 'worth every minute', or 'a night that actually built relationships'. Every sentence should carry a specific fact, not just a feeling.",
    "Use specific, active verbs instead of flat phrases like shows, features, highlights, or brings to life.",
    "Mention metrics only when they strengthen credibility, and connect them to audience response.",
    "Keep the tone warm, human, and quietly confident, like a caption a real photographer would write, not generated copy.",
    "Do not oversell, use hype, or make claims that are not supported by the context.",
    "Treat guidedContext as the highest-priority source for the real purpose of the event.",
    "Use platform captions/transcripts as supporting evidence, not the main framing.",
    "Do not copy guidedContext or captions verbatim. Rewrite them into natural, human portfolio copy.",
    "Do not use emojis, hashtags, markdown headings, or bullet points.",
    "",
    `Title: ${data.title || "Untitled"}`,
    ...contextLines,
    getGuidance(data) ? `guidedContext, highest priority: ${getGuidance(data)}` : "",
    data.summary ? `Fallback summary: ${data.summary}` : ""
  ]
    .filter(Boolean)
    .join("\n");
}

async function requestOpenAIText(data, prompt, task = "summary") {
  let response;
  try {
    response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model,
        input: [
          {
            role: "system",
            content: [
              {
                type: "input_text",
                text: task === "title"
                  ? "You write concise portfolio titles. Do not explain your reasoning. Return only the title."
                  : "You write concise portfolio copy. Do not explain your reasoning. Return only polished copy."
              }
            ]
          },
          {
            role: "user",
            content: [{ type: "input_text", text: prompt }]
          }
        ],
        reasoning: {
          effort: reasoningEffort
        },
        text: {
          verbosity: "low"
        },
        max_output_tokens: 220
      })
    });
  } catch (error) {
    console.warn(`AI ${task} generation skipped for "${displayLogTitle(data)}" using ${model}: ${error.message}`);
    return "";
  }

  if (!response.ok) {
    const text = await response.text();
    console.warn(`AI ${task} generation failed for "${displayLogTitle(data)}" using ${model}: ${response.status} ${summarizeApiError(text)}`);
    return "";
  }

  return parseOpenAIText(data, await response.json(), task);
}

function summarizeApiError(text) {
  try {
    const parsed = JSON.parse(text);
    return parsed.error?.message || text;
  } catch {
    return String(text).replace(/\s+/g, " ").slice(0, 240);
  }
}

function parseOpenAIText(data, json, task) {
  const status = json.status;
  const incompleteReason = json.incomplete_details?.reason;
  if (status && status !== "completed") {
    console.warn(`AI ${task} generation warning for "${displayLogTitle(data)}": OpenAI status was ${status}${incompleteReason ? ` (${incompleteReason})` : ""}.`);
  }

  const copy = String(json.output_text || extractResponseText(json) || "")
    .replace(/\s+/g, " ")
    .trim();
  return copy;
}

function sanitizeGeneratedTitle(value) {
  const title = collapseRepeatedTitle(cleanString(value)
    .replace(/^["'“”‘’]+|["'“”‘’.]+$/g, "")
    .replace(/\s+/g, " ")
    .trim());

  if (!title) return "";
  if (isPlaceholderTitle(title)) return "";
  const words = title.split(/\s+/).filter(Boolean);
  if (words.length < 2 || words.length > 10) return "";
  if (/[.!?]$/.test(title)) return "";
  return title;
}

function collapseRepeatedTitle(title) {
  const words = cleanString(title).split(/\s+/).filter(Boolean);
  if (words.length < 4 || words.length % 2 !== 0) return cleanString(title);

  const midpoint = words.length / 2;
  const firstHalf = words.slice(0, midpoint).join(" ").toLowerCase();
  const secondHalf = words.slice(midpoint).join(" ").toLowerCase();

  return firstHalf === secondHalf ? words.slice(0, midpoint).join(" ") : cleanString(title);
}

function extractResponseText(json) {
  const chunks = [];
  for (const item of json.output || []) {
    for (const content of item.content || []) {
      if (content.type === "output_text" && content.text) chunks.push(content.text);
      if (typeof content.text === "string") chunks.push(content.text);
    }
  }
  return chunks.join(" ");
}

function replaceGeneratedBlock(body, generated) {
  const block = `${startMarker}\n${generated}\n${endMarker}`;
  if (!body) return block;

  const start = body.indexOf(startMarker);
  const end = body.indexOf(endMarker);
  if (start !== -1 && end !== -1 && end > start) {
    return `${body.slice(0, start).trim()}\n\n${block}\n\n${body.slice(end + endMarker.length).trim()}`.trim();
  }

  return `${block}\n\n${body}`.trim();
}

function stripGeneratedBlock(body) {
  const start = body.indexOf(startMarker);
  const end = body.indexOf(endMarker);
  if (start === -1 || end === -1 || end <= start) return body;

  return `${body.slice(0, start).trim()}\n\n${body.slice(end + endMarker.length).trim()}`.trim();
}

function isUsableCopy(copy) {
  const words = copy.split(/\s+/).filter(Boolean);
  if (words.length < 10) return false;
  if (!/[.!?]$/.test(copy)) return false;
  if (/^(this|a|an|the|and|but|with|for)\b/i.test(copy) && words.length < 14) return false;
  if (hasFormulaicStructure(copy)) return false;
  return true;
}

function hasFormulaicStructure(copy) {
  const normalized = String(copy).replace(/\s+/g, " ").trim();
  return /(?:^|[.!?]\s+)By\s+(?:pairing|centering|combining|using|doing|turning|creating|framing|blending)\b/i.test(normalized)
    || /\bhelped\s+[^.!?]{0,80}\s+feel\s+/i.test(normalized);
}

function dedupeRepeatedSentences(copy) {
  if (!copy) return "";

  const sentences = String(copy)
    .replace(/\s+/g, " ")
    .trim()
    .match(/[^.!?]+[.!?]+|[^.!?]+$/g);

  if (!sentences) return String(copy).replace(/\s+/g, " ").trim();

  const seen = new Set();
  const unique = [];

  for (const sentence of sentences) {
    const trimmed = sentence.trim();
    if (!trimmed) continue;

    const key = normalizeForComparison(trimmed);
    if (seen.has(key)) continue;

    seen.add(key);
    unique.push(trimmed);
  }

  return unique.join(" ");
}

function isTooVerbatim(copy, source) {
  if (!copy || !source || source.length < 40) return false;
  const normalizedCopy = normalizeForComparison(copy);
  const sourceChunks = normalizeForComparison(source)
    .split(/\s+/)
    .filter(Boolean);
  for (let index = 0; index <= sourceChunks.length - 8; index += 1) {
    const phrase = sourceChunks.slice(index, index + 8).join(" ");
    if (phrase.length > 35 && normalizedCopy.includes(phrase)) return true;
  }
  return false;
}

function normalizeForComparison(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

async function fetchPlatformContext(data) {
  if (data.platform !== "tiktok" || !data.externalUrl) return "";

  try {
    const response = await fetch(`https://www.tiktok.com/oembed?url=${encodeURIComponent(data.externalUrl)}`);
    if (!response.ok) return "";
    const json = await response.json();
    return [json.title, json.author_name].filter(Boolean).join(" / ");
  } catch {
    return "";
  }
}

async function loadEnv(envPath) {
  let raw = "";
  try {
    raw = await readFile(envPath, "utf8");
  } catch {
    return;
  }

  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const equalsIndex = trimmed.indexOf("=");
    if (equalsIndex === -1) continue;

    const key = trimmed.slice(0, equalsIndex).trim();
    let value = trimmed.slice(equalsIndex + 1).trim();
    if (!key || process.env[key] !== undefined) continue;

    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    process.env[key] = value;
  }
}
