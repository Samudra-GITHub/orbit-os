"use client";

import { useEffect, useId } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SplashLogoProps {
  /** Fires once the wordmark finishes fading in (~1.5-2s, or immediately under reduced motion). */
  onComplete?: () => void;
  className?: string;
}

// Deterministic converging-particle burst — 8 points evenly spaced around
// the core, angles fixed (not random) so server/client render identically.
const FORMATION_PARTICLES = Array.from({ length: 8 }, (_, i) => {
  const angle = (i / 8) * Math.PI * 2;
  const radius = 46;
  return { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius, delay: (i % 4) * 0.03 };
});

/**
 * The brand reveal sequence, reused by onboarding's Awakening screen and
 * any future app-loading state: the core appears, the orbital ring draws
 * itself in, its glow expands, then the wordmark fades in. ~1.8s total.
 */
export function SplashLogo({ onComplete, className }: SplashLogoProps) {
  const uid = useId();
  const coreId = `splash-core-${uid}`;
  const ringId = `splash-ring-${uid}`;
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!reduceMotion) return;
    onComplete?.();
  }, [reduceMotion, onComplete]);

  return (
    <div className={cn("flex flex-col items-center gap-5", className)}>
      <div className="relative flex h-28 w-28 items-center justify-center">
        {/* AI Orb forms from particles — a burst of points converges into
            the core just as it appears. */}
        {!reduceMotion &&
          FORMATION_PARTICLES.map((p, i) => (
            <motion.span
              key={i}
              aria-hidden
              className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-cyan-300"
              initial={{ x: p.x, y: p.y, opacity: 0.9, scale: 1 }}
              animate={{ x: 0, y: 0, opacity: 0, scale: 0.2 }}
              transition={{ duration: 0.5, delay: p.delay, ease: [0.4, 0, 1, 1] }}
            />
          ))}

        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500/50 to-cyan-400/50 blur-2xl"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.4 }}
          animate={
            reduceMotion ? { opacity: 0.6, scale: 1.1 } : { opacity: [0, 0.9, 0.6], scale: [0.4, 1.3, 1.1] }
          }
          transition={{ duration: reduceMotion ? 0 : 1.8, ease: [0.16, 1, 0.3, 1] }}
        />

        <svg width="96" height="96" viewBox="0 0 64 64" fill="none" className="relative" role="img" aria-label="Orbit OS">
          <defs>
            <linearGradient id={coreId} x1="23" y1="23" x2="41" y2="41" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#a78bfa" />
              <stop offset="1" stopColor="#5eead4" />
            </linearGradient>
            <linearGradient id={ringId} x1="5" y1="32" x2="59" y2="32" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#5eead4" />
              <stop offset="1" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>

          <motion.circle
            cx="32"
            cy="32"
            r="8"
            fill={`url(#${coreId})`}
            initial={reduceMotion ? false : { scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: reduceMotion ? 0 : 0.2, duration: reduceMotion ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "32px 32px" }}
          />

          <g transform="rotate(-22 32 32)">
            <motion.ellipse
              cx="32"
              cy="32"
              rx="25"
              ry="13"
              fill="none"
              stroke={`url(#${ringId})`}
              strokeWidth="5"
              strokeLinecap="round"
              pathLength={100}
              initial={reduceMotion ? false : { strokeDasharray: "0 100" }}
              animate={{ strokeDasharray: "78 22" }}
              transition={{ delay: reduceMotion ? 0 : 0.35, duration: reduceMotion ? 0 : 0.85, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.circle
              cx="57"
              cy="32"
              r="3.6"
              fill="#5eead4"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: reduceMotion ? 0 : 1.1, duration: reduceMotion ? 0 : 0.3 }}
            />
          </g>
        </svg>
      </div>

      <motion.p
        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: reduceMotion ? 0 : 1.2, duration: reduceMotion ? 0 : 0.5 }}
        onAnimationComplete={reduceMotion ? undefined : onComplete}
        className="font-display text-2xl font-semibold tracking-[0.25em] text-white"
      >
        ORBIT
      </motion.p>
    </div>
  );
}
