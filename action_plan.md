# Website marketing implementation action plan

Date: 12 October 2026

Status: Website changes implemented and verified on 13 October 2026; pending PR review. Contact form remains deferred. Not merged or deployed.

Objective: Make Ash's photography and event-video services easier to understand and book, while retaining varied work and leaving Social media unchanged.

## 1. Decisions and scope

### Included

- Improve the existing homepage introduction without adding a portrait or biography section.
- Establish Event Video as a service at `/videography/`.
- Clarify Photography and Event Video scope using verified operating details.
- Retain WhatsApp and tailor photography/video enquiry messages. Contact-form implementation is deferred.
- Curate homepage photography examples without removing other portfolio categories.
- Improve the HR WorkTech photography presentation and Airwallex event-film presentation.
- Add contextual booking prompts to photography galleries and Event Video.
- Explain the booking process on Photography and Event Video only.
- Update navigation, footer links, sitemap, and metadata for affected routes.

### Excluded

- Renaming Social media, changing `/content/`, changing its offers, prices, copy, ordering, or management scope.
- Editing the homepage Social media section's contents or examples. Moving Event Video before it is permitted.
- Implementing or setting up the contact form in this release. Also excluded: publishing an email address, purchasing a domain, changing email accounts, or migrating hosting.
- A personal photograph, About page, new homepage biography, homepage case-study block, or standalone video-project page.
- Changing the existing $600/$1,400 photography amounts, removal of existing photography services, collection-schema changes, gallery derivative changes, or broad visual redesign. There is no separate short-event tier; half-day and full-day are the only public photography package labels.
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

Implementation is now authorised. Use at most three GPT-6 Luna Extra high coding agents concurrently alongside the primary assistant. The primary assistant remains responsible for public copy and review.

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
| Agent A — homepage/shared shell | Homepage, ContactSection, site configuration, layout/Nav types, sitemap, narrow homepage styles | Primary supplies all copy and integration contracts |
| Agent B — service presentation | Event Video, Photography, new process/prompt components, gallery route, HR WorkTech Markdown, conditional empty film description | Uses Agent C enquiry API and Agent A shell contract |
| Agent C — enquiries | `src/pages/contact.astro`, new `src/lib/enquiries.ts` and scoped client code | WhatsApp-only; no form or provider setup |
| Primary assistant | All public copy, action plan, integration/code review, final verification and Git delivery | Coordinates all three; coding agents write implementation code |

Agents must not edit another owner's files. Agent A owns only the narrow homepage changes in shared `styles.css`; other agents use component-scoped styles and report any required global adjustment. Agents submit changes for primary review; they do not independently commit, push, merge, or deploy.

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
2. One selected Airwallex film as the lead example, reusing the existing player. Additional Airwallex films may be included as secondary examples after review.
3. V4 project context; show verified contribution fields only when available.
4. V5 service-scope rows.
5. Shared process using P1–P5.
6. V6 enquiry prompt and links.

Add `sections.video`, one navigation item, footer support through existing shared navigation, and the sitemap route. Match existing trailing-slash conventions. Do not add a video collection or standalone case-study route.

Acceptance: Route resolves, Event Video is active in navigation, shared visibility switch behaves consistently, player loads on interaction, and the page describes a quote-led offer without invented prices or promises. Highlight films, interviews, and full speech recordings are included as confirmed services. Do not imply vertical and horizontal capture are both included.

### P3 — Photography scope

Files: `src/pages/photography/index.astro`, existing service rows.

Use two public packages only: Half-day coverage from $600 and Full-day coverage from $1,400. This retains existing starting amounts and follows Ash's preference for half/full-day presentation. A half-day assignment may be quoted at $900 according to duration and requirements; do not create a third public tier or imply every half-day brief costs $600. Add F4 to explain quote-specific coverage. No 3/4/8-hour packages or invented fixed duration caps. Agree exact hours in each quote. Keep pricing in the existing configuration without changing its amounts. Preserve existing five-business-day wording until Ash confirms any change; it was not reconfirmed in the latest answers.

Required final details: how coverage duration affects the half-day quote, additional-hours handling, and expedited availability if offered. Fixed public hour tiers are not required. Image quantity is confirmed to vary; replace the universal 60–100-image promise with F1. Do not publish a new numerical image allowance. Add process P1–P5 here only; do not change Social media's service rows or process.

Acceptance: Every new operating promise is traceable to an existing verified commitment or Ash's answer; price values unchanged. Unresolved clarification tasks are explicitly reported as outstanding.

### P4 — WhatsApp enquiries (current release)

Latest instruction supersedes the historical form specification below: no contact form or provider setup in this release. Add `src/lib/enquiries.ts` with service-specific photography/video WhatsApp URLs and an unchanged default URL. Contact stays WhatsApp-only, with primary-authored fallback copy C2A/C7 below. Preselect the appropriate WhatsApp message from `?service=photography` or `?service=video` client-side; unknown values use the original default. Show an Event Video explore-work link when `sections.video` is enabled. Do not display a form, form promise, or inactive submit button. The following form details are retained for later discussion and are not executable tasks now.

#### Deferred form specification

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

Submission dependency: Ash confirms no form service exists and authorises proceeding with form setup as part of later implementation, not during this discussion/planning update. Recommend an HTML form embedded directly on `/contact/`, backed by Formspree. Submission stays on the website using AJAX and inline status messages; retain a normal POST fallback. No iframe or external-form link as the main experience. Formspree currently lists a free allowance of 50 submissions per month, private recipient emails, AJAX support, and basic spam filtering; recheck its limits before setup. Use its free tier only if the account is eligible and the current terms fit; no paid plan or upgrade without an explicit instruction. Account sign-in/email verification and the privately receiving inbox remain user-assisted dependencies. Ask for the endpoint or available authenticated setup access when required; never request passwords or expose the inbox in the form action. Build locally while setup is pending, but do not publish a form that cannot submit. Do not mark this task complete until a real submission is received at the intended destination. Use provider-supported free spam filtering; do not assume a custom honeypot is free.

Acceptance: WhatsApp works, service preselection works, no public email address is added, optional questions do not block submission, errors preserve input, and a controlled real submission is received. Use test content written by the primary assistant and avoid sending repeated test messages.

### P5 — Featured photography

File: `src/pages/index.astro` only where possible.

Use these existing published, visible galleries in the homepage feature selection:

1. Corporate Night Safari Experience for Visa Leadership.
2. H+AI — AI Festival Empowering Women in Tech.
3. Eat The World — Corporate Networking & Food Tasting Experience.
4. Starrylight Paints 2024 New Year Celebration & Fringe Activities.

HR WorkTech is not a lead example of full-event coverage: Ash was the sole photographer commissioned for one speaker, not the entire summit. Retain it as accurately labelled speaker-assignment evidence in the photography portfolio.

Verify actual slugs and publication status before coding. Preserve existing card titles/summaries. If one is unavailable, the primary assistant selects a replacement; the coding agent does not invent one. Do not rewrite carousel selection/mechanics or global category ranks for this task. Do not edit Social media selection, sorting, or copy.

Acceptance: Homepage starts with coherent event evidence; all existing photography categories and gallery routes remain accessible; hidden/draft items remain excluded.

### P6 — Accurate speaker assignment and curated video evidence

HR WorkTech: correct its title/card/summary and add R1 above the image gallery so it clearly describes a speaker-specific assignment. This corrects an earlier assumption in the plan. Do not present it as a commission to cover the whole summit or as direct work for the organiser. Use primary-authored R1/R2 copy; preserve slug, image data, cover selection, and gallery behaviour. Prevent automated summary/card generation from replacing the factual correction using the existing per-entry opt-out if necessary; no generator/schema changes.

Airwallex: planning, filming, editing, and delivery are confirmed for the existing Ecom North assignment. Apply V4 on Event Video; do not claim direct commissioning or an exclusive relationship, or automatically extend the role statement to the two new films. Both additional URLs and source documents have now been supplied (section 9). Keep Ecom North as the existing homepage film. On Event Video, propose one lead film plus two secondary cards grouped as Airwallex work: The Retail Growth Playbook and Beyond Borders. The briefs describe different editorial purposes, which supports including both as secondary examples. Finished pacing, visual execution, aspect ratio, duration, and fidelity to the briefs have not been verified by playback; verify these before choosing a different lead film or adding technical claims. Link titles to the supplied YouTube URLs and lazy-load players if embedded; do not load three active iframes on page arrival. Confirm portfolio publication is appropriate before release. Keep the homepage to one film. Repeated-client work can show consistency, but do not imply a diverse client roster.

Acceptance: HR WorkTech accurately states speaker-only scope throughout the affected presentation. Airwallex accurately states Ash's full production contribution; only reviewed, publication-cleared videos are displayed. No invented coverage hours, asset counts, delivery time, paid/organic metrics, direct-client relationships, or wider client roster. No new homepage case-study section.

### P7 — Contextual booking prompts

Files: new `src/components/BookingPrompt.astro`, gallery route, Event Video page.

Use B1 for published event photography galleries and B3 for photoshoot-category galleries, positioned after gallery content/full-client-gallery link and before related work. Use B2 near the end of Event Video. Primary CTA opens the appropriate WhatsApp message. Omit the secondary Send a brief link in this WhatsApp-only release. Reuse the same component with supplied variants.

Acceptance: Correct wording and service selection, one contextual prompt per route, no pop-ups, no changes to lightbox controls or loading, keyboard-visible links.

### P8 — Booking process

Create a small static component using P1–P5. Render on Photography and Event Video beside practical service information. Four columns on wider screens, a vertical list on small screens. Use semantic ordered-list markup and existing typography; no icons, animation, illustration, or personal photograph required.

Acceptance: Process appears on those two service pages only. No duplicate process section on the homepage or Social media.

### P9 — Search and sharing presentation

Use M1–M3 for homepage, Photography, and Event Video. Keep Social media metadata unchanged. Ensure canonical URLs, sharing metadata, sitemap inclusion, and an existing suitable sharing image for Event Video. Avoid appending the complete homepage service title to every service-page title; give affected pages an explicit full-title option while preserving the old default for untouched routes.

Acceptance: Distinct accurate titles, no duplicated title suffix, valid canonical/share image URLs, Event Video in sitemap when enabled, no route/address migration.

## 5. Facts and dependencies to resolve during implementation

Ash has answered several questions. Do not ask them again. Confirm only the remaining facts below; keep unrelated implementation moving. User-requested discussion and plan updates do not authorise website implementation.

| Dependency | Needed for | Safe treatment while unresolved |
| --- | --- | --- |
| Half-day quote boundaries and additional-hours handling | P3 | Two public labels only, from $600/$1,400; agree exact hours in each quote; no 3/4/8-hour tiers |
| Overtime policy and whether five-business-day delivery still applies | P3 | Image quantity varies: use F1, with no fixed numerical promise; preserve existing turnaround pending changes |
| Video turnaround, revisions, and finished lengths | P2 | Highlight films/interviews/full speeches confirmed; one capture orientation chosen by purpose, using V5 |
| Whether combined coverage is available with collaborators | P2 | Use the staffing disclaimer in V5; do not promise an available crew |
| HR WorkTech actual deliverables and duration, if needed | P6 | Sole photographer for one speaker confirmed; use R1/R2 and omit unconfirmed counts/hours |
| Final playback review, publication appropriateness, and role on each new Airwallex film | P6 | URLs/briefs supplied; Ecom North role confirmed; do not infer new-film roles or completed outputs from pre-production documents |
| Formspree account/endpoint and privately receiving inbox | P4 | Embedded form recommended and setup authorised for later implementation; no external account setup now |

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
- V3 introduction: **Highlight films, interviews, and full speech recordings for events in Singapore. Share your programme and how you plan to use the video, and we can discuss the coverage and finished edit.**
- V4 context heading: **About this film**
- V4 source-supported context: **Airwallex's Ecom North Singapore Summit brought together retail and e-commerce operators. This film captures the people, conversations, and atmosphere of the event.**
- V4 contribution label: **My contribution**. Value: **Planning, filming, editing, and delivery.**
- V4 optional factual labels: **Coverage**, **Delivered work**. Additional values require the primary assistant's verified copy; omit rows without values.
- V4 grouped-film heading: **More video work for Airwallex**.
- V7 Retail title: **The Retail Growth Playbook**.
- V7 Retail description: **An event film for Airwallex and the Singapore Retailers Association, centred on retail growth and cross-border expansion.**
- V7 Retail link: **Watch The Retail Growth Playbook**. Target: `https://www.youtube.com/watch?v=SHuhZGxQrjg`.
- V8 Beyond Borders title: **Beyond Borders**.
- V8 Beyond Borders description: **A community-focused event film about partnerships and growing across borders.**
- V8 Beyond Borders link: **Watch Beyond Borders**. Target: `https://www.youtube.com/watch?v=LffdpeBkFVk`.
- V7/V8 descriptions reflect the supplied project context. Verify fit to the final films before release; any amendments remain primary-authored. Do not add durations, technical specifications, or detailed delivery claims from the storyboards.
- V5 scope heading: **Agree the details before the shoot.**
- V5 Coverage: **Coverage is quoted around your programme, venue, and the moments you need captured.**
- V5 Services: **Highlight films, interviews, and full speech recordings can be scoped around your event.**
- V5 Finished edit: **The quote sets out the finished video, its length, and the agreed delivery format.**
- V5 Format: **Filming is planned for either horizontal or vertical video, depending on where it will be used. If you need both, include that in your brief so we can agree the approach and scope.**
- V5 Delivery and revisions: **Turnaround and included revisions are agreed as part of the project scope.**
- V5 Photography and video: **If you need both, share the brief so we can establish whether additional crew would be needed.**
- V6 enquiry heading: **Need a highlight film for your event?**
- V6 enquiry paragraph: **Tell me your date, venue, and what you want the finished video to cover.**
- V6 primary button: **Check availability**
- V6 secondary link: **Send a brief**

### R — HR WorkTech

- R1 heading: **About this assignment**
- R1 paragraph: **Commissioned photography for a speaker at the HR WorkTech Summit. I handled the assignment as the sole photographer, with coverage focused on the speaker's participation in the conference.**
- R1 role label/value: **My role** / **Photographer for a speaker-specific assignment.**
- R1 optional factual labels: **Coverage**, **Delivered work**. Primary supplies additional verified values later.
- R2 revised project title: **HR WorkTech Summit — Speaker Photography**.
- R2 revised card summary: **A focused record of one speaker's conference appearance.**
- R2 revised summary: **Commissioned photography for a speaker at the HR WorkTech Summit, with Ash as the sole photographer for the assignment. Coverage focused on the speaker's participation in the conference.**

### B — Contextual booking prompts

- B1 heading: **Planning an event like this?**
- B1 paragraph: **Tell me your date, venue, and coverage requirements.**
- B1 primary button: **Check availability**
- B1 secondary link: **Send a brief**
- B2 uses V6 verbatim.
- B3 photoshoot heading: **Planning a photoshoot?** Paragraph: **Tell me what you have in mind and when you'd like to shoot.** Button: **Check availability**. Use the photography WhatsApp template.

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
- C2 deferred-form introduction: **Check availability on WhatsApp, or send a brief using the form below.**
- C2A current introduction: **Share your date, location, and what you need. WhatsApp is the quickest way to start the conversation.**
- C7 current explore-work lead: **Browse photography, event video, and social content.**
- C7 video card label: **Event Video**. Description: **Highlight films, interviews, and speech recordings.** Link: **Explore event video**.
- C7 Contact metadata description: **Contact Ash for event photography, event video, and social media content enquiries in Singapore.**
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

- F1 Deliverables: **The number of edited photographs varies with the length and programme of the event. We'll discuss the expected delivery when agreeing your coverage.**
- F2 package label/value: **Half-day coverage** / **From $600.**
- F3 package label/value: **Full-day coverage** / **From $1,400.**
- F4 pricing helper: **Your quote depends on the coverage duration and requirements. We'll agree the hours and deliverables before booking.**

F1–F4 are primary-authored implementation copy based on the two-label preference and existing starting rates. There is no separate public $900 package; retain that amount as a possible individually scoped half-day quote. Do not present these as researched market rates or imply unlimited coverage within a half-day. Do not invent prorated hourly rates. Overtime and other policy copy must come from the primary assistant after confirmation.

All proposed amounts are in SGD. Add a visible **Prices in SGD.** label beside the pricing section when implementing the confirmed structure. Planned coverage tiers are not an overtime rate schedule; confirm extension pricing separately.

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
- Batch 1: Agent A handles P1/P5; Agent B handles P2/P3/P6/P7/P8; Agent C handles the current WhatsApp-only P4. The form is deferred. Disjoint edits may run concurrently.
- Batch 2: primary reviews copy and shared integration, delegates any required code fixes, and runs final checks. Agent A implements P9/shared metadata.
- Batch 3: correct only identified issues; deliver a reviewable PR. Merge/deployment is a separate state.

## 8. Verification and delivery

### Planning deliverable (completed before implementation)

Only `action_plan.md` was added in the planning stage. Run repository-required validation, preserve the existing `.gitignore` edit, and commit/push/open a documentation PR under repository delivery instructions. No coding subagents or website changes are part of that PR.

### Implementation checks

- Run `npm run validate` and the required `npm run build`.
- Before the build, inspect how generation scripts load `.env`. Merely unsetting a shell variable may not stop a script that reloads `.env`. Ensure AI-generation calls are disabled through an already supported no-key/skip path without revealing credentials or modifying the user's credential files. If none is available, resolve this narrowly with the primary assistant before the full build.
- Do not invoke `--regenerate`. Review status/diff after the build; exclude unrelated generated changes. Never discard pre-existing user edits while cleaning up build side effects.
- Check `/`, `/photography/`, `/videography/`, `/contact/`, HR WorkTech, and one other photography gallery in a rendered browser at 360px, 768px, and 1440px.
- Contact-form submission checks are deferred with the form. Verify current Contact has working WhatsApp and no form promise, and known/unknown service queries select the correct message.
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

## 9. Discussion decisions and remaining choices

Latest clarification: Ash usually charges $600 for 2–3-hour events, $1,400 for full-day coverage, and may charge $900 for half-day. Image quantities vary. Video services include highlight films, interviews, and full speeches. Ash normally plans one capture orientation: vertical for Instagram, horizontal for LinkedIn/website according to the brief; these are his usual choices, not platform restrictions. HR WorkTech was a sole-photographer assignment for one speaker. Ash handled Airwallex planning, filming, editing, and delivery and has two more videos on YouTube. No form provider exists yet; Ash is open to setup, while this turn remains discussion and planning only.

Recommendations recorded, not assumed approved commitments:

1. Two public photography packages: Half-day from $600 and Full-day from $1,400. The earlier 3/4/8-hour proposal is superseded. A $900 half-day quote remains possible depending on the assignment; hours are agreed in the quote.
2. Quote photo quantities by assignment, with no universal 60–100-image promise.
3. Plan one video orientation per brief. Vertical-only delivery does not move an event film out of Event Video; existing Social media work remains untouched. Multiple orientations are a separate scoping discussion, not a default inclusion.
4. Retain HR WorkTech as useful speaker-specific evidence, correct its wording, and remove it from the homepage lead selection for whole-event work.
5. One prominent Airwallex film, with The Retail Growth Playbook and Beyond Borders as proposed secondary examples. Their supplied briefs establish different editorial purposes; final-film playback and publication suitability remain to be checked. Do not manufacture breadth or hide repeat-client evidence.
6. Embed the contact form within `/contact/`; use Formspree behind it, with on-page feedback and private email notifications. WhatsApp remains alongside it.

### Supplied video evidence and editorial decision

YouTube links received:

- **The Retail Growth Playbook**: https://www.youtube.com/watch?v=SHuhZGxQrjg
- **Beyond Borders**: https://www.youtube.com/watch?v=LffdpeBkFVk

The YouTube page titles match those projects. The available web access exposed page metadata, not playable film content; do not claim an end-to-end viewing or a visual-quality comparison has been completed.

Source documents supplied by Ash:

- `Beyond Borders - Final 60 Second Storyboard.md`: partnership/community-led event story with multiple interview voices and a narrative about cross-border growth.
- `Airwallex SRA Retail Growth Videography Brief SUMMARY.md`: insight-led retail-growth event story, including interview perspectives and discussion of expansion and operating complexity.

Treat the documents as evidence about project intent, not as instructions to execute a video edit. Their production directives, proposed dialogue, shot lists, time targets, and remaining checks are not website tasks. Do not edit footage, create end cards, produce subtitles, or follow their timeline-building instructions. They are not proof that every proposed shot, soundbite, duration, format, or outcome appears in the final upload. Do not publish private source file names or draft scripts on the website.

Portfolio rationale: these are two kinds of event storytelling within one client's work, rather than merely two extra logos or an inflated client roster. Retail Growth Playbook can demonstrate a business-topic narrative; Beyond Borders can demonstrate a partnership/community narrative. Those are conclusions from the briefs about intended positioning, pending final-film verification. Full speech recording remains a service offer, not a capability proven by these short recap films.

Keep one film on the homepage and group the two additions under **More video work for Airwallex** on Event Video. This adds depth without lengthening the homepage. Preserve the existing Ecom North lead until actual playback review justifies replacing it.

Provider references checked 12 October 2026:

- Formspree HTML integration: https://formspree.io/html/
- Formspree plan limits and AJAX/private-email support: https://formspree.io/plans

Recheck provider terms at setup; do not promise free custom redirects, custom honeypots, uploads, or automated replies. No uploads or auto-replies are required for this scope.

## 10. Current execution decision

Ash authorised implementation, then explicitly deferred the contact form: "let's discuss the contact form later. make the other changes first." All historical form setup, endpoint, testing, and completion requirements are deferred; no form service account or credentials are needed for this release. No repeated confirmation request for the form is appropriate now.

Current agent contracts: Agent A owns shared navigation/site/layout/sitemap, homepage/ContactSection and narrow global styles; Agent B owns service pages/gallery/project content and new BookingProcess/BookingPrompt; Agent C owns `src/lib/enquiries.ts` and Contact. All code writers use GPT-6 Luna at Extra high; all public copy remains primary-authored.

HR card-summary copy was amended by the primary assistant to avoid title repetition and satisfy the existing validator.

## 11. Completion checklist

- [x] Homepage explicitly presents services and Singapore without a personal portrait.
- [x] Event Video has its own page, navigation item, section switch, and sitemap entry.
- [x] Half-day/full-day presentation retains existing $600/$1,400 starting rates; no third public tier or invented duration caps; variable photo delivery and one-orientation video scope are accurate.
- [x] WhatsApp routes use the correct template; Social media retains its existing general template.
- [x] Contact form deferred and absent from this release; Contact remains usable through WhatsApp with correct service-specific messages.
- [x] Homepage photography features coherent event evidence without removing categories.
- [x] HR WorkTech is clearly speaker-only; Airwallex states planning, filming, editing, and delivery, with optional additional films reviewed first.
- [x] Contextual prompts appear after work and before related galleries.
- [x] Process appears on Photography and Event Video only.
- [x] Social media page, offers, content, labels, and featured examples remain unchanged.
- [x] All new public copy comes from the primary assistant.
- [x] Validation, build, rendered checks, and regression review pass.
- [x] Scoped commit, push, and PR are complete; deployment status is reported accurately.


## 12. Implementation verification record — 13 October 2026

- Implementation code written by three GPT-6 Luna Extra high agents; primary assistant supplied/reviewed public copy and requested narrow integration fixes.
- Final `npm run build` passed, including validation (44 Astro files, zero errors/warnings/hints) and content validation. AI-copy commands skipped through the supported empty `OPENAI_API_KEY` environment value; local env-loader code preserves defined variables. No credential files were changed. No inbox gallery imports were pending.
- Production preview checked across seven routes at 360px, 768px, and 1440px: 21 route/viewport checks passed, with no page errors or horizontal overflow. Homepage also checked at 820px and 1024px.
- Verified mobile navigation, featured gallery order, video-before-social order, default/photo/video/unknown Contact query handling, correct WhatsApp phone and actual message newlines, photography category filter, gallery pointer opening/keyboard next/thumbnail preview/Escape, and sitemap inclusion.
- YouTube click-to-load iframe wiring was tested with the third-party response stubbed. This verifies local player behaviour, not end-to-end external playback or an editorial review of the supplied finished films. Secondary videos are links using source-grounded descriptions; no unverified technical claims were added.
- Rendered homepage and Event Video screenshots reviewed at desktop and mobile sizes.
- Source diff confirms Social media page/content/featured component, generated assets, lightbox code, gallery script, collection schemas, build scripts, and package manifests unchanged. Shared navigation adds Event Video.
- Contact form omitted entirely under Ash's instruction; no provider setup, endpoint, public email, or inactive form added.
- Existing user `.gitignore` edit remains outside the implementation commit.
- Local verification scripts/screenshots and installed browser tooling are ignored development artifacts, not release files.

Implementation PR: https://github.com/ashcx/ashcx.github.io/pull/7 — open for review; not merged or deployed. The chat attachment tool was invoked but did not return; the PR URL is available directly.

## 13. Preview feedback revisions — 13 October 2026

Scope: revise the existing implementation PR, without merging or deploying.

- Restore the live homepage’s name-led hero, role list, and carousel layout. Keep the approved personal introduction; use Event photographer, Event videographer, and Social content creator as the three roles.
- Replace the homepage video link with “View event films & coverage” and improve its contrast against the dark section.
- Give the booking steps clearer descriptions, readable letter spacing, a linked first step, and an “Enquire about a booking” button. Booking remains an enquiry requiring availability/scope confirmation.
- Route contextual booking prompts to Contact with the relevant service parameter, rather than directly to WhatsApp.
- Use “Event video” consistently in navigation and visible labels.
- Redesign the video page around the featured film and a compact editorial brief. Present the two additional films as individual click-to-play embeds in a separate section. Explain highlight films, interviews, and speech recordings instead of the previous long scope table.
- Remove redundant testimonial CTAs from Home and Social media; improve the Social media “What to expect” introduction without changing rates or promised scope.
- Fix the Contact portfolio cards’ layout and narrow-screen wrapping.
- Add the user-approved ashchong138@gmail.com email option alongside WhatsApp. Contact form remains deferred; no provider or endpoint is configured.
- Primary assistant supplies all new public copy; GPT-6 Luna Extra high agents implement the markup and styling.

Revision verification: final production build passed with zero Astro errors, warnings, or hints. Browser checks passed for Home, Photography, Event video, Contact, and Social media at 360, 768, 1024, and 1440 pixels (20 route/viewport checks), including no horizontal overflow and no clipped portfolio-card content. Three click-to-play player integrations passed with external YouTube responses stubbed. Final Contact checks at 360 and 1440 pixels verified the email link, service-specific WhatsApp message, and removal of the overlapping floating WhatsApp control on Contact only. Desktop/mobile screenshots were inspected. Email-client delivery and real external YouTube playback are outside these local checks.

## 14. Centered presentation and loaded-player repair — 13 October 2026

- User’s screenshots exposed a missed post-click iframe sizing defect: runtime-created iframe elements do not receive Astro’s scoped style attribute. Apply sizing via `.video-film-media :global(iframe)` so loaded players fill the existing responsive container.
- Center Event video hero, brief, film titles/descriptions, service descriptions, and booking steps. Remove the planning-note heading and center the retained paragraph in a bounded text column.
- Replace visible “Check availability” prompts with “Discuss your project”; preserve Contact routes and service parameters.
- Center shared marketing copy, gallery cards, testimonials, Social media expectation copy, and Contact card content/actions without restructuring the restored homepage hero.
- Refine Contact heading sizes and equal-height button alignment after visual inspection.
- Model preference supersedes the earlier implementation choice: all agents for this revision use GPT-6.1 Sol at medium effort. Primary assistant retains responsibility for public copy.

Verification: production build/validation passed with zero errors, warnings, or hints. Fifteen browser route/viewport checks passed across Home, Photography, Event video, Social media, and Contact at 390, 768, and 1440 pixels, with centered-target checks, no page errors, and no horizontal overflow. Post-click iframe bounds fill the player containers at every tested width. Stubbed player geometry checks were supplemented by loading and visually inspecting both real YouTube videos playing at desktop size. Desktop/mobile screenshots and focused hero, expectations, Contact, and film sections were reviewed. Existing user `.gitignore` changes remain excluded.
