"use client";

import { motion } from "framer-motion";
import { Flame, Clock } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { fadeUp } from "@/lib/motion/variants";
import type { Workout, WorkoutIntensity } from "@/lib/constants/health";

const INTENSITY_VARIANT: Record<WorkoutIntensity, "positive" | "warning" | "critical"> = {
  Low: "positive",
  Medium: "warning",
  High: "critical",
};

function formatDate(dateStr: string) {
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString("en-IN", { month: "short", day: "numeric" });
}

/** Reverse-chronological list of workouts, one `GlassSurface` for the whole
 *  list rather than one per row (each row was its own backdrop-filter
 *  instance — expensive for a 15+ item list) — plain hover-highlighted rows
 *  inside, same recipe as `TransactionList`/`TransactionCard`. */
export function WorkoutTimeline({ workouts }: { workouts: Workout[] }) {
  if (workouts.length === 0) {
    return <EmptyState icon={Flame} title="No workouts yet" description="Logged workouts will show up here." className="py-12" />;
  }

  return (
    <Card variant="widget" className="flex flex-col gap-1 rounded-4xl p-3">
      {workouts.map((w, i) => (
        <motion.div
          key={w.id}
          custom={i}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="flex items-center justify-between gap-3 rounded-2xl px-2.5 py-2.5 transition-colors hover:bg-white/[0.04]"
        >
          <div className="min-w-0">
            <p className="truncate font-medium text-white">{w.name}</p>
            <p className="mt-0.5 text-xs text-mist-400">{formatDate(w.date)}</p>
          </div>
          <div className="flex shrink-0 items-center gap-3 text-xs text-mist-400">
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" strokeWidth={1.75} /> {w.durationMinutes}m
            </span>
            <span className="flex items-center gap-1">
              <Flame className="h-3.5 w-3.5 text-amber-300" strokeWidth={1.75} /> {w.calories} kcal
            </span>
            <Badge variant={INTENSITY_VARIANT[w.intensity]}>{w.intensity}</Badge>
          </div>
        </motion.div>
      ))}
    </Card>
  );
}
