# 02 — videoAspectRatio is documented but never rendered

**Status:** resolved — intentional fixed frame

The owner confirmed that 4:5 framing with letterboxing is intentional. The player and existing metadata are preserved; README now explicitly describes this behavior. No layout change is needed.
**Risk:** latent inconsistency / stale docs
**Area:** `src/content.config.ts`, `src/components/SocialMediaPlayer.astro`, `README.md`

## Problem

Content-work frontmatter supports `videoAspectRatio` and the README documents it
as functional, but no component reads it. Local videos are hard-locked to a 4:5
frame regardless of the source ratio.

## Evidence

- Schema: `src/content.config.ts:133` (`videoAspectRatio: z.number().positive().optional()`).
- Set to `0.5625` (9:16) in `src/content/content-work/corporate-ga-ai-career-change-tiktok.mdx:8`
  and `corporate-ga-reskilling-tiktok.mdx:8`.
- Documented in `README.md:127` and `README.md:134` ("display width / height (9:16);
  use 1 for a square").
- The player hardcodes `aspect-ratio: 4 / 5` at `src/components/SocialMediaPlayer.astro:84`.

Result: the two TikTok videos are rendered in a 4:5 frame instead of their native
9:16, with whatever letterboxing/cropping that implies.

## Proposed action

Pick one:

1. **Wire it through:** in `SocialMediaPlayer.astro`, set
   `style={\`aspect-ratio: ${item.data.videoAspectRatio ?? 4 / 5}\`}` on the local
   video frame and verify the two TikTok entries.
2. **Remove it:** drop the schema field, remove the two frontmatter keys, and
   delete the README mentions.

## Verification

- Option 1: check `/content/` locally with both TikTok entries; confirm frame
  ratio changes and Instagram entries keep 4:5.
- Option 2: `npm run validate` + `npm run build` after edits; grep for
  `videoAspectRatio` should only match history.
