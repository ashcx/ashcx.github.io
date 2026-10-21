# 07 — Duplicated logic across pages and scripts

**Status:** open
**Area:** `src/pages/index.astro`, `src/pages/content/index.astro`,
`src/layouts/BaseLayout.astro`, `src/lib/progressive-list.ts`, `scripts/*.mjs`

## Problem

Several behaviors are implemented twice. They currently agree, but future edits
can drift silently.

## Evidence

1. **Social-embed loader** — the same provider-script injection/embed normalization
   block exists in `src/pages/index.astro:211-242` and
   `src/pages/content/index.astro:62-93`.
2. **URL param + progressive-list hydration** — `src/layouts/BaseLayout.astro:51-53`
   duplicates the `?limit=` parsing/phasing logic owned by
   `src/lib/progressive-list.ts:8`.
3. **AI script helpers** — `loadEnv`, stop-word sets, and sentence-similarity
   logic are re-declared in `scripts/generate-social-copy.mjs` and
   `scripts/generate-card-summaries.mjs` (and partially in `import-magic-directory.mjs`).

## Proposed action

1. Extract the social-embed loader into `src/lib/social-embeds.ts` (client script
   module imported by both pages).
2. Have `BaseLayout.astro` import the param helper from `progressive-list.ts`
   instead of re-parsing.
3. Extract shared script helpers into `scripts/lib/` (plain `.mjs`) and import
   from both generators.

Keep each extraction as its own commit so regressions are bisectable.

## Verification

- After each extraction, `npm run build` and compare the affected pages
  (`/`, `/content/`) in `npm run preview` — embed iframes, filters, and
  progressive reveal behave identically.
- `npm run validate` passes.
