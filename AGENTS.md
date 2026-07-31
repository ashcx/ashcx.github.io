# AGENTS.md

## Overview

This is an Astro 5 static portfolio site for photography, social-content work,
and data projects. It uses MDX and deploys to GitHub Pages; there is no backend
or database. Content, images, and generated gallery metadata are file-based.

## Where changes belong

- `src/pages/` — file-based routes, including dynamic gallery/project pages.
- `src/components/` — reusable Astro UI components.
- `src/layouts/` — shared page shell.
- `src/lib/` — shared content, gallery, and site helpers. Keep site-wide pricing
  and section visibility in `src/lib/site.ts`.
- `src/content.config.ts` — Astro content collection schemas and allowed values.
- `src/content/photography/` — gallery metadata; filename determines its slug.
- `src/content/content-work/`, `data-projects/`, `testimonials/` — MD/MDX content
  for the corresponding sections.
- `scripts/` — gallery import, AI copy generation, and content validation.
- `public/images/` — served image assets. Gallery derivatives live in
  `public/images/galleries/<slug>/`.
- `inbox/galleries/` — local source photos and `gallery.md` input for the gallery
  importer; it is intentionally untracked.

## Commands

Run commands from the repository root.

```bash
npm install             # local setup; CI uses npm ci
npm run dev             # Astro development server
npm run validate        # astro check + custom content validation
npm run build           # import galleries, generate optional AI copy, validate, build
npm run preview         # preview dist/
npm run import:magic    # run only the gallery import pipeline
npm run social-copy -- --regenerate
npm run card-summaries -- --regenerate
```

`npm run check` is an alias for `npm run validate`. No separate lint or test
script is configured.

## Content and architecture conventions

- Preserve the schemas in `src/content.config.ts`. Use supported
  `publishStatus` values: `draft`, `published`, or `archived`; drafts and
  archived entries are excluded from published lists.
- Photography uses `corporate-private-events`, `stage-work`, `photoshoot`, or
  `wedding-rom`. `featuredRank` and `categoryRank` must be positive; lower
  values appear first. `hidden: true` keeps a gallery out of normal listings.
- File names determine content slugs and routes. Do not rely on a frontmatter
  `slug` override.
- Published galleries are sorted by `featuredRank` in the **All** tab and by
  `categoryRank` in their photography-type tab; ties retain collection order.
- Social-content cards have no manual rank: published entries are shown newest
  first by frontmatter `date`. The category filters only hide/show that same
  order. Use `featured: true` only for the optional content case-study block.
- Use existing helpers (`published`, ranking functions, gallery-image helpers)
  instead of duplicating filtering, sorting, or manifest parsing in pages.
- Keep client JavaScript minimal and scoped; most rendering is static Astro.
- Use the `sections` switches in `src/lib/site.ts` for site-wide section
  visibility rather than editing multiple nav/page locations.

## Galleries and generated content

`npm run build` runs the importer before validation and Astro build. The
importer reads `inbox/galleries/<folder>/`, writes optimized WebP assets and a
`manifest.json`, and creates/updates the matching photography content file.
To import a gallery, create `inbox/galleries/<folder>/`, add `.jpg`, `.jpeg`,
`.png`, or `.webp` source photos, and add `gallery.md`. Then run
`npm run import:magic` (or `npm run build`) and review the generated change to
`src/content/photography/<slug>.md` and `public/images/galleries/<slug>/`.
The folder name is slugified for both destinations. `gallery.md` needs
`guidedContext`, `featuredRank`, and `categoryRank` in non-interactive runs;
the importer prompts for missing fields in an interactive terminal. It accepts
optional metadata such as `title`, `photographyType`, `publishStatus`,
`hidden`, `coverImageIndex`, `client`, and `googlePhotosUrl`.

The importer generates 480px thumbnails and 2800px large images, names them by
their natural-sort source order, and records source size, modification time,
dimensions, and output names in the manifest. Matching unchanged sources are
reused. `coverImageIndex` is 1-based and selects a cover; otherwise the first
image is used.

Treat gallery output as generated: do not manually rename/delete individual
derivatives or manifests. Removing or renaming source photos can remove stale
generated files on the next import; review that diff carefully.

### AI-generated portfolio copy

Both commands load `.env`, call the OpenAI Responses API only when
`OPENAI_API_KEY` is set, and otherwise exit successfully without changes. They
use `OPENAI_MODEL` (default `gpt-5.6-luna`) and
`OPENAI_REASONING_EFFORT` (default `none`); never commit these values or the key.

`npm run social-copy` scans photography and social-content Markdown/MDX files.
It skips `autoSummary: false` and drafts; social case studies run only when
`autoSummary: true` (embed entries run by default). It does not separately skip
archived entries. It generates a title only when there is no non-placeholder
human `title`; a human title is never replaced. It uses `guidedContext` as the
primary source, with relevant frontmatter (client, type/platform, services/tags,
captions, metrics, and existing text) as context.
For photography it writes 2–3 sentences (30–55 words) to frontmatter `summary`.
For social embed entries it writes the same style of portfolio copy between
`{/* ai-summary:start */}` and `{/* ai-summary:end */}` in the MDX body.
It retries rejected/too-short/too-verbatim output up to three times and avoids
unsupported facts. Without `--regenerate`, it fills missing summaries only;
with it, it refreshes generated summaries and generated titles (but not human
titles).

`npm run card-summaries` scans only photography entries. It skips
`autoSummary: false`, drafts, and archived entries, then writes `cardSummary`
to frontmatter. It uses the gallery title and context to create one distinct
6–15-word line for gallery cards. It validates length, rejects markup/URLs/
emoji, generic phrasing, and excessive title repetition, and retries up to
three times. Without `--regenerate`, existing card summaries are retained;
with it, eligible ones are replaced.

## Validation and delivery

- Run `npm run validate` for all changes; run `npm run build` when modifying
  content, gallery inputs/assets, build scripts, or site configuration.
- For visual/page changes, check the affected route with `npm run dev` or
  `npm run preview`.
- GitHub Actions runs `npm ci`, validation, and build, then deploys `dist/` when
  changes are pushed to `main`.
- Never commit `.env`, `inbox/`, `node_modules/`, `.astro/`, `dist/`, or cache
  directories. Do not expose API keys in content, scripts, logs, or commits.
- Keep changes narrowly scoped. Preserve unrelated user changes and avoid
  opportunistic refactors, formatting sweeps, or schema changes.

## Completion checklist

- [ ] Changed files are scoped to the request.
- [ ] Content matches its collection schema and referenced assets exist.
- [ ] No secrets or ignored/generated local-only files are included.
- [ ] Required validation/build command passes.
- [ ] The affected page or gallery was checked when relevant.
