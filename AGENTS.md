# AGENTS.md — Mac Motz photography site

Canonical guide for any agent or developer working in this repo. Read this before changing anything.

## What this is

A four-page photography portfolio for Mac Motz (macmotz.com). Fine-art/documentary work, organised into
collections. No e-commerce, no pricing, no packages — visitors browse collections and send an inquiry.

Stack: Vite + React 19 + React Router 7 + Tailwind CSS v4 + Motion (`motion/react`). No CMS, no backend.

```
npm install
npm run dev       # http://localhost:5173
npm run build     # -> dist/
npm run preview
```

## The one rule that defines this site

**The homepage is one section repeated.** `CollectionBlock` is the only content section on the homepage, and it
is rendered once per collection. This is modelled on jennifercolten.com, where the whole archive lives on the
homepage as one repeating project block.

A previous version of this site was a pile of one-off homepage sections (marquee, stats band, tabs, coverflow,
field notes, scroll hero). It was rebuilt specifically to remove them.

**Do not add new homepage section types.** If something new needs to appear, it almost always belongs inside
`CollectionBlock`, so it appears for every collection. The homepage order is fixed:

```
Masthead  ->  CollectionBlock x N  ->  about strip  ->  Footer
```

`ArchiveRail` floats over that, fixed to the right edge — the numbered index, collapsed to numbers and
expanding on hover, tracking whichever block is crossing the middle of the viewport. It is not part of the flow.

## Architecture

```
src/
  data.js                  ALL content. Single source of truth.
  motion.js                shared easing + fade variants
  App.jsx                  routes, ScrollToTop, mounts GrainField / Cursor / Preloader / Header
  styles.css               Tailwind theme tokens + background layers + cursor rules
  components/
    CollectionBlock.jsx    THE repeated section (sticky title col + LeadSlider + ContactSheet + meta strip)
    LeadSlider.jsx         auto-crossfading lead slideshow inside a block
    ContactSheet.jsx       captioned grid of every frame in a collection
    ArchiveRail.jsx        fixed right-edge index with scroll-spy; desktop only
    Masthead.jsx           homepage title block
    Typewriter.jsx         types a heading out when it scrolls into view
    Reveal.jsx             fades body copy and metadata up on scroll
    Lightbox.jsx           full-screen viewer, keyboard + counter + scroll lock
    GrainField.jsx         fixed canvas of drifting dust motes
    Cursor.jsx             camera-viewfinder cursor (corner brackets + centre mark)
    Preloader.jsx          intro curtain. Timing is fixed; see below.
    Header.jsx Footer.jsx Eyebrow.jsx
  pages/
    Home.jsx        Masthead + CollectionBlock per collection + about strip
    Portfolio.jsx   every frame as one filterable contact sheet
    Series.jsx      /portfolio/:series — one CollectionBlock, standalone
    About.jsx  Contact.jsx
public/
  images/           put real photography here
  favicon.svg
```

`CollectionBlock` is used by both `Home` and `Series`. `Series` passes `standalone`, which promotes the title to
`<h1>` and drops the "View collection" link (it would link to the page you are already on).

## Hard invariants

Break any of these and the site degrades silently — no error, no failed build.

1. **The page colour lives on `html` only.** Do not put an opaque background on `body` or on the `<main>` wrapper.
   Negative z-index layers paint *before* an in-flow element's background, so an opaque wrapper covers the
   animated background and the dot grid completely.

2. **Layer order.** Changing these numbers reorders the whole page:

   | Layer | z-index |
   |---|---|
   | `GrainField` canvas | `-z-10` |
   | dot grid (`body::after`) | `-2` |
   | mobile nav, `ArchiveRail` | `z-40` |
   | `Header` | `z-50` |
   | `Lightbox` | `z-70` |
   | `Preloader` | `z-100` |
   | film grain (`body::before`) | `999` |
   | `Cursor` | `z-1000` |

3. **The preloader never waits on the network.** It runs on a fixed ~1.6s timer and then wipes. Do not make it
   depend on image loading — the homepage carries every frame in the archive and would hang.

4. **Every animation respects `prefers-reduced-motion`.** Use `useReducedMotion()` from `motion/react`, or check
   `matchMedia('(prefers-reduced-motion: reduce)')`. `GrainField` draws a single static frame; `Cursor` does not
   mount at all; `LeadSlider` stops auto-advancing.

5. **The custom cursor is pointer-driven only.** `Cursor` mounts only when `(pointer: fine)` matches, and the
   `cursor: none` CSS is behind the same media query. Text inputs keep their caret.

6. **No scroll-jacking.** No wheel capture, no scroll-driven pinning. Normal page scroll always works.

7. **Grid and flex items need `min-w-0` wherever a `truncate` lives inside them.** Grid/flex items default to
   `min-width: auto`, so they refuse to shrink below their content's min-content width — and `truncate` sets
   `white-space: nowrap`, making that the full untruncated string. This silently widened the entire homepage
   past the screen and made mobile Chrome zoom the whole page out. It never shows as "horizontal overflow",
   because the browser expands the viewport to fit. Test at 390px with `mobile: false` to see the real value.

8. **`Typewriter` must keep the full string in the DOM.** It renders the whole text invisibly for layout and
   overlays the typed characters absolutely. Without that, every heading reflows the page as it grows. The caret
   only renders while the element is in view and still typing — otherwise off-screen headings show a lone
   blinking bar above empty space.

## Text animation

Two components, used everywhere. Do not hand-roll a third.

- `Typewriter` — display headings. `<Typewriter as="h1" text="..." speed={80} delay={300} className="block …" />`
  Give it plain text, not children, and always include `block` in the class list. Under reduced motion it
  renders the text directly with no wrapper.
- `Reveal` — everything else: body copy, metadata, eyebrows, list rows, form fields. Takes `as`, `delay`, `y`.

Rough speeds in use: `95` for the masthead, `70–80` for page and collection titles, `14–18` for long display
paragraphs (a slow per-character speed on a long string still takes seconds).

## Content model

Everything lives in `src/data.js`.

```js
collections = [{
  id, number, title, year, location, description, cover, frames: [{ alt }]
}]

allFrames          // flattened; adds id, src, frame ("F001"), collection back-reference
framesByCollection // { [collection.id]: frame[] }
```

`id` is the URL slug (`/portfolio/kin`) **and** the homepage anchor (`#kin`). Changing it breaks both.

Images are currently placeholders generated from `picsum.photos` inside `allFrames`.

### Adding a collection

1. Append an object to `collections` in `src/data.js`. Give it a unique `id`, the next `number` (`'07'`), and a
   `frames` array with one `{ alt }` per photograph.
2. That is the whole change. The homepage block, the index row, the portfolio filter, the `/portfolio/:id` page,
   the `Next:` chain and the `( 01 / 07 )` counters all derive from the array.

### Swapping in real photographs

1. Drop files in `public/images/<collection-id>/`. They are served from `/images/<collection-id>/<file>`.
2. Give each frame an explicit `src` and remove the generated one:

```js
frames: [
  { src: '/images/kin/porch-swing.jpg', alt: 'Grandmother seated on a porch swing at dusk' },
]
```

```js
// in allFrames, replace the generated picsum URL with the frame's own src
src: frame.src,
```

3. Set each collection's `cover` to a real path too (used by the About page).
4. Keep `alt` specific — it is read by screen readers and printed under the lightbox image.
5. Export at roughly 1600px on the long edge, 4:5 for contact-sheet frames. Everything is `loading="lazy"`.

## Verifying changes

`npm run build` only proves it compiles. To prove it renders, drive headless Chrome over CDP:

```bash
chrome --headless=new --disable-gpu --remote-debugging-port=9222 --user-data-dir=/tmp/prof about:blank
# then Page.navigate, sleep, Runtime.evaluate, Page.captureScreenshot
```

**Do not use `--virtual-time-budget`.** It freezes `setTimeout` while letting `requestAnimationFrame` run, so the
preloader never completes and every screenshot is stuck on the intro curtain.

Worth checking after layout changes: no horizontal overflow at 390px, no broken images, the preloader is gone,
lightbox opens/closes and restores body scroll.

## Deployment

React Router uses real browser routes, so the server must fall back to `index.html`. See `nginx.conf.example`:

```nginx
location / { try_files $uri $uri/ /index.html; }
```

Build with `npm run build`, deploy `dist/`.

## Still outstanding

- Real photography (everything is `picsum.photos`).
- The contact form validates and shows a success state but sends nothing. Wire it to Formspree, Basin, or an API
  route in `src/pages/Contact.jsx`.
- Exhibitions and press entries in `src/pages/About.jsx` are placeholders.
- The Instagram link in `Footer.jsx` points at instagram.com with no handle.
