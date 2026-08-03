import { bootstrap } from "./app.js";
import { COLLECTIONS, ALL_PLATES, TOTAL_PLATES, frameNumber } from "./data.js";
import { initReveals } from "./reveal.js";
import { initLightbox } from "./lightbox.js";

bootstrap();

const filterRoot = document.querySelector("#filter-bar");
const gridRoot = document.querySelector("#sheet-grid");

function chipMarkup(label, value, pressed) {
  return `<button class="filter-chip" type="button" data-filter="${value}" aria-pressed="${pressed}">${label}</button>`;
}

function renderFilters() {
  const chips = [chipMarkup("All", "all", true)].concat(
    COLLECTIONS.map((c) => chipMarkup(`${c.number} ${c.title}`, c.id, false))
  );
  filterRoot.innerHTML = chips.join("");
}

function plateMarkup(plate, globalIndex) {
  const imageUrl = plate.src || `https://picsum.photos/seed/macmotz-${plate.id}/900/1125`;
  const img = `<img class="plate__img" src="${imageUrl}" alt="" loading="lazy" decoding="async" />`;
  return `
    <div class="sheet-item" data-collection="${plate.collectionId}">
      <button class="plate plate--sm plate--button" type="button" data-tone="${plate.tone}"
        data-global-index="${globalIndex}" data-cursor-active
        aria-label="Open plate ${frameNumber(globalIndex)}, ${plate.collectionTitle}: ${plate.alt}">
        ${img}
        <span class="plate__duotone" aria-hidden="true"></span>
        <span class="plate__vignette" aria-hidden="true"></span>
        <span class="plate__frame">${frameNumber(globalIndex)}</span>
      </button>
    </div>
  `;
}

function renderGrid() {
  gridRoot.innerHTML = ALL_PLATES.map((plate, i) => plateMarkup(plate, i)).join("");
}

function applyFilter(value) {
  gridRoot.querySelectorAll(".sheet-item").forEach((item) => {
    const matches = value === "all" || item.dataset.collection === value;
    item.style.display = matches ? "" : "none";
  });
}

renderFilters();
renderGrid();

filterRoot.addEventListener("click", (event) => {
  const btn = event.target.closest(".filter-chip");
  if (!btn) return;
  filterRoot.querySelectorAll(".filter-chip").forEach((chip) => chip.setAttribute("aria-pressed", "false"));
  btn.setAttribute("aria-pressed", "true");
  applyFilter(btn.dataset.filter);
});

initReveals({ totalPlates: TOTAL_PLATES, frameNumberFor: frameNumber });

initLightbox({
  root: gridRoot,
  plates: ALL_PLATES,
  frameNumberFor: frameNumber,
});
