/*
  reveal.js — scroll-triggered entrance animations, the fixed index-rail active state,
  and the live frame counter. Every GSAP timeline here is skipped in favor of a plain
  CSS fallback when the user prefers reduced motion (CLAUDE.md rule 4).
*/

export function initReveals({ totalPlates, frameNumberFor } = {}) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasGsap = typeof window.gsap !== "undefined";

  const revealTargets = document.querySelectorAll("[data-reveal]");
  const hasScrollTrigger = typeof window.ScrollTrigger !== "undefined";

  if (reduceMotion || !hasGsap || !hasScrollTrigger) {
    revealTargets.forEach((el) => el.classList.add("reveal-fallback"));
  } else {
    window.gsap.registerPlugin(window.ScrollTrigger);

    revealTargets.forEach((el) => {
      window.gsap.fromTo(
        el,
        { autoAlpha: 0, y: 28 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        }
      );
    });

    // Filmstrip plates stagger in from the right as their reel enters view.
    document.querySelectorAll(".reel").forEach((reel) => {
      const plates = reel.querySelectorAll(".plate");
      if (!plates.length) return;
      window.gsap.fromTo(
        plates,
        { autoAlpha: 0, x: 40 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: reel,
            start: "top 75%",
            once: true,
          },
        }
      );
    });
  }

  initIndexRail();
  initFrameCounter({ totalPlates, frameNumberFor });
}

function initIndexRail() {
  const rail = document.querySelector(".index-rail");
  if (!rail) return;

  const items = rail.querySelectorAll(".index-rail__item");
  const sections = Array.from(items)
    .map((item) => document.querySelector(item.getAttribute("href")))
    .filter(Boolean);

  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const idx = sections.indexOf(entry.target);
        if (idx === -1) return;
        items[idx].dataset.active = entry.isIntersecting ? "true" : "false";
      });
    },
    { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

function initFrameCounter({ totalPlates, frameNumberFor }) {
  const counter = document.querySelector(".frame-counter__value");
  if (!counter || !totalPlates) return;

  const plates = Array.from(document.querySelectorAll(".plate[data-global-index]"));
  if (!plates.length) return;

  const totalLabel = String(totalPlates).padStart(3, "0");

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const index = Number(visible.target.dataset.globalIndex);
      const label = frameNumberFor ? frameNumberFor(index) : `F${String(index + 1).padStart(3, "0")}`;
      counter.innerHTML = `<b>${label}</b> / F${totalLabel}`;
    },
    { threshold: [0.3, 0.6, 0.9] }
  );

  plates.forEach((plate) => observer.observe(plate));
}
