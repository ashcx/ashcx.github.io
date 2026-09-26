import justifiedLayout from "justified-layout";

const galleryShell = document.querySelector("[data-gallery-shell]");
const gallery = galleryShell?.querySelector("[data-gallery]");
const imageDataScript = galleryShell?.querySelector("[data-gallery-images]");
const lightbox = document.querySelector(".lightbox");
const lightboxStage = lightbox?.querySelector(".lightbox-stage");
const lightboxCounter = lightbox?.querySelector(".lightbox-counter");
const lightboxLoading = lightbox?.querySelector(".lightbox-loading");
const closeButton = lightbox?.querySelector(".lightbox-close");
const prevButton = lightbox?.querySelector(".lightbox-prev");
const nextButton = lightbox?.querySelector(".lightbox-next");

const desktopLayout = {
  boxSpacing: 10,
  targetRowHeight: 255
};
const mobileLayout = {
  boxSpacing: 8,
  targetRowHeight: 168
};
const images = imageDataScript ? JSON.parse(imageDataScript.textContent || "[]") : [];
const shots = gallery ? [...gallery.querySelectorAll(".shot")] : [];
const shotImages = shots.map((shot) => shot.querySelector("img"));
let activeIndex = -1;
let imageRequestId = 0;
let activePreview = null;
let pendingFullImage = null;
let loadingTimer = 0;
let resizeFrame = 0;

function numericRatio(image) {
  const ratio = Number(image?.aspectRatio);
  return Number.isFinite(ratio) && ratio > 0 ? ratio : 1.5;
}

function layoutConfig(containerWidth) {
  const responsive = window.innerWidth <= 620 ? mobileLayout : desktopLayout;
  return {
    containerWidth,
    containerPadding: 0,
    boxSpacing: responsive.boxSpacing,
    targetRowHeight: responsive.targetRowHeight,
    targetRowHeightTolerance: 0.25,
    showWidows: true,
    widowLayoutStyle: "left"
  };
}

function applyFallbackLayout(shots) {
  const rowHeight = window.innerWidth <= 620 ? mobileLayout.targetRowHeight : desktopLayout.targetRowHeight;
  gallery.style.removeProperty("height");
  gallery.style.removeProperty("--gallery-gap");

  for (const shot of shots) {
    const ratio = Number(shot.dataset.ratio || 1.5);
    shot.style.position = "relative";
    shot.style.left = "auto";
    shot.style.top = "auto";
    shot.style.width = `${Math.max(120, ratio * rowHeight)}px`;
    shot.style.height = `${rowHeight}px`;
  }
}

function layoutGallery() {
  if (!gallery) return;

  const shots = [...gallery.querySelectorAll(".shot")];
  if (shots.length === 0) {
    gallery.style.height = "0px";
    return;
  }

  const width = gallery.clientWidth;
  if (!width) {
    applyFallbackLayout(shots);
    return;
  }

  try {
    const layout = justifiedLayout(
      shots.map((shot) => Number(shot.dataset.ratio || 1.5)),
      layoutConfig(width)
    );

    gallery.style.height = `${layout.containerHeight}px`;
    gallery.style.setProperty("--gallery-gap", `${window.innerWidth <= 620 ? mobileLayout.boxSpacing : desktopLayout.boxSpacing}px`);

    layout.boxes.forEach((box, index) => {
      const shot = shots[index];
      if (!shot) return;
      shot.style.position = "absolute";
      shot.style.left = `${box.left}px`;
      shot.style.top = `${box.top}px`;
      shot.style.width = `${box.width}px`;
      shot.style.height = `${box.height}px`;
    });
  } catch {
    applyFallbackLayout(shots);
  }
}

function scheduleLayout() {
  if (resizeFrame) window.cancelAnimationFrame(resizeFrame);
  resizeFrame = window.requestAnimationFrame(() => {
    resizeFrame = 0;
    layoutGallery();
  });
}

function restoreActivePreview() {
  if (!activePreview) return;

  const { element, parent, nextSibling, className, alt, loading } = activePreview;
  activePreview = null;
  element.className = className;
  element.alt = alt;
  delete element.dataset.lightboxIndex;
  element.removeAttribute("data-lightbox-preview");

  if (loading === null) element.removeAttribute("loading");
  else element.setAttribute("loading", loading);

  if (parent?.isConnected) {
    if (nextSibling?.parentNode === parent) parent.insertBefore(element, nextSibling);
    else parent.append(element);
  } else {
    element.remove();
    element.removeAttribute("src");
  }
}

function clearPendingFullImage() {
  if (!pendingFullImage) return;

  pendingFullImage.removeAttribute("src");
  pendingFullImage = null;
}

function removeFullImages() {
  lightboxStage?.querySelectorAll(".lightbox-full").forEach((image) => image.remove());
}

function showLoadingIndicator(requestId) {
  if (!lightboxLoading) return;

  window.clearTimeout(loadingTimer);
  lightboxLoading.hidden = true;
  loadingTimer = window.setTimeout(() => {
    if (requestId === imageRequestId && pendingFullImage) lightboxLoading.hidden = false;
  }, 120);
}

function hideLoadingIndicator(requestId) {
  if (requestId !== undefined && requestId !== imageRequestId) return;

  window.clearTimeout(loadingTimer);
  loadingTimer = 0;
  if (lightboxLoading) lightboxLoading.hidden = true;
}

function waitForImage(image) {
  if (typeof image.decode === "function") return image.decode();
  if (image.complete) {
    return image.naturalWidth > 0 ? Promise.resolve() : Promise.reject(new Error("Image failed to load"));
  }
  return new Promise((resolve, reject) => {
    image.addEventListener("load", resolve, { once: true });
    image.addEventListener("error", reject, { once: true });
  });
}

function decodeImage(image, source) {
  image.src = source;
  return waitForImage(image);
}

function showThumbnailPreview(index, image, requestId) {
  if (!lightboxStage) return;

  restoreActivePreview();

  const galleryImage = shotImages[index];
  const previewImage = galleryImage || new Image();
  const parent = galleryImage?.parentNode || null;
  const state = {
    element: previewImage,
    parent,
    nextSibling: parent ? previewImage.nextSibling : null,
    className: previewImage.className,
    alt: previewImage.alt,
    loading: previewImage.getAttribute("loading")
  };

  previewImage.classList.add("lightbox-preview");
  previewImage.dataset.lightboxIndex = String(index);
  previewImage.setAttribute("data-lightbox-preview", "true");
  previewImage.alt = image.alt || "Selected gallery image";
  previewImage.loading = "eager";
  lightboxStage.append(previewImage);
  activePreview = state;

  const markPreviewReady = () => {
    if (requestId !== imageRequestId || !lightbox?.classList.contains("is-open")) return;
    if (!previewImage.complete || previewImage.naturalWidth === 0) return;

    const fullImageIndex = Number(lightboxStage.querySelector(".lightbox-full")?.dataset.lightboxIndex);
    if (fullImageIndex === index) {
      restoreActivePreview();
      return;
    }

    removeFullImages();
  };

  if (previewImage.complete && previewImage.naturalWidth > 0) {
    markPreviewReady();
  } else {
    const source = image.thumb || image.large;
    if (!galleryImage && source) {
      decodeImage(previewImage, source).then(markPreviewReady).catch(() => {});
    } else waitForImage(previewImage).then(markPreviewReady).catch(() => {});
  }
}

function loadFullImage(index, image, requestId) {
  if (!lightboxStage || !image.large) {
    hideLoadingIndicator(requestId);
    return;
  }

  const fullImage = new Image();
  fullImage.className = "lightbox-full";
  fullImage.alt = image.alt || "Selected gallery image";
  fullImage.decoding = "async";
  fullImage.fetchPriority = "high";
  fullImage.dataset.lightboxIndex = String(index);
  pendingFullImage = fullImage;

  decodeImage(fullImage, image.large).then(() => {
    if (requestId !== imageRequestId || !lightbox?.classList.contains("is-open")) return;

    pendingFullImage = null;
    hideLoadingIndicator(requestId);
    removeFullImages();
    restoreActivePreview();
    lightboxStage.append(fullImage);
  }).catch(() => {
    if (requestId === imageRequestId) {
      pendingFullImage = null;
      hideLoadingIndicator(requestId);
    }
  });
}

function setLightboxImage(index) {
  if (!lightbox || !lightboxStage || images.length === 0) return;

  activeIndex = (index + images.length) % images.length;
  const requestId = ++imageRequestId;
  const image = images[activeIndex];

  clearPendingFullImage();
  if (lightboxCounter) {
    lightboxCounter.textContent = `${activeIndex + 1} / ${images.length}`;
    lightboxCounter.setAttribute("aria-label", `Image ${activeIndex + 1} of ${images.length}`);
  }
  showLoadingIndicator(requestId);
  showThumbnailPreview(activeIndex, image, requestId);
  loadFullImage(activeIndex, image, requestId);
}

function openLightbox(index) {
  if (!lightbox || !lightboxStage || images.length === 0) return;

  setLightboxImage(index);
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  closeButton?.focus();
}

function closeLightbox() {
  if (!lightbox || !lightboxStage) return;

  imageRequestId += 1;
  clearPendingFullImage();
  hideLoadingIndicator();
  restoreActivePreview();
  removeFullImages();
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  activeIndex = -1;
}

function showPreviousImage() {
  if (activeIndex === -1 || images.length < 2) return;
  setLightboxImage(activeIndex - 1);
}

function showNextImage() {
  if (activeIndex === -1 || images.length < 2) return;
  setLightboxImage(activeIndex + 1);
}

shots.forEach((shot) => {
  const index = Number(shot.dataset.index || 0);
  const image = images[index] || {};
  shot.dataset.ratio = String(numericRatio(image));
  shot.style.setProperty("--ratio", String(numericRatio(image)));
  shot.addEventListener("click", () => openLightbox(index));
});

closeButton?.addEventListener("click", closeLightbox);
prevButton?.addEventListener("click", showPreviousImage);
nextButton?.addEventListener("click", showNextImage);

lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeLightbox();
  if (!lightbox?.classList.contains("is-open")) return;

  if (event.key === "ArrowLeft") showPreviousImage();
  if (event.key === "ArrowRight") showNextImage();
});

window.addEventListener("resize", scheduleLayout);
layoutGallery();
