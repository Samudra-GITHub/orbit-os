"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Play, Flame } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProductivityRing } from "@/components/focus/ProductivityRing";
import type { FocusStatsSummary } from "@/lib/focus/computeStats";
import { DAILY_FOCUS_GOAL_MINUTES } from "@/lib/constants/focus";

interface FocusHeroProps {
  stats: FocusStatsSummary;
  onStart: () => void;
}

/** The Focus module's hero — today's progress ring, streak, and the
 *  primary CTA into full-screen Focus Mode. */
export function FocusHero({ stats, onStart }: FocusHeroProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
      transition={reduceMotion ? undefined : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      <Card index={0} variant="elevated" className="relative min-h-[200px] overflow-hidden rounded-4xl">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-16 -top-24 h-72 w-72 rounded-full bg-violet-500/25 blur-[100px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -right-10 h-64 w-64 rounded-full bg-cyan-400/15 blur-[100px]"
        />

        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5">
            <ProductivityRing minutes={stats.todayMinutes} goalMinutes={DAILY_FOCUS_GOAL_MINUTES} size="sm" />
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-mist-400">Focus Mode</p>
              <h1 className="text-gradient-accent mt-1 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                Ready to focus?
              </h1>
              <p className="mt-1 text-sm text-mist-300">
                {stats.todayMinutes} of {DAILY_FOCUS_GOAL_MINUTES} min today
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {stats.streakDays > 0 && (
              <Badge variant="warning" className="hidden sm:inline-flex">
                <Flame className="h-3 w-3" /> {stats.streakDays}-day streak
              </Badge>
            )}
            <Button variant="primary" size="lg" onClick={onStart} className="shrink-0">
              <Play className="h-4 w-4" fill="currentColor" /> Start Focus Session
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
