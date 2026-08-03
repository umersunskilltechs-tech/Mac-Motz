/*
  grain.js — draws a small noise tile once and repeats it as a fixed overlay.
  Intentionally static (no per-frame regeneration) — see AGENTS.md "Browser/perf notes".
*/

export function initGrain() {
  const TILE = 128;
  const canvas = document.createElement("canvas");
  canvas.width = TILE;
  canvas.height = TILE;
  canvas.className = "grain";
  canvas.setAttribute("aria-hidden", "true");

  const ctx = canvas.getContext("2d");
  const imageData = ctx.createImageData(TILE, TILE);

  for (let i = 0; i < imageData.data.length; i += 4) {
    const shade = Math.floor(Math.random() * 255);
    imageData.data[i] = shade;
    imageData.data[i + 1] = shade;
    imageData.data[i + 2] = shade;
    imageData.data[i + 3] = 255;
  }

  ctx.putImageData(imageData, 0, 0);

  // Convert the small canvas into a repeating CSS background on a full-viewport element
  // rather than stretching the canvas itself, so it tiles crisply at any screen size.
  const dataUrl = canvas.toDataURL();
  const overlay = document.createElement("div");
  overlay.className = "grain";
  overlay.setAttribute("aria-hidden", "true");
  overlay.style.backgroundImage = `url(${dataUrl})`;
  overlay.style.backgroundRepeat = "repeat";
  overlay.style.backgroundSize = `${TILE}px ${TILE}px`;

  document.body.appendChild(overlay);
}
