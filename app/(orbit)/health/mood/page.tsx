"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { NotebookText } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { MoodTracker } from "@/components/health/MoodTracker";
import { MoodCalendar } from "@/components/health/MoodCalendar";
import { EmptyState } from "@/components/ui/EmptyState";
import { useMood } from "@/lib/hooks/useMood";
import { MOOD_META } from "@/lib/constants/health";
import { computeMoodStreak } from "@/lib/health/computeStats";
import { fadeUp } from "@/lib/motion/variants";

export default function HealthMoodPage() {
  const { todayEntry, setMood, history } = useMood();
  const streak = useMemo(() => computeMoodStreak(history), [history]);
  const last7 = history.slice(-7);
  const notes = useMemo(() => history.filter((e) => e.note).slice(-5).reverse(), [history]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-white">Mood</h1>
          <p className="mt-1 text-sm text-mist-400">A daily journal — saved locally as you go.</p>
        </div>
        {streak.mood && streak.streak > 1 && (
          <Badge variant="positive">
            {MOOD_META[streak.mood].emoji} {streak.streak}d streak
          </Badge>
        )}
      </div>

      <MoodTracker todayEntry={todayEntry} onSetMood={setMood} index={0} />

      <Card index={1} variant="widget" className="flex flex-col gap-4 rounded-4xl">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-mist-400">This week</p>
        <div className="flex items-end justify-between gap-2">
          {last7.map((entry, i) => (
            <motion.div
              key={entry.date}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="flex flex-1 flex-col items-center gap-1.5"
            >
              <span
                className="flex h-10 w-10 items-center justify-center rounded-2xl text-lg"
                style={{ background: `color-mix(in oklab, ${MOOD_META[entry.mood].color} 30%, transparent)` }}
                aria-hidden
              >
                {MOOD_META[entry.mood].emoji}
              </span>
              <span className="text-[10px] text-mist-500">
                {new Date(`${entry.date}T00:00:00`).toLocaleDateString("en-IN", { weekday: "narrow" })}
              </span>
            </motion.div>
          ))}
        </div>
      </Card>

      <MoodCalendar history={history} index={2} />

      <Card index={3} variant="widget" className="flex flex-col gap-3 rounded-4xl">
        <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.2em] text-mist-400">
          <NotebookText className="h-3.5 w-3.5 text-violet-300" /> Recent notes
        </p>
        {notes.length > 0 ? (
          <ul className="flex flex-col gap-3">
            {notes.map((entry) => (
              <li key={entry.date} className="flex items-start gap-3 border-b border-white/[0.06] pb-3 last:border-0 last:pb-0">
                <span className="text-lg" aria-hidden>
                  {MOOD_META[entry.mood].emoji}
                </span>
                <div className="min-w-0">
                  <p className="text-xs text-mist-500">
                    {new Date(`${entry.date}T00:00:00`).toLocaleDateString("en-IN", { month: "short", day: "numeric" })} · {entry.mood}
                  </p>
                  <p className="mt-0.5 text-sm text-mist-200">{entry.note}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState icon={NotebookText} title="No notes yet" description="Notes you add to a mood entry will show up here." className="py-8" />
        )}
      </Card>
    </div>
  );
}
