# CLAUDE.md — Mac Motz photography site

Working rules for this repo. [AGENTS.md](AGENTS.md) has the full architecture reference; this file is the short
version plus the things that are easy to get wrong here.

## Project

Four-page photography portfolio (Home, Portfolio, About, Contact) for macmotz.com. Vite + React 19 +
React Router 7 + Tailwind v4 + Motion. No CMS, no backend, no e-commerce.

```
npm run dev     # http://localhost:5173
npm run build
```

## The design rule

**The homepage is one section repeated.** `CollectionBlock` is rendered once per collection and is the only
content section on the homepage. Order is fixed:

```
Masthead -> CollectionBlock x N -> about strip -> Footer
```

`ArchiveRail` floats over that, fixed to the right edge: the numbered index, collapsed to numbers, expanding on
hover, tracking the block crossing the middle of the viewport. It is not part of the page flow.

This site was rebuilt specifically to delete a pile of one-off homepage sections (marquee, stats band, tabs,
coverflow, field notes, scroll hero). **Do not add new homepage section types.** New ideas go inside
`CollectionBlock` so they appear for every collection, or they do not go in.

References the design answers to: jennifercolten.com (repeating block, numbered index, `Next:` chain),
ulyssesdesanti.com (four nav items, email as nav), anthonytuccitto.com (restraint, intro curtain).

## Do not break these

1. **Page colour lives on `html` only.** An opaque background on `body` or `<main>` paints over the negative
   z-index layers and the animated background vanishes with no error.
2. **Layer order:** GrainField `-z-10` · dot grid `-2` · mobile nav and ArchiveRail `z-40` · Header `z-50` ·
   Lightbox `z-70` · Preloader `z-100` · film grain `999` · Cursor `z-1000`.
3. **The preloader never waits on the network.** Fixed ~1.6s timer. The homepage carries the whole archive; a
   load-gated preloader would hang.
4. **Everything respects `prefers-reduced-motion`.** GrainField draws one static frame, Cursor does not mount,
   LeadSlider stops auto-advancing.
5. **The custom cursor is `(pointer: fine)` only**, and so is the `cursor: none` rule. Text inputs keep a caret.
6. **No scroll-jacking.** No wheel capture, no pinning.
7. **`Typewriter` keeps the full string in the DOM** (invisible, for layout) and overlays the typed characters.
   Remove that and every heading reflows the page as it types. Its caret renders only while in view and typing.

## Text animation

Two components, used everywhere — do not hand-roll a third. `Typewriter` for display headings (pass plain
`text`, include `block` in the class list). `Reveal` for everything else: body copy, metadata, list rows, form
fields. Both no-op under reduced motion.

## Content

`src/data.js` is the single source of truth. `collections[]` drives everything — the homepage blocks, the index,
the portfolio filter, `/portfolio/:id`, the `Next:` chain, the counters.

A collection's `id` is both the route slug and the homepage anchor. Renaming it breaks both.

Adding a collection = appending one object to `collections`. Nothing else.

Swapping in real photographs: files go in `public/images/<collection-id>/`, then give each frame an explicit
`src` and change `allFrames` to use `frame.src` instead of the generated `picsum.photos` URL. Full steps in
AGENTS.md.

## Verifying work

`npm run build` proves it compiles, not that it renders. For anything visual, drive headless Chrome over CDP on
port 9222 and take real screenshots.

**Never use `--virtual-time-budget`.** It freezes `setTimeout` while `requestAnimationFrame` keeps running, so
the preloader never finishes and every screenshot is stuck on the intro curtain. This costs an hour if you do
not know it.

After layout changes, check: no horizontal overflow at 390px wide, no broken images, preloader gone, lightbox
opens and closes and restores body scroll.

Tailwind v4 silently drops classes it cannot parse. After adding unusual utilities, grep the built CSS in
`dist/assets/*.css` to confirm they exist. Note that Tailwind escapes selectors — `aspect-4/5` appears as
`.aspect-4\/5`, and `leading-[.86]` as `.leading-\[\.86\]`.

## Style

- Match the surrounding code. Arbitrary Tailwind values are used throughout (`tracking-[-.035em]`,
  `text-[10px]`); that is deliberate for typographic control.
- Fonts: Fraunces (display), Instrument Sans (body), DM Mono (metadata, labels, counters).
- Colours: `page` warm near-white ground, `ink` near-black text, `sub` muted text, `accent` safelight red.
  `ink` and `paper` stay dark and are used only by the Lightbox.
- Metadata is always mono, uppercase, wide-tracked, small. Titles are always display serif.
- Comments explain *why*, not *what*. Keep them rare.

## Outstanding

- All photography is `picsum.photos` placeholder.
- The contact form validates but sends nothing — needs a real endpoint.
- About page exhibitions/press are placeholders.
- Footer Instagram link has no handle.
