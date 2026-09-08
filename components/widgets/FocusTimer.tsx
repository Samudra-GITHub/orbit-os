"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw, Timer, Flame } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const SESSION_SECONDS = 25 * 60;
const RADIUS = 46;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const SESSIONS_TODAY = 2;
const SESSIONS_TARGET = 5;
const STREAK_DAYS = 12;

export function FocusTimer() {
  const [secondsLeft, setSecondsLeft] = useState(SESSION_SECONDS);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running && secondsLeft > 0) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((s) => {
          if (s <= 1) {
            setRunning(false);
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running, secondsLeft]);

  const progress = 1 - secondsLeft / SESSION_SECONDS;
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  const [endsAt, setEndsAt] = useState("");

  useEffect(() => {
    const end = new Date(Date.now() + secondsLeft * 1000);
    setEndsAt(end.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" }));
  }, [secondsLeft]);

  function reset() {
    setRunning(false);
    setSecondsLeft(SESSION_SECONDS);
  }

  return (
    <Card index={2} variant="widget" className="flex flex-col items-center gap-5 rounded-4xl">
      <div className="flex w-full items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-mist-400">Focus session</p>
        <div className="flex items-center gap-1.5 rounded-full border border-amber-400/20 bg-amber-400/10 px-2.5 py-1 text-[11px] font-medium text-amber-300">
          <Flame className="h-3 w-3" />
          {STREAK_DAYS}-day streak
        </div>
      </div>

      <div className="relative flex h-44 w-44 items-center justify-center">
        <div
          aria-hidden
          className={`absolute inset-4 rounded-full bg-gradient-to-br from-violet-500/30 to-cyan-400/30 blur-2xl transition-opacity duration-700 ${
            running ? "opacity-100" : "opacity-40"
          }`}
        />
        <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90">
          <circle cx="50" cy="50" r={RADIUS} fill="none" className="stroke-white/10" strokeWidth="6" />
          <motion.circle
            cx="50"
            cy="50"
            r={RADIUS}
            fill="none"
            stroke="url(#focus-gradient)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            animate={{ strokeDashoffset: CIRCUMFERENCE * (1 - progress) }}
            transition={{ ease: "linear", duration: 0.4 }}
          />
          <defs>
            <linearGradient id="focus-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: "var(--color-violet-400)" }} />
              <stop offset="100%" style={{ stopColor: "var(--color-cyan-400)" }} />
            </linearGradient>
          </defs>
        </svg>
        <div className="relative flex flex-col items-center">
          <span className="font-mono text-3xl font-semibold tabular-nums text-white">
            {minutes}:{String(seconds).padStart(2, "0")}
          </span>
          <span className="text-xs text-mist-400">Deep Work</span>
        </div>
      </div>

      <div className="flex w-full items-center justify-between text-xs text-mist-400">
        <span>Ends {endsAt}</span>
        <span>
          {SESSIONS_TODAY}/{SESSIONS_TARGET} sessions today
        </span>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="icon" size="sm" magnetic={false} onClick={reset} aria-label="Reset timer">
          <RotateCcw className="h-4 w-4" />
        </Button>
        <Button
          variant="primary"
          size="lg"
          magnetic={false}
          aria-label={running ? "Pause timer" : "Start timer"}
          onClick={() => setRunning((r) => !r)}
          whileHover={{ scale: 1.08 }}
          className="h-16 w-16 rounded-full shadow-glow-accent-lg"
        >
          {running ? (
            <Pause className="h-7 w-7" fill="currentColor" />
          ) : (
            <Play className="ml-1 h-7 w-7" fill="currentColor" />
          )}
        </Button>
        <Timer className="h-4 w-4 text-mist-500" strokeWidth={1.75} />
      </div>
    </Card>
  );
}
