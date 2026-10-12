# Website marketing implementation action plan

Date: 12 October 2026

Status: Planning only. Website implementation has not been authorised by this document.

Objective: Make Ash's photography and event-video services easier to understand and book, while retaining varied work and leaving Social media unchanged.

## 1. Decisions and scope

### Included

- Improve the existing homepage introduction without adding a portrait or biography section.
- Establish Event Video as a service at `/videography/`.
- Clarify Photography and Event Video scope using verified operating details.
- Retain WhatsApp and add a short enquiry form, subject to a working submission destination.
- Curate homepage photography examples without removing other portfolio categories.
- Improve the HR WorkTech photography presentation and Airwallex event-film presentation.
- Add contextual booking prompts to photography galleries and Event Video.
- Explain the booking process on Photography and Event Video only.
- Update navigation, footer links, sitemap, and metadata for affected routes.

### Excluded

- Renaming Social media, changing `/content/`, changing its offers, prices, copy, ordering, or management scope.
- Editing the homepage Social media section's contents or examples. Moving Event Video before it is permitted.
- Publishing an email address, purchasing a domain, changing email accounts, or migrating hosting.
- A personal photograph, About page, new homepage biography, homepage case-study block, or standalone video-project page.
- Price changes, removal of existing photography services, collection-schema changes, gallery derivative changes, or broad visual redesign.
- New capabilities such as livestreaming, drone coverage, multicamera recording, or guaranteed simultaneous solo photo/video coverage.
- Changing lightbox performance, image pipelines, carousel mechanics, content-generation scripts, or unrelated user work.

### Commercial direction

Lead with events and business assignments while remaining open to private celebrations and other photography work. The website is not committing Ash to an exclusive niche.

Navigation after implementation: **Photography · Event Video · Social media · Contact**.

Event highlight films belong under Event Video. Existing social content stays where it is. Describe event social clips as an optional, separately agreed output only after Ash confirms availability; do not duplicate or reorganise Social media projects.

## 2. Team, model, and editorial contract

### Primary assistant

The primary assistant owns the implementation plan, all new public-facing wording, factual verification, delegation, integration review, and final delivery report. All copy in section 6 was written by the primary assistant.

### Coding subagents

When implementation is explicitly requested, use **GPT-6 Luna with Extra high reasoning** for code writing. The available tool configuration is `model: "gpt-6-luna"`, `reasoning_effort: "xhigh"`, and `fork_turns: "none"`. Give each agent this plan, relevant repository instructions, its exact file allowlist, and its copy subset explicitly. Do not silently substitute another model or reasoning level if the requested configuration is unavailable; report the limitation.

Do not spawn coding subagents during the planning task. The later implementation phase may run at most three coding agents concurrently alongside the primary assistant.

### Non-negotiable copy ownership

- Coding agents implement supplied wording verbatim; they do not draft, paraphrase, polish, shorten, or expand public-facing text.
- This includes headings, body copy, navigation labels, CTAs, form labels, helper text, status messages, accessibility labels, metadata, and new image descriptions.
- Agents may write internal code comments and technical reports. They must return any missing public wording to the primary assistant.
- Existing copy outside approved replacements remains untouched.
- The primary assistant writes any factual amendments after evidence or Ash's answers arrive, then supplies a revised copy manifest.
- No model-generated copy from build scripts may enter the implementation diff.

### Ownership and parallelism

| Owner | Allowed implementation area | Dependencies |
| --- | --- | --- |
| Agent A — homepage | `src/pages/index.astro`, `src/components/ContactSection.astro` | Primary defines service configuration and copy first |
| Agent B — service presentation | New `src/pages/videography/index.astro`, Photography page, new process/booking components, gallery route, HR WorkTech Markdown body | Primary creates shared enquiry/configuration contract; Agent B owns shared presentation components |
| Agent C — enquiries | `src/pages/contact.astro`, new contact-form component and scoped client code | Submission destination decision and primary's configuration contract |
| Primary assistant | Shared `src/lib/site.ts`, layout active-page type, sitemap, shared stylesheet integration, copy review, final verification and Git delivery | Coordinates all three |

Agents must not edit another owner's files. Shared `styles.css` remains primary-owned; agents prefer component-scoped styles and report any required global adjustment. Agents submit changes for primary review; they do not independently commit, push, merge, or deploy.

## 3. Repository observations informing implementation

- Astro 5 static site deployed to GitHub Pages; there is no existing backend.
- `src/lib/site.ts` owns pricing, navigation, section visibility, and the current WhatsApp template.
- `src/layouts/BaseLayout.astro` has a fixed active-page type that must support the new video navigation entry.
- `src/pages/index.astro` currently renders the event film after Social media and ties it to `sections.content`. Give Event Video its own switch; do not change Social media's switch.
- Homepage photography uses ranking helpers. Preserve global/category ordering unless an explicit ranking change is needed; prefer homepage-only selection from published, non-hidden entries.
- The gallery route already renders the Markdown body. Use it for the HR WorkTech summary without changing the content schema.
- `src/components/EventFilmFeature.astro` already provides a poster and click-to-load YouTube player. Reuse it and preserve its loading behaviour.
- `src/components/WhatToExpectSection.astro` can display service details. Keep shared defaults compatible with `/content/`.
- `scripts/build.mjs` runs gallery import, social-copy generation, card-summary generation, validation, and Astro build. A standard build can modify content; inspect its diff and prevent AI calls as described below.
- At plan creation, `.gitignore` contains an existing user edit adding `todo/`. Preserve it and exclude it from plan/implementation commits.

## 4. Implementation sequence and acceptance criteria

### P1 — Homepage service clarity

Files: `src/pages/index.astro`, `src/components/ContactSection.astro`.

1. Apply copy H1–H4 and H7 in section 6.
2. Replace the existing greeting as the main heading; retain Ash's name in the supporting text.
3. Remove the existing identity list, including Digital strategist. Do not add a second biography.
4. Link Explore my work to the existing photography section and Check availability to Contact.
5. Keep the existing carousel and page design. Make only the spacing/type adjustments needed for the longer service heading.
6. Render the existing film feature between Photography and Social media, with its own Event Video section switch.
7. Add the Event Video service link after the film; preserve the LinkedIn link and player.

Acceptance: Services and Singapore are clear above the fold; video has a direct service link; no personal portrait; Social media internals unchanged; no horizontal overflow at 360px.

### P2 — Event Video service

Files: new `src/pages/videography/index.astro`; primary-owned site configuration, layout type, and sitemap.

Page order:

1. V1–V3 introduction.
2. Existing Airwallex film feature.
3. V4 project context; show verified contribution fields only when available.
4. V5 service-scope rows.
5. Shared process using P1–P5.
6. V6 enquiry prompt and links.

Add `sections.video`, one navigation item, footer support through existing shared navigation, and the sitemap route. Match existing trailing-slash conventions. Do not add a video collection or standalone case-study route.

Acceptance: Route resolves, Event Video is active in navigation, shared visibility switch behaves consistently, player loads on interaction, and the page describes a quote-led offer without invented prices or promises.

### P3 — Photography scope

Files: `src/pages/photography/index.astro`, existing service rows.

Keep current $600/$1,400 starting prices and five-business-day turnaround. Replace ambiguous coverage details only after Ash confirms the facts in section 5. Reuse the pricing configuration; never duplicate amounts as independent sources of truth. Retain current wording for unresolved facts rather than guessing or publishing placeholders.

Required final details: exact entry/full-day hours, whether image quantity varies, additional-hours handling, and expedited availability if offered. Add process P1–P5 here only; do not change Social media's service rows or process.

Acceptance: Every new operating promise is traceable to an existing verified commitment or Ash's answer; price values unchanged. Unresolved clarification tasks are explicitly reported as outstanding.

### P4 — Enquiries

Files: `src/pages/contact.astro`, new form component, scoped client code; primary-owned enquiry helpers in `src/lib/site.ts`.

Keep the WhatsApp number and current general message as the default for existing Social media links. Add distinct photography and video message builders and use those only on the affected services/galleries. Support `?service=photography` and `?service=video` on Contact; unknown values default to no selection.

Form fields:

- Name and email: required.
- Service: required; Photography / Event Video / Social media / Not sure yet.
- Event date or deadline: optional text field that accepts uncertainty.
- Venue or location: optional.
- Coverage duration: optional, visible for Photography/Event Video.
- Project brief: required.
- Estimated budget: optional free text.

Implement accessible labels, appropriate input types/autocomplete, retained values after failures, pending state, duplicate-submit protection, visible success/failure feedback, and lightweight spam protection supported by the chosen provider. Prefer native form functionality; use JavaScript only where it improves state handling/preselection. Do not include secrets in client code.

Submission dependency: the primary assistant should inspect existing in-repo configuration without displaying secrets. If no destination exists, present one concrete static-form integration proposal for Ash's choice and obtain the required endpoint/account configuration. Do not create accounts, accept paid plans, or invent a destination. Build the component locally while this is pending, but do not publish a form that cannot submit. Do not mark this task complete until a real submission is received at the intended destination.

Acceptance: WhatsApp works, service preselection works, no public email address is added, optional questions do not block submission, errors preserve input, and a controlled real submission is received. Use test content written by the primary assistant and avoid sending repeated test messages.

### P5 — Featured photography

File: `src/pages/index.astro` only where possible.

Use these existing published, visible galleries in the homepage feature selection:

1. Corporate Night Safari Experience for Visa Leadership.
2. HR WorkTech Summit — Corporate Conference Highlights.
3. H+AI — AI Festival Empowering Women in Tech.
4. Eat The World — Corporate Networking & Food Tasting Experience.

Verify actual slugs and publication status before coding. Preserve existing card titles/summaries. If one is unavailable, the primary assistant selects a replacement; the coding agent does not invent one. Do not rewrite carousel selection/mechanics or global category ranks for this task. Do not edit Social media selection, sorting, or copy.

Acceptance: Homepage starts with coherent event evidence; all existing photography categories and gallery routes remain accessible; hidden/draft items remain excluded.

### P6 — Two project presentations

HR WorkTech: add R1 above the image gallery using the existing Markdown body rendering, with a minimal placement adjustment if needed. Include only confirmed assignment facts. Preserve existing image data, cover selection, generated summary, and gallery behaviour.

Airwallex: use V4 on Event Video. Keep the homepage feature description unchanged. Add a factual contribution line only after confirming filming/editing responsibilities and whether the assignment was direct or collaborative.

Acceptance: Only these two projects receive additional context. No invented coverage hours, asset counts, delivery time, paid/organic metrics, or direct-client relationships. No new homepage case-study section.

### P7 — Contextual booking prompts

Files: new `src/components/BookingPrompt.astro`, gallery route, Event Video page.

Use B1 for all published photography galleries, positioned after gallery content/full-client-gallery link and before related work. Use B2 near the end of Event Video. Primary CTA opens the appropriate WhatsApp message; secondary Send a brief opens Contact with the service preselected. Reuse the same component with supplied variants.

Acceptance: Correct wording and service selection, one contextual prompt per route, no pop-ups, no changes to lightbox controls or loading, keyboard-visible links.

### P8 — Booking process

Create a small static component using P1–P5. Render on Photography and Event Video beside practical service information. Four columns on wider screens, a vertical list on small screens. Use semantic ordered-list markup and existing typography; no icons, animation, illustration, or personal photograph required.

Acceptance: Process appears on those two service pages only. No duplicate process section on the homepage or Social media.

### P9 — Search and sharing presentation

Use M1–M3 for homepage, Photography, and Event Video. Keep Social media metadata unchanged. Ensure canonical URLs, sharing metadata, sitemap inclusion, and an existing suitable sharing image for Event Video. Avoid appending the complete homepage service title to every service-page title; give affected pages an explicit full-title option while preserving the old default for untouched routes.

Acceptance: Distinct accurate titles, no duplicated title suffix, valid canonical/share image URLs, Event Video in sitemap when enabled, no route/address migration.

## 5. Facts and dependencies to resolve during implementation

These are information dependencies, not reasons to stop unrelated implementation. Ask Ash in one concise batch when implementation begins, using any relevant facts already available in the repository first.

| Dependency | Needed for | Safe treatment while unresolved |
| --- | --- | --- |
| Exact hours included at $600 and $1,400 | P3 | Keep existing published pricing wording; report clarification pending |
| Image count by coverage length and overtime policy | P3 | Preserve existing claims; add no new numbers/policies |
| Video turnaround, revisions, finished lengths, and supported formats | P2 | Use quote-specific scope copy V5; no universal promise |
| Whether combined coverage is available with collaborators | P2 | Use the staffing disclaimer in V5; do not promise an available crew |
| HR WorkTech role, actual deliverables, and coverage duration | P6 | Publish only R1's source-supported event context; omit missing factual fields |
| Airwallex filming/editing contribution and commissioning relationship | P6 | Retain existing neutral film description; omit contribution fields |
| Form destination/provider and privately receiving email | P4 | Keep WhatsApp live; unfinished form stays unpublished |

Do not publish brackets, TODO text, invented values, or unconfirmed claims. A release can omit dependent enhancements, but they must remain visibly incomplete in the task report.

## 6. Primary-authored website copy manifest

This is the exact wording available to coding agents. IDs are implementation references, not visible text. Existing text not replaced here stays unchanged. The primary assistant must author every additional string before use.

### H — Homepage

- H1 heading: **Photography and video for events and businesses in Singapore.**
- H2 supporting text: **I'm Ash, a freelance photographer and videographer covering corporate events, private celebrations, and social content shoots. Tell me what you're planning, and we can discuss the coverage and deliverables you need.**
- H3 primary link: **Explore my work**
- H4 secondary link: **Check availability**
- H5 video-service link: **Explore event video**
- H6 video-service link accessibility label, if additional context is necessary: **Explore event video services**
- H7 closing heading: **Planning an event or a content shoot?**
- H7 closing paragraph: **Share your date, location, and what you need. I'll let you know my availability and discuss the scope with you.**
- H7 closing link: **Discuss your project**

### V — Event Video

- V1 eyebrow/navigation label: **Event Video**
- V2 heading: **Event films that bring people back to the moment.**
- V3 introduction: **Event highlight films for conferences, company gatherings, and private celebrations in Singapore. Share your programme and how you plan to use the video, and we can discuss the coverage and finished edit.**
- V4 context heading: **About this film**
- V4 source-supported context: **Airwallex's Ecom North Singapore Summit brought together retail and e-commerce operators. This film captures the people, conversations, and atmosphere of the event.**
- V4 optional factual labels: **My contribution**, **Coverage**, **Delivered work**. Values require the primary assistant's verified copy; omit rows without values.
- V5 scope heading: **Agree the details before the shoot.**
- V5 Coverage: **Coverage is quoted around your programme, venue, and the moments you need captured.**
- V5 Finished edit: **The quote sets out the finished video, its length, and the agreed delivery formats.**
- V5 Delivery and revisions: **Turnaround and included revisions are agreed as part of the project scope.**
- V5 Photography and video: **If you need both, share the brief so we can establish whether additional crew would be needed.**
- V6 enquiry heading: **Need a highlight film for your event?**
- V6 enquiry paragraph: **Tell me your date, venue, and what you want the finished video to cover.**
- V6 primary button: **Check availability**
- V6 secondary link: **Send a brief**

### R — HR WorkTech

- R1 heading: **About this assignment**
- R1 source-supported paragraph: **Photography from the HR WorkTech Summit, covering panel discussions, speakers, and delegate portraits. The event explored HR technology and the future of work in the AI era.**
- R1 optional factual labels: **My role**, **Coverage**, **Delivered work**. Do not fill these from assumptions; primary supplies verified values later.

### B — Contextual booking prompts

- B1 heading: **Planning an event like this?**
- B1 paragraph: **Tell me your date, venue, and coverage requirements.**
- B1 primary button: **Check availability**
- B1 secondary link: **Send a brief**
- B2 uses V6 verbatim.

### P — Process

- P1 section heading: **How booking works**
- P2 title: **Share your brief**
- P2 description: **Send your date, location, and what you need covered.**
- P3 title: **Agree scope and fee**
- P3 description: **We'll confirm the coverage, deliverables, and price before booking.**
- P4 title: **The shoot**
- P4 description: **I'll work from the agreed brief and programme.**
- P5 title: **Receive your work**
- P5 description: **Your photographs or video will be delivered on the agreed schedule.**

### C — Contact and form

- C1 page heading: **Tell me about your project.**
- C2 introduction: **Check availability on WhatsApp, or send a brief using the form below.**
- C3 WhatsApp card title: **Chat on WhatsApp**
- C3 description: **For a quick availability check or an initial conversation.**
- C3 button: **Open WhatsApp**
- C4 form heading: **Send a brief**
- C4 helper: **Share what you know so far. Dates and details do not need to be final.**
- C5 labels: **Name**, **Email**, **Service needed**, **Event date or deadline**, **Venue or location**, **Coverage duration**, **Project brief**, **Estimated budget**.
- C5 required marker: **Required**; optional marker: **Optional**.
- C5 service placeholder: **Select a service**.
- C5 service options: **Photography**, **Event Video**, **Social media**, **Not sure yet**.
- C5 date helper: **Leave blank if your date is not confirmed.**
- C5 duration helper: **An estimate is fine.**
- C5 brief helper: **Tell me about the event or shoot and the photographs or videos you need.**
- C5 budget helper: **Leave blank if you would like guidance on scope and pricing.**
- C6 submit label: **Send enquiry**
- C6 pending label: **Sending…**
- C6 success message: **Your enquiry has been sent. Thank you — I'll reply using the email you provided.**
- C6 failure message: **Your enquiry could not be sent. Please try again, or contact me on WhatsApp.**
- C6 validation summary: **Please check the required fields and enter a valid email address.**
- C6 privacy helper: **The details you submit will be used to respond to your enquiry.**
- C6 spam-field label if required: **Leave this field empty**.

Primary must revise privacy wording if the selected provider or actual handling requires additional disclosure. Do not claim retention practices or consent terms that have not been established.

### W — New WhatsApp templates

Photography:

> Hi Ash! I'd like to check your availability for photography.
>
> Date:
> Venue:
> Event type:
> Coverage hours:
> Requirements:

Event Video:

> Hi Ash! I'd like to discuss event video coverage.
>
> Date:
> Venue:
> Coverage hours:
> Intended use:
> Video requirements:

Keep newlines when URL-encoding. Preserve the existing general template for untouched links, including Social media.

### M — Metadata

- M1 homepage title: **Event Photography & Video Singapore | Ash Chong**
- M1 description: **Singapore-based freelance photographer and videographer for corporate events, private celebrations, and social content shoots. Explore Ash Chong's work and check availability.**
- M2 photography title: **Event Photographer Singapore | Ash Chong**
- M2 description: **Corporate and private event photography in Singapore, from conferences and networking events to celebrations. View galleries and discuss coverage with Ash Chong.**
- M3 video title: **Event Videography Singapore | Ash Chong**
- M3 description: **Event highlight films for conferences, company gatherings, and private celebrations in Singapore. View Ash Chong's event video work and discuss your brief.**

### F — Photography fact-dependent copy

Do not finalise revised pricing prose until hours and deliverables are confirmed. The primary assistant will provide exact replacement rows, retaining configured prices. Luna agents must not infer a maximum of three hours from the current 2–3-hour description or invent full-day hours.

## 7. Coding-agent task template

Each assignment must include:

1. Read `AGENTS.md` and `action_plan.md`; implement only the assigned tasks after implementation is authorised.
2. Model is GPT-6 Luna, Extra high reasoning; code writing only.
3. Explicit file allowlist, dependencies, and copy IDs.
4. Preserve unrelated edits; do not modify Social media or another owner's files.
5. Copy all public wording verbatim. Return missing strings or uncertain facts to the primary assistant.
6. Do not run content regeneration, create accounts, configure secrets, commit, push, or deploy.
7. Report changed files, checks performed, unresolved dependencies, and any deviations.

Suggested batches:

- Batch 0: primary establishes copy/configuration contracts and resolves factual/form dependencies where possible.
- Batch 1: Agent A handles P1/P5; Agent B handles P2/P3/P6/P7/P8; Agent C handles P4. Disjoint edits may run concurrently.
- Batch 2: primary reviews copy, integrates shared configuration/styles, completes P9, and runs final checks.
- Batch 3: correct only identified issues; deliver a reviewable PR. Merge/deployment is a separate state.

## 8. Verification and delivery

### Planning deliverable

Only `action_plan.md` is added now. Run repository-required validation, preserve the existing `.gitignore` edit, and commit/push/open a documentation PR under repository delivery instructions. No coding subagents or website changes are part of that PR.

### Implementation checks

- Run `npm run validate` and the required `npm run build`.
- Before the build, inspect how generation scripts load `.env`. Merely unsetting a shell variable may not stop a script that reloads `.env`. Ensure AI-generation calls are disabled through an already supported no-key/skip path without revealing credentials or modifying the user's credential files. If none is available, resolve this narrowly with the primary assistant before the full build.
- Do not invoke `--regenerate`. Review status/diff after the build; exclude unrelated generated changes. Never discard pre-existing user edits while cleaning up build side effects.
- Check `/`, `/photography/`, `/videography/`, `/contact/`, HR WorkTech, and one other photography gallery in a rendered browser at 360px, 768px, and 1440px.
- Check `/content/` as a regression route: body copy, labels, prices, examples, sorting, and service scope unchanged. The new shared Event Video navigation link is allowed.
- Verify menu, CTA destinations, form preselection, native validation, keyboard navigation, visible focus, status announcements, and form failure/success handling.
- Verify video poster/play/loading, photography category filters, hidden galleries, and lightbox controls. Do not expand into a performance rewrite.
- Verify actual form receipt before calling the form complete; WhatsApp must remain usable if the form is unavailable.
- Confirm canonical titles/descriptions, sharing image, and sitemap route.
- Compare all newly introduced public strings against section 6 plus primary-authored amendments. Agents may not supply prose in their implementation diff.
- Add focused automated checks only where they catch meaningful behaviour, such as form submission states and service routing; do not introduce a broad test framework for static copy changes.

### Git and release handling

- Work on a `codex/` branch. Preserve all unrelated user changes.
- Commit only files in the agreed scope, push, and open a PR when the section is complete, following repository instructions.
- Attach the PR to the chat. Describe what changed, validation performed, and dependencies still outstanding.
- Do not equate a pushed branch or PR with a live deployment. Do not merge/deploy unless authorised by the active implementation request.
- If later merged/deployed, verify the Pages workflow and the live affected routes before reporting the website as shipped.

## 9. Completion checklist

- [ ] Homepage explicitly presents services and Singapore without a personal portrait.
- [ ] Event Video has its own page, navigation item, section switch, and sitemap entry.
- [ ] Photography and Event Video scope contains no invented commitments or changed prices.
- [ ] WhatsApp routes use the correct template; Social media retains its existing general template.
- [ ] Contact form works end to end, or remains explicitly incomplete and unpublished.
- [ ] Homepage photography features coherent event evidence without removing categories.
- [ ] HR WorkTech and Airwallex receive only verified, primary-authored context.
- [ ] Contextual prompts appear after work and before related galleries.
- [ ] Process appears on Photography and Event Video only.
- [ ] Social media page, offers, content, labels, and featured examples remain unchanged.
- [ ] All new public copy comes from the primary assistant.
- [ ] Validation, build, rendered checks, and regression review pass.
- [ ] Scoped commit, push, and attached PR are complete; deployment status is reported accurately.
