# Project direction

Mac Motz is a fine-art/documentary photographer whose work follows place, transit, family, and quiet spaces. The
experience should feel editorial and cinematic rather than like a generic portfolio template. No e-commerce,
packages, or pricing — visitors browse collections and inquire for custom quotes.

## Design decisions

- Dark darkroom palette: near-black field (`ink`), raised panel tone (`panel`), warm paper text (`paper`),
  muted secondary text (`muted`), and a safelight-red accent (`accent`).
- Editorial serif for display type (Fraunces), clean sans for body copy (Instrument Sans), mono for
  metadata/frame labels (DM Mono).
- Collections are visible directly on the homepage as a vertical editorial sequence, plus a hover/focus-expanding
  archive index near the page end.
- Motion enters content as it becomes relevant: hero fade-up, staggered/in-view reveals, hover expansion, and
  lightbox crossfades — never scroll-jacking or wheel-captured carousels.
- Every effect respects `prefers-reduced-motion`.

## Next content pass

1. Replace every placeholder photograph (currently `picsum.photos`) with approved Mac Motz photography — see
   README for exactly which fields to update in `src/data.js`.
2. Connect the contact form to a real endpoint (Formspree, Basin, or a custom API).
3. Fill in real exhibitions/press placeholders in `src/pages/About.jsx`.
