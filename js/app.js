/*
  app.js — shared bootstrap loaded on every page (import this before any page-specific
  module). Keeps the cross-page setup (grain, cursor, smooth scroll, nav) in one place.
*/

import { initGrain } from "./grain.js";
import { initCursor } from "./cursor.js";
import { initSmoothScroll } from "./smooth-scroll.js";
import { initNav } from "./nav.js";

function safely(label, fn) {
  try {
    return fn();
  } catch (error) {
    // A failure in one piece (e.g. Lenis blocked on a restrictive network) should
    // never take the others down with it — cursor, nav, and grain are independent.
    console.warn(`[macmotz] ${label} failed to initialize:`, error);
    return null;
  }
}

export function bootstrap() {
  safely("grain", initGrain);
  safely("cursor", initCursor);
  safely("nav", initNav);
  return safely("smooth-scroll", initSmoothScroll);
}
