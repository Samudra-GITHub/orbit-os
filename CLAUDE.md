# ORBIT Engineering Rules

You are building **ORBIT OS**. Follow this Design Bible at all times.

## Stack

- Next.js 15 App Router
- TypeScript
- Tailwind CSS v4
- Framer Motion
- GSAP — only for cinematic interactions (not default motion)
- Lucide React icons

## Principles

- Never hardcode colors. All color usage traces back to a token in `/styles/globals.css` (`@theme` block).
- Use design tokens from `/styles`.
- Use reusable primitives from `/components/ui` (`GlassCard`, `MagneticButton`, `AppShell`, etc). Screen-specific composed widgets live under `/components/widgets`, navigation chrome under `/components/navigation`.
- Every screen is wrapped in `AppShell` (`components/ui/AppShell.tsx`).
- Mobile-first responsive design (base styles target mobile, expand with `sm:`/`md:`/`lg:`/`xl:`).
- Respect `prefers-reduced-motion` (handled globally in `styles/globals.css`; don't bypass it with inline animation logic that ignores the media query).
- Keep components modular and production-ready — no half-finished states, no unused scaffolding.

## Motion

- Spring-based interactions (`type: "spring"`, no linear/ease-only transitions for interactive elements).
- No abrupt transitions — always animate in/out, never snap.
- Cards float subtly on load (`fadeFloatIn` variant in `lib/motion/variants.ts`).
- All motion tokens (springs, durations, easings, variants) live in `lib/motion/`; reusable interaction effects (magnetic hover, cursor spotlight, glass ripple, page/shared-element transitions) live in `components/effects/` — compose those instead of redefining animation inline.
- Buttons have magnetic hover (`components/ui/MagneticButton.tsx`).
- Glass surfaces morph smoothly (backdrop-blur transitions, no instant blur toggles).

## Visual Style

- Liquid Spatial UI — Apple Liquid Glass principles, adapted with Orbit's purple/cyan identity.
- Premium dark theme only (`color-scheme: dark`).
- Floating navigation and floating command button.
- Soft ambient shadows via `shadow-glow-*` tokens — never raw `rgba()`/hex box-shadows.
- Minimal visual noise — no decorative elements that don't carry information or hierarchy.

## Ambiguity rule

When a design decision is ambiguous, choose the option that best matches **Apple's Liquid Glass principles** while preserving **Orbit's purple/cyan identity**.
