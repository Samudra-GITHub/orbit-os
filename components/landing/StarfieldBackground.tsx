"use client";

import { motion, useReducedMotion } from "framer-motion";

const STAR_COUNT = 60;

// Deterministic placement (no Math.random) — identical on server and
// client, avoiding hydration mismatches.
const STARS = Array.from({ length: STAR_COUNT }, (_, i) => ({
  left: `${(i * 37) % 100}%`,
  top: `${(i * 53 + 11) % 100}%`,
  size: 1 + (i % 3),
  duration: 2 + (i % 5),
  delay: (i % 10) * 0.3,
}));

/** A denser, twinkling starfield for the Hero — distinct from the global
 *  CosmicBackground's subtle ambient stars, this one is the section's own
 *  focal texture. Pure opacity animation (GPU-friendly), skipped under
 *  prefers-reduced-motion. */
export function StarfieldBackground() {
  const reduceMotion = useReducedMotion();

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {STARS.map((star, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-white"
          style={{ left: star.left, top: star.top, width: star.size, height: star.size }}
          animate={reduceMotion ? { opacity: 0.5 } : { opacity: [0.2, 0.9, 0.2] }}
          transition={
            reduceMotion ? undefined : { duration: star.duration, delay: star.delay, repeat: Infinity, ease: "easeInOut" }
          }
        />
      ))}
    </div>
  );
}
