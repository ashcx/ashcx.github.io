# 01 — Home carousel loop has no exhaustion guard

**Status:** done

## Resolution (2026-10-15)

The carousel now iterates over bounded rounds, retaining source alternation and accepting fewer slides when pools run out.

Validation and the full build pass. AI generation was disabled for the build.
**Risk:** build hang (infinite loop)
**Area:** `src/pages/index.astro`

## Problem

The home hero carousel fills its portrait pool with a `while` loop that has no
way to terminate if the combined source pools are smaller than the target:

```ts
const portraitTarget = walkingTourEntry ? 4 : 5;
while (portraitImages.length < portraitTarget) {
  const slug = portraitSourceSlugs[sourceTurn % portraitSourceSlugs.length];
  sourceTurn += 1;
  const list = portraitsBySource.get(slug) ?? [];
  const cursor = portraitCursor.get(slug) ?? 0;
  if (cursor >= list.length) continue;   // nothing left to consume -> spins forever
  ...
}
```

## Evidence

- `src/pages/index.astro:66-78` — loop exits only when `portraitImages.length`
  reaches `portraitTarget`; `continue` re-tries exhausted lists forever.
- Sources are `getMediumPortraitImages(...)` (`src/lib/gallery-images.ts:154`),
  which returns `[]` when manifests are missing/corrupt (see item 06).
- Today it terminates by luck: h+AI provides 2 medium portraits, Eat the World
  provides 2, and the walking tour adds the 5th (target is 4 when the walking
  tour entry exists).

## Proposed action

Pick one:

1. Track exhausted sources and `break`/fall back when every list is drained.
2. Iterate `for` over the pool instead of `while`, pad with whatever exists, and
   accept fewer than `portraitTarget` slides when galleries are short.

Option 2 is simplest and keeps the page rendering (the walking-tour slide push
already tolerates fewer slides).

## Verification

- Temporarily force `portraitTarget` above the available pool in a dev branch and
  confirm `npm run dev` renders the homepage instead of hanging.
- `npm run validate` and `npm run build` still pass; homepage carousel shows the
  expected 4-5 slides.
