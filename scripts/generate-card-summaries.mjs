import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
await loadEnv(path.join(root, ".env"));

const apiKey = process.env.OPENAI_API_KEY;
const model = process.env.OPENAI_MODEL || "gpt-5.6-luna";
const reasoningEffort = process.env.OPENAI_REASONING_EFFORT || "none";
const regenerate = process.argv.includes("--regenerate");
const photographyDir = path.join(root, "src", "content", "photography");
const minWords = 6;
const maxWords = 15;
const stopWords = new Set([
  "a", "an", "and", "at", "by", "for", "from", "in", "of", "on", "or", "the", "to", "with"
]);

if (!apiKey) {
  console.log("AI card-summary generation skipped: OPENAI_API_KEY is not set.");
  process.exit(0);
}

console.log(`AI card-summary generation using model: ${model}; reasoning effort: ${reasoningEffort}.`);

let updated = 0;

const files = (await readdir(photographyDir))
  .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))
  .sort();

for (const file of files) {
  const filePath = path.join(photographyDir, file);
  const raw = await readFile(filePath, "utf8");
  const parsed = matter(raw);
  const data = parsed.data || {};

  if (isExplicitlyDisabled(data.autoSummary) || data.publishStatus === "draft" || data.publishStatus === "archived") continue;
  if (!regenerate && cleanString(data.cardSummary)) continue;

  const cardSummary = await generateCardSummary(data, file);
  if (!cardSummary) continue;

  const nextData = { ...data, cardSummary };
  const nextFile = matter.stringify(parsed.content.trim(), nextData);

  if (nextFile === raw) continue;

  await writeFile(filePath, nextFile);
  updated += 1;
  console.log(`Generated photography card summary: ${file}`);
}

console.log(`AI card-summary generation complete. Updated ${updated} file${updated === 1 ? "" : "s"}.`);

async function generateCardSummary(data, file) {
  const prompt = buildPrompt(data);
  let attemptPrompt = prompt;

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    const rawSummary = await requestOpenAIText(data, attemptPrompt);
    const summary = sanitizeCardSummary(rawSummary);
    const validation = validateCardSummary(summary, data);

    if (validation.valid) return summary;

    console.warn(
      `AI card summary retrying for "${displayLogTitle(data, file)}" `
      + `(attempt ${attempt}/3): ${validation.reason}.`
    );
    console.warn(`Output: ${rawSummary || "[empty]"}`);

    attemptPrompt = `${prompt}\n\nThe previous output failed because ${validation.reason}. Rewrite it and obey every limit. Return only the revised context line.`;
  }

  console.warn(`AI card summary generation gave up for "${displayLogTitle(data, file)}" after 3 attempts.`);
  return "";
}

function buildPrompt(data) {
  const contextLines = [
    `Title: ${cleanString(data.title) || cleanString(data.generatedTitle) || "Untitled"}`,
    data.photographyType ? `Photography type: ${data.photographyType}` : "",
    data.client ? `Client: ${data.client}` : "",
    data.venue ? `Venue: ${data.venue}` : "",
    Array.isArray(data.services) && data.services.length > 0 ? `Services: ${data.services.join(", ")}` : "",
    Array.isArray(data.tags) && data.tags.length > 0 ? `Tags: ${data.tags.join(", ")}` : "",
    data.guidedContext ? `guidedContext, primary source of facts: ${data.guidedContext}` : "",
    data.summary ? `Existing full description, secondary context only: ${data.summary}` : "",
    data.description ? `Existing description, secondary context only: ${data.description}` : ""
  ].filter(Boolean);

  return [
    "Write a very short context line for a photography portfolio card.",
    "This is not a full description, sales paragraph, or emotional story.",
    "Return one compact phrase or fragment; a complete sentence is not required.",
    `Aim for ${minWords} to 12 words; never exceed ${maxWords} words.`,
    "Add one specific detail that the title does not already communicate: an activity, object, audience, setting, format, or purpose.",
    "Use guidedContext as the primary source of facts and never invent details.",
    "If you use an activity, specify what happened: say what was performed, discussed, explored, or celebrated.",
    "Use a neutral, caption-like perspective from the portfolio, not the voice of an attendee.",
    "Prefer simple, concise words found in natural writing and speech.",
    "Relevant industry terms are welcome when they add clarity, but minimize inflated vocabulary and corporate filler.",
    "Do not repeat the title or simply paraphrase it.",
    "Do not force the client name or programme theme when the title already makes it clear.",
    "Avoid generic or repetitive constructions such as captured for, documented for, featuring, showcasing, or highlighting.",
    "Use only commas, apostrophes, double quotation marks, and periods as punctuation. Do not use semicolons, dashes, hyphens, colons, parentheses, slashes, ampersands, exclamation marks, question marks, or any other punctuation.",
    "No first person, hype, emojis, hashtags, markdown, or explanation.",
    "Style examples only; do not copy their facts:",
    "Senior Visa executives networking during a private wildlife discovery trip",
    "Credible industry voices and a well-attended room",
    "Young pianists performing solos and duets on a grand piano",
    "",
    ...contextLines
  ].join("\n");
}

async function requestOpenAIText(data, prompt) {
  let response;

  try {
    response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model,
        input: [
          {
            role: "system",
            content: [{ type: "input_text", text: "Write only the requested compact gallery context line. Do not explain." }]
          },
          {
            role: "user",
            content: [{ type: "input_text", text: prompt }]
          }
        ],
        reasoning: { effort: reasoningEffort },
        text: { verbosity: "low" },
        max_output_tokens: 80
      })
    });
  } catch (error) {
    console.warn(`AI card summary generation skipped for "${displayLogTitle(data)}": ${error.message}`);
    return "";
  }

  if (!response.ok) {
    const errorText = await response.text();
    console.warn(`AI card summary generation failed for "${displayLogTitle(data)}": ${response.status} ${summarizeApiError(errorText)}`);
    return "";
  }

  const json = await response.json();
  return parseResponseText(json);
}

function parseResponseText(json) {
  if (typeof json.output_text === "string" && json.output_text.trim()) return json.output_text;

  const chunks = [];
  for (const item of json.output || []) {
    for (const content of item.content || []) {
      if (content.type === "output_text" && content.text) chunks.push(content.text);
      else if (typeof content.text === "string") chunks.push(content.text);
    }
  }

  return chunks.join(" ");
}

function sanitizeCardSummary(value) {
  return cleanString(value)
    .replace(/^[-*•]+\s*/, "")
    .replace(/^["“”'‘’]+|["“”'‘’]+$/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function validateCardSummary(summary, data) {
  if (!summary) return { valid: false, reason: "output was empty" };

  const words = summary.split(/\s+/).filter(Boolean);
  if (words.length < minWords || words.length > maxWords) {
    return { valid: false, reason: `it had ${words.length} words; expected ${minWords}-${maxWords}` };
  }

  if (/[^\p{L}\p{N}\s,'".]/u.test(summary) || /[\p{Extended_Pictographic}]/u.test(summary)) {
    return { valid: false, reason: "it contained punctuation outside the allowed comma, apostrophe, quotation mark, and period set" };
  }

  if (/\b(?:captured|documented|showcasing|featuring|highlighting)\s+(?:for|the|a|an)\b/i.test(summary)) {
    return { valid: false, reason: "it used a repetitive promotional construction" };
  }

  const title = cleanString(data.title) || cleanString(data.generatedTitle);
  if (isTooSimilarToTitle(summary, title)) {
    return { valid: false, reason: "it repeated too much of the gallery title" };
  }

  return { valid: true, reason: "" };
}

function isTooSimilarToTitle(summary, title) {
  if (!summary || !title) return false;

  const titleWords = tokenize(title);
  const summaryWords = tokenize(summary);
  const titleSet = new Set(titleWords);
  const meaningfulSummaryWords = summaryWords.filter((word) => word.length > 2 && !stopWords.has(word));
  const novelWords = meaningfulSummaryWords.filter((word) => !titleSet.has(word));

  if (meaningfulSummaryWords.length > 0 && novelWords.length < 2) return true;

  for (let index = 0; index <= summaryWords.length - 3; index += 1) {
    const phrase = summaryWords.slice(index, index + 3).join(" ");
    if (phrase && titleWords.join(" ").includes(phrase)) return true;
  }

  return false;
}

function tokenize(value) {
  return normalizeForComparison(value).split(/\s+/).filter(Boolean);
}

function normalizeForComparison(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function summarizeApiError(text) {
  try {
    const parsed = JSON.parse(text);
    return parsed.error?.message || text;
  } catch {
    return String(text).replace(/\s+/g, " ").slice(0, 240);
  }
}

function isExplicitlyDisabled(value) {
  return value === false || value === "false";
}

function displayLogTitle(data, file = "untitled") {
  return cleanString(data.title) || cleanString(data.generatedTitle) || file;
}

function cleanString(value) {
  return typeof value === "string" && value.trim() ? value.trim() : "";
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

    if ((value.startsWith("\"") && value.endsWith("\"")) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    process.env[key] = value;
  }
}
