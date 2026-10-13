export function initProgressiveList(root: HTMLElement) {
  const grid = root.querySelector<HTMLElement>("[data-progressive-items] > *");
  const button = root.querySelector<HTMLButtonElement>("[data-progressive-more]");
  const status = root.querySelector<HTMLElement>("[data-progressive-status]");
  if (!grid || !button) return;

  const params = new URLSearchParams(window.location.search);
  const curation = params.get("hidden") === "1" || params.get("curation") === "1" || params.get("view") === "curation";
  const items = Array.from(grid.children).filter((item): item is HTMLElement =>
    item instanceof HTMLElement && (curation || !item.classList.contains("hidden-gallery-card"))
  );
  let visibleCount = Number(root.dataset.initialCount);
  const increment = Number(root.dataset.increment);

  function update() {
    items.forEach((item, index) => {
      item.dataset.progressiveItem = "";
      item.hidden = index >= visibleCount;
    });
    button!.hidden = visibleCount >= items.length;
  }

  update();
  button.addEventListener("click", () => {
    const firstNewItem = items[visibleCount];
    visibleCount += increment;
    update();
    if (status) status.textContent = `${Math.min(visibleCount, items.length)} / ${items.length}`;
    const focusTarget = firstNewItem?.matches("a, button") ? firstNewItem : firstNewItem?.querySelector<HTMLElement>("a, button");
    focusTarget?.focus({ preventScroll: true });
  });
}
