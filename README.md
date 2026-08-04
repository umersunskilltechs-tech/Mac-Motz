# Mac Motz

Photography portfolio for Mac Motz (macmotz.com) — a fine-art/documentary photographer working on long-form
collections about place, travel, vacancy, landscape, coastline, and family.

React + Vite + Tailwind CSS v4 + Motion for React + React Router.

> Working on this codebase? Read [AGENTS.md](AGENTS.md) first — it documents the architecture, the invariants
> that fail silently, and exactly how to add collections and real photographs.

## Run locally

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build in dist/
npm run preview
```

## Routes

- `/` — Home. The masthead, then every collection in full as one repeating block, with a fixed archive index
  tracking your position down the right edge.
- `/portfolio` — every frame as a single contact sheet, filterable by collection, with a lightbox.
- `/portfolio/:series` — one collection on its own page (`:series` is the collection id, e.g. `kin`).
- `/about` — biography, statement, exhibitions and press.
- `/contact` — inquiry form.

There is no e-commerce, pricing, or package selection anywhere on the site — visitors browse collections and
send inquiries for custom quotes.

## Structure

```
src/
  data.js         all collection + frame content (single source of truth)
  motion.js       shared easing and fade variants
  App.jsx         routes and app shell
  styles.css      theme tokens, background layers, cursor rules
  components/     CollectionBlock, LeadSlider, ContactSheet, ArchiveRail, Masthead,
                  Typewriter, Reveal, Lightbox, GrainField, Cursor, Preloader,
                  Header, Footer, Eyebrow
  pages/          Home, Portfolio, Series, About, Contact
public/images/    real photography goes here
```

The homepage is one section repeated: `CollectionBlock` renders once per collection and is the only content
section on the page. `Series` reuses the same component for a single collection.

## Replacing the photographs

All images are currently placeholders from `picsum.photos`, generated in `src/data.js`. To swap in real work,
put files in `public/images/<collection-id>/`, give each frame an explicit `src`, and change `allFrames` to use
it. Step-by-step in [AGENTS.md](AGENTS.md).

## Motion & accessibility

- The preloader runs on a fixed ~1.6s timer and never waits on image or network loads.
- All animation respects `prefers-reduced-motion` — the drifting background renders one static frame, the custom
  cursor does not mount, and the lead slideshows stop auto-advancing.
- The lightbox is a proper dialog (`role="dialog"`, `aria-modal`), supports Escape / Arrow Left / Arrow Right,
  shows a close button and a frame counter, and restores body scroll on close.
- The custom cursor only appears for precise pointers; text inputs keep their caret.
- No autoplay video, no scroll-jacking, no wheel-captured carousels — normal page scroll always works.

## Contact form

The form validates client-side and shows a success state, but it does not send anything yet. Before launch, wire
it (`src/pages/Contact.jsx`) to a real endpoint — Formspree, Basin, or a custom API route.

## VPS deployment (Nginx)

This app uses real React Router browser routes, so the server must fall back to `index.html` or direct refreshes
on those routes will 404. See [nginx.conf.example](nginx.conf.example):

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

Build with `npm run build` and deploy the contents of `dist/`.
