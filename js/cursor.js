/*
  cursor.js — replaces the native pointer with a small viewfinder (crosshair + corner
  brackets) on fine-pointer/hover-capable devices. Falls back to the native cursor
  everywhere else (see the (hover:none) rule in components.css).
*/

const SVG_MARKUP = `
  <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <path class="viewfinder__corner" d="M2 14 V4 H12" />
    <path class="viewfinder__corner" d="M36 4 H46 V14" />
    <path class="viewfinder__corner" d="M46 34 V44 H36" />
    <path class="viewfinder__corner" d="M12 44 H2 V34" />
    <circle class="viewfinder__dot" cx="24" cy="24" r="1.6" />
  </svg>
`;

export function initCursor() {
  const supportsHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (!supportsHover) return;

  const cursor = document.createElement("div");
  cursor.className = "viewfinder";
  cursor.innerHTML = SVG_MARKUP;
  cursor.setAttribute("aria-hidden", "true");
  document.body.appendChild(cursor);
  document.body.classList.add("cursor-ready");

  // Make the cursor visible immediately at the last known/likely pointer position
  // rather than waiting for the first pointermove (avoids a "missing" cursor on load).
  let x = window.innerWidth / 2;
  let y = window.innerHeight / 2;
  let targetX = x;
  let targetY = y;
  let raf = null;
  let hasPointer = false;

  // NOTE: position is applied via left/top (see the loop below), NOT via an inline
  // `transform`, because an inline transform would overwrite the CSS rule that centers
  // the icon on the pointer (`transform: translate3d(-50%, -50%, 0)` in components.css).
  // Setting both position and centering through the same property fought each other and
  // was the cause of the cursor appearing to vanish/mis-track on some pages.
  cursor.style.left = "0px";
  cursor.style.top = "0px";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function loop() {
    // Light easing for a slight trailing feel; skipped entirely under reduced motion.
    const ease = reduceMotion ? 1 : 0.22;
    x += (targetX - x) * ease;
    y += (targetY - y) * ease;
    cursor.style.left = `${x}px`;
    cursor.style.top = `${y}px`;
    raf = requestAnimationFrame(loop);
  }

  window.addEventListener("pointermove", (event) => {
    targetX = event.clientX;
    targetY = event.clientY;
    if (!hasPointer) {
      // Snap to the real position on the very first move instead of easing in from
      // the window center, so the cursor doesn't appear to drift in from nowhere.
      x = targetX;
      y = targetY;
      hasPointer = true;
      cursor.style.opacity = "1";
    }
  });

  // Hide the icon until we know where the pointer actually is, and hide it again if the
  // pointer leaves the window (e.g. moves to another app or browser chrome) so it never
  // sits "stuck" at a stale position.
  cursor.style.opacity = "0";
  document.addEventListener("mouseleave", () => {
    cursor.style.opacity = "0";
    hasPointer = false;
  });

  const activeSelector = "a, button, .plate, .filmstrip__track, [data-cursor-active]";

  const captureFlash = () => {
    cursor.classList.remove("viewfinder--capture");
    // Restart the short shutter animation on every click/grab.
    void cursor.offsetWidth;
    cursor.classList.add("viewfinder--capture");
  };

  document.addEventListener("pointerdown", (event) => {
    if (event.target.closest && event.target.closest(activeSelector)) captureFlash();
  });

  document.addEventListener("pointerup", () => {
    window.setTimeout(() => cursor.classList.remove("viewfinder--capture"), 260);
  });

  document.addEventListener("pointerover", (event) => {
    if (event.target.closest && event.target.closest(activeSelector)) {
      cursor.classList.add("viewfinder--active");
    }
  });

  document.addEventListener("pointerout", (event) => {
    if (event.target.closest && event.target.closest(activeSelector)) {
      cursor.classList.remove("viewfinder--active");
    }
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden && raf) {
      cancelAnimationFrame(raf);
      raf = null;
    } else if (!raf) {
      loop();
    }
  });

  loop();
}
