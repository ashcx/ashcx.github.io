# Portfolio visual, UX, and copy action plan

Reviewed: 13 October 2026 (Singapore time)

## Scope update after copy review

The user's subsequent feedback overrides conflicting proposals below. Preserve existing photography-gallery and social-reel titles, descriptions, summaries, card summaries, bodies, and supplied metrics. Project rewrites, metric removal, new image-alt-text authoring, and metadata changes are excluded. Retain existing image alt attributes and accessibility controls. Static social-video previews remain an optional reliability proposal, not a confirmed asset-creation task.

Copy revision is limited to service/page/shared wording and the event-film contribution paragraph. Confirmed delivery: single video, 3 business days; event work, 3–5 business days; expedited delivery in 1 business day or the same day is available subject to discussion. All social work was filmed, edited, and produced by Ash; no per-project role clarification is required. Exact revised website wording is owned by GPT-6.1 Sol Medium in `website-copy-review.md`.

The remaining audit records the original findings and proposals; its conflicting project, SEO, image-description, and metric recommendations are not implementation instructions.

Baseline: GitHub `main` at `18feaa5`, pulled into the local checkout before review. This document proposes changes; it does not implement or publish them. The earlier `action_plan.md` remains intact as implementation history.

## Review scope and evidence

Inspected the live website in Chrome at its normal desktop viewport (approximately 1305 × 1118) and at 390 × 844. Reviewed Home, Photography, Event video, Social media, Contact, and the HR WorkTech gallery. Tested photography filtering, mobile navigation, opening a gallery image, advancing the lightbox, and Escape dismissal. Read the current templates, global styles, enquiry helpers, and copy-generation prompts to identify implementation locations.

Sources: [Home](https://ashcx.github.io/), [Photography](https://ashcx.github.io/photography/), [Event video](https://ashcx.github.io/videography/), [Social media](https://ashcx.github.io/content/), [Contact](https://ashcx.github.io/contact/), [HR WorkTech gallery](https://ashcx.github.io/photography/gallery/hr-worktech-summit-corporate-conference-highlights/).

The web text fetch initially returned older homepage content. Findings below use the current Chrome rendering and freshly pulled source. This is a sampled review, not an exhaustive accessibility audit or measured performance benchmark. Embed errors describe this browser session; they are not evidence that every visitor sees the same failure.

Local screenshots: `todo/ux-audit-evidence/mobile-home.png` and `todo/ux-audit-evidence/mobile-social-embed.png`.

## Overall direction

Keep the warm neutral palette, simple navigation, strong photographs, and personal voice. The Contact page already uses useful, straightforward language. The Event video introduction also states tangible services clearly.

The weaknesses are uneven editorial tone, excessive emphasis on large headings, and friction between viewing work and finding practical information. A visitor should quickly understand what Ash does, see relevant work, learn what was contributed, and find the next step. The current site sometimes substitutes a slogan or a description of the client's business for that information.

## Findings and fixes

| Priority | Finding and evidence | Proposed action | Completion check |
| --- | --- | --- | --- |
| P1 | At 390px, the floating WhatsApp control overlaps the homepage work button, photography filters, and social content. | Replace the large mobile pill with a compact contact control with a reserved safe area, or hide it near existing contact actions. Choose one consistent behavior. | No actionable content is obscured at 360, 390, or 430px, including zoomed text. |
| P1 | Social work initially appears as embed text or empty space; a TikTok iframe later showed a Chrome block error. | Use local poster images and explicit platform links as the dependable initial presentation. Load embeds on request. Keep the poster and link available independently of the iframe; do not depend on detecting errors inside a cross-origin iframe. | Every project remains recognizable and usable when third-party scripts fail or are blocked. |
| P1 | Several introductions and summaries make broad claims about growth, trust, or conversion without showing Ash's role or evidence for that outcome. | Rewrite the homepage sections, Social media introduction, footer, and weakest project summaries using the editorial rules below. | Each sentence gives service, subject, contribution, process, or supported result information. |
| P1 | HR WorkTech repeats almost the same commissioned-assignment description in its hero and body. The first mobile screen emphasizes a room photo, a four-line title, and repeated context before browsing photographs. | Keep one short introduction and one role line. Choose a speaker-focused cover if an appropriate image exists, using `coverImageIndex` through the importer. | The first images arrive sooner; the assignment scope is accurate and stated once. |
| P2 | The desktop homepage greeting dominates the layout. Roles, introduction, and image occupy separate columns with a large gap below the name. Mobile repeats Ash's name and pushes an enquiry action below the initial viewport. | Consolidate into a clear text block alongside the work image on desktop. On mobile, show a brief introduction and work/contact actions before the carousel. Retain a smaller greeting if desired. | A first-time visitor can identify services and Singapore without searching; important actions are unobstructed. |
| P2 | Photography and Social media introductions consume most of the first mobile screen. Long centered slogans wrap into four lines before the work begins. | Shorten headings and supporting text; reduce introductory vertical spacing. Add compact in-page links to work and service details. | A meaningful portion of the first project is visible in the initial mobile screen, without making text cramped. |
| P2 | Photography prices, turnaround, and booking details follow the full gallery listing and testimonials. | Put a small pricing/service summary near the top with an anchor to full details. Keep the portfolio central and retain all existing category ordering. | A visitor can find starting prices and delivery information without scrolling past every gallery. |
| P2 | Long card titles compete with images and wrap unevenly. Heavy, tight typography is used across multiple heading levels. | Shorten titles editorially; keep full event names in project detail where needed. Establish separate display, section, card, and body styles. Start card titles around 24–30px desktop and 22–26px mobile, with 1.15–1.25 line height. | Titles remain readable and untruncated, with consistent card padding and aligned summary starts. |
| P2 | The font stack contains several named fonts whose availability depends on the visitor's device. Global headings use tight line heights; h3 has fixed negative tracking. | Choose a deliberate system stack or one self-hosted family after comparison. Use normal to modest negative tracking for card headings; reserve extreme tracking for a small amount of display text. | Review actual rendering on macOS/iOS and Windows/Android; no collisions or awkward dense wrapping. |
| P2 | The mobile social filter row cuts off the Real estate label while photography filters wrap. | Adopt a consistent compact wrapping layout, or make horizontal scrolling unmistakable and bring the selected filter into view. Prefer wrapping for four short social labels. | All categories can be discovered without guessing a hidden gesture. |
| P2 | Homepage work and enquiry buttons share almost identical visual emphasis. Many labels lead to the same Contact destination. | Use one primary action and one lighter secondary link in each section. Standardize internal enquiry buttons to “Check availability”; use channel-specific labels only for actual WhatsApp/email links. | Button hierarchy communicates a clear next step; repeated full-width enquiry sections are reduced. |
| P2 | The fixed WhatsApp message omits event video, even on the Event video page. Service-specific messages already exist for some contact links. | Route the floating link through the existing service-aware helper. Add a neutral all-services message and a social-specific option if needed. | Photo, video, and social journeys open a relevant draft without submitting anything. |
| P2 | Lightbox opening and next-image navigation worked, and Escape closed it. After close, focus returned to the web area. Image buttons share the same gallery-title label. | Restore focus to the initiating thumbnail, contain keyboard focus while open, and give photo buttons numbered labels. Improve image descriptions where factual descriptions are available. | Keyboard users can open, navigate, close, and resume at the same image without traversing the page again. |
| P3 | The gallery has related work but no explicit return-to-galleries link near the top. Related work always says “More event coverage,” including non-event categories in the template. | Add a simple Photography / gallery breadcrumb and category-aware related-work heading. | Browsing outward from a project is obvious and wording fits portraits and weddings too. |
| P3 | The carousel advances automatically. Source already pauses on hover/focus and respects reduced motion, but there is no visible persistent pause control. | Prefer a static lead image or add a visible pause/play control. Review tall desktop crops for every slide. | Visitors can stop rotation on touch devices; faces and subjects survive the crop. |
| P3 | Testimonials repeat across Home, Photography, Social media, and Contact. The Photography page adds another enquiry prompt after the booking-process CTA. | Keep a full testimonial section on Home, use relevant excerpts on service pages, and simplify Contact after its two contact cards. Preserve authentic quotation wording. | Pages end decisively without repeating several equivalent invitations. |

## Copy principles

Write as a capable individual explaining the work to a prospective client: calm, specific, and approachable. Use first person for verified contributions. Use factual captions for gallery cards. Avoid turning every card into a miniature sales pitch.

1. Name the service or subject before discussing a benefit.
2. Describe what happened and what Ash did. A client's campaign message is context, not proof of Ash's contribution.
3. Remove vague approval words such as “premium,” “polished,” “credible,” “brand-safe,” and “scroll-stopping” when they add no concrete information.
4. Avoid promises about conversions, growth, or future bookings unless there is evidence connecting the work to that result.
5. State a metric once. Keep its source, observation date, and paid/organic context where known; never imply that views prove sales.
6. Keep card summaries to one short line where practical. Give project pages one useful paragraph rather than repeating the summary.
7. Make private celebrations feel welcome. “When the story's a good one” implies Ash judges whether a client's occasion is worthy.
8. Keep prices and confirmed turnaround facts intact. Any new statement about scope, revisions, rights, or deadlines needs confirmation from existing reliable records or Ash.
9. Preserve testimonial quotations. If an excerpt is used, retain its meaning and identify omissions appropriately.

## Suggested replacement copy

These are editorial directions for review, not deployed text. Role-specific wording must be checked against the actual assignment.

| Location | Current issue | Suggested wording |
| --- | --- | --- |
| Homepage introduction | Greeting is dominant; supporting paragraph repeats the name and takes a long route to the services. | **Photography, event video, and social content.** / “I'm Ash, a freelance photographer and videographer based in Singapore. I cover corporate events, private celebrations, and content shoots.” |
| Homepage photography | “Built for more than event day” and the stakeholder-engagement list sound like a marketing deck. | **Event photography.** / “Photographs of the speakers, guests, and moments that make up your event.” |
| Photography introduction | Generic quality promise and conditional welcome. | **Corporate events and private celebrations.** / “I photograph conferences, company gatherings, weddings, and private celebrations in Singapore. You'll also find portraits and creative shoots in the galleries below.” |
| Homepage social section | Hard-working-content slogan and implied customer-conversion promise. | **Reels for brands and businesses.** / “Short videos for Instagram and TikTok, from interviews and practical tips to property walkthroughs.” |
| Social media introduction | Repeats the same “way it deserves” construction as Photography. | **Social media content.** / “Selected reels for businesses, creators, and property agents.” |
| Event film description | Focuses on the summit's business ambitions rather than the finished work. | “A highlight film from Airwallex's Ecom North Singapore Summit, bringing together speaker moments, conversations, and activity across the event.” |
| Event film role | Long process paragraph. | “I planned the coverage, filmed the event, and edited the highlight film.” This is supported by the current role statement; retain additional details only when useful. |
| Visa gallery card | Abstract relationship-building language and speculative future use. | “Guests sharing dinner and conversation during a private Night Safari event.” Check this against the source brief before use. |
| Starrylight card | “Building portfolio proof” reads like internal strategy notes. | “Face painting and UV art at a New Year celebration.” |
| HR WorkTech introduction | Hero/body repeat the assignment almost verbatim. | “Photography commissioned for a speaker at the HR WorkTech Summit.” / Role: “Sole photographer for the speaker's assignment.” |
| Social project descriptions | Commentary such as “framed as” and “brand-safe” sounds detached and self-evaluative. | Use: subject + verified contribution + format. For example, “A short video introducing General Assembly's reskilling programmes.” Add “I filmed and edited…” only after confirming those duties. |
| Footer | Generic growth language and no clear video reference. | “Photography, event video, and social content in Singapore.” |
| Enquiry invitation | “Got an event worth capturing well?” unnecessarily qualifies the event's worth. | **Planning an event?** / “Send me your date, venue, and the coverage you need.” |

The Sentosa property's classification and other factual property claims should be verified against the client's brief before retaining them. A neutral working title such as “Sentosa Property Walkthrough” avoids adding an unverified classification during the rewrite.

## Implementation order

### Pass 1 — Reliable browsing and immediate clarity

Fix mobile contact overlap and social fallback presentation. Rewrite the most visible headings, introductions, footer, and enquiry labels. Remove HR WorkTech duplication. Correct the video enquiry message. These changes have the strongest direct effect on the current visit.

Primary files: `styles.css`, `src/pages/index.astro`, `src/pages/photography/index.astro`, `src/pages/content/index.astro`, `src/components/FloatingContactButton.astro`, `src/components/ContentEmbedGrid.astro`, `src/components/HomeSocialHighlights.astro`, `src/components/Footer.astro`, `src/lib/site.ts`, `src/lib/enquiries.ts`, relevant content files.

### Pass 2 — Layout and reading rhythm

Consolidate the homepage hero; establish the heading scale; shorten card titles; standardize intro spacing and filter behavior. Bring service-information access closer to the top. Simplify repeated testimonials and contact prompts. Keep the existing site character and content ordering.

Primary files: shared styles, homepage, service pages, `WorkCard.astro`, `WhatToExpectSection.astro`, `BookingProcess.astro`, `BookingPrompt.astro`, `TestimonialsSection.astro`.

### Pass 3 — Project depth and accessibility

Review every gallery and social project using a small editorial checklist: subject, contribution, relevant detail, supported result. Add gallery return navigation, meaningful image-button names, lightbox focus restoration, and carousel pause control or static presentation. Align the mobile menu's accessible label with its open/closed state; currently it remains “Open navigation menu” when expanded.

Primary files: gallery route, `JustifiedGallery.astro`, `Lightbox.astro`, `src/scripts/gallery.js`, `Nav.astro`, project content.

### Pass 4 — Prevent copy regression

The generation prompts already discourage hype, so simply adding “avoid sales language” again is insufficient. Revise examples that model vague praise; distinguish business context from supported outcomes; require clear actors and antecedents; stop repeating metrics in prose when badges already display them. Preserve human-written titles and explicitly protect approved summaries from regeneration using the existing workflow where appropriate. Review `description`, `summary`, and `cardSummary` together: the gallery hero currently prefers `description`, so editing only `summary` may not change visible text.

Primary files: `scripts/generate-social-copy.mjs`, `scripts/generate-card-summaries.mjs`, and local gallery briefs where they supply problematic wording. No API calls are needed to draft these changes. Do not regenerate all copy as part of a visual cleanup.

## Verification and boundaries

- Compare 360/390/430px mobile, 768px tablet, and 1280/1440px desktop, including the 810/811px and 1259/1260px hero transitions.
- Check 200% zoom, long titles, button wrapping, and keyboard focus visibility.
- Verify menus, every filter category, category deep links, gallery navigation, lightbox next/previous/Escape, and focus restoration.
- Test social presentation with scripts blocked and with successful loading. Reserve media space so late loading does not shift copy unexpectedly.
- Inspect WhatsApp and email destinations without sending messages. Confirm contextual draft content, including video.
- Verify prices, existing delivery commitments, and every new role/result claim. Resolve unclear social scope before promising account management or strategy services.
- Run `npm run validate`; run the required build for implementation changes involving content, importer/scripts, or configuration. Prevent optional AI generation during verification and inspect generated differences.
- Keep generated image changes within the importer. Preserve ranks, slugs, schemas, existing local files, and the earlier action plan.

No changes to prices, hosting, brand identity, or commercial commitments are required for this plan. Proposed typography values are starting points for visual comparison, not tested final specifications. No performance score, conversion improvement, or universal embed failure is claimed.
