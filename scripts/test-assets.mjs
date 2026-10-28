import assert from "node:assert/strict";
import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = fileURLToPath(new URL("../", import.meta.url));

function fixture(callback) {
  const directory = mkdtempSync(path.join(tmpdir(), "portfolio-assets-"));
  try {
    mkdirSync(path.join(directory, "scripts"));
    cpSync(path.join(root, "scripts/check-public-assets.mjs"), path.join(directory, "scripts/check-public-assets.mjs"));
    cpSync(path.join(root, "scripts/validate-content.mjs"), path.join(directory, "scripts/validate-content.mjs"));
    symlinkSync(path.join(root, "node_modules"), path.join(directory, "node_modules"), "dir");
    callback(directory);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
}

function run(directory, script) {
  return spawnSync(process.execPath, [path.join(directory, "scripts", script)], { encoding: "utf8" });
}

test("public assets allow intentional JSON and Markdown", () => fixture((directory) => {
  mkdirSync(path.join(directory, "public/nested"), { recursive: true });
  writeFileSync(path.join(directory, "public/nested/manifest.json"), "{}");
  writeFileSync(path.join(directory, "public/nested/credits.md"), "Credits");
  const result = run(directory, "check-public-assets.mjs");
  assert.equal(result.status, 0, result.stderr);
}));

for (const name of [".DS_Store", "Thumbs.db"]) {
  test(`public assets reject nested ${name}`, () => fixture((directory) => {
    mkdirSync(path.join(directory, "public/nested"), { recursive: true });
    writeFileSync(path.join(directory, "public/nested", name), "metadata");
    const result = run(directory, "check-public-assets.mjs");
    assert.equal(result.status, 1, result.stderr);
    assert.ok(result.stderr.includes(`public/nested/${name}`), result.stderr);
  }));
}

for (const [name, replacement, message] of [
  ["valid grouped media", null, null],
  ["missing video", ["videoSrc: /media/social/ga-reskilling/video.mp4", "videoSrc: /media/social/missing/video.mp4"], "needs an existing local videoSrc"],
  ["remote video", ["videoSrc: /media/social/ga-reskilling/video.mp4", "videoSrc: https://example.com/video.mp4"], "needs an existing local videoSrc"],
  ["missing poster", ["coverImage: /media/social/ga-reskilling/poster.webp", "coverImage: /media/social/missing/poster.webp"], "needs an existing coverImage"],
]) {
  test(`content validation checks ${name}`, () => fixture((directory) => {
    cpSync(path.join(root, "src/content"), path.join(directory, "src/content"), { recursive: true });
    symlinkSync(path.join(root, "public"), path.join(directory, "public"), "dir");
    if (replacement) {
      const file = path.join(directory, "src/content/content-work/corporate-ga-reskilling-tiktok.mdx");
      const source = readFileSync(file, "utf8");
      assert.ok(source.includes(replacement[0]), "Fixture must mutate a real content field");
      writeFileSync(file, source.replace(...replacement));
    }
    const result = run(directory, "validate-content.mjs");
    assert.equal(result.status, replacement ? 1 : 0, result.stderr);
    if (message) assert.ok(result.stderr.includes(message), result.stderr);
  }));
}

test("build rejects public metadata before running the importer", () => fixture((directory) => {
  cpSync(path.join(root, "scripts/build.mjs"), path.join(directory, "scripts/build.mjs"));
  mkdirSync(path.join(directory, "public"));
  writeFileSync(path.join(directory, "public/.DS_Store"), "metadata");
  const result = spawnSync(process.execPath, [path.join(directory, "scripts/build.mjs")], {
    cwd: directory,
    encoding: "utf8"
  });
  assert.equal(result.status, 1, result.stderr);
  assert.ok(result.stderr.includes("public/.DS_Store"), result.stderr);
  assert.ok(!result.stderr.includes("Cannot find module"), result.stderr);
}));
