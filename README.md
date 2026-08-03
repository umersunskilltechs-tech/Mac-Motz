# Mac Motz

Photography portfolio for Mac Motz (macmotz.com) — a fine-art/documentary photographer working on long-form
collections about place, travel, vacancy, landscape, coastline, and family. React + Vite + Tailwind CSS + Motion
for React + React Router.

## Routes

- `/` — Home: image-first intro, all six collections in a vertical editorial sequence, hover/focus archive index
- `/portfolio` — dense contact-sheet gallery of every frame, filterable by collection, with a lightbox
- `/portfolio/:series` — a single collection's editorial page and grid (`:series` is the collection id, e.g. `kin`)
- `/about` — editorial biography, statement, exhibitions/press placeholders, direct email
- `/contact` — inquiry form (name, email, project type, message) with client-side validation

There is no e-commerce, pricing, or package selection anywhere on the site — visitors browse collections and send
inquiries for custom quotes.

## Run locally

```bash
npm install
npm run dev
```

`npm run build` produces a production build in `dist/`; `npm run preview` serves that build locally.

## Project structure

```
src/
  data.js              collection + frame data (see below)
  motion.js            shared Motion variants/easing
  App.jsx              routes + app shell (header, preloader)
  components/          Header, Footer, Preloader, Lightbox, FrameGrid,
                        CollectionRow, CollectionIndex, Eyebrow
  pages/               Home, Portfolio, Series, About, Contact
```

## Replacing photographs

All images are placeholders from `picsum.photos`, defined in `src/data.js`. Each collection has a `cover` image
and a `frames` array; each frame has an `alt` description and (via `allFrames`) a generated `src`. To swap in real
photography:

1. Replace `cover` on each collection with the real hero image URL/path.
2. Replace each frame's placeholder `src` (or add a `src` field per frame instead of relying on the generated
   picsum URL) with the real image.
3. Keep the `alt` text meaningful and specific — it's used for accessibility and appears under the lightbox image.

Collections currently defined: Interstate, Low Country, Vacancy, Kin, Static, Coastline — each with 8 frames.

## Motion & accessibility

- Preloader is capped at ~900ms and never waits on image/network loads.
- All animation respects `prefers-reduced-motion` (see `src/styles.css` and `useReducedMotion()` usage throughout).
- The lightbox is a proper dialog (`role="dialog"`, `aria-modal`), supports Escape / Arrow Left / Arrow Right,
  shows a visible close button and a frame counter, and traps body scroll while open.
- No autoplay video, no scroll-jacking, no wheel-captured carousels — normal page scroll always works.

## Contact form

The contact form validates client-side and shows a success state, but it does not send anything yet. Before
launch, wire the form (`src/pages/Contact.jsx`) to a real endpoint — Formspree, Basin, or a custom API route.

## VPS deployment (Nginx)

This app uses real React Router browser routes (`/portfolio`, `/portfolio/:series`, etc.), so the server must fall
back to `index.html` for unknown paths or direct refreshes on those routes will 404. See
[nginx.conf.example](nginx.conf.example):

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

Build with `npm run build` and deploy the contents of `dist/`.
