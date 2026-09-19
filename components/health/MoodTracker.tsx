"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { springs } from "@/lib/motion/springs";
import { MOOD_META, type Mood, type MoodEntry } from "@/lib/constants/health";
import { cn } from "@/lib/utils";

const MOODS = Object.keys(MOOD_META) as Mood[];

interface MoodTrackerProps {
  todayEntry: MoodEntry;
  onSetMood: (mood: Mood, note?: string) => void;
  index?: number;
}

/** Today's mood journal — an emoji selector, plus a notes field. Takes its
 *  state as props rather than calling `useMood()` itself, so a page that
 *  also needs the mood history (e.g. the Mood page's calendar/weekly view)
 *  shares one hook instance instead of two unsynced copies. */
export function MoodTracker({ todayEntry, onSetMood, index = 0 }: MoodTrackerProps) {
  const [note, setNote] = useState(todayEntry.note ?? "");

  return (
    <Card index={index} variant="widget" className="flex flex-col gap-4 rounded-4xl">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-mist-400">How are you feeling today?</p>

      <div className="flex flex-wrap gap-2.5" role="radiogroup" aria-label="Select today's mood">
        {MOODS.map((mood) => {
          const isSelected = todayEntry.mood === mood;
          return (
            <motion.button
              key={mood}
              type="button"
              role="radio"
              aria-checked={isSelected}
              aria-label={mood}
              onClick={() => onSetMood(mood, note || undefined)}
              whileTap={{ scale: 0.9 }}
              transition={springs.snappy}
              className={cn(
                "flex flex-col items-center gap-1.5 rounded-2xl border px-3.5 py-2.5 text-xs transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400",
                isSelected
                  ? "border-violet-400/40 bg-white/10 text-white"
                  : "border-white/10 bg-white/[0.03] text-mist-400 hover:text-mist-200"
              )}
            >
              <span className="text-xl" aria-hidden>
                {MOOD_META[mood].emoji}
              </span>
              {mood}
            </motion.button>
          );
        })}
      </div>

      <label className="flex flex-col gap-1.5">
        <span className="text-xs text-mist-400">Notes (optional)</span>
        <textarea
          value={note}
          onChange={(e) => {
            setNote(e.target.value);
            onSetMood(todayEntry.mood, e.target.value || undefined);
          }}
          placeholder="What's on your mind?"
          rows={2}
          className="resize-none rounded-2xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-2.5 text-sm text-white placeholder:text-mist-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
        />
      </label>
    </Card>
  );
}
