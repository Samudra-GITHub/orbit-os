"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface FocusTimerProps {
  secondsLeft: number;
  progress: number;
  running: boolean;
  presetLabel: string;
  size?: "md" | "xl";
  onToggle: () => void;
  onReset: () => void;
  transparent?: boolean;
}

const SIZES = {
  md: { box: 220, radius: 96, stroke: 8, text: "text-4xl" },
  xl: { box: 340, radius: 152, stroke: 10, text: "text-6xl" },
};

/** The animated countdown ring — the same component renders the compact
 *  preview on the Overview page and the large centerpiece inside
 *  `FocusModeOverlay`, driven entirely by props from `useFocusTimer`. */
export function FocusTimer({
  secondsLeft,
  progress,
  running,
  presetLabel,
  size = "md",
  onToggle,
  onReset,
  transparent = false,
}: FocusTimerProps) {
  const reduceMotion = useReducedMotion();
  const { box, radius, stroke, text } = SIZES[size];
  const circumference = 2 * Math.PI * radius;
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative flex items-center justify-center" style={{ height: box, width: box }}>
        <div
          aria-hidden
          className={`absolute inset-6 rounded-full bg-gradient-to-br from-violet-500/30 to-cyan-400/30 blur-2xl transition-opacity duration-700 ${
            running ? "opacity-100" : "opacity-40"
          }`}
        />
        <svg viewBox={`0 0 ${box} ${box}`} className="absolute inset-0 -rotate-90">
          <circle
            cx={box / 2}
            cy={box / 2}
            r={radius}
            fill="none"
            strokeWidth={stroke}
            className={transparent ? "stroke-white/15" : "stroke-white/10"}
          />
          <motion.circle
            cx={box / 2}
            cy={box / 2}
            r={radius}
            fill="none"
            stroke="url(#focus-timer-gradient)"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            animate={{ strokeDashoffset: circumference * (1 - progress) }}
            transition={reduceMotion ? { duration: 0 } : { ease: "linear", duration: 0.4 }}
          />
          <defs>
            <linearGradient id="focus-timer-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: "var(--color-violet-400)" }} />
              <stop offset="100%" style={{ stopColor: "var(--color-cyan-400)" }} />
            </linearGradient>
          </defs>
        </svg>
        <div className="relative flex flex-col items-center">
          <span className={`font-mono font-semibold tabular-nums text-white ${text}`}>
            {minutes}:{String(seconds).padStart(2, "0")}
          </span>
          <span className={transparent ? "text-sm text-white/60" : "text-sm text-mist-400"}>{presetLabel}</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant={transparent ? "outline" : "icon"}
          size="sm"
          magnetic={false}
          onClick={onReset}
          aria-label="Reset timer"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
        <Button
          variant="primary"
          size="lg"
          magnetic={false}
          aria-label={running ? "Pause timer" : "Start timer"}
          onClick={onToggle}
          whileHover={{ scale: 1.08 }}
          className="h-16 w-16 rounded-full shadow-glow-accent-lg"
        >
          {running ? <Pause className="h-7 w-7" fill="currentColor" /> : <Play className="ml-1 h-7 w-7" fill="currentColor" />}
        </Button>
        <div className="h-10 w-10" aria-hidden />
      </div>
    </div>
  );
}
