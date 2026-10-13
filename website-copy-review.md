# Website copy for review

Version 1.1 · 13 October 2026 · Draft for Ash’s review

Authored by the dedicated GPT-6.1 Sol Medium copy writer. This is a review document only; no website implementation, commit, or publication is included.

**Changes in 1.1:** Revised the homepage Photography and Social media introductions and the featured event film’s production paragraph. Updated delivery wording to Ash’s confirmed timings. Removed all photography-gallery and social-project rewrites, proposed metric changes, new image-alt work, and SEO proposals.

**Current scope:** Review page introductions, service information, shared calls to action, enquiry messages, and control/fallback labels. Preserve every existing photography-gallery and social-project title, description, summary, card summary, body, metric value, and image alt attribute. Metadata changes remain outside scope unless Ash explicitly requests them. These exclusions supersede the broader proposals in version 1.0 and the earlier action and delivery plans.

Photography, event video, and social media remain the public services. Prices stay unchanged. Data pages and the disabled social case-study block remain outside this revision.

## 1. Home

Location: `src/pages/index.astro`, with shared event film, social highlights, testimonials, and contact components.

### Introduction — HOME-01

**Small greeting, optional:** Hi, I’m Ash.

**H1:** Photography, event video, and social content.

**Introduction:** I’m a freelance photographer and videographer based in Singapore. I cover corporate events, private celebrations, and social content shoots.

**Primary action:** Explore my work

**Secondary action:** Check availability

The greeting is a small line above the heading, rather than a second large heading. If the greeting is retained, use this introduction instead to avoid repeating it: “I’m a photographer and videographer based in Singapore, covering corporate events, private celebrations, and social content shoots.” The recommended version is the H1 and introduction without the optional greeting. Remove the separate list of job titles; the introduction already establishes the services.

### Photography section — HOME-02

**Section label:** Photography

**H2:** Events and celebrations

**Supporting text:** Event photography for conferences, corporate gatherings, and private celebrations. View selected coverage below.

**Section action:** View all galleries

Use one link to the Photography page for this section. Preserve the cards’ existing project titles and summaries.

### Event video section — HOME-03

Use VIDEO-02 below for the shared featured film title and description.

**Section action:** Explore event video

The homepage uses the film description only. Keep the production-role paragraph on the Event video page.

### Social media section — HOME-04

**Section label:** Social media

**H2:** Short videos for Instagram and TikTok

**Supporting text:** I produce, film, and edit reels for Instagram and TikTok, from General Assembly’s career education videos to creator-led retail features and property walkthroughs.

**Section action:** Explore social media

**Category links:** More corporate work / More lifestyle work / More property videos

Preserve the existing project descriptions and performance figures, including their current placement on Home and Social media.

### Testimonials — HOME-05

**Section label:** Client feedback

**H2:** What clients say

Keep the three authentic quotations and their attributions unchanged, as transcribed in Appendix B. No extra testimonial CTA is needed before the closing contact section.

### Closing contact section — HOME-06

**Section label:** Get in touch

**H2:** What are you planning?

**Text:** Tell me your date, location, and what you need. I’ll let you know my availability and we can discuss the details.

**Action:** Check availability

## 2. Photography

Location: `src/pages/photography/index.astro`.

### Introduction — PHOTO-01

**Section label:** Photography

**H1:** Events, celebrations, and portraits

**Introduction:** I photograph conferences, company gatherings, weddings, and private celebrations in Singapore. You’ll also find portraits and creative shoots in the galleries below.

**Work anchor:** Browse galleries

**Details anchor:** Pricing and delivery

### Compact service summary — PHOTO-02

**Text:** Half-day coverage from $600. Full-day coverage from $1,400. Event galleries delivered within 3–5 business days.

**Details link:** View pricing and delivery details

This is a short summary near the introduction, not another enquiry section. Use the existing pricing values when implementing it.

### Gallery categories — PHOTO-03

All / Corporate & private events / Stage work / Photoshoots / Weddings & ROM

These are display labels only. Keep the existing category identifiers, filtering, and sort order.

### Service details — PHOTO-04

Location: the Photography instance of `WhatToExpectSection.astro`.

**H2:** Pricing and delivery

**Introduction:** A few practical details before we discuss your event or shoot.

| Label | Exact text |
| --- | --- |
| Half-day coverage | From $600. |
| Full-day coverage | From $1,400. |
| Your quote | Pricing depends on the coverage duration and requirements. We’ll agree the hours and deliverables before booking. |
| Photographs | The number of edited photographs varies with the length and programme of the event. We’ll discuss the expected delivery when agreeing your coverage. |
| Turnaround | Event galleries are delivered within 3–5 business days. |
| Expedited delivery | Delivery within 1 business day or on the same day may be available by arrangement. Let’s discuss what you need before booking. |
| Booking ahead | If you can, enquire at least 2 weeks ahead, especially for weekends and peak-season dates. |
| Usage | Images are yours to use for marketing, recaps, and future promotion. |

The usage row retains the existing statement. Turnaround reflects Ash’s confirmed event delivery window; expedited delivery is subject to discussion, not a guarantee.

### Page ending — PHOTO-05

Use BOOKING-01 below, with one concluding “Check availability” action. Do not add a second full enquiry section after it. If retaining a relevant testimonial, use Gracia’s complete quotation from Appendix B before the practical details.

## 3. Event video

Location: `src/pages/videography/index.astro`; shared featured-film fields in `src/lib/site.ts` and `EventFilmFeature.astro`.

### Introduction — VIDEO-01

**Section label:** Event video

**H1:** Highlight films, interviews, and speeches

**Introduction:** Video coverage for conferences, company gatherings, and private celebrations in Singapore.

**Work anchor:** Watch event films

**Details anchor:** Coverage options

### Featured film — VIDEO-02

**Section label:** Featured event film

**Title:** Airwallex × Ecom North

**Second title line:** Singapore Summit

**Description:** A highlight film from the Airwallex × Ecom North Singapore Summit, bringing together speaker sessions, conversations, and moments from the event.

**External action:** View LinkedIn post

**Role heading:** My role

**Role paragraph:** I planned the coverage around the summit programme, then filmed the speakers, conversations, and atmosphere on the day. In the edit, I selected the moments that connected the sessions with the people in the room, shaping them into the finished highlight film. I handled the production from planning through to delivery.

This role is supported by the existing Event video page. The description intentionally omits the attendee count and the summit’s business-growth positioning; neither is needed to explain the work.

### Other films — VIDEO-03

**H2:** More event films

**Title:** The Retail Growth Playbook

**Description:** A recap of the Airwallex and Singapore Retailers Association session on retail growth beyond Singapore, combining speaker perspectives with footage from the event.

**Title:** Beyond Borders

**Description:** An event recap featuring voices from Airwallex, SleekFlow, and ReturnHelper, alongside conversations from the e-commerce community.

Do not apply the featured film’s production-role paragraph to these two films without confirming the assignments.

### Coverage options — VIDEO-04

**H2:** What would you like to capture?

| Heading | Exact text |
| --- | --- |
| Highlight films | Key moments, people, and atmosphere brought together in one edited film. |
| Interviews | Conversations with speakers, guests, or your team. |
| Full speech recordings | A complete recording of a presentation or speech for later viewing. |

**Planning note:** We’ll agree the video length, filming format, turnaround, and revisions before booking. If you need horizontal and vertical versions, or photography alongside video, include that in your enquiry.

**Turnaround:** Event video is delivered within 3–5 business days.

**Expedited delivery:** Delivery within 1 business day or on the same day may be available by arrangement. Let’s discuss what you need before booking.

### Page ending — VIDEO-05

Use BOOKING-01, ending with one “Check availability” action linked to the video enquiry path. If a separate booking prompt remains instead, use BOOKING-02’s video variant and remove the booking-process action.

## 4. Social media

Location: `src/pages/content/index.astro`, `ContentEmbedGrid.astro`, and `HomeSocialHighlights.astro`.

### Introduction — SOCIAL-01

**Section label:** Social media

**H1:** Reels for businesses and creators

**Introduction:** Selected videos for Instagram and TikTok, including education, lifestyle, and property content.

**Work anchor:** Browse videos

**Details anchor:** Packages and turnaround

### Categories — SOCIAL-02

All / Corporate / Lifestyle / Real estate

Preserve all existing reel titles, descriptions, body copy, and metrics. Keep posts in their existing date order and keep category filtering independent of that order. Preview and platform-link wording is in Appendix C.

### Service details — SOCIAL-03

**H2:** Packages and turnaround

**Introduction:** Start with one video, plan a campaign, or arrange regular content shoots.

| Label | Exact text |
| --- | --- |
| Single pieces | From $350. |
| Campaign packages | From $875 for multiple pieces for a launch or promotion. |
| Ongoing partnerships | From $1,200 per month. |
| Monthly scope | A typical monthly scope covers up to 4 pieces across Instagram, TikTok, or LinkedIn, with 1 round of revisions per piece. |
| Turnaround | A single video is delivered within 3 business days of filming. |
| Expedited delivery | Delivery within 1 business day or on the same day may be available by arrangement. Let’s discuss what you need before booking. |
| Commitment | Ongoing partnerships run month-to-month, with no lock-in contract. |

The package rows do not imply that every monthly scope costs the starting price. The single-video timing is confirmed by Ash; expedited delivery is subject to discussion.

### Relevant feedback — SOCIAL-04

If retaining a service-page testimonial, use Wani’s complete quotation from Appendix B. Remove the repeated three-person section from this page.

### Page ending — SOCIAL-05

**H2:** Have a video in mind?

**Text:** Tell me what you’d like to make, where it will be posted, and when you need it.

**Action:** Check availability

Link to the social-specific Contact path. Do not append another general contact section.

## 5. Contact

Location: `src/pages/contact.astro`.

### Introduction — CONTACT-01

**Section label:** Contact

**H1:** Tell me about your project

**Introduction:** Share your date, location, and what you need. Message me on WhatsApp or email your brief.

### Contact cards — CONTACT-02

| Element | WhatsApp card | Email card |
| --- | --- | --- |
| Small label | WhatsApp | Email |
| Heading | Chat with me | ashchong138@gmail.com |
| Supporting text | For an availability check or an initial conversation. | For briefs, schedules, and detailed enquiries. |
| Action | Open WhatsApp | Send an email |

Keep the current email address and WhatsApp number. The WhatsApp draft changes with the referring service; exact messages are below. No response-time promise is added.

### Optional compact work links — CONTACT-03

**Heading:** Browse the work

**Links:** Photography / Event video / Social media

The recommended Contact page ends after the two contact cards. If work links are useful, use this compact group instead of the current full follow-up section. Do not repeat the testimonials here.

## 6. Shared copy

### Navigation — SHARED-01

**Brand:** Ash Chong

**Navigation:** Photography / Event video / Social media / Contact

**Home link:** Home

Keep Data hidden according to the existing section switch.

### Footer — SHARED-02

Location: `Footer.astro`.

**Brand:** Ash Chong

**Description:** Photography, event video, and social content in Singapore.

**Navigation group label:** Explore

**Contact group label:** Get in touch

**Contact link:** Check availability

**Copyright:** © {year} Ash Chong

**Location:** Singapore

### Booking process — BOOKING-01

Location: `BookingProcess.astro`, used on Photography and Event video.

**H2:** How booking works

| Step | Heading | Exact text |
| --- | --- | --- |
| 1 | Share your plans | Tell me your date, venue, and the coverage you need. |
| 2 | Agree the details | We’ll confirm the scope, deliverables, fee, and delivery schedule before booking. |
| 3 | On the day | I’ll photograph or film the agreed brief, following your programme and priorities. |
| 4 | Receive your work | I’ll deliver the agreed photographs or video. |

**Concluding action:** Check availability

Use a service-specific Contact destination. If a separate concluding booking prompt follows, remove this action to avoid two equivalent endings.

### Gallery and alternative closing prompts — BOOKING-02

Location: `BookingPrompt.astro`.

| Variant | Heading | Supporting text | Action |
| --- | --- | --- | --- |
| Event photography | Planning an event? | Tell me your date, venue, and coverage requirements. | Check availability |
| Portrait or creative shoot | Planning a photoshoot? | Tell me what you have in mind and when you’d like to shoot. | Check availability |
| Wedding or ROM | Planning your celebration? | Tell me your date, venue, and the moments you’d like photographed. | Check availability |
| Event video | Planning event video coverage? | Tell me your date, venue, and what you want the finished video to cover. | Check availability |

The wedding wording is a new display variant, not a new service or route. Use it for the existing `wedding-rom` category if implemented. Photoshoot enquiries still use the photography service.

### Floating contact control — SHARED-03

**Visible label, if text is shown:** WhatsApp

**Accessible label:** Contact Ash on WhatsApp

Keep this wording consistent for the compact and desktop versions. It opens the appropriate draft below; it does not submit a message.

### Enquiry drafts — ENQUIRY-01 to ENQUIRY-04

Location: `src/lib/enquiries.ts`; the general draft replaces the existing `site.ts` draft. Preserve the blank lines shown. “Social media” is the public label; the implementation may use `content` as its service key.

**General — ENQUIRY-01**

```text
Hi Ash, I’d like to enquire about a project.

Service needed:
Date or timeframe:
Location:
Requirements:

Could you let me know your availability?
```

**Photography — ENQUIRY-02**

```text
Hi Ash, I’d like to check your availability for photography.

Date:
Venue:
Event or shoot type:
Coverage hours:
Requirements:
```

**Event video — ENQUIRY-03**

```text
Hi Ash, I’d like to check your availability for event video coverage.

Date:
Venue:
Coverage hours:
Intended use:
Video requirements:
```

**Social media — ENQUIRY-04**

```text
Hi Ash, I’d like to enquire about social media content.

Filming date or timeframe:
Location:
Platform:
Number of pieces:
Requirements:
```

**Email subject — ENQUIRY-05:** Project enquiry

Retain the existing email subject unless service-specific email drafts are deliberately added later. No email body is proposed or automatically sent.

## Appendix A. Project content preservation

Keep all existing photography-gallery and social-reel content unchanged, including generated descriptions. This covers all 22 published photography entries, including hidden galleries, and all eight published social entries.

Preserve the existing titles, generated titles, descriptions, summaries, card summaries, MD/MDX bodies, embedded post captions, service lists, and metrics. Do not shorten titles, rewrite descriptions, remove repeated project text, change field precedence, or replace generated paragraphs with new role statements. This includes HR WorkTech and every project discussed in the earlier draft.

Keep the supplied performance numbers and their current presentation. Do not hide them, relocate them, add observation-date or paid/organic caveats, or request further evidence as a condition of this work. Existing image alt attributes remain unchanged; no new image descriptions or alt-text audit are included.

Ash confirms that he produced, filmed, and edited all the social work. This supports HOME-04’s service statement. It does not require adding a role claim to every reel.

The separate featured-film paragraph on the Event video page remains in scope as VIDEO-02. It does not authorise changes to photography-gallery or social-reel content.

## Appendix B. Testimonial wording — QUOTE-01 to QUOTE-03

These are complete, unchanged authentic quotations from the three published testimonial files. Preserve their wording, punctuation, names, and roles. Do not use the sample draft testimonials. No shortened excerpt is required by this proposal.

### QUOTE-01 · Gracia G.

**Attribution:** Gracia G.

**Role:** Managing Director of The Right Company

> I have worked with Ash on several occasions and the work he produces has always been of high standard. He is meticulous in his craft and is always prepared for the photoshoot. I would definitely recommend engaging Ash for your photography needs!

### QUOTE-02 · Wani M.

**Attribution:** Wani M.

**Role:** Founder of Curly Beans

> Ash has been a fantastic content creator to work with. He quickly understood our brand and consistently came up with creative, engaging reel ideas that felt authentic to Curly Beans. The content he produced helped us achieve strong engagement on all of our social media platforms. We highly recommend Ash to any business looking to grow its social media presence.

### QUOTE-03 · Shilpa S. N.

**Attribution:** Shilpa S. N.

**Role, line 1:** Founder, Women in AI Singapore

**Role, line 2:** Foundation Lead, AI Verify Foundation

> Ash was a pleasure to work with from start to finish. He was professional, thoughtful and blended naturally into the event while capturing the moments that truly mattered. The final images beautifully reflected the energy and connections within our community. I would happily recommend him to anyone looking for an event photographer who understands storytelling.

The client’s own outcome language remains part of the quotation; it is not reused as Ash’s unqualified service promise.

## Appendix C. Controls, accessibility, and fallbacks

Exact strings follow. Braces mark interpolation variables, not text to display literally. `{index}` is 1-based; `{total}` counts the rendered items. `{title}` is the existing project title, except for the separately proposed featured event film heading. `{platform}` is Instagram, TikTok, or LinkedIn. Use sensible singular/plural forms where specified.

### Navigation and page regions — A11Y-01

| Use | Exact string |
| --- | --- |
| Brand link accessible name | Ash Chong — Home |
| Primary navigation | Main navigation |
| Mobile menu, closed | Open navigation menu |
| Mobile menu, open | Close navigation menu |
| Skip link, if introduced | Skip to main content |
| Footer navigation | Footer navigation |
| Photography filter group | Photography categories |
| Social filter group | Social media categories |
| Photography work region | Photography galleries |
| Social work region | Social media videos |
| Photography filter result, plural | {count} galleries shown |
| Photography filter result, singular | 1 gallery shown |
| Social filter result, plural | {count} videos shown |
| Social filter result, singular | 1 video shown |

Only announce counts when a user changes a filter. Avoid automatically announcing every image or carousel transition.

### Gallery navigation — A11Y-02

| Use | Exact string |
| --- | --- |
| Breadcrumb navigation | Breadcrumb |
| Breadcrumb parent | Photography |
| Breadcrumb current item | {title} |
| Return link near title | Back to photography |
| Image grid name | {title} photographs |
| Thumbnail button name | Open photo {index} of {total} from {title} |
| Lightbox dialog name | {title} photo viewer |
| Lightbox close, visible | Close |
| Lightbox close, accessible | Close photo viewer |
| Previous control | Previous photo |
| Next control | Next photo |
| Position/status | Photo {index} of {total} |
| Keyboard help, if needed | Use the arrow keys to browse and Escape to close. |
| External album link, existing Google Photos URL | View full gallery |
| Related section label | Related work |
| Related heading, corporate/private | More events and celebrations |
| Related heading, stage | More stage photography |
| Related heading, photoshoot | More portraits and creative shoots |
| Related heading, wedding/ROM | More weddings and celebrations |
| Related heading, mixed categories only | More photography |

Use a category heading only if the cards underneath match it. The present related-work selection may include other categories; use “More photography” for a mixed selection.

### Existing image text — A11Y-03

Retain every existing image alt attribute. No new descriptive image text, replacement alt text, or image-by-image review is proposed. Numbered gallery-button names and player/control labels remain separate interaction copy.

### Homepage carousel, if retained — A11Y-04

| Use | Exact string |
| --- | --- |
| Carousel region | Selected photography |
| Image selector group | Choose a photograph |
| Image selector | Show photo {index} of {total} |
| Previous | Previous photo |
| Next | Next photo |
| Pause, visible | Pause slideshow |
| Pause, accessible | Pause automatic slideshow |
| Resume, visible | Play slideshow |
| Resume, accessible | Start automatic slideshow |

A static lead image requires none of these controls. With rotation, the control label must follow the actual state, including persistent pause and reduced-motion settings.

### Social previews and external links — MEDIA-01

| State/use | Exact string |
| --- | --- |
| Optional preview label | Video preview |
| Load button, visible | Load {platform} video |
| Load button, accessible | Load {title} from {platform} |
| Before loading | Load the video here or watch it on {platform}. |
| Loading, only after request | Loading video… |
| Persistent platform link | Watch on {platform} |
| Platform link accessible name | Watch {title} on {platform} |
| Persistent fallback helper | If the video doesn’t play here, watch it on {platform}. |
| No local preview image | Watch this video on {platform}. |
| Post with no usable external URL or media | This video is currently unavailable. |
| Iframe title | {title} — {platform} video |
| External-link new-tab cue, if link opens a tab | Opens in a new tab |

Show the title, description, platform, and usable external link even when no poster exists. “No local preview image” is a copy state, not permission to invent a still. Do not display an error message just because an iframe might fail; the persistent helper works without inspecting the third-party frame. If the implementation can prove a local loading failure, use “The video couldn’t load here. Watch it on {platform}.”

Use the same wording on Home and Social media. Keep platform links available after loading. Remove developer-facing instructions such as “Add an embed or preview image” from public output.

### Event video controls — MEDIA-02

| Use | Exact string |
| --- | --- |
| Play button accessible name | Play {title} |
| Embedded player title | {title} — event film |
| YouTube fallback link | Watch on YouTube |
| YouTube link accessible name | Watch {title} on YouTube |
| Featured-film LinkedIn link | View LinkedIn post |
| Featured-film LinkedIn accessible name | View the Airwallex × Ecom North film on LinkedIn |
| Persistent YouTube fallback helper | If the film doesn’t play here, watch it on YouTube. |

For the featured film, `{title}` is “Airwallex × Ecom North Singapore Summit”, combining both title lines without punctuation fragments. YouTube destinations use the existing video IDs. No new upload or hosting promise is made.

### Empty states — EMPTY-01

| Use | Exact string |
| --- | --- |
| Photography list empty | No galleries to show right now. |
| Photography category empty | No galleries in this category yet. |
| Social list empty | No videos to show right now. |
| Social category empty | No videos in this category yet. |
| Empty gallery page | Photographs for this gallery are currently unavailable. |
| Return from an empty category | View all work |

These are interface states only. Do not change existing project descriptions or insert generic replacement copy. Keep source-folder paths and authoring prompts out of public interface text.

## Appendix D. Metadata — explanation only

An SEO title appears in the browser tab and can appear in search results and shared links; it is separate from the visible page heading. A metadata description can appear in search and sharing previews. Neither involves writing image alt text.

No SEO title, metadata description, gallery metadata, or sharing-image change is proposed in version 1.1. Preserve the current metadata unless Ash explicitly requests a separate revision.

## Appendix E. Handoff and scope

The labelled blocks above identify exact proposed strings and their locations. Implementation must use the reviewed wording without rewriting it to fit the layout. All website wording remains owned by the dedicated GPT-6.1 Sol Medium writer.

**In scope:** Page-level service copy, the featured event film’s production account, confirmed delivery information, shared CTA and booking copy, enquiry drafts, and navigation/player/gallery control labels and fallback interface messages.

**Out of scope:** Any change to photography-gallery or social-reel content, project titles, generated descriptions, summaries, card summaries, body copy, metrics, existing image alt attributes, or SEO metadata. Also out of scope are pricing, schemas, slugs, ranks, publication status, section switches, new image descriptions, and new service promises.

Preserve the project descriptions through any later build or importer run. Do not run AI copy-generation APIs or regenerate the existing copy as part of this work. No new source-brief or generator rewrite is authorised by this review.

## Confirmed decisions and remaining asset detail

**R1 · Delivery.** Ash confirms a single video within 3 business days of filming and event photography/video within 3–5 business days. Delivery within 1 business day or on the same day may be available subject to discussion; it is not guaranteed. Existing prices and other service terms remain unchanged.

**R2 · Social production.** Ash produced, filmed, and edited all social work. No per-project duty questions remain.

**R3 · Metrics.** Keep the existing specified numbers and their presentation. No new caveats or metric-removal proposal remains.

**R4 · Existing project copy.** Ash wants the current photography-gallery and social-reel descriptions retained. All associated project titles and copy fields remain unchanged. The replacement-project appendices from version 1.0 have been removed.

**R5 · Social posters.** A social poster means a static video preview or cover shown before the Instagram or TikTok player loads. It is not a social post graphic. Suitable cover assets and their availability are not yet confirmed. When an authorised cover is unavailable, retain the project’s existing title, description, and platform link as the dependable preview; do not fabricate a still.

**R6 · Alt text and metadata.** Retain existing alt attributes without new image-description work. Metadata changes are excluded pending an explicit request. Earlier project-specific fact questions do not authorise rewriting the existing descriptions.

This version is ready for copy review. Implementation and publication have not begun.
