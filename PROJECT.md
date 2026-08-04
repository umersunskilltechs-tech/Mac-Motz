# Project direction

Mac Motz is a fine-art/documentary photographer whose work follows place, transit, family, and quiet spaces. The
experience should feel editorial and cinematic rather than like a generic portfolio template. No e-commerce,
packages, or pricing — visitors browse collections and inquire for custom quotes.

## Reference sites

- [jennifercolten.com](https://www.jennifercolten.com/) — the whole archive lives on the homepage as one repeating
  project block; a numbered index at the top doubles as jump-navigation.
- [ulyssesdesanti.com](https://ulyssesdesanti.com/) — four nav items, email as a nav item, editorial inner pages.
- [anthonytuccitto.com](https://www.anthonytuccitto.com/) — extreme restraint, near-empty landing, tiled intro
  curtain.

All three are light, typographic, and built from very few distinct section types.

## Design decisions

- Warm near-white ground (`page`) with near-black text (`ink`) and a safelight-red accent. The dark tones
  (`ink`, `paper`) are retained for the preloader curtain and the lightbox, so the intro reads as a dark curtain
  lifting off a bright page.
- Editorial serif for display type (Fraunces), clean sans for body copy (Instrument Sans), mono for
  metadata/frame labels (DM Mono).
- **The homepage is one section repeated.** `CollectionBlock` renders a sticky title column, a lead slideshow, and
  a full contact sheet; the homepage stacks one per collection and nothing else competes with it. The series page
  reuses the same component. This replaced the earlier pile of one-off homepage sections.
- The background is never a flat white sheet: a fixed canvas of drifting dust motes (`GrainField`) sits under a
  faint dot grid and a film-grain overlay. The motes drift upward, twinkle, and parallax gently with the pointer.
- Motion enters content as it becomes relevant: masthead fade-up, in-view reveals on the contact sheet, hover
  expansion in the index, and lightbox crossfades — never scroll-jacking or wheel-captured carousels.
- Every effect respects `prefers-reduced-motion`, including the mote field (drawn once, then static).

## Layer order (do not break this)

The page colour lives on `html` only. Giving `body` or the app wrapper an opaque background will paint over the
negative z-index layers (`GrainField` at `-z-10`, the dot grid at `z-index: -2`) and the animated background will
silently disappear.

## Next content pass

1. Replace every placeholder photograph (currently `picsum.photos`) with approved Mac Motz photography — see
   README for exactly which fields to update in `src/data.js`.
2. Connect the contact form to a real endpoint (Formspree, Basin, or a custom API).
3. Fill in real exhibitions/press placeholders in `src/pages/About.jsx`.
