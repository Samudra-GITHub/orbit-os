# Orbit OS — Brand Guidelines

## Logo meaning

The Orbit mark is a solid **core** orbited by a single **tilted, gapped ring**, with a small **satellite dot** riding its leading edge. It is deliberately *not* a planet with a ring around its equator — the ring is open (not a closed loop) and sits at an angle, so the mark reads as motion captured mid-cycle rather than a static celestial body. That gap and tilt are the whole idea: Orbit is always *in* orbit, continuously organizing your day rather than sitting still.

- **Core** — the center of your day: the one place Orbit brings everything together.
- **Ring (gapped, tilted)** — continuous motion, never a closed/finished loop.
- **Satellite dot** — the small, moving detail that makes the system feel alive.

## Files

All source assets live in [`public/branding/`](../public/branding/).

| File | Purpose |
|---|---|
| `logo-mark.svg` | Symbol only, full gradient. Primary asset — sidebar, app icon source, AI Orb branding. |
| `logo.svg` | Full horizontal lockup (mark + wordmark) for **light backgrounds** — ink wordmark. |
| `logo-dark.svg` | Full horizontal lockup for **dark backgrounds** — white wordmark. This is the variant used throughout the Orbit OS app itself. |
| `logo-monogram.svg` | Flat single-color (violet), bolder strokes — for tiny or monochrome-only contexts (badges, stamping). |
| `favicon.svg` | Bolder-stroke version of the mark tuned for legibility at 16–32px. Source for `favicon.ico`. |
| `favicon.ico` | Multi-resolution (16/32/48) favicon, generated from `favicon.svg`. |
| `logo-mark-black.svg` / `logo-mark-white.svg` | Pure monochrome variants, transparent background. |
| `pinned-tab.svg` | Safari pinned-tab / mask-icon — single black shape, browser applies its own color. |
| `apple-touch-icon.png` (180×180), `icon-192.png`, `icon-512.png` | Raster app icons for iOS home screen and the web manifest. |

Regenerate the raster set any time the source SVGs change:

```bash
node scripts/generate-icons.mjs
```

## In-app components

- [`components/branding/OrbitLogo.tsx`](../components/branding/OrbitLogo.tsx) — the mark (and optional wordmark) as inline SVG, for use anywhere in the React app. Supports an `animated` breathing pulse (used in the sidebar).
- [`components/branding/SplashLogo.tsx`](../components/branding/SplashLogo.tsx) — the brand reveal sequence: core appears → ring draws itself → glow expands → wordmark fades in (~1.8s, instant under reduced motion). Used by onboarding's Awakening screen; reuse it for any future app-loading state.

## Color system

Primary gradient (used on all full-color variants):

```
Purple  #8B5CF6  →  Cyan  #5EEAD4
```

The core uses a tighter, brighter version of the same gradient (`#A78BFA → #5EEAD4`) so it reads as the "hottest" point of the mark.

- **Secondary (monochrome)**: white mark on dark background — `logo-mark-white.svg`, or `OrbitLogo` rendered with `currentColor` overrides where needed.
- **Pure black**: `logo-mark-black.svg` — print, stamping, or any single-ink context.
- **Pure white**: `logo-mark-white.svg` — dark or photographic backgrounds where the gradient would lose contrast.

No other colors are part of the identity. Don't recolor the mark into brand-unrelated hues (no red/green/yellow versions) — if a single flat color is required and violet/cyan/black/white don't fit the context, that context isn't a fit for the mark.

## Typography pairing

The wordmark uses the app's existing font stack — **Geist** (`--font-geist`, `font-display` token) — set in **all caps** with wide tracking (`tracking-[0.2em]` to `tracking-[0.25em]` in Tailwind terms, ≈0.2–0.25em letter-spacing) and semibold weight. This wide-tracked, minimal treatment is what gives it the Apple-like spacing called for in the design brief — no decorative or display font was introduced.

The **standalone SVG files** (`logo.svg`, `logo-dark.svg`) render the wordmark with a generic system sans-serif fallback stack instead of referencing Geist directly — those files need to render correctly outside the app's own CSS context (e.g. opened directly, or dropped into a doc), so they intentionally don't depend on a loaded web font. This is not a decorative substitute font; it's a portability fallback for the same wide-tracked, bold, all-caps treatment.

## Sizing & minimum size

- **Minimum on-screen size**: 16×16px (favicon). Below that, don't use the mark — use a solid brand-color dot instead.
- **Safe area**: keep clear space around the mark equal to the core circle's radius (i.e. don't crop tighter than the ring's own bounding box). For the full lockup, keep at least one wordmark cap-height of clear space above/below and to the sides.
- **Maskable icons** (`icon-192.png`, `icon-512.png`): the mark is padded to sit within the center ~72% of the canvas, so platform masks (circle, squircle, rounded-square) won't clip it.

## Incorrect usage

- ❌ Don't close the ring into a full, ungapped circle — this collapses the "in motion" meaning into a static ring/planet.
- ❌ Don't add a second ring or additional rings around the core (reads as a generic "planet with rings" icon, which this mark is explicitly designed to avoid).
- ❌ Don't recolor the gradient to anything outside purple→cyan.
- ❌ Don't stretch or skew the mark non-uniformly — the ellipse's proportions and its −22° tilt are fixed.
- ❌ Don't place the gradient mark on a busy photographic background without a solid or blurred backing — use the monochrome white/black variant instead.
- ❌ Don't set the wordmark in anything other than all-caps wide tracking, and never in a decorative/script font.

## Gradient specification

```css
/* Ring */
linear-gradient(to right, #5EEAD4, #8B5CF6)

/* Core */
linear-gradient(135deg, #A78BFA, #5EEAD4)
```

Both are defined as SVG `linearGradient` stops using `userSpaceOnUse` coordinates so the gradient direction stays fixed relative to the mark regardless of its rendered size.

## Icon sizes reference

| Context | Size | File |
|---|---|---|
| Browser tab favicon | 16 / 32 / 48px | `favicon.ico` |
| SVG favicon (modern browsers) | scalable | `favicon.svg` |
| Safari pinned tab | scalable, monochrome | `pinned-tab.svg` |
| iOS home screen | 180×180 | `apple-touch-icon.png` |
| PWA manifest | 192×192, 512×512 | `icon-192.png`, `icon-512.png` |
| Sidebar / in-app | 24–32px | `OrbitLogo` component |
| Splash / onboarding | ~96–112px | `SplashLogo` component |
