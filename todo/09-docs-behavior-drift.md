# 09 — Docs drift from actual behavior

**Status:** done

## Resolution (2026-10-15)

README now documents existing cover-selection reuse, interactive prompts, archived-entry generation behavior, and intentional 4:5 letterboxing. videoAspectRatio remains accepted metadata but does not control the player. AGENTS.md already describes the importer and archive behavior accurately.

Validation and the full build pass. AI generation was disabled for the build.
**Area:** `README.md`, `AGENTS.md`

## Problem

Several documented behaviors no longer match the code. Either fix the docs or
change the behavior deliberately.

## Evidence

- `README.md:37,53` say the importer defaults `coverImageIndex` to `1`; the
  interactive importer prompts for a choice, and non-interactive runs default it
  (AGENTS.md is closer, but the two documents disagree).
- `README.md:127,134` present `videoAspectRatio` as a working display control;
  nothing renders it (see item 02).
- `AGENTS.md` documents that the social-copy generator does not skip archived
  entries while the card-summaries generator does — an intentional-looking but
  surprising asymmetry that should be called out in the README too (or unified).

## Proposed action

After deciding items 02 and 03, update both documents in one pass so the
importer defaults, `videoAspectRatio`, and the archived-entry behavior are
described exactly as implemented. Add a line about the archived asymmetry to the
README's AI-copy section.

## Verification

- Walk each documented claim against the code paths before committing; keep the
  doc edits in the same commit as any behavior change they describe.
