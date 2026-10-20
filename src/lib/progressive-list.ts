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
  const initialCount = Number(root.dataset.initialCount);
  let visibleCount = initialCount;
  const increment = Number(root.dataset.increment);

  function matchingItems() {
    const category = grid!.dataset.progressiveFilter || "all";
    return items.filter((item) => category === "all" || item.dataset.category === category);
  }

  function update() {
    const matching = matchingItems();
    const visible = new Set(matching.slice(0, visibleCount));
    items.forEach((item) => {
      item.dataset.progressiveItem = "";
      item.hidden = !visible.has(item);
    });
    button!.hidden = visibleCount >= matching.length;
  }

  update();
  root.addEventListener("progressive-filter-change", () => {
    visibleCount = initialCount;
    if (status) status.textContent = "";
    update();
  });
  button.addEventListener("click", () => {
    const matching = matchingItems();
    const firstNewItem = matching[visibleCount];
    visibleCount += increment;
    update();
    if (status) status.textContent = `${Math.min(visibleCount, matching.length)} / ${matching.length}`;
    const focusTarget = firstNewItem?.matches("a, button") ? firstNewItem : firstNewItem?.querySelector<HTMLElement>("a, button");
    focusTarget?.focus({ preventScroll: true });
  });
}
