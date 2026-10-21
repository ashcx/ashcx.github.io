# 05 — /preview/airwallex/ is an orphan indexable page

**Status:** open (decision needed)
**Risk:** stray route, SEO surface
**Area:** `src/pages/preview/airwallex.astro`

## Problem

The page is a design preview for the homepage event-film pattern. It is not
linked from nav, footer, sitemap config, or any content, but it is still built
and publicly reachable at `/preview/airwallex/`, where search engines can index
it.

Its dead scoped CSS (`.aw-teaser*`, `.aw-play`, `.aw-video-trigger`) has already
been removed; the live markup (`.aw-teaser-wrap` wrapping `EventFilmFeature`)
remains.

## Evidence

- No inbound references: grep for `/preview/airwallex` across `src/` returns
  nothing outside the page itself.
- `EventFilmFeature` is still used by the homepage, so the component must stay.

## Proposed action

Pick one:

1. Delete `src/pages/preview/` if the experiment is over.
2. Keep it as a working reference, but add `noindex` (BaseLayout prop or meta
   tag) and exclude it from any sitemap generation.
3. Promote it: link from somewhere if it is meant to be seen.

If deleted, also check `src/lib/site.ts` `featuredEventFilm` consumers; it is
used by both the homepage and this preview.

## Verification

- If deleted: `npm run build`, then confirm `dist/preview/` no longer exists.
- If kept: confirm `dist/preview/airwallex/index.html` contains the noindex meta.
