"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Droplets } from "lucide-react";
import { springs } from "@/lib/motion/springs";

const RADIUS = 52;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

interface WaterRingProps {
  liters: number;
  goalL: number;
  size?: number;
}

/** The hydration progress ring — springs to the current fill percentage
 *  whenever `liters` changes (add/remove glass), same ring recipe as
 *  `HealthScoreCard`/`SavingsGoalCard` in a cyan/blue palette. */
export function WaterRing({ liters, goalL, size = 160 }: WaterRingProps) {
  const reduceMotion = useReducedMotion();
  const pct = Math.min(1, liters / goalL);
  const offset = CIRCUMFERENCE - pct * CIRCUMFERENCE;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
        <circle cx="60" cy="60" r={RADIUS} fill="none" strokeWidth="10" className="stroke-white/[0.08]" />
        <motion.circle
          cx="60"
          cy="60"
          r={RADIUS}
          fill="none"
          strokeWidth="10"
          strokeLinecap="round"
          stroke="url(#water-ring-gradient)"
          strokeDasharray={CIRCUMFERENCE}
          initial={false}
          animate={{ strokeDashoffset: offset }}
          transition={reduceMotion ? { duration: 0 } : springs.gentle}
        />
        <defs>
          <linearGradient id="water-ring-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-cyan-400)" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute flex flex-col items-center">
        <Droplets className="h-5 w-5 text-cyan-300" strokeWidth={1.75} />
        <span className="mt-1 font-display text-2xl font-semibold text-white">{liters.toFixed(1)}L</span>
        <span className="text-[10px] uppercase tracking-[0.12em] text-mist-400">of {goalL}L</span>
      </div>
    </div>
  );
}
