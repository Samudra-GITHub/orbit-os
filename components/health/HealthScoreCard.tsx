"use client";

import { motion, useReducedMotion } from "framer-motion";
import { springs } from "@/lib/motion/springs";
import { useCountUp } from "@/lib/hooks/useCountUp";
import { cn } from "@/lib/utils";

const RADIUS = 42;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

interface HealthScoreCardProps {
  score: number;
  /** Renders without its own outer wrapper — for embedding inside `HealthHero`. */
  compact?: boolean;
  className?: string;
}

function scoreLabel(score: number) {
  if (score >= 85) return "Excellent";
  if (score >= 70) return "Good";
  if (score >= 50) return "Fair";
  return "Needs attention";
}

/** The health-score ring — a single 0-100 dial summarizing activity, sleep,
 *  recovery, and hydration into one number, Apple-Health-style. */
export function HealthScoreCard({ score, compact = false, className }: HealthScoreCardProps) {
  const reduceMotion = useReducedMotion();
  const animatedScore = useCountUp(score);
  const pct = Math.min(100, score) / 100;
  const offset = CIRCUMFERENCE - pct * CIRCUMFERENCE;

  return (
    <div className={cn("relative flex shrink-0 items-center justify-center", compact ? "h-28 w-28" : "h-36 w-36", className)}>
      <svg viewBox="0 0 96 96" className="h-full w-full -rotate-90">
        <circle cx="48" cy="48" r={RADIUS} fill="none" strokeWidth="8" className="stroke-white/10" />
        <motion.circle
          cx="48"
          cy="48"
          r={RADIUS}
          fill="none"
          strokeWidth="8"
          strokeLinecap="round"
          stroke="url(#health-score-gradient)"
          strokeDasharray={CIRCUMFERENCE}
          initial={{ strokeDashoffset: reduceMotion ? offset : CIRCUMFERENCE }}
          animate={{ strokeDashoffset: offset }}
          transition={reduceMotion ? { duration: 0 } : { ...springs.gentle, delay: 0.15 }}
        />
        <defs>
          <linearGradient id="health-score-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-violet-400)" />
            <stop offset="100%" stopColor="var(--color-cyan-400)" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-display text-3xl font-semibold text-white">{Math.round(animatedScore)}</span>
        <span className="text-[10px] uppercase tracking-[0.12em] text-mist-400">{scoreLabel(score)}</span>
      </div>
    </div>
  );
}
