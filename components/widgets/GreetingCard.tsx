"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CalendarClock, CloudSun, Search, TrendingUp, Zap, type LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { AIOrb } from "@/components/motion/AIOrb";
import { getGreeting } from "@/lib/utils";

const USER_NAME = "Samudra";

interface Insight {
  icon: LucideIcon;
  text: string;
}

const INSIGHTS: Insight[] = [
  { icon: CalendarClock, text: "3 meetings before noon" },
  { icon: Zap, text: "Best focus window 2–4 PM" },
  { icon: TrendingUp, text: "Energy trending up vs. yesterday" },
  { icon: CloudSun, text: "Rain expected after 5 PM" },
];

const FOCUS_SCORE = 82;

function FocusScoreRing({ score }: { score: number }) {
  return (
    <div
      className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
      style={{
        background: `conic-gradient(var(--color-cyan-400) ${score * 3.6}deg, color-mix(in oklab, white 10%, transparent) 0deg)`,
      }}
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-ink-900">
        <span className="font-mono text-xs font-semibold text-white">{score}</span>
      </div>
    </div>
  );
}

function WeatherChip() {
  const reduceMotion = useReducedMotion();
  return (
    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 py-1.5 pl-2 pr-3">
      <motion.span
        animate={reduceMotion ? undefined : { y: [0, -3, 0] }}
        transition={reduceMotion ? undefined : { duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-400/15"
      >
        <CloudSun className="h-3.5 w-3.5 text-cyan-300" strokeWidth={2} />
      </motion.span>
      <span className="text-xs font-medium text-mist-300">22° Bengaluru</span>
    </div>
  );
}

/**
 * The hero search field is Orbit's command-center trigger: focusing it
 * opens the real Spotlight overlay (CommandPalette) rather than accepting
 * typed text itself, so there's one search experience, not two.
 */
function CommandTrigger() {
  function openPalette() {
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true }));
  }

  return (
    <button
      onClick={openPalette}
      className="flex h-12 w-full items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.07] px-5 text-left transition-colors hover:border-violet-400/40 hover:bg-white/[0.1]"
    >
      <Search className="h-4 w-4 shrink-0 text-mist-400" />
      <span className="flex-1 truncate text-sm text-mist-400">Ask Orbit anything...</span>
      <kbd className="hidden shrink-0 rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] text-mist-500 sm:block">
        ctrl K
      </kbd>
    </button>
  );
}

export function GreetingCard() {
  const [greeting, setGreeting] = useState("Good day");
  const [dateLabel, setDateLabel] = useState("");
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const now = new Date();
    setGreeting(getGreeting(now));
    setDateLabel(
      now.toLocaleDateString(undefined, {
        weekday: "long",
        month: "long",
        day: "numeric",
      })
    );
  }, []);

  return (
    <motion.div
      className="col-span-full"
      animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
      transition={reduceMotion ? undefined : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      <Card
        index={0}
        variant="elevated"
        className="relative min-h-[220px] overflow-hidden rounded-4xl md:min-h-[240px]"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -left-16 -top-24 h-72 w-72 rounded-full bg-violet-500/25 blur-[100px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -right-10 h-64 w-64 rounded-full bg-cyan-400/15 blur-[100px]"
        />

        <div className="relative flex h-full flex-col justify-between gap-5">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            {/* Left — orb, date, greeting, AI summary */}
            <div className="flex items-start gap-4">
              <AIOrb size="lg" />
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-mist-400">{dateLabel}</p>
                <h1 className="text-gradient-accent mt-1 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                  {greeting}, {USER_NAME}
                </h1>
                <p className="mt-2 max-w-md text-sm text-mist-300">
                  4 events today · 2 focus sessions left · saved{" "}
                  <span className="text-cyan-300">25 min</span> of commute · spending down vs. yesterday
                </p>
              </div>
            </div>

            {/* Center — command trigger */}
            <div className="lg:w-[280px] xl:w-[340px]">
              <CommandTrigger />
            </div>

            {/* Right — focus score + weather */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2.5">
                <FocusScoreRing score={FOCUS_SCORE} />
                <div className="text-xs">
                  <p className="font-medium text-white">Focus score</p>
                  <p className="text-mist-400">Trending up this week</p>
                </div>
              </div>
              <WeatherChip />
            </div>
          </div>

          {/* Bottom — daily intelligence chips */}
          <div className="flex flex-wrap gap-2.5 border-t border-white/10 pt-4">
            {INSIGHTS.map((insight) => (
              <div
                key={insight.text}
                className="flex items-center gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.04] px-3 py-2 transition-colors hover:border-violet-400/25 hover:bg-white/[0.07]"
              >
                <insight.icon className="h-3.5 w-3.5 shrink-0 text-violet-300" strokeWidth={1.75} />
                <span className="text-xs text-mist-300">{insight.text}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
