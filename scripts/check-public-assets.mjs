import { readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const publicDir = fileURLToPath(new URL("../public/", import.meta.url));
const forbiddenNames = new Set([".DS_Store", "Thumbs.db"]);
const entries = await readdir(publicDir, { recursive: true, withFileTypes: true });
const unwanted = entries
  .filter((entry) => forbiddenNames.has(entry.name))
  .map((entry) => path.relative(publicDir, path.join(entry.parentPath ?? entry.path, entry.name)))
  .sort();

if (unwanted.length) {
  console.error("Public asset check failed. Remove these desktop metadata files from public/ before building:");
  for (const file of unwanted) console.error(`- public/${file}`);
  process.exit(1);
}

console.log("Public asset check passed.");
