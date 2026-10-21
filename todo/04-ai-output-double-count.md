# 04 — AI response text can be counted twice

**Status:** done

## Resolution (2026-10-15)

Response extraction now uses mutually exclusive branches. Stubbed payload checks confirm each chunk appears once.

Validation and the full build pass. AI generation was disabled for the build.
**Risk:** duplicated AI copy (currently masked)
**Area:** `scripts/generate-social-copy.mjs`

## Problem

`extractResponseText` pushes text for every `output_text` chunk twice: once via
the generic `item.type === "output_text"` branch and once via the
`item.content` array loop. Duplicate sentences are then hidden by the
deduplication helper later in the pipeline, so the bug is latent, not visible.

## Evidence

- `scripts/generate-social-copy.mjs:441-450` — two independent pushes of the same
  chunk (no `else if` between the branches).
- `scripts/generate-card-summaries.mjs` implements the same helper with correct
  `else if` flow, showing the intended shape.
- Masking: `dedupeRepeatedSentences` in the social-copy pipeline removes the
  duplicates before they reach content.

## Proposed action

Mirror the card-summaries implementation: make the `output_text` check an
`else if` so each chunk is appended once. No content regeneration needed; this
is a correctness fix for future runs.

## Verification

- Feed a stubbed Responses API payload through `extractResponseText` (or a unit
  assertion) and confirm each chunk appears once.
- `OPENAI_API_KEY= npm run social-copy -- --regenerate` exits 0 without changes
  when key is suppressed; normal runs unaffected.
