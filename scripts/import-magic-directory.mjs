import { mkdir, readdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import sharp from "sharp";
import YAML from "yaml";

// Must be set before the first threadpool-consuming call (any fs/sharp async op below).
// One thread per image, and let libuv run as many images at once as there are cores,
// instead of one image hogging multiple threads via sharp's own thread pool.
const cpuCount = os.availableParallelism();
process.env.UV_THREADPOOL_SIZE = String(cpuCount);
sharp.concurrency(1);

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const inboxRoot = path.join(root, "inbox", "galleries");
const contentRoot = path.join(root, "src", "content", "photography");
const outputRoot = path.join(root, "public", "images", "galleries");
const supportedExtensions = new Set([".jpg", ".jpeg", ".png", ".webp"]);
let promptInterface;

const thumbLongEdge = 480;
const largeLongEdge = 2800;
const maxOutputBytes = 600 * 1024;
const minQuality = 40;
const qualityStep = 5;

function slugify(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function exists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

async function listGalleryFolders() {
  if (!(await exists(inboxRoot))) {
    await mkdir(inboxRoot, { recursive: true });
    return [];
  }
  const entries = await readdir(inboxRoot, { withFileTypes: true });
  return entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
}

async function listSourceImages(folderPath) {
  const entries = await readdir(folderPath, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && supportedExtensions.has(path.extname(entry.name).toLowerCase()))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }));
}

async function readGalleryMarkdown(folderPath) {
  const galleryMdPath = path.join(folderPath, "gallery.md");
  if (!(await exists(galleryMdPath))) {
    return promptForGalleryMarkdown(folderPath, galleryMdPath, matter("---\n---\n"), {
      reason: "No gallery.md found, so let's create one."
    });
  }

  const parsed = matter(await readFile(galleryMdPath, "utf8"));
  if (!String(parsed.data?.guidedContext || "").trim()) {
    return promptForGalleryMarkdown(folderPath, galleryMdPath, parsed, {
      reason: "gallery.md exists, but it has no guidedContext."
    });
  }

  if (!hasRank(parsed.data?.featuredRank)) {
    return promptForGalleryMarkdown(folderPath, galleryMdPath, parsed, {
      reason: "gallery.md exists, but it has no featuredRank."
    });
  }

  if (!hasRank(parsed.data?.categoryRank)) {
    return promptForGalleryMarkdown(folderPath, galleryMdPath, parsed, {
      reason: "gallery.md exists, but it has no categoryRank."
    });
  }

  return parsed;
}

async function promptForGalleryMarkdown(folderPath, galleryMdPath, parsed, { reason }) {
  const folderName = path.basename(folderPath);
  const existingData = parsed.data || {};

  if (!input.isTTY || !output.isTTY) {
    throw new Error(
      [
        `Gallery "${folderName}" needs mandatory metadata before import.`,
        reason,
        "Run `npm run import:magic` locally in an interactive terminal so the importer can ask for details,",
        "or edit gallery.md manually with at least:",
        "---",
        "guidedContext: Your mandatory context here.",
        "featuredRank: 10",
        "categoryRank: 10",
        "---"
      ].join("\n")
    );
  }

  const prompt = getPromptInterface();
  console.log(`\nNew gallery detected: ${folderName}`);
  console.log(reason);

  let title = String(existingData.title || "").trim();
  if (!title && !String(existingData.generatedTitle || "").trim()) {
    title = (await prompt.question("Title (optional, press Enter to let AI generate one): ")).trim();
  }

  let guidedContext = String(existingData.guidedContext || "").trim();

  while (!guidedContext) {
    guidedContext = (await prompt.question("Context (mandatory, used for AI title/description): ")).trim();
    if (!guidedContext) {
      console.log("Context is required. Add the useful facts, angle, client value, event type, or moments to highlight.");
    }
  }

  console.log("Rank reminder: lower numbers appear first. Use 1 for top-tier highlights; press Enter for 10, the lowest-priority default.");
  const featuredRank = await promptForRank("Featured rank for the All view", existingData.featuredRank);
  const categoryRank = await promptForRank("Category rank for this tab", existingData.categoryRank);

  const data = cleanFrontmatter({
    ...existingData,
    title: title || existingData.title || undefined,
    photographyType: existingData.photographyType || "corporate-private-events",
    publishStatus: existingData.publishStatus || "published",
    guidedContext,
    featuredRank,
    categoryRank
  });
  const yaml = YAML.stringify(data).trim();
  const raw = `---\n${yaml}\n---\n\n${parsed.content.trim()}\n`;
  await writeFile(galleryMdPath, raw);
  console.log(`Updated ${path.relative(root, galleryMdPath)}\n`);

  return matter(raw);
}

function getPromptInterface() {
  if (!promptInterface) {
    promptInterface = createInterface({ input, output });
  }
  return promptInterface;
}

function hasRank(value) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0;
}

async function promptForRank(label, existingValue) {
  if (hasRank(existingValue)) {
    return Number(existingValue);
  }

  const prompt = getPromptInterface();
  const answer = (await prompt.question(`${label} (lower appears first, blank = 10): `)).trim();
  const number = Number(answer);

  if (!answer) return 10;
  if (Number.isFinite(number) && number > 0) return number;

  console.log(`Invalid rank "${answer}". Using 10 as the lowest-priority default.`);
  return 10;
}

async function readManifest(manifestPath) {
  try {
    return JSON.parse(await readFile(manifestPath, "utf8"));
  } catch {
    return { sourceFiles: [] };
  }
}

async function encodeWebp(inputPath, longEdge, quality, forThumb = false) {
  let pipeline = sharp(inputPath).rotate().toColorspace("srgb");

  // Thumb-only: denoise before the resize so sensor noise doesn't alias into
  // visible speckling once decimated down to 480px, then sharpen after the
  // resize to restore the edge contrast the downscale softened. Large images
  // keep enough real detail that neither step is needed.
  if (forThumb) {
    pipeline = pipeline.median(3);
  }

  pipeline = pipeline.resize({
    width: longEdge,
    height: longEdge,
    fit: "inside",
    withoutEnlargement: true
  });

  if (forThumb) {
    pipeline = pipeline.sharpen();
  }

  const result = await pipeline.webp({ quality, preset: "photo", effort: 4, smartSubsample: true }).toBuffer({ resolveWithObject: true });

  if (result.data.length > maxOutputBytes && quality > minQuality) {
    return encodeWebp(inputPath, longEdge, Math.max(minQuality, quality - qualityStep), forThumb);
  }

  return result;
}

async function writeWebp(inputPath, outputPath, longEdge, quality, forThumb = false) {
  const result = await encodeWebp(inputPath, longEdge, quality, forThumb);
  await writeFile(outputPath, result.data);
  return result.info;
}

async function processGallery({ folderName, folderPath }) {
  const slug = slugify(folderName);
  if (!slug) {
    console.warn(`Skipping "${folderName}" because it cannot be slugified.`);
    return;
  }

  const sourceImages = await listSourceImages(folderPath);
  if (sourceImages.length === 0) {
    console.warn(`Skipping "${folderName}" because it has no supported images.`);
    return;
  }

  const outputDir = path.join(outputRoot, slug);
  const manifestPath = path.join(outputDir, "manifest.json");
  const oldManifest = await readManifest(manifestPath);
  const oldByName = new Map((oldManifest.sourceFiles || []).map((file) => [file.name, file]));
  const newManifest = {
    generatedAt: new Date().toISOString(),
    sourceFiles: []
  };

  await mkdir(outputDir, { recursive: true });

  // Pass 1: cheap sequential fs/cache-identity checks only, no encoding yet.
  const records = [];
  for (const [index, sourceName] of sourceImages.entries()) {
    const sourcePath = path.join(folderPath, sourceName);
    const sourceStat = await stat(sourcePath);
    const number = String(index + 1).padStart(3, "0");
    const outputThumb = `image-${number}-thumb.webp`;
    const outputLarge = `image-${number}-large.webp`;
    const thumbPath = path.join(outputDir, outputThumb);
    const largePath = path.join(outputDir, outputLarge);
    const existing = oldByName.get(sourceName);

    const width = existing?.width;
    const height = existing?.height;
    const aspectRatio = existing?.aspectRatio;
    const canReuse =
      existing &&
      existing.size === sourceStat.size &&
      existing.mtimeMs === sourceStat.mtimeMs &&
      existing.outputThumb === outputThumb &&
      existing.outputLarge === outputLarge &&
      (await exists(thumbPath)) &&
      (await exists(largePath)) &&
      width &&
      height;

    records.push({ sourceName, sourcePath, sourceStat, outputThumb, outputLarge, thumbPath, largePath, canReuse, width, height, aspectRatio });
  }

  // Pass 2: encode everything that needs it, thumbs first (they finish fastest)
  // then larges, each phase as one Promise.all — UV_THREADPOOL_SIZE (cpuCount)
  // already bounds how many run natively at once, so no manual batching needed.
  const needsEncode = records.filter((record) => !record.canReuse);
  await Promise.all(needsEncode.map((record) => writeWebp(record.sourcePath, record.thumbPath, thumbLongEdge, 65, true)));
  const largeResults = await Promise.all(needsEncode.map((record) => writeWebp(record.sourcePath, record.largePath, largeLongEdge, 80)));
  needsEncode.forEach((record, index) => {
    const large = largeResults[index];
    record.width = large.width;
    record.height = large.height;
    record.aspectRatio = Number((large.width / large.height).toFixed(4));
  });

  for (const record of records) {
    newManifest.sourceFiles.push({
      name: record.sourceName,
      mtimeMs: record.sourceStat.mtimeMs,
      size: record.sourceStat.size,
      outputThumb: record.outputThumb,
      outputLarge: record.outputLarge,
      width: record.width,
      height: record.height,
      aspectRatio: record.aspectRatio
    });
  }

  await removeStaleOutputs(outputDir, newManifest);
  await writeFile(manifestPath, `${JSON.stringify(newManifest, null, 2)}\n`);
  await writeGalleryContent({ folderPath, slug, manifest: newManifest });
  console.log(`Imported ${sourceImages.length} image(s): ${slug}`);
}

async function removeStaleOutputs(outputDir, manifest) {
  const keep = new Set(["manifest.json"]);
  for (const file of manifest.sourceFiles) {
    keep.add(file.outputThumb);
    keep.add(file.outputLarge);
  }

  const entries = await readdir(outputDir, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isFile()) continue;
    if (!entry.name.endsWith(".webp")) continue;
    if (!keep.has(entry.name)) {
      await rm(path.join(outputDir, entry.name), { force: true });
    }
  }
}

async function writeGalleryContent({ folderPath, slug, manifest }) {
  const parsed = await readGalleryMarkdown(folderPath);
  const data = parsed.data || {};
  const contentPath = path.join(contentRoot, `${slug}.md`);
  const existing = await readExistingContent(contentPath);
  const existingDate = existing.data.date instanceof Date
    ? existing.data.date.toISOString().slice(0, 10)
    : existing.data.date;
  const first = manifest.sourceFiles[0];
  const coverImageIndex = Number(data.coverImageIndex ?? existing.data.coverImageIndex);
  const coverBySelectedIndex =
    Number.isInteger(coverImageIndex) && coverImageIndex >= 1 && coverImageIndex <= manifest.sourceFiles.length
      ? manifest.sourceFiles[coverImageIndex - 1]
      : undefined;
  const cover = coverBySelectedIndex || first;

  const frontmatter = cleanFrontmatter({
    title: data.title || undefined,
    generatedTitle: data.generatedTitle || existing.data.generatedTitle || undefined,
    date: data.date || existingDate || new Date().toISOString().slice(0, 10),
    photographyType: data.photographyType || "corporate-private-events",
    client: data.client || undefined,
    featuredRank: hasRank(data.featuredRank) ? Number(data.featuredRank) : 10,
    categoryRank: hasRank(data.categoryRank) ? Number(data.categoryRank) : 10,
    hidden: data.hidden === true || data.hidden === "true" ? true : undefined,
    publishStatus: data.publishStatus || "published",
    coverImageIndex: coverBySelectedIndex ? coverImageIndex : undefined,
    summary: data.summary || existing.data.summary || undefined,
    cardSummary: data.cardSummary || existing.data.cardSummary || undefined,
    description: data.description || undefined,
    guidedContext: data.guidedContext || undefined,
    platformCaption: data.platformCaption || undefined,
    autoSummary: data.autoSummary === false || data.autoSummary === "false" ? false : undefined,
    services: Array.isArray(data.services) ? data.services : undefined,
    tags: Array.isArray(data.tags) ? data.tags : undefined,
    googlePhotosUrl: data.googlePhotosUrl || undefined,
    coverImage: data.coverImage || (cover ? `/images/galleries/${slug}/${cover.outputLarge}` : undefined)
  });

  await mkdir(contentRoot, { recursive: true });
  const yaml = YAML.stringify(frontmatter).trim();
  const body = parsed.content.trim() || existing.content.trim();
  await writeFile(
    contentPath,
    `---\n# photographyType choices: corporate-private-events | stage-work | photoshoot | wedding-rom\n# hidden: true keeps this gallery out of home/photography listings unless ?hidden=1 is in the URL\n# coverImageIndex: N picks the Nth image (1-based, matching image-NNN- output filenames) as the cover instead of the first\n${yaml}\n---\n\n${body}\n`
  );
}

async function readExistingContent(contentPath) {
  try {
    return matter(await readFile(contentPath, "utf8"));
  } catch {
    return { data: {}, content: "" };
  }
}

function cleanFrontmatter(frontmatter) {
  return Object.fromEntries(Object.entries(frontmatter).filter(([, value]) => value !== undefined && value !== ""));
}

const folders = await listGalleryFolders();
if (folders.length === 0) {
  console.log("No magic-directory galleries found in inbox/galleries.");
}

for (const folderName of folders) {
  await processGallery({
    folderName,
    folderPath: path.join(inboxRoot, folderName)
  });
}

if (promptInterface) {
  promptInterface.close();
}
