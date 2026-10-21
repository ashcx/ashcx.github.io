# Todo

Action plans for known major/latent issues. Each file is self-contained: problem,
evidence (with file/line references), proposed action, and verification steps.

Nothing here blocks normal builds today — these are risks, dormant behavior, and
follow-ups to decide on. When an item ships, delete its file (or mark it done
inline) so this folder stays a live backlog.

Completed: 01, 04, 06, 09, and 10. Item 02 is resolved: fixed 4:5 frames and
letterboxing are intentional. Historical issue descriptions remain below each
item’s resolution note.

## Action plans

| # | Issue | Area |
| --- | --- | --- |
| 01 | [Home carousel loop has no exhaustion guard](01-home-carousel-loop-guard.md) | build stability |
| 02 | [videoAspectRatio is documented but never rendered](02-video-aspect-ratio.md) | schema / player |
| 03 | [coverImageIndex is unvalidated and missing from one gallery](03-cover-image-index-validation.md) | validation |
| 04 | [AI response text can be counted twice](04-ai-output-double-count.md) | build script |
| 05 | [/preview/airwallex/ is an orphan indexable page](05-preview-page-decision.md) | routing / SEO |
| 06 | [Folder fallback misgroups medium images as large](06-gallery-fallback-image-grouping.md) | gallery helpers |
| 07 | [Duplicated logic across pages and scripts](07-duplication-consolidation.md) | maintainability |
| 08 | [CI validates twice](08-ci-double-validation.md) | CI |
| 09 | [Docs drift from actual behavior](09-docs-behavior-drift.md) | docs |
| 10 | [Tracked output/pdf artifact (~6 MB)](10-output-pdf-artifact.md) | repo hygiene |

## Deprecated

`deprecated/` holds the previous round of audit evidence, design-fix notes, and
implementation screenshots. Those items were resolved (the bugs were squashed)
and are kept only for historical reference. Nothing in `deprecated/` is part of
the current backlog, and the folder can be deleted without affecting the site.
