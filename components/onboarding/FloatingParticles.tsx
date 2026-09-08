"use client";

import { motion, useReducedMotion } from "framer-motion";

const PARTICLE_COUNT = 20;

// Deterministic (no Math.random) so server and client render identically —
// avoids hydration mismatches while still looking organically scattered.
const PARTICLES = Array.from({ length: PARTICLE_COUNT }).map((_, i) => ({
  left: `${(i * 53) % 100}%`,
  top: `${(i * 31 + 17) % 100}%`,
  size: 1 + (i % 3),
  duration: 14 + (i % 5) * 3,
  delay: (i % 6) * 0.8,
}));

/**
 * Ambient drifting particles shared across every onboarding screen.
 * Transform + opacity only (GPU-friendly), skipped entirely under
 * prefers-reduced-motion.
 */
export function FloatingParticles() {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-[5] overflow-hidden">
      {PARTICLES.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-white/40"
          style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
          animate={{ y: [0, -30, 0], opacity: [0.15, 0.7, 0.15] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
