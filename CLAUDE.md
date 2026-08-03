# CLAUDE.md — working rules for this repo

This file governs how Claude (or any AI assistant) should work in the `macmotz` project.
Read `PLAN.md` first for the design decisions this file enforces. Read `AGENTS.md` for
day-to-day task recipes (adding a collection, replacing plates, etc).

## What this project is

A static, framework-free HTML/CSS/JS photography website for Mac Motz (macmotz.com).
Four pages: `index.html`, `portfolio.html`, `about.html`, `contact.html`. No build step —
open the HTML files directly or serve the folder with any static file server.

## Non-negotiable rules

1. **CSS custom properties only, for everything that styles.** Every color, font-size,
   spacing value, radius, shadow, duration, and easing curve used in `css/layout.css`,
   `css/components.css`, and `css/animations.css` must reference a variable defined in
   `css/tokens.css` — e.g. `color: var(--color-fog);`, `padding: var(--space-6);`. Never
   write a literal hex code, `px`/`rem` size, or duration inside a component rule.
   - The **only** permitted exceptions, because CSS variables cannot be used inside
     `@media` conditions: the breakpoint numbers themselves (`768px`, `1024px`, `1440px`).
     These are also written as comments at the top of `tokens.css` so they stay in sync.
   - If a one-off value seems needed, add a new token to `tokens.css` instead of
     hardcoding it inline. If you can't name what the token represents, that's a sign the
     value shouldn't exist.
   - `viewBox`, `width`/`height` attributes on `<svg>` elements, and JS pixel math for
     canvas/GSAP calculations are not CSS and are exempt.

2. **No framework, no bundler.** Plain HTML/CSS/ES modules. GSAP and Lenis are the only
   external runtime libraries, loaded via CDN `<script>` tags. Do not introduce React,
   Vue, Tailwind, Sass, webpack, etc. — the client's other reference builds are custom
   for a reason (interactivity without framework overhead); keep it that way here.

3. **Every page shares the same four CSS files and loads them in this order:**
   `tokens.css` → `base.css` → `layout.css` → `components.css` → `animations.css`. Don't
   fork per-page stylesheets; add page-specific rules under a page-scoped selector
   (`body.page-portfolio .grid { ... }`) inside the shared files.

4. **Motion respects `prefers-reduced-motion: reduce`.** Every GSAP timeline and CSS
   animation must have a reduced-motion fallback (instant/opacity-only) — see the pattern
   already established in `js/reveal.js` and `css/animations.css`. Don't add new motion
   without adding its reduced-motion counterpart in the same change.

5. **Plates are content, not decoration.** Plate data (title, collection, frame number,
   tone) lives only in `js/data.js`. Don't hardcode plate markup by hand in HTML — pages
   render plates from that data model so swapping placeholder art for real photography
   (see AGENTS.md) is a one-file change.

6. **Accessibility floor:** semantic landmarks (`<nav>`, `<main>`, `<footer>`), visible
   keyboard focus states (already in `base.css` — don't remove them), alt text on every
   `<img>` (plate alt text comes from `js/data.js`), and the lightbox and filmstrips must
   be operable by keyboard, not just drag/scroll.

7. **Before considering a page "done," check it against `PLAN.md` section 4** (the
   self-critique against generic AI-design defaults). If a change drifts toward stock
   cream/terracotta styling, a generic hero template, or decoration that doesn't come
   from the contact-sheet/darkroom concept, revert it or bring it back in line.

## Commit-sized checklist

- [ ] No literal color/size/duration values added outside `tokens.css`.
- [ ] New CSS lives in the correct shared file (see rule 3).
- [ ] New motion has a reduced-motion fallback.
- [ ] New plates added via `js/data.js`, not hand-authored HTML.
- [ ] Keyboard and screen-reader path checked for anything interactive.
