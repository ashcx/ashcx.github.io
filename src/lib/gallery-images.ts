import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();

export interface GalleryImage {
  thumb: string;
  large: string;
  width?: number;
  height?: number;
  aspectRatio?: number;
  alt?: string;
}

interface ManifestSourceFile {
  name?: string;
  outputThumb?: string;
  outputLarge?: string;
  width?: number;
  height?: number;
  aspectRatio?: number;
}

// The home "portrait card" is a tall frame (~0.59 width:height at its largest
// size). Natural 2:3 (0.667) and 3:4 (0.75) photos crop well in it, so prefer
// portrait images closest to that range and never land a landscape in the frame.
const homePortraitTargetRatio = 0.7;

function publicPath(slug: string, filename?: string) {
  return filename ? `/images/galleries/${slug}/${filename}` : "";
}

function fromManifest(slug: string): GalleryImage[] {
  const manifestPath = path.join(root, "public", "images", "galleries", slug, "manifest.json");
  if (!existsSync(manifestPath)) return [];

  try {
    const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
    return (manifest.sourceFiles || [])
      .map((file: ManifestSourceFile) => ({
        thumb: publicPath(slug, file.outputThumb),
        large: publicPath(slug, file.outputLarge),
        width: file.width,
        height: file.height,
        aspectRatio: file.aspectRatio || (file.width && file.height ? file.width / file.height : undefined),
        alt: ""
      }))
      .filter((image: GalleryImage) => image.thumb || image.large);
  } catch {
    return [];
  }
}

function fromFolder(slug: string): GalleryImage[] {
  const galleryDir = path.join(root, "public", "images", "galleries", slug);
  if (!existsSync(galleryDir)) return [];

  const files = readdirSync(galleryDir).filter((file) => file.endsWith(".webp")).sort();
  const groups = new Map<string, { thumb?: string; large?: string }>();
  for (const file of files) {
    const key = file.replace(/-(thumb|large)\.webp$/, "").replace(/\.webp$/, "");
    const group = groups.get(key) || {};
    if (file.includes("-thumb.webp")) group.thumb = file;
    else if (file.includes("-large.webp")) group.large = file;
    else group.large = file;
    groups.set(key, group);
  }

  return [...groups.values()]
    .map((group) => ({
      thumb: publicPath(slug, group.thumb || group.large),
      large: publicPath(slug, group.large || group.thumb),
      aspectRatio: 1.5,
      alt: ""
    }))
    .filter((image) => image.thumb || image.large);
}

export function getGalleryImages(slug: string, frontmatterImages: GalleryImage[] = []) {
  if (frontmatterImages.length > 0) return frontmatterImages;
  const manifestImages = fromManifest(slug);
  if (manifestImages.length > 0) return manifestImages;
  return fromFolder(slug);
}

export function getGalleryCover(
  slug: string,
  coverImage?: string,
  frontmatterImages: GalleryImage[] = [],
  coverImageIndex?: number
) {
  const images = getGalleryImages(slug, frontmatterImages);
  const selectedImage = Number.isInteger(coverImageIndex) && coverImageIndex! >= 1
    ? images[coverImageIndex! - 1]
    : undefined;
  if (selectedImage) return selectedImage.large || selectedImage.thumb || "";
  return coverImage || images[0]?.large || images[0]?.thumb || "";
}

function imageAspectRatio(image: GalleryImage): number | undefined {
  if (typeof image.aspectRatio === "number" && image.aspectRatio > 0) return image.aspectRatio;
  if (typeof image.width === "number" && typeof image.height === "number" && image.height > 0) {
    return image.width / image.height;
  }
  return undefined;
}

// Picks the best image for the tall home portrait card: prefers portrait images
// (ratio < 1) closest to the frame's ratio, then falls back to whichever image
// crops least badly when a gallery has no portrait shots. Never uses the manual
// coverImage/coverImageIndex — those are for the gallery page and may be landscape.
function getHomePortraitImage(slug: string, frontmatterImages: GalleryImage[] = []) {
  const images = getGalleryImages(slug, frontmatterImages);
  if (images.length === 0) return undefined;

  const scored = images.map((image, index) => {
    const ratio = imageAspectRatio(image);
    return {
      image,
      index,
      score: ratio === undefined ? Number.POSITIVE_INFINITY : Math.abs(ratio - homePortraitTargetRatio)
    };
  });

  const portraits = scored.filter((entry) => entry.score !== Number.POSITIVE_INFINITY && imageAspectRatio(entry.image)! < 1);
  const pool = portraits.length > 0 ? portraits : scored;
  return [...pool].sort((a, b) => a.score - b.score || a.index - b.index)[0]?.image;
}

export function getHomePortraitCover(slug: string, frontmatterImages: GalleryImage[] = []) {
  const image = getHomePortraitImage(slug, frontmatterImages);
  return image ? image.large || image.thumb || "" : "";
}

// Up to `limit` portrait-orientation images from a gallery, best-fit first
// (closest to the tall home card's ratio). Used by the home hero carousel.
export function getPortraitImages(slug: string, frontmatterImages: GalleryImage[] = [], limit = 5): GalleryImage[] {
  return getGalleryImages(slug, frontmatterImages)
    .map((image, index) => ({ image, index, ratio: imageAspectRatio(image) }))
    .filter((entry): entry is { image: GalleryImage; index: number; ratio: number } =>
      entry.ratio !== undefined && entry.ratio < 1)
    .sort((a, b) => Math.abs(a.ratio - homePortraitTargetRatio) - Math.abs(b.ratio - homePortraitTargetRatio) || a.index - b.index)
    .slice(0, limit)
    .map((entry) => entry.image);
}
