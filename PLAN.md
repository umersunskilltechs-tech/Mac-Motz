# Mac Motz — Design Plan & Pre-Build Audit

Status: approved direction, build in progress.
Read this before CLAUDE.md / AGENTS.md — those files enforce what this plan decides.

---

## 1. Brief, restated

Client owns macmotz.com, wants a photography site that does NOT read as "name + carousel."
Loves jennifercolten.com (non-plain background, collections shown live on the homepage,
not hidden behind a "portfolio" click), and specifically called out ulyssesdesanti.com and
anthonytuccitto.com as favorites. Four pages: Home, Portfolio, About, Contact. No pricing,
no e-commerce. Fully responsive. Static HTML/CSS/JS build (no framework), animation
libraries permitted.

## 2. Grounding the subject

The brief doesn't name a genre, so I'm pinning one down: Mac Motz is a fine-art /
documentary photographer working in long-form series about place — American landscapes,
vacancy, coastline, family — in the same lineage as Colten's "American Bottom" project.
That choice is what the whole design hangs off: contact sheets, negatives, darkroom
safelight, sprocket holes, frame counters. A photographer's own working vocabulary, not
a generic "creative portfolio" template.

Six invented collections carry the placeholder content (real photography to be dropped in
by the client later — see "Plates" below):
`Interstate`, `Low Country`, `Vacancy`, `Kin`, `Static`, `Coastline`.

## 3. Design tokens

**Color** — dark, warm, non-plain (per brief), grounded in the darkroom, not the
cream+terracotta / near-black+acid-green defaults:

| token | hex | role |
|---|---|---|
| `--color-void` | `#12100D` | base background |
| `--color-void-raised` | `#1B1815` | panels, raised sections |
| `--color-fog` | `#EDE7DA` | primary ink on dark |
| `--color-ash` | `#8F887A` | secondary ink, labels |
| `--color-signal` | `#B5451F` | darkroom safelight — accent, links, active states |
| `--color-signal-dim` | `#7A3117` | pressed/hover-deep accent |
| `--color-line` | `rgba(237,231,218,0.14)` | hairlines |

**Type** — three roles, used with restraint:
- Display: **Fraunces** (soft-contrast serif, optical size "opsz" pushed high) — names,
  collection titles, pull quotes only. Never body copy.
- Body: **Instrument Sans** — all reading copy, nav, UI labels.
- Utility/mono: **IBM Plex Mono** — frame numbers, captions, form labels, metadata. This
  is the "contact sheet" voice: technical, small, all-caps or numeric.

**Layout concept** — Home is a vertical stack of full-bleed "reels," one per collection,
each a horizontal filmstrip that scrolls independently of page scroll (mirrors Colten's
per-project filmstrips). A fixed numbered index sits at the left edge on desktop
(01–06, jump links); a running frame counter sits at the right edge. Portfolio is a dense
contact-sheet grid of every plate, filterable by collection, opening a lightbox. About is
a single editorial column with a mono "spec sheet." Contact is a darkroom slip: big serif
question, underline-only fields, mono labels.

```
HOME
┌───────────────────────────────────────────────────┐
│ 01 02 03..           MAC MOTZ                 F01/48│  <- index / hero / counter
│                photographs of quiet places          │
├───────────────────────────────────────────────────┤
│ 01 — INTERSTATE                        (04 plates) │
│  [plate][plate][plate][plate] ← horiz filmstrip →   │
├───────────────────────────────────────────────────┤
│ 02 — LOW COUNTRY                                    │
│  [plate][plate][plate][plate][plate]                │
├───────────────────────────────────────────────────┤
│                 ... 4 more reels ...                │
├───────────────────────────────────────────────────┤
│  ABOUT teaser  /  CONTACT strip  /  footer          │
└───────────────────────────────────────────────────┘
```

**Signature element** — the *contact sheet system*: every image is a "plate" carrying a
mono frame number (`F014`), sprocket-tick marks run along the top/bottom of each filmstrip
like film perforations, and a custom viewfinder cursor (crosshair + corner brackets)
replaces the pointer over any image. A live frame counter in the corner updates via
scroll position. This is one idea, executed consistently everywhere, rather than
scattered decoration.

## 4. Self-critique against generic-AI defaults

- Not cream/`#D97757` terracotta. Not near-black/acid-green. Not a hairline broadsheet
  grid (hairlines are used, but only as one small utility inside a very different,
  cinematic vertical-reel layout).
- Numbered markers (01–06) are justified: they *are* a real sequence — the client's own
  collections, presented in the order they should be read — not a decorative "our
  process" fake-numbering.
- The signature (contact sheet / sprockets / frame counter / viewfinder cursor) is
  specific to photography as a medium, not a generic "cool cursor effect."

## 5. Plates (stand-in photography)

No photographs were supplied. Every plate currently hotlinks a stand-in photo from
Picsum (a placeholder-image service, free and attribution-free), seeded per plate so
each one is stable across reloads. Every stand-in is passed through the same duotone
treatment (grayscale + the plate's tone color via `mix-blend-mode: color`), so a
grab-bag of unrelated stock photography still reads as one deliberate palette — this
duotone stays on after real photography is dropped in; it's the site's look, not a
placeholder trick. If an image URL ever fails to load (offline, hotlink blocked), the
`.plate`'s underlying tone gradient shows through instead of a broken-image icon. Real
photography must replace every stand-in before launch — see `AGENTS.md` under
"Replacing plates."

## 6. Stack

Static HTML/CSS/JS, no build step, no framework (per "just html").
- **GSAP + ScrollTrigger** (CDN) — reel reveals, filmstrip drag/scroll sync, counter.
- **Lenis** (CDN) — smooth inertia scrolling.
- All motion respects `prefers-reduced-motion`.
- All color/size/spacing/type/motion values are CSS custom properties defined once in
  `css/tokens.css`. No hardcoded hex/px/rem/duration values in component CSS — see
  `CLAUDE.md` rule set.

## 7. Pages & files

```
index.html          Home — hero + 6 reels + about/contact strip
portfolio.html       Full contact-sheet grid, filterable, lightbox
about.html           Editorial bio + spec sheet
contact.html         Inquiry form + direct contact
css/tokens.css        All design tokens (source of truth)
css/base.css          Reset, typography, grain overlay, focus states
css/layout.css        Page-level layout/grid
css/components.css     Nav, plate, filmstrip, index rail, counter, lightbox, form
css/animations.css     Keyframes + reduced-motion rules
js/data.js             Collections + plates content model
js/cursor.js            Viewfinder custom cursor
js/smooth-scroll.js     Lenis init
js/reveal.js            GSAP scroll reveals + frame counter
js/filmstrip.js         Horizontal filmstrip drag/wheel sync
js/lightbox.js          Portfolio lightbox
js/nav.js               Menu, index rail active state
js/contact-form.js      Client-side validation (no backend wired — see AGENTS.md)
CLAUDE.md / AGENTS.md   Working rules for whoever (human or agent) edits this repo next
```
