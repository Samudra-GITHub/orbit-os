"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export type OrbitLogoVariant = "mark" | "full";

interface OrbitLogoProps {
  /** "mark" = symbol only (sidebar, app icon). "full" = symbol + wordmark. */
  variant?: OrbitLogoVariant;
  /** Pixel size of the mark itself; the wordmark scales relative to it. */
  size?: number;
  className?: string;
  /** Subtle breathing scale loop — used for the sidebar brand mark. */
  animated?: boolean;
}

/**
 * The official Orbit mark: a tilted, gapped orbital ring with a leading
 * satellite dot around a solid core — used everywhere in-app (sidebar,
 * splash, onboarding). Gradient IDs are namespaced with useId() so multiple
 * instances can mount at once without colliding.
 */
export function OrbitLogo({ variant = "mark", size = 32, className, animated = false }: OrbitLogoProps) {
  const uid = useId();
  const coreId = `orbit-core-${uid}`;
  const ringId = `orbit-ring-${uid}`;
  const reduceMotion = useReducedMotion();

  const mark = (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Orbit OS"
      animate={animated && !reduceMotion ? { scale: [1, 1.05, 1] } : undefined}
      transition={animated && !reduceMotion ? { duration: 4, repeat: Infinity, ease: "easeInOut" } : undefined}
    >
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
      <g transform="rotate(-22 32 32)">
        <ellipse
          cx="32"
          cy="32"
          rx="25"
          ry="13"
          fill="none"
          stroke={`url(#${ringId})`}
          strokeWidth="5"
          strokeLinecap="round"
          pathLength={100}
          strokeDasharray="78 22"
        />
        <circle cx="57" cy="32" r="3.6" fill="#5eead4" />
      </g>
      <circle cx="32" cy="32" r="8" fill={`url(#${coreId})`} />
    </motion.svg>
  );

  if (variant === "mark") {
    return <span className={cn("inline-flex shrink-0", className)}>{mark}</span>;
  }

  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      {mark}
      <span
        className="font-display font-semibold tracking-[0.2em] text-white"
        style={{ fontSize: size * 0.5 }}
      >
        ORBIT
      </span>
    </span>
  );
}
