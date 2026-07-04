# Portfolio Site

A static website for photography and data analyst work. No database, no backend — just files in this folder. Add a file, run one command, and the site rebuilds itself.

Built with [Astro](https://astro.build) and hosted on GitHub Pages — both free forever, with no vendor lock-in. Everything lives in plain files you own, so you're never stuck paying a platform or migrating off one.

## Highlights

1. **Zero-cost, fully open-source, hand-built architecture** — no templates, no page builders, no paid hosting or services. Built entirely on open-source packages (Astro, Sharp, gray-matter), custom-coded from scratch, and deployed free forever on GitHub Pages. The whole site costs $0 to run at any traffic level.

2. **AI-generated content pipeline** — gallery and social post titles/descriptions are generated automatically via the OpenAI API, analyzing sample images plus guided context with zero manual writing. Turns "dump photos in a folder" into publish-ready copy without a human touching a keyboard.

3. **Adaptive, self-scaling, multi-core image compression pipeline** — a single `npm run build` ingests as many galleries as you throw at it, generating thumb + full-size WebP variants per photo, with each image's quality adaptively stepped down until it hits a web-delivery byte budget — all parallelized across every CPU core. Verified handling 1,000+ photos in one run with zero manual intervention.

4. **Fully automated CI/CD via GitHub Actions** — every push to `main` triggers build, validation, and deployment with no manual steps: commit locally, and the live site updates itself.

5. **Scalable-by-design architecture (Astro + MDX)** — Astro pre-renders every page to static HTML at build time, so there's zero server-side JavaScript, no database, and no runtime bottleneck to scale in the first place — just files served off a CDN. Client-side JS is kept to the absolute minimum. Content lives as MDX/Markdown files, so adding galleries, posts, or projects doesn't touch infrastructure — it's just more static files for the CDN to serve. The architecture itself has no ceiling; it's built to grow with the content, not against it.

## Getting started

```bash
npm install
npm run dev
```

That opens the site locally so you can see changes as you make them.

When you're happy with changes, run:

```bash
npm run build
```

This rebuilds the whole site, including any new galleries or posts you've added (see below). Push to `main` on GitHub and the live site updates automatically.

---

## Adding a photography gallery

1. Make a new folder inside `inbox/galleries/`, named after the event (e.g. `inbox/galleries/company-retreat-2026/`).
2. Drop your photos into that folder (`.jpg`, `.jpeg`, `.png`, or `.webp`).
3. Duplicate an existing `gallery.md` from another folder in `inbox/galleries/` into your new folder, then fill in the details directly:
   ```yaml
   ---
   title: Company Retreat 2026
   photographyType: corporate-private-events
   publishStatus: published
   guidedContext: >-
     Client and event: what happened, who it was for, and why it mattered to
     them. What the gallery does for them: what these images let them do
     afterward (recap, resell, invite, etc). Keep the tone specific to this
     event, not generic.
   featuredRank: 10
   categoryRank: 10
   hidden: false
   googlePhotosUrl: https://photos.app.goo.gl/your-link-here
   ---
   ```
   `featuredRank`/`categoryRank` control ordering (lower number = appears first; leave at 10 for lowest priority). `googlePhotosUrl` is optional — add it if you want a "View full client gallery" button linking out to the full shoot.
4. Run:
   ```bash
   npm run build
   ```
5. Commit and push. Done — the gallery is live.

Filling in `gallery.md` by hand is the reliable path for scripted or AI-agent-driven imports, since it never blocks on a prompt. If you're doing this yourself at a terminal and don't want to write `gallery.md` up front, you can skip step 3 and just run `npm run build` — it'll notice the new folder has no `gallery.md` and ask you the same questions (title, context, rank) interactively, then write the file for you.

The build automatically creates thumbnails, compresses everything, and adds the gallery to the Photography page. You never touch image files directly after this.

**Want to edit a gallery's details later** (title, description, category)? Open `src/content/photography/[gallery-name].md` and edit the text at the top of the file, then rebuild.

## Adding a social media post

1. Go to `src/content/content-work/`.
2. Copy an existing `.mdx` file as a starting point and rename it.
3. Update the details at the top of the file:
   - `platform`: `instagram`, `tiktok`, or `linkedin`
   - `socialCategory`: `corporate`, `lifestyle`, or `real-estate`
   - `embedHtml`: paste the platform's embed code, **or** use `coverImage` + `externalUrl` for a simple screenshot-and-link card instead
   - `publishStatus`: `published` to make it live, `draft` to hide it for now
4. Save, then run `npm run build`.

## Adding a data project

Same idea — add a new `.mdx` file in `src/content/data-projects/`, based on an existing one. Fill in the title, summary, and write-up, then rebuild.

---

## Turning whole sections on or off

If you want to temporarily hide Photography, Social media, or Data from the entire site (navbar, footer, homepage — everywhere), open `src/lib/site.ts` and flip it to `false`:

```ts
export const sections = {
  photography: true,
  content: true,
  caseStudy: false,
  data: true
};
```

## AI-assisted descriptions (optional)

If you add an `OPENAI_API_KEY` to a `.env` file in this folder, the build will automatically write short descriptions for new galleries and posts. Skip this and it just won't generate them — nothing breaks.

## Deployment

Every push to `main` triggers a GitHub Actions build and deploy automatically. Nothing to do manually.
