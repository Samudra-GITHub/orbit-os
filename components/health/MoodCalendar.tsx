"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { MOOD_META, type MoodEntry } from "@/lib/constants/health";
import { fadeUp } from "@/lib/motion/variants";

/** 30-day mood heatmap — one tinted tile per day, colored by `MOOD_META`.
 *  Hover/focus reveals the exact mood + date via a native title tooltip. */
export function MoodCalendar({ history, index = 1 }: { history: MoodEntry[]; index?: number }) {
  return (
    <Card index={index} variant="widget" className="flex flex-col gap-4 rounded-4xl">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-mist-400">Last 30 days</p>
      <div className="grid grid-cols-7 gap-1.5 sm:grid-cols-10">
        {history.map((entry, i) => {
          const label = new Date(`${entry.date}T00:00:00`).toLocaleDateString("en-IN", { month: "short", day: "numeric" });
          return (
            <motion.div
              key={entry.date}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              title={`${label} — ${entry.mood}${entry.note ? `: ${entry.note}` : ""}`}
              tabIndex={0}
              role="img"
              aria-label={`${label}, mood: ${entry.mood}`}
              className="flex aspect-square items-center justify-center rounded-lg text-xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
              style={{ background: `color-mix(in oklab, ${MOOD_META[entry.mood].color} 35%, transparent)` }}
            >
              <span aria-hidden className="opacity-90">
                {MOOD_META[entry.mood].emoji}
              </span>
            </motion.div>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] text-mist-400">
        {(Object.keys(MOOD_META) as (keyof typeof MOOD_META)[]).map((mood) => (
          <span key={mood} className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: MOOD_META[mood].color }} />
            {mood}
          </span>
        ))}
      </div>
    </Card>
  );
}
