/*
  smooth-scroll.js — initializes Lenis for inertia scrolling and syncs it with GSAP's
  ticker/ScrollTrigger when both are present. No-ops gracefully if Lenis failed to load
  (e.g. offline — see AGENTS.md "Browser/perf notes") or the user prefers reduced motion.
*/

export function initSmoothScroll() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion || typeof window.Lenis === "undefined") {
    return null;
  }

  const lenis = new window.Lenis({
    duration: 1.1,
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.1,
  });

  document.body.classList.add("has-lenis");

  if (window.gsap && window.gsap.ticker) {
    window.gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    window.gsap.ticker.lagSmoothing(0);

    if (window.ScrollTrigger) {
      lenis.on("scroll", window.ScrollTrigger.update);
    }
  } else {
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  // Let in-page anchors (index rail, skip link, nav) use Lenis' own smooth scrollTo.
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target, { offset: -24 });
    });
  });

  return lenis;
}
