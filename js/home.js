import { bootstrap } from "./app.js";
import { COLLECTIONS, ALL_PLATES, TOTAL_PLATES, frameNumber } from "./data.js";
import { initReveals } from "./reveal.js";
import { initFilmstrips } from "./filmstrip.js";

bootstrap();

const reelsRoot = document.querySelector("#reels");
const railRoot = document.querySelector("#index-rail-list");

let globalIndex = 0;

function platesFor(collection) {
  return collection.plates
    .map((plate) => {
      const idx = globalIndex;
      globalIndex += 1;
      const tag = frameNumber(idx);
      const imageUrl = plate.src || `https://picsum.photos/seed/macmotz-${plate.id}/900/1125`;
      const img = `<img class="plate__img" src="${imageUrl}" alt="${plate.alt}" loading="lazy" decoding="async" />`;
      return `
        <figure class="plate" data-tone="${plate.tone}" data-global-index="${idx}">
          ${img}
          <div class="plate__duotone" aria-hidden="true"></div>
          <div class="plate__vignette" aria-hidden="true"></div>
          <p class="plate__frame">${tag}</p>
          <figcaption class="plate__caption">${plate.alt}</figcaption>
        </figure>
      `;
    })
    .join("");
}

function reelMarkup(collection) {
  return `
    <section class="reel" id="reel-${collection.id}" data-reveal>
      <div class="reel__head">
        <div class="reel__heading">
          <span class="reel__number mono">${collection.number}</span>
          <h2 class="reel__title">${collection.title}</h2>
        </div>
        <span class="reel__count">${String(collection.plates.length).padStart(2, "0")} PLATES</span>
      </div>
      <p class="reel__blurb">${collection.blurb}</p>
      <div class="filmstrip">
        <div class="filmstrip__track" tabindex="0" role="group" aria-label="${collection.title} filmstrip, scroll horizontally">
          ${platesFor(collection)}
        </div>
      </div>
    </section>
  `;
}

function railItemMarkup(collection) {
  return `
    <li>
      <a class="index-rail__item" href="#reel-${collection.id}" data-active="false">
        ${collection.number} ${collection.title}
      </a>
    </li>
  `;
}

if (reelsRoot) {
  reelsRoot.innerHTML = COLLECTIONS.map(reelMarkup).join("");
}

if (railRoot) {
  railRoot.innerHTML = COLLECTIONS.map(railItemMarkup).join("");
}

initFilmstrips();
initReveals({ totalPlates: TOTAL_PLATES, frameNumberFor: frameNumber });

// Seed the frame counter before the first IntersectionObserver callback fires.
const counterValue = document.querySelector(".frame-counter__value");
if (counterValue) {
  counterValue.innerHTML = `<b>${frameNumber(0)}</b> / F${String(TOTAL_PLATES).padStart(3, "0")}`;
}

void ALL_PLATES;
