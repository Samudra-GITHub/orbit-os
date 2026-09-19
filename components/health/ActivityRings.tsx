"use client";

import { motion, useReducedMotion } from "framer-motion";
import { springs } from "@/lib/motion/springs";

interface RingSpec {
  id: string;
  label: string;
  value: number;
  goal: number;
  colorFrom: string;
  colorTo: string;
}

interface ActivityRingsProps {
  move: { value: number; goal: number };
  exercise: { value: number; goal: number };
  stand: { value: number; goal: number };
  size?: number;
  showLegend?: boolean;
}

const RADII = { move: 54, exercise: 40, stand: 26 };
const STROKE = 10;

/** Apple Fitness-style concentric Move/Exercise/Stand rings. Each ring's
 *  dash-offset springs in from empty on mount (or jumps straight to its
 *  final value under reduced motion), same recipe as `SavingsGoalCard`'s
 *  single ring, just three concentric ones sharing one SVG viewBox. */
export function ActivityRings({ move, exercise, stand, size = 180, showLegend = true }: ActivityRingsProps) {
  const reduceMotion = useReducedMotion();

  const rings: RingSpec[] = [
    { id: "move", label: "Move", value: move.value, goal: move.goal, colorFrom: "#fb7185", colorTo: "#f43f5e" },
    { id: "exercise", label: "Exercise", value: exercise.value, goal: exercise.goal, colorFrom: "#a3e635", colorTo: "#4ade80" },
    { id: "stand", label: "Stand", value: stand.value, goal: stand.goal, colorFrom: "#22d3ee", colorTo: "#06b6d4" },
  ];

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative" style={{ width: size, height: size }}>
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
          {rings.map((ring) => {
            const radius = RADII[ring.id as keyof typeof RADII];
            const circumference = 2 * Math.PI * radius;
            const pct = Math.min(1, ring.value / ring.goal);
            const offset = circumference - pct * circumference;
            return (
              <g key={ring.id}>
                <circle cx="60" cy="60" r={radius} fill="none" strokeWidth={STROKE} className="stroke-white/[0.08]" />
                <motion.circle
                  cx="60"
                  cy="60"
                  r={radius}
                  fill="none"
                  strokeWidth={STROKE}
                  strokeLinecap="round"
                  stroke={`url(#ring-${ring.id})`}
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: reduceMotion ? offset : circumference }}
                  animate={{ strokeDashoffset: offset }}
                  transition={reduceMotion ? { duration: 0 } : { ...springs.gentle, delay: 0.15 }}
                />
              </g>
            );
          })}
          <defs>
            {rings.map((ring) => (
              <linearGradient key={ring.id} id={`ring-${ring.id}`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={ring.colorFrom} />
                <stop offset="100%" stopColor={ring.colorTo} />
              </linearGradient>
            ))}
          </defs>
        </svg>
      </div>

      {showLegend && (
        <div className="flex items-center gap-4 text-xs">
          {rings.map((ring) => (
            <div key={ring.id} className="flex items-center gap-1.5">
              <span
                aria-hidden
                className="h-2 w-2 rounded-full"
                style={{ background: `linear-gradient(135deg, ${ring.colorFrom}, ${ring.colorTo})` }}
              />
              <span className="text-mist-400">
                {ring.label} <span className="font-mono text-white">{Math.round((ring.value / ring.goal) * 100)}%</span>
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
