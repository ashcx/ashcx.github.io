# Site copy worksheet

All the template/site-chrome text pulled from the codebase, organized by page. This does **not** include:
- Individual photography gallery content (titles, descriptions, service lists — these live in `src/content/photography/*.md` and are authored per gallery)
- Individual social media posts and the featured case study body (`src/content/content-work/*.mdx`)
- Individual data project write-ups (`src/content/data-projects/*.mdx`) — data is dropped from this site entirely (see note below), so these are no longer relevant

Everything below is copy that appears as fixed UI chrome regardless of which content items exist — headings, subheads, button labels, empty-state messages, and meta descriptions.

**Direction locked in:** no data-analyst framing anywhere on the site. Photography = corporate + private events (conferences, workshops, networking, and personal milestones like graduations/recitals). Social media = corporate brands *and* small business owners/sole proprietors (not influencers, even though some client work exists there). Voice = warmer, persuasive, second-person — written to make a solo business owner feel as welcome to reach out as a corporate exec, not just descriptive/clinical.

**Note on the Data section:** `sections.data` is already `false` in `src/lib/site.ts`, so `/data/` is soft-hidden from nav, footer, home, and sitemap already. New copy below reflects a fully data-free site (title, description, footer tagline, hero identity, and the home page's entire "Data work" section are rewritten/removed). We are not filling in new copy for the Data page itself or its card/detail chrome — it stays hidden, and its rows are marked N/A below. Let me know if you want the `/data/` route and its content files deleted outright rather than just hidden.

---

## Global / site-wide

**File:** `src/lib/site.ts`

| Element | Current copy | New copy |
|---|---|---|
| Site title (default meta title, used on home page) | `Photographer + Data Analyst Portfolio` | `Event Photography & Social Content \| Ash Chong` |
| Site description (default meta description, used on home page) | `A portfolio for corporate event photography, social content, and data analytics work.` | `Corporate event photography and social media content for businesses and brands in Singapore, from large conferences to small studio launches.` |
| Nav label | `Photography` | *(keep)* |
| Nav label | `Social media` | *(keep)* |
| Nav label | `Data` | N/A — section hidden, row no longer applies |
| Nav label | `Contact` | *(keep)* |

**File:** `src/components/Footer.astro`

| Element | Current copy | New copy |
|---|---|---|
| Brand tagline | `Corporate event photographer, content creator, data analyst, and curious builder.` | `Photography and content that help businesses tell stories, build trust, and grow their brand.` |
| Sitemap column label | `Sitemap` | *(keep)* |
| Contact column label | `Work together` | `Let's work together` |
| WhatsApp link text | `Message on WhatsApp` | `Chat on WhatsApp` |
| Location line | `Singapore` | *(keep)* |
| Copyright line format | `© {year} Keith Tan` | `© {year} Ash Chong` |

**File:** `src/components/ContactSection.astro` (embedded on Home and /content/)

| Element | Current copy | New copy |
|---|---|---|
| Eyebrow | `Contact` | `Get in touch` |
| Heading | `For shoots, collaborations, or analytics work.` | `Got an event coming up? Let's talk.` |
| Body | `Reach me directly through WhatsApp. The dedicated contact page keeps this link accessible without cluttering the photography and data pages.` | `Whether it's a full-day conference or a single product shoot, drop me a message on WhatsApp. No brief too small, no ask too big.` |
| Button | `Message on WhatsApp` | `Chat on WhatsApp` |

---

## Home page

**File:** `src/pages/index.astro`

### Hero
| Element | Current copy | New copy |
|---|---|---|
| H1 | `Hi, I'm Keith.` | `Hi, I'm Ash.` |
| Identity bullet | `Event photographer` | *(keep)* |
| Identity bullet | `Data analyst` | `Social content creator` |
| Identity bullet | `Curious Builder` | `Creative strategist` |
| Lede paragraph | `I document business moments with a clean visual eye, then bring the same curiosity to dashboards, analytics, and practical technical systems.` | `I cover your event so it looks as good as it felt, with clean, professional photography and social-ready content, whether you're running a conference for hundreds or hosting a small but meaningful gathering.` |
| Button | `Find out more` | *(keep)* |
| Button | `Enquire for packages` | `Ask about packages` |

### Corporate event work section
| Element | Current copy | New copy |
|---|---|---|
| Eyebrow | `Corporate event work` | `Event coverage` |
| Heading | `Recent coverage, built for business contexts.` | `Built for more than event day.` |
| Body | `Conferences, panels, networking sessions, and branded events presented with clean spacing and a restrained visual system.` | `Professional event coverage that supports marketing, communications, stakeholder engagement, and future promotions.` |
| Button (heading) | `Explore photography` | *(keep)* |
| Button (below gallery grid) | `View all galleries` | *(keep)* |

### Social media reels section
**File:** `src/components/HomeSocialHighlights.astro`
| Element | Current copy | New copy |
|---|---|---|
| Eyebrow | `Social media reels` | *(keep)* |
| Heading | `Short-form content.` | `Content that works as hard as you do.` |
| Body | `Instagram and TikTok-ready reels for influencers, high-net-worth individuals, and companies that need polished stories with clear commercial use.` | `Instagram and TikTok-ready reels that help businesses, entrepreneurs, and brands attract attention, build trust, and convert viewers into customers.` |
| Button (heading) | `Explore social media content` | *(keep)* |
| Card link text | `View more` | *(keep)* |

### Data work section
**Decision: remove this entire section from the home page** (eyebrow, heading, body, and button all deleted along with the block in `src/pages/index.astro`) since the site no longer targets data work.

| Element | Current copy | New copy |
|---|---|---|
| Eyebrow | `Data work` | *(section removed)* |
| Heading | `Analytics projects with business context.` | *(section removed)* |
| Body | `A separate technical track for dashboards, automation, modelling, and practical data analysis.` | *(section removed)* |
| Button | `Explore data work` | *(section removed)* |

---

## Photography page

**File:** `src/pages/photography/index.astro`

| Element | Current copy | New copy |
|---|---|---|
| Meta title | `Photography` | *(keep)* |
| Meta description | `Corporate event photography portfolio with scalable gallery listings.` | `Corporate and private event photography in Singapore, covering conferences, workshops, celebrations, and everything in between.` |
| Eyebrow | `Photography showcase` | `Photography` |
| H1 | `Corporate events presented with restraint.` | `Your event, captured the way it deserves.` |
| Body | `Clean off-white space, consistent sans-serif typography, and galleries that preserve the natural shape of each image.` | `From large conferences to intimate celebrations, I bring the same care and professional eye to every shoot.` |
| Category tab | `All` | *(keep)* |
| Category tab | `Corporate & private events` | *(keep)* |
| Category tab | `Stage work` | *(keep)* |
| Category tab | `Photoshoot` | *(keep)* |
| Category tab | `Wedding & ROM` | *(keep)* |
| Empty-state message (per category) | `No published galleries in this section yet.` | *(keep — functional/dev-facing)* |
| CTA heading | `Need corporate event coverage?` | `Got an event worth capturing well?` |
| CTA body | `Reach out for conferences, panels, networking events, or content packages.` | `Conferences, workshops, networking sessions, or a milestone that matters to you. I'd love to help you cover it.` |
| CTA button | `Contact me` | `Let's talk` |

### Gallery detail page chrome (applies to every gallery, not the per-gallery content itself)
**File:** `src/pages/photography/gallery/[slug].astro`

| Element | Current copy | New copy |
|---|---|---|
| Meta description fallback (used only if a gallery has no summary/description) | `Photography gallery.` | `A photography gallery from Ash Chong.` |
| Body fallback (used only if a gallery has no description/summary) | `A curated public set from this photography project.` | `A set of highlights from this event.` |
| Empty-state message | `No images found for this gallery yet.` | *(keep — functional)* |
| Section heading (shown if the gallery lists services) | `Services Delivered` | `What I delivered` |
| Link text (shown if a `googlePhotosUrl` is set) | `View full client gallery` | *(keep)* |
| Related section eyebrow | `Related work` | *(keep)* |
| Related section heading | `More event coverage` | *(keep)* |

---

## Social media page

**File:** `src/pages/content/index.astro`

| Element | Current copy | New copy |
|---|---|---|
| Meta title | `Social media` | *(keep)* |
| Meta description | `Social media content and event storytelling portfolio.` | `Instagram and TikTok-ready social media content for brands, small businesses, and the events that matter to them.` |
| Eyebrow | `Social media showcase` | `Social media` |
| H1 | `Social media with event instincts.` | `Content that tells your story the way it deserves.` |
| Body | `Short-form videos, post-ready coverage, and people-led stories for events, brands, and communities.` | `Content that helps businesses get noticed, build credibility, and turn attention into opportunities.` |

**File:** `src/components/ContentEmbedGrid.astro`

| Element | Current copy | New copy |
|---|---|---|
| Category tab | `All` | *(keep)* |
| Category tab | `Corporate` | *(keep)* |
| Category tab | `Lifestyle` | *(keep)* |
| Category tab | `Real estate` | *(keep)* |
| Empty-state message (dev-facing, shows only if zero content items exist at all) | `Add content examples in src/content/content-work/.` | *(keep — dev-facing, not user-visible copy)* |

### Featured case study wrapper (currently disabled via the `caseStudy` toggle; only the surrounding chrome is site copy — the case study's own title/summary/body is per-item content)
**File:** `src/components/FeaturedCaseStudy.astro`

| Element | Current copy | New copy |
|---|---|---|
| Eyebrow | `Featured case study` | *(keep — toggle currently off, revisit if/when enabled)* |
| Body fallback (used only if the case study has no summary) | `A closer look at a content project with context, deliverables, and process.` | *(keep — toggle currently off)* |
| Button | `View original post` | *(keep)* |

---

## Data page — N/A, site no longer targets data work

**Files:** `src/pages/data/index.astro`, `src/components/DataFeatureCard.astro`, `src/components/ProjectGrid.astro`, `src/pages/data/project/[slug].astro`

Not filling in new copy here. The route is already hidden from nav/footer/home/sitemap via `sections.data = false` in `src/lib/site.ts`, so none of this text is currently reachable by visitors. Flag if you'd like the route and its content files removed from the codebase entirely rather than left dormant.

---

## Contact page

**File:** `src/pages/contact.astro`

| Element | Current copy | New copy |
|---|---|---|
| Meta title | `Contact` | *(keep)* |
| Meta description | `Contact Keith for photography, content, data analytics, and collaboration enquiries.` | `Contact Ash for event photography, social media content, and collaboration enquiries.` |
| Eyebrow | `Contact` | *(keep)* |
| H1 | `Let's keep it direct.` | `Let's talk about your event.` |
| Body | `For corporate event coverage, content work, analytics projects, or collaborations, reach me through WhatsApp.` | `For event coverage, content work, or a collaboration you have in mind, WhatsApp is the fastest way to reach me.` |
| Card label | `WhatsApp` | *(keep)* |
| Card heading | `Message on WhatsApp` | `Chat on WhatsApp` |
| Card body | `Best for project enquiries, briefs, and event availability. I usually reply within the day.` | `Best for enquiries, briefs, or just checking availability. I typically reply within the day.` |
| Card button | `Open WhatsApp` | *(keep)* |

---

## Photography category display names (used in tabs, gallery meta labels, etc.)

**File:** `src/lib/content.ts`

| Category key | Current label | New label |
|---|---|---|
| `corporate-private-events` | `Corporate & private events` | *(keep — functional label)* |
| `stage-work` | `Stage work` | *(keep)* |
| `photoshoot` | `Photoshoot` | *(keep)* |
| `wedding-rom` | `Wedding & ROM` | *(keep)* |
| (fallback for unknown type) | `Photography` | *(keep)* |

### Gallery card fallback text
**File:** `src/components/WorkCard.astro`

| Element | Current copy | New copy |
|---|---|---|
| Summary fallback (used only if a gallery has no summary/description) | `Curated photography coverage.` | `A set of highlights from this shoot.` |
