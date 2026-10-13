# CSS, alignment and copy presentation review

Reviewed 13 October 2026 against the local preview at http://127.0.0.1:4322/.

## Scope and conclusion

Visually checked Home, Photography, Event video, Social media and Contact at desktop (1440 × 1000) and mobile (390 × 844), including their lower pricing, enquiry and footer sections. Checked the introduction of all 20 galleries visible in the photography listing, with additional mobile checks across the four photography categories and a gallery closing section. Also checked Contact at 768 × 1024. Hidden galleries and disabled data routes were outside this review.

The inconsistency is real. Several short sections center the heading and button while explicitly left-aligning their supporting paragraph. Separate component spacing rules accumulate into oversized gaps. Divider lines mark too many different levels without a consistent hierarchy. These can be addressed with targeted formatting changes while retaining the restored layouts and native social embeds.

No website source was changed during this audit. No subagents were used. Screenshots and measured text styles are saved in `todo/css-alignment-audit/`.

## Findings and intended corrections

| Priority | Finding | Evidence / location | Intended correction |
| --- | --- | --- | --- |
| High | Short centered sections switch to left-aligned supporting text. | Home photography/social introductions; Home and Social closing contact section; gallery booking prompts. `styles.css:723`, `ContactSection.astro:19`, `BookingPrompt.astro:49`. The video booking prompt has a separate center override. | Give short heading–intro–button groups one alignment. Keep long descriptions, tables, testimonial text and card interiors left-aligned where that serves reading. Do not center all text indiscriminately. |
| High | Social pricing intro is positioned against a different column from its heading and rates. | `WhatToExpectSection.astro:40`: intro has `max-width:680px` but `margin:20px 0 24px`. At desktop the intro starts at x=130 while the centered 820px rates table starts at x=310. | Put the introduction within the same centered content column as the rest of this section; choose text alignment consistently with its heading. |
| High | Large section gaps compound. | `styles.css:671`, `:1133`, `:1651`; `BookingProcess.astro:43`; `BookingPrompt.astro:34`. At the tested desktop width, pricing bottom padding plus contact top padding totals 252px. Booking-process bottom plus booking-prompt top totals 188px, before accounting for internal content margins. | Define a small shared spacing scale and give each section boundary a deliberate total gap. Preserve generous space around media; tighten repeated informational and enquiry sections. |
| High | Floating WhatsApp covers text on mobile. | Seen over video supporting text, gallery description/assignment text, and social pricing content. | Adjust its mobile size/position or reserve clearance. Verify against actual content at narrow widths. Keep the enquiry action accessible. |
| Medium | Divider lines compete with each other. | Video has role/service/note/process/step separators; Photography has testimonial/CTA/pricing/process/related-work separators. `styles.css:1550`, `:1629`, `:1673`. Widths vary between full section, reading column and individual card. | Use section dividers only for major transitions, with consistent width and surrounding space. Retain useful pricing-row and testimonial separators. Remove redundant section rules selectively. |
| Medium | Secondary gallery headings can exceed the page title. | The HR/Worktech gallery’s “About this assignment” renders at 60px versus its gallery title at approximately 52px on desktop. `styles.css:1243`, `:1953`, global h2 sizing at `:93`. | Give gallery body headings their own smaller type scale. Preserve existing gallery titles and descriptions. |
| Medium | Pricing copy becomes a dense block, especially on mobile. | Social pricing puts single pieces, campaign packages and ongoing partnerships into one value cell. Delivery text combines normal timing, expedited timing and discussion conditions. | Separate offer types visually and distinguish primary delivery times from secondary conditions. Preserve prices and the approved 3-business-day / 3–5-business-day facts. |
| Medium | Repeated enquiry blocks weaken the page ending. | Event video has a booking-process action, an immediately following booking prompt, and a footer action with the same label and destination. | Make one closing enquiry action primary and avoid two adjacent sections asking for the same action. This should be a narrowly reviewed change, not a page redesign. |
| Lower | Filter behavior differs on mobile. | Photography filters wrap into centered rows; Social filters scroll horizontally with the last category partly clipped. | Select a consistent filter treatment, or make the scrolling affordance clearer. Preserve category functionality and order. |
| Lower | Contact’s tablet grid leaves a lone card. | At 768px the three explore cards use two columns, leaving Social media alone on a second row. | Choose a deliberate three-card breakpoint treatment rather than an incidental 2+1 layout. |
| Lower | Small labels and spacing exceptions feel detached. | “Prices in SGD.” sits separately above the Photography pricing section. Paragraph spacing includes a negative margin in `styles.css:294` and viewport-height margins in `:1643`. | Associate currency with actual rates. Replace isolated spacing patches with explicit component gaps, verified at desktop and mobile sizes. |

## Copy and action labels

“Check availability” should be replaced. It leads to the Contact page, where someone starts a conversation; it does not open an availability checker. It also appears too often, making otherwise different sections sound repetitive.

Recommended use of existing portfolio wording:

- **Discuss your project** for the main service enquiry action.
- **Contact me** for general contact navigation and footer links.
- Keep direct actions specific: **Open WhatsApp**, **Send an email**, **View full gallery**, and the relevant browse/explore labels.

This is a label recommendation, not newly implemented website copy. Final copy edits should continue through GPT-6.1 Sol Medium, as requested.

Other copy issues to address in that pass:

- “Got an event worth capturing well?” remains on Photography. The “worth” framing is awkward and unnecessarily judgmental.
- “Let’s create something worth remembering” is generic promotional language rather than useful enquiry guidance.
- “More event coverage” appears on portrait/cosplay galleries too. The shared heading should describe photography generally.
- The event-video contribution paragraph repeats its production responsibility in its closing sentence. Its substance is useful, but the repetition can be trimmed.
- Contact still says “For an availability check or an initial conversation.” Review this alongside the action labels so the surrounding copy stays coherent.

The approved facts, existing metrics, gallery descriptions and social-reel descriptions should remain intact. Better presentation does not require rewriting those entries.

## What is already coherent

Main service-page hero alignment is consistent. Contact cards use a clear left-aligned internal structure and aligned actions. Long video descriptions align naturally with their media columns. Gallery introductions are consistent across the 20 visible entries; natural wrapping in longer titles is not itself a defect. Left-aligned testimonials and footer columns are appropriate for their content.

Native Instagram/TikTok embeds should remain native. Their internal interface and external loading behavior are separate from the site’s text alignment; they should not be replaced to solve this audit’s findings.

## Recommended order and acceptance criteria

1. Correct paragraph alignment and the social-pricing column; establish shared spacing rules.
2. Resolve mobile overlap and gallery heading hierarchy.
3. Reduce redundant dividers and adjacent enquiry prompts, preserving the restored overall design.
4. Apply the approved action-label/copy pass and improve pricing readability.
5. Repeat visual checks at 390px, 768px and 1440px, then run validation and build for implementation changes.

Accept when short section groups share an alignment, related content shares a column, section gaps follow a predictable rhythm, no floating control covers text, gallery body headings remain subordinate to titles, dividers communicate a clear purpose, and each enquiry label accurately describes its destination. Compare affected routes against the restored design before accepting any implementation.

## Evidence

- `todo/css-alignment-audit/home-desktop-full.png`
- `todo/css-alignment-audit/social-pricing.png`
- `todo/css-alignment-audit/photography-pricing.png`
- `todo/css-alignment-audit/video-mobile.png`
- `todo/css-alignment-audit/social-ending-mobile.png`
- `todo/css-alignment-audit/gallery-closing.png`
- `todo/css-alignment-audit/contact-tablet.png`
- `todo/css-alignment-audit/measurements.json`

Full-page captures can include sticky-header capture artifacts. Findings above use targeted visual checks and computed CSS rather than treating those artifacts as actual layout defects.
