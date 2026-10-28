# Service card image sources

The six served WebP images live in `public/media/services/`.
`HomeServiceLinks.astro` selects the desktop images and their `-mobile.webp`
variants. Desktop exports are 960 × 600. Mobile exports are 216 × 216.

| Exports | Source | Local original |
| --- | --- | --- |
| `photography.webp`, `photography-mobile.webp` | [Nguyễn Tiến Thịnh on Pexels](https://www.pexels.com/photo/photographer-captures-wedding-moment-on-camera-33072063/) | `inbox/services/photography-original.jpg` |
| `event-video.webp`, `event-video-mobile.webp` | [Hasan Gulec on Pexels](https://www.pexels.com/photo/a-person-holding-a-video-camera-11480028/) | `inbox/services/event-video-original.jpg` |
| `social-media.webp`, `social-media-mobile.webp` | Site owner supplied the image on 2026-10-22 | Original currently unlocated |

The photography and event-video images were downloaded on 2026-10-22. Their
license reference is the [Pexels license](https://www.pexels.com/license/).
The event-video crop shows hands operating a professional video camera, with
the operator's face outside the frame. The current social-media image shows
a portrait phone recording a speaker on stage. Its desktop and mobile crops
centre the phone.

## Export settings

The recorded exports use WebP quality 32 for desktop and 28 for mobile, effort
6, and smart chroma subsampling. Desktop images use a 16:10 crop. Mobile images
use a square crop. These settings describe the existing exports. Exact crop
coordinates were not recorded, so the settings alone cannot reproduce each crop.

The current social-media exports use the same dimensions and WebP settings.
The owner-supplied source must be recovered before those images can be
re-exported from their original. The current WebPs remain the served copies.

## Local source and backup locations

`inbox/services/` stores the two Pexels originals outside the published assets.
`output/comparisons/services/` keeps the previous six exports for comparison.
`output/experiments/services/` keeps the superseded iStock preview, three PNG
experiments, and their old generation notes. Those notes describe previous
experiments and do not establish the source of the current social-media image.

Both `inbox/` and `output/` are ignored local folders. They are not part of the
published site or a substitute for a separate backup. Git history retains
previous tracked exports and this provenance record.
