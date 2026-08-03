/*
  filmstrip.js — progressive enhancement over native horizontal scroll:
  - vertical wheel input is redirected to horizontal scroll while a filmstrip is under
    the pointer, so people don't need to hold shift.
  - pointer drag ("grab") scrolling for mouse users.
  Native scroll (touch, keyboard, scrollbar) keeps working if this script fails to run
  (AGENTS.md "Browser/perf notes").
*/

export function initFilmstrips() {
  const tracks = Array.from(document.querySelectorAll(".filmstrip__track"));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let pageScrollFrame = null;

  tracks.forEach((track) => {
    let isDown = false;
    let startX = 0;
    let startScroll = 0;

    track.addEventListener(
      "wheel",
      (event) => {
        // Keep vertical wheel input available to the page. The page-scroll driver
        // below advances the reel automatically, so hovering a reel never traps
        // the user in a horizontal-only scroll zone.
        if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
          track.scrollLeft += event.deltaX;
        }
      },
      { passive: true }
    );

    track.addEventListener("pointerdown", (event) => {
      isDown = true;
      startX = event.clientX;
      startScroll = track.scrollLeft;
      track.setPointerCapture(event.pointerId);
    });

    track.addEventListener("pointermove", (event) => {
      if (!isDown) return;
      const delta = event.clientX - startX;
      track.scrollLeft = startScroll - delta;
    });

    ["pointerup", "pointercancel", "pointerleave"].forEach((eventName) => {
      track.addEventListener(eventName, () => {
        isDown = false;
      });
    });
  });

  // On the full site, turn each reel into a pinned horizontal chapter. The user
  // keeps scrolling vertically, but the active reel consumes that scroll until
  // every frame has crossed the viewport, then the document continues downward.
  if (window.gsap && window.ScrollTrigger && !reduceMotion) {
    window.gsap.registerPlugin(window.ScrollTrigger);
    tracks.forEach((track) => {
      const reel = track.closest(".reel");
      if (!reel) return;
      // Measure against the real track viewport. Using window.innerWidth here
      // over-shifted the strip when scrollbars, gutters, or a pinned layout were
      // present, leaving a large empty black tail after the final frame.
      const distance = () => Math.max(0, track.scrollWidth - track.clientWidth);
      window.gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: reel,
          start: "top top",
          end: () => `+=${Math.max(distance(), window.innerHeight * 0.8)}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    });
    window.ScrollTrigger.refresh();
    return;
  }

  // Vertical scrolling now drives each horizontal reel as it passes through the
  // viewport. Manual wheel, drag, touch, and keyboard scrolling remain available.
  if (reduceMotion || tracks.length === 0) return;

  const advanceWithPageScroll = () => {
    pageScrollFrame = null;
    const viewport = window.innerHeight;
    tracks.forEach((track) => {
      const reel = track.closest(".reel");
      if (!reel || track.scrollWidth <= track.clientWidth) return;
      const rect = reel.getBoundingClientRect();
      const travel = viewport + rect.height;
      const progress = Math.max(0, Math.min(1, (viewport - rect.top) / travel));
      track.scrollLeft = (track.scrollWidth - track.clientWidth) * progress;
    });
  };

  window.addEventListener("scroll", () => {
    if (pageScrollFrame === null) {
      pageScrollFrame = requestAnimationFrame(advanceWithPageScroll);
    }
  }, { passive: true });
  window.addEventListener("resize", advanceWithPageScroll, { passive: true });
  advanceWithPageScroll();
}
