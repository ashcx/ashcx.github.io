# Portfolio Site

A static website for photography and data analyst work. No database, no backend — just files in this folder. Add a file, run one command, and the site rebuilds itself.

Built with [Astro](https://astro.build) and hosted on GitHub Pages — both free forever, with no vendor lock-in. Everything lives in plain files you own, so you're never stuck paying a platform or migrating off one.

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
3. Run:
   ```bash
   npm run build
   ```
4. The first time you build a new gallery, it'll ask you a few questions in the terminal — a title, some context about the event, and where it should rank. Answer them and it writes the rest for you.
5. Commit and push. Done — the gallery is live.

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
