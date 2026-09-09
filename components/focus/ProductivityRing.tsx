"use client";

import { motion, useReducedMotion } from "framer-motion";
import { springs } from "@/lib/motion/springs";

interface ProductivityRingProps {
  minutes: number;
  goalMinutes: number;
  size?: "sm" | "lg";
}

const SIZES = {
  sm: { box: 56, radius: 22, stroke: 5, font: "text-xs" },
  lg: { box: 160, radius: 68, stroke: 10, font: "text-3xl" },
};

/** An animated progress ring for today's focus minutes vs. the daily
 *  goal — used compact in `FocusHero` and full-size on the Stats page. */
export function ProductivityRing({ minutes, goalMinutes, size = "sm" }: ProductivityRingProps) {
  const reduceMotion = useReducedMotion();
  const { box, radius, stroke, font } = SIZES[size];
  const circumference = 2 * Math.PI * radius;
  const pct = Math.min(1, minutes / goalMinutes);

  return (
    <div className="relative shrink-0" style={{ height: box, width: box }}>
      <svg viewBox={`0 0 ${box} ${box}`} className="h-full w-full -rotate-90">
        <circle cx={box / 2} cy={box / 2} r={radius} fill="none" strokeWidth={stroke} className="stroke-white/10" />
        <motion.circle
          cx={box / 2}
          cy={box / 2}
          r={radius}
          fill="none"
          stroke="url(#productivity-ring-gradient)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: reduceMotion ? circumference * (1 - pct) : circumference }}
          animate={{ strokeDashoffset: circumference * (1 - pct) }}
          transition={reduceMotion ? { duration: 0 } : { ...springs.gentle, delay: 0.1 }}
        />
        <defs>
          <linearGradient id="productivity-ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "var(--color-violet-400)" }} />
            <stop offset="100%" style={{ stopColor: "var(--color-cyan-400)" }} />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`font-mono font-semibold text-white ${font}`}>{Math.round(pct * 100)}%</span>
        {size === "lg" && (
          <span className="mt-1 text-xs text-mist-400">
            {minutes}/{goalMinutes} min
          </span>
        )}
      </div>
    </div>
  );
}
