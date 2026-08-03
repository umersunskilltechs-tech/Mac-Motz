/*
  lightbox.js — opens any .plate--button inside a [data-lightbox-root] in a focus-trapped
  overlay with prev/next and Escape-to-close. Operable by keyboard, not just pointer
  (CLAUDE.md rule 6).
*/

export function initLightbox({ root, plates, frameNumberFor }) {
  if (!root || !plates.length) return;

  const overlay = document.createElement("div");
  overlay.className = "lightbox";
  overlay.dataset.open = "false";
  overlay.innerHTML = `
    <div class="lightbox__frame plate" role="dialog" aria-modal="true" aria-label="Plate viewer">
      <img class="plate__img lightbox__img" alt="" loading="eager" decoding="async" />
      <div class="plate__duotone" aria-hidden="true"></div>
      <div class="plate__vignette"></div>
      <p class="plate__frame"></p>
      <div class="lightbox__meta">
        <span class="lightbox__meta-collection"></span>
        <span class="lightbox__meta-frame"></span>
      </div>
    </div>
    <button class="lightbox__close" aria-label="Close viewer" data-cursor-active>&times;</button>
    <button class="lightbox__nav-btn lightbox__nav-btn--prev" aria-label="Previous plate" data-cursor-active>&larr;</button>
    <button class="lightbox__nav-btn lightbox__nav-btn--next" aria-label="Next plate" data-cursor-active>&rarr;</button>
  `;
  document.body.appendChild(overlay);

  const frameEl = overlay.querySelector(".lightbox__frame");
  const imgEl = overlay.querySelector(".lightbox__img");
  const frameTag = overlay.querySelector(".plate__frame");
  const collectionLabel = overlay.querySelector(".lightbox__meta-collection");
  const frameLabel = overlay.querySelector(".lightbox__meta-frame");
  const closeBtn = overlay.querySelector(".lightbox__close");
  const prevBtn = overlay.querySelector(".lightbox__nav-btn--prev");
  const nextBtn = overlay.querySelector(".lightbox__nav-btn--next");

  imgEl.addEventListener("error", () => {
    imgEl.style.display = "none";
  });

  let currentIndex = 0;
  let lastFocused = null;

  function render(index) {
    currentIndex = (index + plates.length) % plates.length;
    const plate = plates[currentIndex];
    frameEl.dataset.tone = plate.tone;
    frameEl.style.setProperty("--tone-a", `var(--tone-${plate.tone}-a)`);
    frameEl.style.setProperty("--tone-b", `var(--tone-${plate.tone}-b)`);
    imgEl.src = plate.src || `https://picsum.photos/seed/macmotz-${plate.id}/900/1125`;
    imgEl.style.display = "";
    frameTag.textContent = frameNumberFor(currentIndex);
    collectionLabel.textContent = plate.collectionTitle;
    frameLabel.textContent = plate.alt;
    frameEl.setAttribute("aria-label", `${plate.collectionTitle} — ${plate.alt}`);
  }

  function open(index) {
    lastFocused = document.activeElement;
    render(index);
    overlay.dataset.open = "true";
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }

  function close() {
    overlay.dataset.open = "false";
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  root.querySelectorAll(".plate--button").forEach((button, index) => {
    button.addEventListener("click", () => open(index));
  });

  closeBtn.addEventListener("click", close);
  prevBtn.addEventListener("click", () => render(currentIndex - 1));
  nextBtn.addEventListener("click", () => render(currentIndex + 1));

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) close();
  });

  document.addEventListener("keydown", (event) => {
    if (overlay.dataset.open !== "true") return;
    if (event.key === "Escape") close();
    if (event.key === "ArrowRight") render(currentIndex + 1);
    if (event.key === "ArrowLeft") render(currentIndex - 1);
    if (event.key === "Tab") {
      const focusable = [closeBtn, prevBtn, nextBtn];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
}
