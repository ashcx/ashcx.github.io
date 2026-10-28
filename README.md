# Portfolio Site

A static portfolio site for photography, social-content work, and data projects.
It is built with [Astro](https://astro.build), stores content in Markdown/MDX,
and deploys to GitHub Pages.

Visit the live site: [ashcx.github.io](https://ashcx.github.io/)

There is no database or backend. Content is prepared locally, committed to the
repository, and published automatically when changes are pushed to `main`.

## Getting started

Install dependencies and start the local development server:

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal to preview the site. Before publishing,
run:

```bash
npm run validate
npm run build
```

`npm run build` checks public assets, imports new galleries, generates optional
copy, validates the content, and creates the production site in `dist/`.

## Add a photography gallery

1. Create a folder in `inbox/galleries/` and add the source photos (`.jpg`,
   `.jpeg`, `.png`, or `.webp`). This folder is local-only and is not committed.
2. Add a `gallery.md` file with the gallery details. `guidedContext`,
   `featuredRank`, and `categoryRank` are required. Include a 1-based
   `coverImageIndex` to select the cover:

   ```yaml
   ---
   title: Company Retreat 2026
   photographyType: corporate-private-events
   publishStatus: published
   guidedContext: >-
     Describe what happened, who the event was for, and why the images matter.
   featuredRank: 10
   categoryRank: 10
   coverImageIndex: 1
   ---
   ```

   An existing `coverImageIndex` is preserved. When it is missing, the importer
   prompts in an interactive terminal, using the generated gallery's existing
   selection or `1` as the default. Non-interactive runs add that same default
   automatically.

   Supported photography types are `corporate-private-events`, `stage-work`,
   `photoshoot`, and `wedding-rom`. Lower rank numbers appear first. Optional
   fields include `client`, `date`, `googlePhotosUrl`, `services`, and `tags`.

3. Run the importer or the full build:

   ```bash
   npm run import:magic
   # or
   npm run build
   ```

The importer creates the optimized gallery images, manifest, and corresponding
file in `src/content/photography/`. Review those generated changes, then commit
the generated content and images. Do not commit `inbox/` or manually rename
individual gallery derivatives.

To edit an existing gallery, update its file in
`src/content/photography/`, then run validation and build again.

## Add social-content work

Create a new `.mdx` file in `src/content/content-work/`, using an existing entry
as a template. Update the frontmatter and publish status. Supported platforms
are `instagram`, `tiktok`, and `linkedin`; entries can use an embed or a cover
image with an external URL.

## Add other content

- Data projects live in `src/content/data-projects/`.
- Testimonials live in `src/content/testimonials/`.
- Site-wide settings, pricing, contact details, and section visibility live in
  `src/lib/site.ts`.

Published entries are included in the site. Use `draft` while preparing content
and `archived` for content that should remain in the repository but no longer be
published.

## Optional AI copy generation

If `OPENAI_API_KEY` is present in `.env`, the build can generate portfolio copy
for eligible galleries and social-content entries. Without a key, the build
still succeeds and no AI-generated content is written.

Useful commands:

```bash
npm run social-copy
npm run card-summaries
```

Add `-- --regenerate` only when existing generated copy should be refreshed.

Both generators skip drafts and entries with `autoSummary: false`.
`social-copy` can still update archived entries; `card-summaries` skips them.
Social case studies are processed only when `autoSummary: true`.
Never commit `.env` or API keys.

## Deployment

Push changes to `main`. GitHub Actions runs validation and the production build,
then deploys `dist/` to GitHub Pages.

The repository should contain the generated site content and optimized images
needed by the build. Local-only files such as `inbox/`, `.env`, `node_modules/`,
`.astro/`, and `dist/` should not be committed.

### Social video playback

Social cards on the homepage and `/content/` share `SocialMediaPlayer.astro`.
Choose the original network with `platform: instagram`, `tiktok`, or `linkedin`.
Choose playback independently:

- `playback: embed` (default): use the network's `embedHtml`; `externalUrl` links to the original post. Existing entries need no changes.
- `playback: local`: use `videoSrc` and `coverImage`; retain `platform` and `externalUrl` for the “Open TikTok/Instagram post” link. Existing `embedHtml` can stay for switching back.

```yaml
platform: tiktok
playback: local
videoSrc: /media/social/example/video.mp4
coverImage: /media/social/example/poster.webp
externalUrl: https://www.tiktok.com/@account/video/123
```

Place a web-ready H.264/AAC MP4 and its poster together in
`public/media/social/<slug>/`, named `video.mp4` and `poster.webp`. Local clips
intentionally use a uniform 4:5 frame with
`object-fit: contain`, preserving the full video with letterboxing as needed.
The optional `videoAspectRatio` field is currently unused by the player and
does not change this frame. Local clips use `preload="none"`, inline playback, and
one accessible play/pause button. Native controls, fullscreen, picture-in-picture,
and remote playback are not exposed by the player. The original-post link remains
available for viewing on the social platform. Browsers or operating systems may
still offer their own media actions outside the page UI.

## Asset organization

| Location | Contents |
| --- | --- |
| `public/images/galleries/<slug>/` | Generated gallery WebPs and importer manifests |
| `public/media/services/` | Service card WebPs, including `-mobile.webp` variants |
| `public/media/social/<slug>/` | Each social clip's `video.mp4` and `poster.webp` |
| `public/media/films/<slug>/` | Film posters, including the shared Airwallex poster |
| `src/styles/global.css` | Global stylesheet imported by `BaseLayout.astro` |
| `docs/assets/service-images.md` | Service image credits, known export settings, and source locations |
| `inbox/galleries/` | Ignored gallery originals and importer inputs |
| `inbox/services/` | Ignored service image originals |
| `output/comparisons/services/` | Ignored previous service exports |
| `output/experiments/services/` | Ignored superseded source experiments and notes |

Everything in `public/` is copied into the published site. Keep originals,
experiments, backups, and provenance notes outside that folder. Preserve gallery
output through the importer. The `joash-pics` gallery and its content entry have
been retired together. Keep its local source folder out of `inbox/galleries/`
to prevent a later import from recreating it.

The old `/preview/airwallex/` experiment has been removed. The homepage still
uses its shared event-film component and settings. Retired asset paths have no
alias copies.

Run `npm run assets:check` to detect `.DS_Store` and `Thumbs.db` anywhere under
`public/`. Validation runs this check, and the full build also runs it before
importing galleries. The check reports unwanted paths and exits with an error.
It does not delete files.

The [service image provenance record](docs/assets/service-images.md) identifies
the two local Pexels originals and the missing owner-supplied social image
original. `inbox/` and `output/` are local storage, so keep a separate backup of
sources that cannot be recovered from Git or their original provider.

Run `npm run test:assets` to check accepted media paths, missing files, rejected remote videos, and the public-file guard. These checks use temporary fixtures and also run in CI.
