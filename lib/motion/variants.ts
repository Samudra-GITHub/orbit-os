import type { Variants } from "framer-motion";
import { springs } from "@/lib/motion/springs";

/**
 * Shared Framer Motion variants. This is the one place a "how does Orbit's
 * UI move" question should be answered — components import these instead
 * of redefining their own entrance/hover motion inline.
 */

/** The standard card/panel entrance: fades up with a slight scale pop,
 *  staggerable via the `custom` index. Used by Card, MotionCard, and any
 *  GlassSurface with `animateEntrance`. */
export const fadeFloatIn: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { ...springs.default, delay: 0.08 * i },
  }),
};

/** The routed-content cross-fade every module layout uses on path change
 *  (Finance/Travel/Health/Focus sub-nav, Settings, Workspace, AI) — pass as
 *  `initial`/`animate` on a `motion.div` keyed by `pathname`. Previously
 *  hand-rolled identically in 7 separate `layout.tsx`/`*Layout.tsx` files. */
export const pageFade = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const },
};

/** A lighter entrance for smaller elements (chips, list rows) — no scale,
 *  just a fade + short rise. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { ...springs.default, delay: 0.06 * i },
  }),
};

/** A plain scale-in, for badges/icons popping into place. */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: springs.snappy },
};

/** Wrap a list in this (as `initial`/`animate`) to stagger its children's
 *  own `show` variants automatically. */
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

/** The hover lift every interactive glass surface uses: translateY(-6px),
 *  scale(1.015), spring-eased. Pass as `whileHover`. */
export const hoverElevate = {
  y: -6,
  scale: 1.015,
  transition: springs.default,
};

/** AI Orb halo (the blurred glow layer) per interaction state. `idle` is
 *  the only one wired to a real Orbit feature today — `listening` /
 *  `thinking` / `success` are ready for real voice/AI integration. */
export const aiOrbHalo: Variants = {
  idle: {
    scale: [0.98, 1.04, 0.98],
    opacity: [0.6, 1, 0.6],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
  },
  listening: {
    scale: [1, 1.18, 1],
    opacity: [0.7, 1, 0.7],
    transition: { duration: 1.4, repeat: Infinity, ease: "easeInOut" },
  },
  thinking: {
    scale: [1, 1.1, 0.96, 1],
    opacity: [0.7, 1, 0.8, 0.7],
    transition: { duration: 1, repeat: Infinity, ease: "easeInOut" },
  },
  success: {
    scale: [1, 1.35, 1],
    opacity: [0.8, 1, 0.6],
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

/** AI Orb outer ring rotation speed per state — faster while "thinking". */
export const aiOrbRing: Variants = {
  idle: { rotate: 360, transition: { duration: 12, repeat: Infinity, ease: "linear" } },
  listening: { rotate: 360, transition: { duration: 8, repeat: Infinity, ease: "linear" } },
  thinking: { rotate: 360, transition: { duration: 3, repeat: Infinity, ease: "linear" } },
  success: { rotate: 360, transition: { duration: 12, repeat: Infinity, ease: "linear" } },
};
