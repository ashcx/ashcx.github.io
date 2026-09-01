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

`npm run build` imports new galleries, generates optional copy, validates the
content, and creates the production site in `dist/`.

## Add a photography gallery

1. Create a folder in `inbox/galleries/` and add the source photos (`.jpg`,
   `.jpeg`, `.png`, or `.webp`). This folder is local-only and is not committed.
2. Add a `gallery.md` file with the gallery details. The minimum required fields
   are:

   ```yaml
   ---
   title: Company Retreat 2026
   photographyType: corporate-private-events
   publishStatus: published
   guidedContext: >-
     Describe what happened, who the event was for, and why the images matter.
   featuredRank: 10
   categoryRank: 10
   ---
   ```

   Supported photography types are `corporate-private-events`, `stage-work`,
   `photoshoot`, and `wedding-rom`. Lower rank numbers appear first. Optional
   fields include `client`, `date`, `coverImageIndex`, `googlePhotosUrl`,
   `services`, and `tags`.

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
Never commit `.env` or API keys.

## Deployment

Push changes to `main`. GitHub Actions runs validation and the production build,
then deploys `dist/` to GitHub Pages.

The repository should contain the generated site content and optimized images
needed by the build. Local-only files such as `inbox/`, `.env`, `node_modules/`,
`.astro/`, and `dist/` should not be committed.
