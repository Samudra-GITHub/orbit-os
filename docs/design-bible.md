# Orbit OS Design Bible

Engineering and design rules for Orbit OS. They keep the interface coherent as it grows. Brand and logo guidance lives in [branding.md](branding.md).

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS v4
- Framer Motion
- GSAP, only for cinematic interactions (not default motion)
- Lucide React icons

## Principles

- Never hardcode colors. All color usage traces back to a token in `styles/globals.css` (the `@theme` block).
- Use design tokens from `styles/`.
- Use reusable primitives from `components/ui`. Screen-specific composed widgets live under `components/widgets`, and navigation chrome (`AppShell`, `Sidebar`, `Topbar`) under `components/layout`.
- Every screen is wrapped in `AppShell` (`components/layout/AppShell.tsx`).
- Mobile-first responsive design: base styles target mobile and expand with `sm:` / `md:` / `lg:` / `xl:`.
- Respect `prefers-reduced-motion`. It is handled globally in `styles/globals.css`; don't bypass it with inline animation logic that ignores the media query.
- Keep components modular and production-ready: no half-finished states, no unused scaffolding.

## Motion

- Spring-based interactions (`type: "spring"`); no linear or ease-only transitions for interactive elements.
- No abrupt transitions. Always animate in and out, never snap.
- Cards float subtly on load (the `fadeFloatIn` variant in `components/motion/variants.ts`).
- Glass surfaces morph smoothly: animate backdrop-blur transitions rather than toggling blur instantly.

## Visual style

- Liquid Spatial UI: Apple Liquid Glass principles, adapted with Orbit's purple/cyan identity.
- Premium dark theme only (`color-scheme: dark`).
- Floating navigation and a floating command button.
- Soft ambient shadows via the shadow tokens (`styles/shadows.ts`); avoid raw `rgba()` or hex box-shadows.
- Minimal visual noise: no decorative elements that don't carry information or hierarchy.

## Resolving ambiguity

When a design decision is ambiguous, choose the option that best matches Apple's Liquid Glass principles while preserving Orbit's purple/cyan identity.
