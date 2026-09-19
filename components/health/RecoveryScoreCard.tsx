"use client";

import { motion, useReducedMotion } from "framer-motion";
import { HeartPulse, Activity, Waves } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { springs } from "@/lib/motion/springs";
import { useCountUp } from "@/lib/hooks/useCountUp";
import type { StressLevel } from "@/lib/constants/health";

const RADIUS = 38;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

interface RecoveryScoreCardProps {
  score: number;
  heartRate: number;
  restingHeartRate: number;
  hrv: number;
  stressLevel: StressLevel;
  index?: number;
}

function scoreTone(score: number) {
  if (score >= 75) return { label: "Primed", variant: "positive" as const, from: "#4ade80", to: "var(--color-cyan-400)" };
  if (score >= 50) return { label: "Adequate", variant: "warning" as const, from: "var(--color-amber-400, #fbbf24)", to: "#fb923c" };
  return { label: "Low", variant: "critical" as const, from: "#fb7185", to: "#f43f5e" };
}

/** WHOOP-inspired recovery card — a score ring plus heart rate / RHR / HRV
 *  readouts and a stress badge. */
export function RecoveryScoreCard({ score, heartRate, restingHeartRate, hrv, stressLevel, index = 0 }: RecoveryScoreCardProps) {
  const reduceMotion = useReducedMotion();
  const animatedScore = useCountUp(score);
  const pct = Math.min(100, score) / 100;
  const offset = CIRCUMFERENCE - pct * CIRCUMFERENCE;
  const tone = scoreTone(score);

  return (
    <Card index={index} variant="elevated" className="flex flex-col gap-5 rounded-4xl sm:flex-row sm:items-center">
      <div className="relative flex h-32 w-32 shrink-0 items-center justify-center self-center">
        <svg viewBox="0 0 96 96" className="h-full w-full -rotate-90">
          <circle cx="48" cy="48" r={RADIUS} fill="none" strokeWidth="8" className="stroke-white/10" />
          <motion.circle
            cx="48"
            cy="48"
            r={RADIUS}
            fill="none"
            strokeWidth="8"
            strokeLinecap="round"
            stroke="url(#recovery-ring-gradient)"
            strokeDasharray={CIRCUMFERENCE}
            initial={{ strokeDashoffset: reduceMotion ? offset : CIRCUMFERENCE }}
            animate={{ strokeDashoffset: offset }}
            transition={reduceMotion ? { duration: 0 } : { ...springs.gentle, delay: 0.15 }}
          />
          <defs>
            <linearGradient id="recovery-ring-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={tone.from} />
              <stop offset="100%" stopColor={tone.to} />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="font-display text-3xl font-semibold text-white">{Math.round(animatedScore)}</span>
          <span className="text-[10px] uppercase tracking-[0.12em] text-mist-400">{tone.label}</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-mist-400">Recovery</p>
          <Badge variant={stressLevel === "Low" ? "positive" : stressLevel === "Moderate" ? "warning" : "critical"}>
            Stress · {stressLevel}
          </Badge>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-3">
            <p className="flex items-center gap-1.5 text-[11px] text-mist-400">
              <HeartPulse className="h-3.5 w-3.5 text-rose-300" /> HR
            </p>
            <p className="mt-1 font-mono text-base font-semibold text-white">{heartRate} bpm</p>
          </div>
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-3">
            <p className="flex items-center gap-1.5 text-[11px] text-mist-400">
              <Activity className="h-3.5 w-3.5 text-cyan-300" /> RHR
            </p>
            <p className="mt-1 font-mono text-base font-semibold text-white">{restingHeartRate} bpm</p>
          </div>
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-3">
            <p className="flex items-center gap-1.5 text-[11px] text-mist-400">
              <Waves className="h-3.5 w-3.5 text-violet-300" /> HRV
            </p>
            <p className="mt-1 font-mono text-base font-semibold text-white">{hrv} ms</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
