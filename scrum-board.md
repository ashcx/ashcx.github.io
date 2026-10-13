# Portfolio implementation board

**Rolled back at Ash's request on 13 October 2026.** All 27 implementation files were restored to the pre-change version at `18feaa5`, including original social embeds and layout/styles. The completion records below are historical and no longer describe the current site. Copy drafts and planning documents remain saved for reference; they do not authorize reapplying these changes.

**Current result after clarification:** Original designs, DOM structure, styles, scripts, controls, and all native social embeds are retained. Approved wording was reapplied as literal text/value substitutions only. The original homepage greeting and film titles remain to preserve their established presentation. No revised preview boxes, layout, filters, typography, interaction changes, or build-pipeline changes remain. All Astro style/script blocks were compared with `18feaa5`; they match exactly.

Baseline: `18feaa5`. Approved copy: `website-copy-review.md` v1.1, GPT-6.1 Sol Medium. Implementation authorized 13 October 2026. No publication requested.

Coordinator owns integration and evidence. Three GPT-6 Luna Max subagents implement disjoint file sets from the locked copy. Any wording gap returns to Sol Medium. Existing project files, metrics, image alt attributes, metadata, pricing, ordering, and schemas are preserved.

| Work | Owner | Dependencies | Status | Acceptance evidence |
| --- | --- | --- | --- | --- |
| Homepage copy, hero, typography, shared spacing and card alignment | shell_visual | Locked copy | Done | Production screenshots; 30 responsive route checks from 360–1440px, no overflow/clipped primary controls |
| Navigation, carousel controls, mobile contact behavior | shell_visual | service_copy enquiry helper | Done | Menu label follows open/closed state; Escape; manual pause; mobile floating control hidden |
| Service pages, delivery terms, booking/testimonial scope, footer service constants | service_copy | Locked copy | Done | Exact approved copy; corrected delivery windows; relevant complete quotes; duplicate contact sections removed |
| Contextual contact/enquiry drafts | service_copy | Locked copy | Done | Decoded video/photo/social/general draft URLs inspected; line breaks preserved; no messages sent |
| Reliable social preview, filters, existing metrics/descriptions | browse_interactions | service_copy removes auto-load scripts; shell_visual global styles | Done | No player scripts/iframes initially; category deep links; simulated blocked script retains 8 platform links and approved failure message |
| Gallery return path and lightbox keyboard/focus behavior | browse_interactions | Locked control wording | Done | Open/next/Escape; Shift+Tab containment; initiating-thumbnail focus restored; original project copy retained |
| Project rewrites, metric removal, new alt text and SEO | None | Excluded by user | Withdrawn | Content preservation comparison |
| Build-time copy protection | service_copy | Existing project baseline | Done | Isolated preservation/default-import fixtures; opt-out retained; unchanged content avoids rewrites; build omits AI generation |
| Integrated validation/build and responsive review | Coordinator | All owners hand off; serialized importer/build | Done | Full build: 31 pages; validation: 0 errors/0 warnings, 2 non-blocking async-style hints; 565 local links/anchors checked |

Delivery stages follow the approved sprint goals without artificial waiting: reliability and copy, coherent layout, then accessibility and integration. Developers progress independently where file ownership permits; consumers integrate against confirmed helper/component contracts. The coordinator reviews the combined increment and routes defects back to their owner.

## Integration evidence and practical limits

- All 1,310 baseline content and gallery asset files match their original bytes after verification. Only importer-generated manifest timestamp changes were reverted from the saved baseline. No gallery/reel content, metrics, image derivatives, or metadata edits remain in the delivery diff.
- Existing HTML image alt strings were retained; the featured film stores its prior poster alt explicitly while its approved visible heading changes.
- Responsive samples: Home, Photography, Social media at 360, 390, 430, 768, 810, 811, 1259, 1260, 1280, and 1440px. Contact, Event video, and HR WorkTech gallery were additionally checked in Chrome. Photography's first card starts around 695px at 390×844.
- Browser network blocking was used only for a failure-state test and was cleared afterward. External player playback remains subject to the platform/browser; direct links and text previews work independently. No new social poster assets were supplied or fabricated.
- Browser zoom shortcuts did not produce a verifiable zoom change with the viewport override. Actual 200% browser zoom and hardware-specific Safari/Windows font rendering remain manual follow-up checks; they are not claimed as passed. Narrow-layout checks cover the tested CSS widths.
- Screenshots and responsive results: `todo/implementation-evidence/`. The production preview is local at `http://127.0.0.1:4322/`.
- No commit, push, merge, publication, or AI API request was performed.

Retrospective: shared file ownership avoided write conflicts. Early integration caught literal newline/price interpolation issues and overly tall mobile intros. Build review identified stale inbox copy and serialization churn; the preservation mode now protects copy and the existing opt-out without changing deliberate direct imports.
