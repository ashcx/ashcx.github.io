# 03 — coverImageIndex is unvalidated and missing from one gallery

**Status:** open
**Risk:** silent cover mismatch
**Area:** `scripts/validate-content.mjs`, `src/content/photography/`

## Problem

`coverImageIndex` selects a gallery's cover image, but validation never checks
it, and the README and importer disagree about what happens when it is missing.

## Evidence

- Schema accepts it: `src/content.config.ts:74` (`positiveIntegerOptional`).
- `scripts/validate-content.mjs` warns for missing/invalid `featuredRank` and
  `categoryRank` (lines ~119-124) but has no `coverImageIndex` check at all.
- `src/content/photography/airwallex-for-startups-accelerator-event.md` has no
  `coverImageIndex`, so its cover silently falls back to the first image
  (`src/lib/gallery-images.ts:97-101`).
- `README.md:37` and `README.md:53` say the importer "defaults it to 1", while
  AGENTS.md describes an interactive prompt for missing values.

## Proposed action

1. Add a `validate-content.mjs` warning for photography entries without a
   positive-integer `coverImageIndex` (mirroring the rank warnings).
2. Add the missing `coverImageIndex: 1` to the Airwallex gallery file (or the
   intended index after reviewing its manifest order).
3. Reconcile the README/AGENTS wording with the importer's actual behavior
   (prompt when interactive, default `1` when not).

## Verification

- `npm run validate` prints no new warnings after fixing the file.
- Remove the key from a scratch copy and confirm the warning fires.
