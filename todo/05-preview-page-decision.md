# 05 - Retire the Airwallex preview page

**Status:** resolved
**Area:** `src/pages/preview/airwallex.astro` removed

The homepage experiment is complete. The orphan `/preview/airwallex/` route
has been removed. The homepage still uses `EventFilmFeature` and the shared
`featuredEventFilm` settings in `src/lib/site.ts`.

## Verification

Run `npm run build` and confirm that `dist/preview/` no longer exists. Check
that the homepage event film still loads its poster and opens the video.
