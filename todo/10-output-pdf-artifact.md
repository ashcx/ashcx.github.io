# 10 — Tracked output/pdf artifact (~6 MB)

**Status:** done

## Resolution (2026-10-15)

The PDF is removed from Git tracking, preserved locally, and output/ is ignored.

Validation and the full build pass. AI generation was disabled for the build.
**Risk:** repo hygiene / clone size
**Area:** `output/pdf/FMLNEW_A5_replaced_cover.pdf`

## Problem

A ~6 MB PDF is tracked in git but referenced by nothing in the site, content, or
build pipeline. `.gitignore` does not cover `output/`.

## Evidence

- `output/pdf/FMLNEW_A5_replaced_cover.pdf` — no references in `src/`, `scripts/`,
  `public/`, or build config.
- `git ls-files output/` shows it is tracked.

## Proposed action

If it is not a site deliverable, remove it from tracking and add `output/` to
`.gitignore` (the file remains in history; use `git rm` in a normal commit — no
history rewrite needed unless repo size matters, in which case coordinate a
filter-repo cleanup separately). If it *is* a deliverable, move it somewhere
referenced and document it.

## Verification

- `git status` shows the deletion only for this file.
- `npm run build` unaffected.
