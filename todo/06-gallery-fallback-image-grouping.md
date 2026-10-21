# 06 — Folder fallback misgroups medium images as large

**Status:** done

## Resolution (2026-10-15)

Folder fallback groups thumb, medium, and large derivatives under one image and exposes the medium URL. Missing/corrupt-manifest checks pass. Orientation metadata still requires a manifest; the fallback retains its existing landscape assumption.

Validation and the full build pass. AI generation was disabled for the build.
**Risk:** wrong image served only when manifest fallback triggers
**Area:** `src/lib/gallery-images.ts`

## Problem

When a gallery's `manifest.json` is missing or unreadable, `getGalleryImages`
falls back to `fromFolder`, which infers derivatives from filenames. It never
recognizes `-medium.webp`, and the else-branch treats any unrecognized file as a
`large`.

## Evidence

- `src/lib/gallery-images.ts:57-80`:
  - `if (file.includes("-thumb.webp")) group.thumb = file;`
  - `else if (file.includes("-large.webp")) group.large = file;`
  - `else group.large = file;` — catches `-medium.webp` (and the base file).
- Consumers that request `preferredSize: "medium"` (`getGalleryCover`,
  `getMediumPortraitImages`) would then receive a large derivative via the
  fallback, defeating the "never silently fall back to a heavy large" comment at
  `src/lib/gallery-images.ts:151-153`.
- Only reachable when `fromManifest` returns `[]`; normal builds use manifests.

## Proposed action

Handle the medium suffix explicitly in `fromFolder` and store it in
`group.medium`; keep the base/unknown file as large. Alternatively, delete the
folder fallback entirely so a missing manifest is a visible validation failure
instead of an approximate guess.

## Verification

- Temporarily rename a gallery's `manifest.json`, run `npm run dev`, and confirm
  portrait/medium consumers still get `-medium.webp` URLs.
- Restore the manifest; `npm run validate` unaffected.
