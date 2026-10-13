# Visual/CSS fixes

Update: hero layout/alignment and carousel styling have been restored to the original Git version. WhatsApp uses its original fixed bottom-right pill at all breakpoints; the in-flow and compact-icon changes below were reverted. All site button/link labels formerly reading “Check availability” now read “Contact me”. No subagents were used.

Implemented locally on 13 October 2026. Wording, prices, project descriptions, gallery/reel metadata, URLs and native embed markup were preserved by this work.

| Problem | Fix |
| --- | --- |
| Centered section headings and buttons paired with left-aligned introductory text | Centered short introduction and enquiry groups consistently. Long project descriptions, testimonial text and table values remain left-aligned. |
| Mobile/tablet home introduction alternates between left and center | Centered the identity list and supporting introduction within the existing stacked hero layout. Desktop hero composition remains intact. |
| Social pricing introduction sits against a different column | Centered the introduction within its bounded reading column. |
| Excessive compounded section padding | Introduced shared responsive section spacing, replacing independent 96–156px padding values on informational/enquiry sections. Gallery bottom spacing uses the same scale. |
| Divider lines have excessive surrounding space or repeat within one transition | Standardized section-rule spacing; removed the redundant testimonial CTA rule, booking-process outer rule and video planning-note rule. Kept useful pricing, service-card, step and testimonial separators. Original background texture remains. |
| Gallery body headings compete with page titles | Set body h2 to 28–40px and aligned headings with their long-form text column. Gallery titles remain unchanged. |
| Social prices and delivery conditions form dense paragraphs | Added visual breaks between existing offer types and normal/expedited delivery text. No words or amounts changed. |
| Currency note floats above the pricing section | Moved the existing “Prices in SGD.” into the pricing section, immediately before the rates. |
| Social category filters clip the final category on mobile | Allowed centered wrapping, consistent with Photography filters. Filter targets are at least 44px high. |
| Alternating social cards retain desktop positioning when stacked | Reset their alignment and order at the stacked breakpoint. Social cards stack at 960px and below, avoiding cramped tablet columns. |
| Native Instagram embed can exceed its tablet column | Constrained the surrounding grid’s minimum width so native embeds can fit their allocated column. Provider markup, scripts and media remain unchanged. |
| Three Contact explore cards leave a lone tablet card | Use one centered column below 1024px; retain three columns on desktop. |
| Testimonial names sit at different heights | Align author blocks from the top of a consistent desktop-height area; release the reserved height when stacked. |
| Negative and viewport-height paragraph margins create irregular spacing | Removed the hero paragraph negative margin and testimonial CTA viewport-height margins. |
| Floating enquiry control covers content | Use the existing action in document flow through 1340px. At 1341–1660px, show a compact WhatsApp icon inside the side gutter, retaining its accessible label. On wider screens retain the full original floating pill where the gutter accommodates it. Contact’s existing suppression remains. |
| Anchor destinations sit under sticky navigation | Added a consistent 100px scroll offset for section and heading destinations. |
| Small mobile navigation, lightbox and carousel controls | Navigation and lightbox controls have 44px targets. Carousel dots retain their small visual markers inside separate 24 × 32px targets; existing 56px carousel arrows remain. |

## Verification

- Validation: 44 files, zero errors, warnings or hints; content validation passed.
- Production Astro build: 31 pages built successfully. Gallery importing and AI copy generation were intentionally not run, to preserve wording and generated content during this CSS task.
- Visually reviewed all five main pages at 390px, 768px and 1440px; gallery introductions across all four photography categories at those widths.
- Checked main-page text bounds at 320, 620, 810, 811, 1024, 1340, 1341 and 1920px. Investigated and fixed the loaded embed overflow at 811px, then checked loaded social layouts around 960px and the enquiry-control boundaries through 1920px.
- Verified mobile navigation, Photography category switching, enquiry-dialog opening/closing and gallery lightbox opening. No form was submitted.
- Compared rendered wording, links and media references across all 31 pages against the pre-task build. A separate Contact budget-option edit appeared during this task and was preserved; that select alone is excluded from the text comparison. All other comparisons passed.
- Gallery/reel content files and the native embed, gallery, lightbox, navigation and event-player component source remain unchanged.

The original colors, font family, hero/media compositions, gallery arrangements, card styling and native social players remain. Copy concerns from the audit, including repeated enquiry wording, have not been changed or hidden as a substitute for copy editing.

Evidence and comparison results are in `todo/css-fixes/`. External embeds can load after an initial screenshot; their loading state is not a CSS regression. Screenshots from the development server can include its toolbar; final targeted screenshots use the production preview.
