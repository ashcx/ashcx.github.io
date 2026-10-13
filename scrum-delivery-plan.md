# Portfolio improvement: Scrum delivery plan

Date: 13 October 2026, Singapore time

Status: Planning only. Implementation, commits, publication, and scheduled work have not started under this plan.

## Scope update after copy review

The user's latest feedback overrides conflicting backlog items and assignments below. Preserve existing photography-gallery and social-reel titles, descriptions, summaries, card summaries, bodies, and supplied metrics. Exclude project rewrites, metric removal, new image-alt-text authoring, and metadata changes. Retain existing alt attributes and accessibility control improvements. Static social-video previews are an optional reliability proposal pending agreement on assets.

UX-13 is withdrawn; Sol's drafting scope excludes project replacements and project-title edits. UX-04 no longer includes description/body rewrites; preserve project content. UX-07 uses existing project titles. UX-11 retains focus/control work but excludes descriptive image-alt authoring. UX-14 may protect existing content but must not regenerate or rewrite it. Update story estimates and sprint capacity at planning rather than treating removed scope as committed work.

Confirmed delivery: single video, 3 business days; event work, 3–5 business days; expedited 1-business-day or same-day delivery is available subject to discussion. Ash confirms he filmed, edited, and produced all social work; per-project role questions are unnecessary. GPT-6.1 Sol Medium authors exact service/page/shared wording and the event-film contribution paragraph in `website-copy-review.md`; Luna implements approved wording verbatim only after implementation is authorized.

Baseline: GitHub `main` at `18feaa5`. Recheck the remote and working tree at implementation kickoff. The findings and proposed editorial direction are in [ux-copy-action-plan.md](ux-copy-action-plan.md). The earlier `action_plan.md` is historical context, not this delivery plan's staffing or scope authority.

## Product goal

Make the portfolio easy to browse and understand: visitors can identify Ash's services, judge relevant work, find practical service details, and start an enquiry without intrusive controls or exaggerated copy.

Retain the warm visual identity, existing photography, static Astro architecture, routes, ranking rules, prices, and verified service commitments. Improve clarity and usability without claiming an unmeasured increase in enquiries or sales.

## Team and model contract

| Role | Responsibility | Model / configuration |
| --- | --- | --- |
| Product Owner — Ash | Prioritizes outcomes; resolves facts, commercial scope, and subjective design choices; reviews each increment. | Human |
| Coordinator — primary agent | Facilitates planning and checkpoints; manages the backlog, dependencies, ownership, integration, and evidence; reports progress and unresolved decisions. | Existing primary agent; no public copy authorship unless its configuration is verified as GPT-6.1 Sol Medium. |
| Copy developer — dedicated writer subagent | Writes and revises **all copy**, verifies its factual basis, and maintains the exact wording manifest. | **GPT-6.1 Sol, Medium**: `model: "gpt-6.1-sol"`, `reasoning_effort: "medium"`, `fork_turns: "none"`. |
| Implementation developers — A, B, C | Implement supplied copy verbatim, write code, investigate defects, and perform assigned checks. | **GPT-6 Luna, Max**: `model: "gpt-6-luna"`, `reasoning_effort: "max"`, `fork_turns: "none"`. |

These are one delivery team with one Product Backlog and one Sprint Goal at a time. The coordinator facilitates ownership and integration rather than splitting the work into unrelated projects. Developers report constraints and can propose technical approaches within their assigned scope.

### Strict copy ownership

All website copy must originate from the dedicated **GPT-6.1 Sol Medium** writer. GPT-6 Luna Max must never draft, paraphrase, improve, shorten, expand, translate, or invent copy.

This covers headings, body text, card summaries, project titles, navigation, buttons, captions, testimonial excerpts, helper/error/loading/empty-state text, accessibility labels, image descriptions, page titles, descriptions, and WhatsApp/email draft wording. A label added during an accessibility fix is still copy.

Luna may place approved strings in templates, apply responsive wrapping through styling, and preserve existing text that is outside scope. It must not change the words to make a layout fit. If text does not fit, adjust the layout or send a copy request to Sol. Technical implementation notes and code identifiers are separate from website copy; they must not become visible UI text.

The coordinator routes every wording request to Sol and checks implementation against the manifest. It does not silently rewrite Sol's copy. Existing audit examples are proposals, not approved implementation strings: Sol must review and author the final versions. If either requested model/configuration is unavailable, report that limitation; do not substitute a model for copy work.

Do not call AI copy-generation scripts against a model during this work. Their defaults do not meet this ownership requirement. Any future generation of website wording must also use GPT-6.1 Sol Medium and pass editorial review; preventing automatic replacement of approved copy is part of the backlog.

### Capacity and sequencing

There are four concurrent agent slots, including the coordinator. Therefore at most **three subagents** run simultaneously. The writer consumes one of those slots.

Use this pattern within each sprint:

1. **Prepare:** Sol writes the sprint's copy while up to two Luna agents investigate or implement independent work that needs no new wording.
2. **Lock:** Sol delivers a reviewed, versioned copy manifest and becomes idle. The coordinator confirms shared interfaces and file ownership.
3. **Implement:** Up to three Luna agents work in parallel on independent file sets, using only the locked wording.
4. **Resolve copy:** If a wording gap emerges, leave the affected story pending. Finish independent tasks, free a slot, and resume Sol. Redistribute the revised manifest only to affected owners.
5. **Integrate and inspect:** Merge changes in dependency order, run combined checks, and route defects to the owning developer. Reuse idle agents where practical; stop agents that are no longer needed before starting replacements.

Do not run the coordinator, Sol, and three Luna developers simultaneously. Do not create sidebar chats for subtasks; use subagents within the implementation chat.

## Scrum cadence and artifacts

Use three proposed **two-working-day sprints** after kickoff. These are planning timeboxes, not a promise of autonomous background execution or a scheduled automation. Work can finish sooner. Re-estimate after Sprint 1; if scope exceeds capacity, move lower-priority stories rather than stretching the sprint indefinitely.

| Event / artifact | Coordination practice | Output |
| --- | --- | --- |
| Sprint Planning | Choose stories that support the Sprint Goal; verify readiness, dependencies, ownership, and capacity. | Sprint Backlog, ownership map, acceptance checks. |
| Developer checkpoint / Daily Scrum | At least daily during an active sprint, and at copy lock, integration, and blocker discovery, developers report completed work, next work, and impediments against the goal. Use async messages; do not require continuous user attendance. | Updated board and dependency decisions. |
| Backlog refinement | Clarify future stories during the sprint without disrupting its goal. Ask Ash only for facts or preferences that cannot be resolved from reliable context. | Ready stories for the next planning event. |
| Sprint Review | Demonstrate a working increment with before/after views and evidence. Ash can inspect it and reprioritize remaining work. | Accepted outcomes, feedback, and updated Product Backlog. |
| Sprint Retrospective | Review handoff quality, file conflicts, copy drift, defect causes, and estimate accuracy. Pick one process adjustment. | A concrete coordination improvement for the next sprint. |

Maintain `scrum-board.md` during implementation. Each story records ID, priority, owner, dependencies, estimate, acceptance criteria, status, evidence, and unresolved decisions. Use: **Ready → In progress → Review → Done**, with a separate Blocked marker and reason. This document does not claim a live board already exists.

“Ready” is a team working agreement, not a formal Scrum commitment: scope, assets, acceptance criteria, owner, and prerequisites must be sufficient to begin. Preliminary estimates below are relative effort points, not hours, productivity scores, or measured velocity.

## Ordered Product Backlog

| ID | Priority / initial size | User outcome | Acceptance criteria | Dependencies / target |
| --- | --- | --- | --- | --- |
| UX-01 | P1 / 3 | Contact controls do not interrupt browsing. | No overlap with work links, filters, or text at 360/390/430px and 200% text/zoom checks; contact remains discoverable. | Sprint 1 |
| UX-02 | P1 / 5 | Every social project remains understandable if embeds fail. | Stable poster or intentional fallback, platform link, and reserved media space; scripts blocked does not leave the sole representation empty. | Assets and Sol fallback labels; Sprint 1 |
| UX-03 | P1 / 5 | Visitors read clear, natural service descriptions. | Sol-authored manifest covers key intros, homepage sections, footer, enquiry labels; no unsupported growth/conversion claims. | Fact review and Sol copy lock; Sprint 1 |
| UX-04 | P1 / 2 | HR WorkTech scope is understood once. | One concise intro and role line; no repeated paragraph; appropriate existing cover selected through importer if available. | Sol wording; cover inspection; Sprint 1 |
| UX-05 | P1 / 2 | Each enquiry draft matches the service. | Photo, video, social, and general journeys use relevant approved text; inspect destinations without sending. | Sol wording and enquiry helper contract; Sprint 1 |
| UX-06 | P2 / 5 | Homepage quickly establishes services and shows work. | Consolidated hero, clear primary/secondary actions, predictable image crop; services and Singapore apparent at first view. | Sprint 1 copy and control behavior; Sprint 2 |
| UX-07 | P2 / 5 | Headings and cards are readable and aligned. | Deliberate font stack and display/section/card/body scale; no collisions or clipping; long titles remain readable. | Shared visual contract and Sol title revisions; Sprint 2 |
| UX-08 | P2 / 3 | Work and practical information are easy to reach. | Shorter service intros; visible access to work/details; photography prices and delivery reachable without passing every gallery. | UX-03, shared spacing contract; Sprint 2 |
| UX-09 | P2 / 2 | Every category is discoverable on mobile. | Consistent filters; no ambiguous clipped category; selection and deep links retain expected ordering. | Shared styles owner; Sprint 2 |
| UX-10 | P2 / 3 | Pages have a clear ending and next step. | Reduce redundant testimonial/CTA sections; quotes retain meaning; channel labels match actual destinations. | Sol manifest and layout integration; Sprint 2 |
| UX-11 | P2 / 5 | Keyboard users can browse images reliably. | Focus containment/restoration, Escape, next/previous, numbered button labels, visible focus, background interaction handled. | Sol accessibility strings; Sprint 3 |
| UX-12 | P3 / 3 | Galleries and motion controls are understandable. | Return link, fitting related-work label, menu open/close labels, static carousel or explicit pause with reduced-motion behavior preserved. | Sol strings; shared component contracts; Sprint 3 |
| UX-13 | P2 / 5 | Project descriptions explain the actual contribution. | Audit published photography/social entries; supported roles only; remove repetition and vague praise; metrics appear once with available context. | Sol evidence-backed copy and upstream brief checks; Sprint 3 |
| UX-14 | P2 / 3 | Future generation does not undo approved wording. | Protect authored text; address description/summary/cardSummary precedence; scripts cannot generate website copy through Luna or another default model. No API calls during checks. | Sol copy rules; source-input review; Sprint 3 |
| UX-15 | P1 release gate / 3 | The complete site works as one increment. | Required validation/build and route checks pass; responsive, keyboard, fallback, and enquiry evidence recorded; generated diff reviewed. | Incremental in every sprint; final pass in Sprint 3 |

UX-02 must not be marked Done until suitable assets or an explicitly designed alternative exist for every affected published project. Use user-provided or already authorized assets; do not fabricate a project still or quietly rely on the same failing embed. An asset gap blocks that story, not the entire sprint.

## Sprint 1 — Dependable browsing and plain service copy

**Sprint Goal:** A mobile visitor can browse representative work and reach a relevant enquiry path without overlapping controls or dependence on successful third-party embeds.

**Selected stories:** UX-01–05, plus the relevant UX-15 checks. Split or defer lower-priority copy refinements if preparation shows the selection exceeds capacity.

| Stage | Parallel assignments | Gate / intended result |
| --- | --- | --- |
| 1A: readiness and wording | Sol authors the copy manifest and records facts/unknowns. Luna A investigates overlap and responsive constraints. Luna B inventories social covers and implements the media wrapper structure without inventing labels. | Agree mobile contact behavior, fallback strategy, and exact enquiry-helper signature. |
| 1B: implementation after copy lock | Luna A owns floating contact control and its narrow shared-style changes. Luna B owns social embed components and poster integration. Luna C owns enquiry helpers, Contact integration, site strings, homepage/footer copy placement, and HR WorkTech copy placement. | Each owner supplies a changed-file list, checks, and a manifest comparison. |
| 1C: sequential integration | Integrate C's enquiry helper first, then A's consuming contact control. Integrate B's fallback presentation, then verify homepage/social integration with C. | Working contact/fallback increment and visible copy replacements; no undefined helpers or mismatched labels. |

**Exclusive file ownership:** A: `FloatingContactButton.astro`, `styles.css`. B: `ContentEmbedGrid.astro`, `HomeSocialHighlights.astro`, poster assets and any new shared social-preview component. C: `src/lib/enquiries.ts`, `src/lib/site.ts`, `src/pages/contact.astro`, `src/pages/index.astro`, `Footer.astro`, HR WorkTech content. B requests global styles from A; C requests styling changes rather than editing A's file.

**Intended result:** Readable first impressions and dependable project previews; photography/video/social enquiries open relevant drafts. Existing prices and commitments remain unchanged. Demonstrate the mobile overlap fix and blocked-script fallback at review.

## Sprint 2 — Typography, alignment, and navigation through the page

**Sprint Goal:** Visitors can scan services and work with a consistent visual hierarchy and find practical information without excessive scrolling.

**Selected stories:** UX-06–10, plus UX-15 checks.

| Stage | Parallel assignments | Gate / intended result |
| --- | --- | --- |
| 2A: shared visual contract | Sol finalizes shorter headings, card titles, anchor labels, and selected excerpts. Luna A defines font/spacing/button contracts. Luna B investigates service-layout changes without changing shared styles. | Lock class names, heading scale, content widths, CTA hierarchy, and exact strings. |
| 2B: parallel implementation | Luna A owns global styles, homepage hero, shared card typography, and carousel layout. Luna B owns Photography, Event video, Contact, and shared booking/service/testimonial components. Luna C owns Social media layout, social filters, social-preview alignment, and approved project title updates. | No competing edits to global styles or shared components. |
| 2C: sequential integration | Integrate A's shared foundation, then B and C's consumers. Run combined route comparisons; route each defect to its owner. | One coherent visual increment across pages, including long-title cases and breakpoint transitions. |

**Exclusive file ownership:** A: `styles.css`, homepage, `WorkCard.astro`. B: Photography/Event video/Contact pages, `WhatToExpectSection.astro`, `BookingProcess.astro`, `BookingPrompt.astro`, `TestimonialsSection.astro`, `ContactSection.astro`. C: Social media page, social embed/highlight components, approved photography/social content title edits. Only C edits content files this sprint; other agents request needed strings through the manifest and C.

**Intended result:** Less dominant display type, legible card headings, consistent alignment, discoverable categories, earlier access to prices/delivery, and fewer redundant calls to action. Review actual before/after screenshots rather than accepting CSS values as proof.

## Sprint 3 — Accessible browsing, project depth, and regression protection

**Sprint Goal:** Visitors can browse projects with keyboard or touch, understand Ash's role, and trust that approved copy survives the content workflow.

**Selected stories:** UX-11–15.

| Stage | Parallel assignments | Gate / intended result |
| --- | --- | --- |
| 3A: content and interaction contracts | Sol authors project revisions, role statements, alt/numbered labels, return links, pause labels, and editorial rules for generation. Luna A investigates focus behavior. Luna B inspects importer/generator precedence and preservation. | Fact gaps recorded; no invented roles or results. Agree string interpolation and protection behavior before implementation. |
| 3B: parallel implementation | Luna A owns lightbox/gallery interaction, Nav, and carousel control. Luna B owns content-file updates, safe generator changes, and importer-consistent source updates if needed. Luna C performs read-only integration QA and prepares reproducible defect reports; it does not rewrite copy or edit another owner's files. | Defects feed back to A/B or coordinator-assigned previous owners; no opportunistic fixes. |
| 3C: gallery composition | After A's image-button contract is stable, A owns gallery-route return navigation and category-aware related headings. B's content revision integrates against that final template. | Correct field precedence, no duplicate description/body, and no route/ranking changes. |
| 3D: final gate | Coordinator serializes importer/build, inspects generated changes, and coordinates route and keyboard rechecks. Sol reviews final rendered strings if wording changed. | Usable, reviewable release candidate with complete evidence. |

**Exclusive file ownership:** A: `Nav.astro`, `Lightbox.astro`, `JustifiedGallery.astro`, `src/scripts/gallery.js`, homepage carousel code, gallery route. B: photography/social content, copy-generation scripts, necessary gallery briefs and importer-related updates. C: QA notes/evidence only. Global style repairs remain with the coordinator-assigned single styles owner; do not allow A and B to patch `styles.css` independently.

**Intended result:** Correct focus restoration and keyboard navigation, clear project-return paths, accurate contribution-focused descriptions, deliberate motion control, and protection against accidental copy replacement.

## Handoff and integration rules

Each dispatch contains the repository instructions, Product/Sprint Goal, story IDs, exact file allowlist, dependency contracts, copy-manifest version, acceptance criteria, prohibited changes, and expected evidence. `fork_turns: "none"` requires passing this context explicitly rather than assuming inherited history.

Sol's manifest records: string ID, route/component/field, exact text, factual basis, pending questions, and version. For content, cover `description`, `summary`, `cardSummary`, title, and body together. Any later wording revision increments the version and identifies affected owners.

Each developer handoff records: story status; changed files; supplied wording IDs used; checks performed; failures/limitations; remaining dependencies; and generated files affected. The coordinator checks the diff and rendered behavior before moving the story to Done.

One active writer owns each file at a time. With the shared checkout, concurrent agents must use disjoint allowlists. If a dependency requires an ownership transfer, the current owner finishes and hands off before the next edits. Isolated worktrees may be used when useful, but integration still follows the dependency order and user changes must be preserved. Only the coordinator performs Git integration and any authorized commit/push operations.

Only one process may run the gallery importer or full build at a time; they write generated content and images. Never run them while content agents are editing the same destinations. No agent independently deploys, merges, or publishes. Handle release according to the user's authorization at that time; do not infer publication from completion of this planning request.

## Definition of Done

A story is Done only when its acceptance criteria pass in the integrated increment, all applicable copy matches the Sol manifest, required factual support exists, and evidence is attached to the board. Code completed in an agent branch is not sufficient.

For each sprint increment:

- Required `npm run validate` passes; required build passes when content, gallery inputs/assets, scripts, or configuration changed.
- Affected routes are inspected at relevant mobile/desktop sizes. Final coverage includes 360/390/430, 768, 1280/1440, hero breakpoint edges, and 200% zoom checks.
- Keyboard checks cover menu, filters, lightbox, Escape, focus restoration, and visible focus. Reduced motion and explicit carousel stopping are checked where applicable.
- Social previews remain usable with scripts blocked; external links and service enquiry drafts are verified without sending.
- Prices, commitments, schema, slugs, category order, source images, and unrelated local work are preserved. Generated files come from the importer and their diff is reviewed.
- No secrets, `.env`, inbox sources, dependencies, build output, or cache files enter a commit.
- Sol Medium owns every changed website string. Unresolved copy is returned to Sol; it is never filled in by Luna.
- No unresolved critical browsing defect is hidden by marking a story Done. Incomplete stories return to the Product Backlog for replanning.

## Intended results and review evidence

| Outcome | Evidence to bring to Sprint Review | Sprint |
| --- | --- | --- |
| Browsing is unobstructed | Mobile screenshots with hero actions, filters, and project text visible alongside the contact behavior. | 1 |
| Work survives embed failure | Same project demonstrated with scripts enabled and blocked; recognizable preview and platform link in both. | 1 |
| Voice is calm and concrete | Before/after string manifest, factual notes, and rendered introduction/project examples reviewed by Sol. | 1–3 |
| Layout feels coherent | Comparative screenshots of hero, cards, service intros, filter rows, and page endings at the agreed sizes. | 2 |
| Practical information is findable | Demonstrate the path from service introduction to starting prices, delivery details, and relevant enquiry draft. | 2 |
| Galleries work with keyboard | Recorded test steps for opening, next/previous, Tab/Shift+Tab, Escape, and return to the originating image. | 3 |
| Copy changes persist | Safe fixture checks showing authored text survives generator/importer behavior; no live API calls or unintended content rewrites. | 3 |
| Release candidate is integrated | Passing required checks, route evidence, reviewed diff, and remaining limitations explicitly listed. | Every sprint; final in 3 |

Business intent is more confidence and less friction. An enquiry/conversion uplift is a hypothesis, not an acceptance criterion or promised result. No tracking installation, service-price change, or analytics project is included in this plan.

## Decisions and impediments

Proceed independently on reversible implementation details once implementation is authorized. Ask Ash only when missing facts materially affect the outcome, such as an unverified project role, unavailable poster, uncertain usage permission, or a new service promise. Keep dependent work pending while continuing ready independent stories.

Default design direction: retain the current palette; use a deliberate system font stack first; make all short filter labels visible; favor a dependable poster over automatic embed loading; use one principal enquiry action per section. Bring alternatives to Sprint Review if evidence suggests a better result.

If Ash changes priorities mid-sprint, the coordinator and developers reassess scope with him while protecting the Sprint Goal. Do not silently add work to each agent's assignment. End each review with a clear increment status, unfinished story list, next sprint selection, and any decision that truly requires Ash.
