# AGENTS.md — task recipes for this repo

Companion to `CLAUDE.md` (hard rules) and `PLAN.md` (design decisions). This file is the
"how do I actually do X" reference for whoever — human or agent — touches this codebase
next.

## Running it locally

No build step. Either:
- Open `index.html` directly in a browser, or
- Serve the folder so relative fetches/module imports behave under `file://` restrictions
  in some browsers: `python3 -m http.server 8000` from the project root, then visit
  `http://localhost:8000`.

## Replacing plates (stand-in photography → Mac's real photos)

No real photography was supplied yet, so every plate currently hotlinks a stand-in photo
from **Picsum** (`https://picsum.photos/seed/...`) — a placeholder-image service made
for exactly this purpose (free, no attribution required, safe to ship temporarily). Each
stand-in is tinted with the plate's assigned duotone color (`.plate__duotone` in
`components.css`) so a grab-bag of unrelated stock photos still reads as one considered
palette — that duotone stays on once real photography goes in, too, so don't remove it
expecting a "real" look; it's a permanent art-direction choice, not a placeholder crutch.

To swap a stand-in for a real photo:

1. Open `js/data.js`. Each entry in `COLLECTIONS[].plates[]` looks like:
   ```js
   { id: "int-04", src: "https://picsum.photos/seed/macmotz-int-04/900/1125", alt: "Gas station canopy at dusk, I-70", tone: "rust" }
   ```
2. Add the real image file under `assets/plates/` (create the folder if it doesn't
   exist) and change `src` to its path, e.g. `"assets/plates/interstate-04.jpg"`.
3. Leave `alt` accurate and specific — it's the only description a screen reader gets.
4. `tone` controls the duotone tint and stays in place — don't remove it when `src`
   changes.
5. Recommended export: long edge ≥ 2000px, `.avif` or `.jpg`, sRGB. The filmstrip and
   contact-sheet grid both use `object-fit: cover`, so pre-crop for the aspect ratio in
   `PLATE_ASPECT` at the top of `data.js` if a specific crop matters, otherwise the CSS
   crop is fine for most landscape/portrait frames.
6. If `src` is left empty/`null` for any plate, the site falls back to a plain tone
   gradient automatically (see `.plate` in `components.css`) — so a partially-finished
   swap never shows a broken-image icon.
7. Do this for every plate before the site is considered launch-ready — the Picsum
   stand-ins are explicitly a "before" state, not a finished look, and are random stock
   photography with no connection to Mac's actual work.

## Adding or reordering a collection (reel)

1. Add/edit an object in the `COLLECTIONS` array in `js/data.js` — `id`, `number`
   (two-digit string, e.g. `"07"`), `title`, `blurb`, `plates[]`.
2. Reel order on the homepage and the numbered index rail both follow array order —
   nothing else needs to change.
3. Portfolio page filters are generated from the same array, so a new collection appears
   there automatically.

## Editing the contact form

`contact.html` + `js/contact-form.js` do client-side validation only — **no backend is
wired up**. Before launch, either:
- Point the `<form>` at a form-handling service (Formspree, Basin, Netlify Forms, etc.)
  and set its `action`/`method`, or
- Replace `js/contact-form.js`'s submit handler with a `fetch()` call to a real endpoint.

Don't ship the form as-is without wiring a destination — right now a submit only shows a
client-side confirmation state and goes nowhere.

## Adding a new token

If a design need arises that isn't covered by an existing token in `css/tokens.css`:
1. Name it by role, not value (`--color-accent-hover`, not `--color-orange-2`).
2. Add it in the relevant section of `tokens.css` (Color / Type / Space / Motion / etc).
3. Reference it — never hardcode the raw value elsewhere. See `CLAUDE.md` rule 1.

## Browser/perf notes

- GSAP + ScrollTrigger + Lenis load from CDN (`cdnjs.cloudflare.com`). If working
  offline, download them into `js/vendor/` and update the `<script src>` paths across all
  four HTML files.
- The grain overlay (`js/grain.js` + a full-viewport `<canvas>`) is intentionally cheap
  (static noise tile, not per-frame regeneration) — don't turn it into a per-frame
  animated shader, it's not worth the battery cost on a photography-viewing site.
- Filmstrips use native horizontal scroll with `scroll-snap`, enhanced by GSAP where
  available, so they still work if JS fails to load.

## Known gaps to close before real launch

- Backend for the contact form (see above).
- Real photography for every plate (see above).
- A real domain-hosting deploy target — VPS setup is out of scope for this repo; it's
  static files, so any static host (or a VPS with nginx) works.
- Favicon/OG image set — placeholders live in `assets/` and should be swapped for a real
  mark once Mac Motz has a logotype, if one is wanted.
