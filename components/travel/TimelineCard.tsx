"use client";

import { motion } from "framer-motion";
import { Check, Sunrise, Sun, Sunset } from "lucide-react";
import { springs } from "@/lib/motion/springs";
import type { ItineraryActivity } from "@/lib/constants/travel";
import { cn } from "@/lib/utils";

const slotIcon = { morning: Sunrise, afternoon: Sun, evening: Sunset };
const slotLabel = { morning: "Morning", afternoon: "Afternoon", evening: "Evening" };

interface TimelineCardProps {
  activity: ItineraryActivity;
  onToggle: () => void;
}

/** One morning/afternoon/evening activity row, with a spring-animated
 *  checkmark on completion. */
export function TimelineCard({ activity, onToggle }: TimelineCardProps) {
  const SlotIcon = slotIcon[activity.slot];

  return (
    <div className="flex items-start gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-3.5">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-violet-500/15">
        <SlotIcon className="h-4 w-4 text-violet-300" strokeWidth={1.75} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[11px] uppercase tracking-[0.1em] text-mist-500">{slotLabel[activity.slot]}</p>
        <p className={cn("mt-0.5 text-sm font-medium", activity.completed ? "text-mist-500 line-through" : "text-white")}>
          {activity.title}
        </p>
        <p className="mt-0.5 text-xs text-mist-400">{activity.description}</p>
      </div>

      <button
        type="button"
        onClick={onToggle}
        aria-pressed={activity.completed}
        aria-label={activity.completed ? `Mark "${activity.title}" as not done` : `Mark "${activity.title}" as done`}
        className={cn(
          "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400",
          activity.completed ? "border-transparent bg-gradient-to-br from-violet-500 to-cyan-400" : "border-white/20"
        )}
      >
        {activity.completed && (
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={springs.snappy}>
            <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
          </motion.span>
        )}
      </button>
    </div>
  );
}
