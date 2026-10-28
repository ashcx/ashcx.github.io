# Storage cleanup verification

The migration was tested against remote main `b8aedfc`, in a separate worktree.
Existing local homepage, content, and manifest changes were left outside the PR.

## Automated checks

- `npm run test:assets` exercises valid grouped media, missing videos and posters, remote-video rejection, allowed JSON/Markdown, nested desktop metadata rejection, and early build rejection.
- `npm run validate` checks Astro types and content references.
- `OPENAI_API_KEY='' npm run build` builds without AI generation. A separate isolated copy also exercised the actual local gallery inputs, importing all 22 input galleries and building 30 pages.
- A baseline asset comparison verified all 11 moved public files and the stylesheet were byte-identical. Remaining public assets were unchanged.
- The built HTML contained 1,361 local references; all resolved. Only the Joash gallery and Airwallex preview routes were removed. Both return 404 in a static preview.

## Browser checks

Full-page screenshots compared six routes at 1440px and 390px widths: homepage, content, videography, photography, contact, and the Gracia/Eze gallery. All 12 before/after comparisons had zero pixel differences after local images loaded. External requests were blocked for deterministic comparisons; third-party embeds and thumbnails are outside that visual guarantee.

Real browser interactions checked both local clips playing and pausing, social filters and View more, photography tabs, the homepage carousel, gallery lightbox next/close, and the film button setting its YouTube iframe URL. These checks ran at both widths and reported no page errors. They do not prove that external providers will always deliver their streams.

## Deliberate changes and limits

Old moved-media URLs have no alias copies. Public URLs are updated throughout active site content and code. The shared CSS contents and image encodings were preserved.

Local reusable service originals were moved into ignored `inbox/services/`. Experiments and prior exports were preserved separately under ignored `output/`. Those local-only moves are not transported by this PR. Their 14 files retained their original checksums.

The current social-card original remains unlocated. Its existing published derivatives were preserved; provenance is documented in `service-images.md`.
