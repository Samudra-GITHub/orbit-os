"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PartyPopper } from "lucide-react";
import { GlassSurface } from "@/components/ui/GlassSurface";
import { Badge } from "@/components/ui/Badge";
import { springs } from "@/lib/motion/springs";
import type { SavingsGoal } from "@/lib/constants/finance";
import { formatINR } from "@/lib/finance/format";

const RADIUS = 30;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function formatDeadline(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", { month: "short", year: "numeric" });
}

interface SavingsGoalCardProps {
  goal: SavingsGoal;
  index?: number;
}

/** A goal tile with an animated progress ring — the ring's dash-offset
 *  springs in from empty on mount, or jumps straight to its final value
 *  when the user prefers reduced motion. Goals at 100% get a small
 *  completion celebration instead of the usual percentage readout. */
export function SavingsGoalCard({ goal, index = 0 }: SavingsGoalCardProps) {
  const reduceMotion = useReducedMotion();
  const pct = Math.min(100, (goal.saved / goal.target) * 100);
  const offset = CIRCUMFERENCE - (pct / 100) * CIRCUMFERENCE;
  const isComplete = pct >= 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <GlassSurface intensity="subtle" className="h-full rounded-3xl p-5">
        <div className="flex h-full flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="relative flex h-[76px] w-[76px] shrink-0 items-center justify-center">
            <svg viewBox="0 0 72 72" className="h-full w-full -rotate-90">
              <circle cx="36" cy="36" r={RADIUS} fill="none" strokeWidth="6" className="stroke-white/10" />
              <motion.circle
                cx="36"
                cy="36"
                r={RADIUS}
                fill="none"
                strokeWidth="6"
                strokeLinecap="round"
                stroke={isComplete ? "url(#goal-ring-complete)" : "url(#goal-ring-gradient)"}
                strokeDasharray={CIRCUMFERENCE}
                initial={{ strokeDashoffset: reduceMotion ? offset : CIRCUMFERENCE }}
                animate={{ strokeDashoffset: offset }}
                transition={reduceMotion ? { duration: 0 } : { ...springs.gentle, delay: 0.15 }}
              />
              <defs>
                <linearGradient id="goal-ring-gradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="var(--color-violet-400)" />
                  <stop offset="100%" stopColor="var(--color-cyan-400)" />
                </linearGradient>
                <linearGradient id="goal-ring-complete" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#34d399" />
                  <stop offset="100%" stopColor="var(--color-cyan-400)" />
                </linearGradient>
              </defs>
            </svg>
            {isComplete ? (
              <motion.span
                initial={reduceMotion ? { scale: 1 } : { scale: 0.4, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ ...springs.snappy, delay: 0.4 }}
                className="absolute text-xl"
                aria-hidden
              >
                <PartyPopper className="h-6 w-6 text-emerald-300" />
              </motion.span>
            ) : (
              <span className="absolute text-xl" aria-hidden>
                {goal.emoji}
              </span>
            )}
          </div>

          <div className="min-w-0">
            <p className="truncate font-medium text-white">{goal.label}</p>
            <p className="mt-0.5 text-xs text-mist-400">Est. completion {formatDeadline(goal.deadline)}</p>
            {isComplete ? (
              <Badge variant="positive" className="mt-1 text-[10px]">
                Goal reached
              </Badge>
            ) : (
              <p className="mt-1 font-mono text-sm text-cyan-300">{Math.round(pct)}%</p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-white/[0.08] pt-3.5 text-xs">
          <span className="text-mist-400">
            <span className="font-mono text-white">{formatINR(goal.saved)}</span> saved
          </span>
          <span className="text-mist-500">
            {isComplete ? "Target met" : `${formatINR(goal.target - goal.saved)} to go`}
          </span>
        </div>
        </div>
      </GlassSurface>
    </motion.div>
  );
}
