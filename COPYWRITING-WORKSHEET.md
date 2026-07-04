# Site copy worksheet

All the template/site-chrome text pulled from the codebase, organized by page. This does **not** include:
- Individual photography gallery content (titles, descriptions, service lists — these live in `src/content/photography/*.md` and are authored per gallery)
- Individual social media posts and the featured case study body (`src/content/content-work/*.mdx`)
- Individual data project write-ups (`src/content/data-projects/*.mdx`) — same reasoning, these are per-item portfolio content rather than site copy

Everything below is copy that appears as fixed UI chrome regardless of which content items exist — headings, subheads, button labels, empty-state messages, and meta descriptions. Fill in the "New copy" column (or edit in place) and we'll apply it back to the source files together.

Each entry lists its source file so it's traceable when we implement the changes. Leave "New copy" blank to keep the current text as-is.

---

## Global / site-wide

**File:** `src/lib/site.ts`

| Element | Current copy | New copy |
|---|---|---|
| Site title (default meta title, used on home page) | `Photographer + Data Analyst Portfolio` | |
| Site description (default meta description, used on home page) | `A portfolio for corporate event photography, social content, and data analytics work.` | |
| Nav label | `Photography` | |
| Nav label | `Social media` | |
| Nav label | `Data` | |
| Nav label | `Contact` | |

**File:** `src/components/Footer.astro`

| Element | Current copy | New copy |
|---|---|---|
| Brand tagline | `Corporate event photographer, content creator, data analyst, and curious builder.` | |
| Sitemap column label | `Sitemap` | |
| Contact column label | `Work together` | |
| WhatsApp link text | `Message on WhatsApp` | |
| Location line | `Singapore` | |
| Copyright line format | `© {year} Keith Tan` | |

**File:** `src/components/ContactSection.astro` (embedded on Home and /content/)

| Element | Current copy | New copy |
|---|---|---|
| Eyebrow | `Contact` | |
| Heading | `For shoots, collaborations, or analytics work.` | |
| Body | `Reach me directly through WhatsApp. The dedicated contact page keeps this link accessible without cluttering the photography and data pages.` | |
| Button | `Message on WhatsApp` | |

---

## Home page

**File:** `src/pages/index.astro`

### Hero
| Element | Current copy | New copy |
|---|---|---|
| H1 | `Hi, I'm Keith.` | |
| Identity bullet | `Event photographer` | |
| Identity bullet | `Data analyst` | |
| Identity bullet | `Curious Builder` | |
| Lede paragraph | `I document business moments with a clean visual eye, then bring the same curiosity to dashboards, analytics, and practical technical systems.` | |
| Button | `Find out more` | |
| Button | `Enquire for packages` | |

### Corporate event work section
| Element | Current copy | New copy |
|---|---|---|
| Eyebrow | `Corporate event work` | |
| Heading | `Recent coverage, built for business contexts.` | |
| Body | `Conferences, panels, networking sessions, and branded events presented with clean spacing and a restrained visual system.` | |
| Button (heading) | `Explore photography` | |
| Button (below gallery grid) | `View all galleries` | |

### Social media reels section
**File:** `src/components/HomeSocialHighlights.astro`
| Element | Current copy | New copy |
|---|---|---|
| Eyebrow | `Social media reels` | |
| Heading | `Short-form content.` | |
| Body | `Instagram and TikTok-ready reels for influencers, high-net-worth individuals, and companies that need polished stories with clear commercial use.` | |
| Button (heading) | `Explore social media content` | |
| Card link text | `View more` | |

### Data work section
| Element | Current copy | New copy |
|---|---|---|
| Eyebrow | `Data work` | |
| Heading | `Analytics projects with business context.` | |
| Body | `A separate technical track for dashboards, automation, modelling, and practical data analysis.` | |
| Button | `Explore data work` | |

---

## Photography page

**File:** `src/pages/photography/index.astro`

| Element | Current copy | New copy |
|---|---|---|
| Meta title | `Photography` | |
| Meta description | `Corporate event photography portfolio with scalable gallery listings.` | |
| Eyebrow | `Photography showcase` | |
| H1 | `Corporate events presented with restraint.` | |
| Body | `Clean off-white space, consistent sans-serif typography, and galleries that preserve the natural shape of each image.` | |
| Category tab | `All` | |
| Category tab | `Corporate & private events` | |
| Category tab | `Stage work` | |
| Category tab | `Photoshoot` | |
| Category tab | `Wedding & ROM` | |
| Empty-state message (per category) | `No published galleries in this section yet.` | |
| CTA heading | `Need corporate event coverage?` | |
| CTA body | `Reach out for conferences, panels, networking events, or content packages.` | |
| CTA button | `Contact me` | |

### Gallery detail page chrome (applies to every gallery, not the per-gallery content itself)
**File:** `src/pages/photography/gallery/[slug].astro`

| Element | Current copy | New copy |
|---|---|---|
| Meta description fallback (used only if a gallery has no summary/description) | `Photography gallery.` | |
| Body fallback (used only if a gallery has no description/summary) | `A curated public set from this photography project.` | |
| Empty-state message | `No images found for this gallery yet.` | |
| Section heading (shown if the gallery lists services) | `Services Delivered` | |
| Link text (shown if a `googlePhotosUrl` is set) | `View full client gallery` | |
| Related section eyebrow | `Related work` | |
| Related section heading | `More event coverage` | |

---

## Social media page

**File:** `src/pages/content/index.astro`

| Element | Current copy | New copy |
|---|---|---|
| Meta title | `Social media` | |
| Meta description | `Social media content and event storytelling portfolio.` | |
| Eyebrow | `Social media showcase` | |
| H1 | `Social media with event instincts.` | |
| Body | `Short-form videos, post-ready coverage, and people-led stories for events, brands, and communities.` | |

**File:** `src/components/ContentEmbedGrid.astro`

| Element | Current copy | New copy |
|---|---|---|
| Category tab | `All` | |
| Category tab | `Corporate` | |
| Category tab | `Lifestyle` | |
| Category tab | `Real estate` | |
| Empty-state message (dev-facing, shows only if zero content items exist at all) | `Add content examples in src/content/content-work/.` | |

### Featured case study wrapper (currently disabled via the `caseStudy` toggle; only the surrounding chrome is site copy — the case study's own title/summary/body is per-item content)
**File:** `src/components/FeaturedCaseStudy.astro`

| Element | Current copy | New copy |
|---|---|---|
| Eyebrow | `Featured case study` | |
| Body fallback (used only if the case study has no summary) | `A closer look at a content project with context, deliverables, and process.` | |
| Button | `View original post` | |

---

## Data page

**File:** `src/pages/data/index.astro`

| Element | Current copy | New copy |
|---|---|---|
| Meta title | `Data` | |
| Meta description | `Data analyst project showcase with scalable project listings.` | |
| Eyebrow | `Data analyst showcase` | |
| H1 | `Analytics projects with business context.` | |
| Body | `A separate space for technical case studies, dashboards, methodology, and measurable outcomes.` | |
| Section eyebrow | `All published projects` | |
| Section heading | `Technical proof of work.` | |
| Section body | `Add more projects through Markdown or MDX files; this page keeps expanding automatically.` | |
| CTA heading | `Interested in the technical side?` | |
| CTA body | `Contact me for analytics, automation, or portfolio-related collaborations.` | |
| CTA button | `Contact me` | |

### Data project card / detail chrome (not the per-project write-ups themselves)
**Files:** `src/components/DataFeatureCard.astro`, `src/components/ProjectGrid.astro`, `src/pages/data/project/[slug].astro`

| Element | Current copy | New copy |
|---|---|---|
| Featured card eyebrow | `Featured project` | |
| Summary fallback (used only if a project has no summary) | `A practical analytics project with business context.` | |
| Project card eyebrow fallback (used only if a project lists no tools) | `Data project` | |
| Project overview eyebrow (detail page) | `Project overview` | |
| Button (detail page, shown if `githubUrl` set) | `GitHub` | |
| Button (detail page, shown if `demoUrl` set) | `Live demo` | |

---

## Contact page

**File:** `src/pages/contact.astro`

| Element | Current copy | New copy |
|---|---|---|
| Meta title | `Contact` | |
| Meta description | `Contact Keith for photography, content, data analytics, and collaboration enquiries.` | |
| Eyebrow | `Contact` | |
| H1 | `Let's keep it direct.` | |
| Body | `For corporate event coverage, content work, analytics projects, or collaborations, reach me through WhatsApp.` | |
| Card label | `WhatsApp` | |
| Card heading | `Message on WhatsApp` | |
| Card body | `Best for project enquiries, briefs, and event availability. I usually reply within the day.` | |
| Card button | `Open WhatsApp` | |

---

## Photography category display names (used in tabs, gallery meta labels, etc.)

**File:** `src/lib/content.ts`

| Category key | Current label | New label |
|---|---|---|
| `corporate-private-events` | `Corporate & private events` | |
| `stage-work` | `Stage work` | |
| `photoshoot` | `Photoshoot` | |
| `wedding-rom` | `Wedding & ROM` | |
| (fallback for unknown type) | `Photography` | |

### Gallery card fallback text
**File:** `src/components/WorkCard.astro`

| Element | Current copy | New copy |
|---|---|---|
| Summary fallback (used only if a gallery has no summary/description) | `Curated photography coverage.` | |
