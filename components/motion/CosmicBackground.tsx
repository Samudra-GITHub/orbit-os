"use client";

import { memo } from "react";
import { motion, useReducedMotion, type Transition } from "framer-motion";

/**
 * Fixed full-screen cosmic backdrop, layered behind AppShell:
 *  1. void-black base
 *  2. three drifting radial glows (purple / indigo / cyan)
 *  3. a static mesh-gradient blend between the three hues
 *  4. a CSS-only starfield, ~1-2% opacity
 *  5. soft film-grain noise
 *  6. a vignette to pull focus toward center
 *
 * Only opacity/transform are animated (GPU-friendly — no filter/blur
 * animation), every loop is 30-40s, and everything is skipped under
 * prefers-reduced-motion. Memoized — it takes no props and mounts once at
 * the root, but every route's re-render would otherwise re-run this
 * component's layered gradients for no visual change.
 */
function CosmicBackgroundImpl() {
  const reduceMotion = useReducedMotion();

  const drift = (duration: number, delay = 0): Transition =>
    reduceMotion
      ? { duration: 0 }
      : { duration, delay, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" };

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-void"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Layer 2 — purple glow, top-center */}
      <motion.div
        className="absolute left-1/2 top-[-15%] h-[620px] w-[620px] -translate-x-1/2 rounded-full bg-violet-600/25 blur-[120px]"
        animate={
          reduceMotion
            ? undefined
            : { x: [0, 30, -20, 0], y: [0, 20, -10, 0], scale: [1, 1.06, 0.97, 1], opacity: [0.9, 1, 0.85, 0.9] }
        }
        transition={drift(34, 0)}
      />
      {/* Layer 2 — indigo glow, left */}
      <motion.div
        className="absolute left-[-15%] top-[35%] h-[520px] w-[520px] rounded-full bg-indigo-500/20 blur-[120px]"
        animate={
          reduceMotion
            ? undefined
            : { x: [0, 40, -20, 0], y: [0, -25, 15, 0], scale: [1, 0.95, 1.05, 1], opacity: [0.85, 1, 0.8, 0.85] }
        }
        transition={drift(38, 4)}
      />
      {/* Layer 2 — cyan glow, bottom-right */}
      <motion.div
        className="absolute bottom-[-15%] right-[-10%] h-[560px] w-[560px] rounded-full bg-cyan-500/20 blur-[130px]"
        animate={
          reduceMotion
            ? undefined
            : { x: [0, -30, 20, 0], y: [0, -20, 25, 0], scale: [1, 1.05, 0.96, 1], opacity: [0.8, 0.95, 0.85, 0.8] }
        }
        transition={drift(36, 8)}
      />

      {/* Layer 3 — static mesh blend */}
      <div className="bg-cosmic-mesh absolute inset-0" />

      {/* Layer 4 — tiny stars */}
      <div className="bg-cosmic-stars absolute inset-0 opacity-[0.02]" />

      {/* Layer 5 — film-grain noise */}
      <div className="bg-cosmic-noise absolute inset-0 opacity-[0.04] mix-blend-overlay" />

      {/* Layer 6 — vignette */}
      <div className="bg-cosmic-vignette absolute inset-0" />
    </motion.div>
  );
}

export const CosmicBackground = memo(CosmicBackgroundImpl);
