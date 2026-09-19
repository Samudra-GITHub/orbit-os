"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, CheckCircle2 } from "lucide-react";
import { GlassSurface } from "@/components/ui/GlassSurface";
import { TimelineCard } from "@/components/travel/TimelineCard";
import type { ItineraryDay } from "@/lib/constants/travel";
import { cn } from "@/lib/utils";

interface ItineraryTimelineProps {
  days: ItineraryDay[];
  onToggleActivity: (dayId: string, activityId: string) => void;
}

function formatDayDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", { weekday: "long", month: "short", day: "numeric" });
}

/** Day-by-day expandable planner — each day is its own accordion of
 *  morning/afternoon/evening `TimelineCard`s. Days are a plain array
 *  keyed by stable `id`s (no positional index math), so reordering later
 *  (drag-and-drop) is a matter of re-sorting the array, not restructuring
 *  the component. */
export function ItineraryTimeline({ days, onToggleActivity }: ItineraryTimelineProps) {
  const [expandedId, setExpandedId] = useState<string | null>(days[0]?.id ?? null);

  return (
    <div className="flex flex-col gap-3">
      {days.map((day) => {
        const completedCount = day.activities.filter((a) => a.completed).length;
        const isExpanded = expandedId === day.id;

        return (
          <GlassSurface key={day.id} intensity="subtle" interactive={false} className="rounded-3xl p-1">
            <div className="flex flex-col">
              <button
                type="button"
                onClick={() => setExpandedId(isExpanded ? null : day.id)}
                aria-expanded={isExpanded}
                aria-controls={`itinerary-${day.id}`}
                className="flex w-full items-center justify-between gap-3 rounded-2xl px-4 py-3.5 text-left transition-colors hover:bg-white/[0.04]"
              >
                <div>
                  <p className="font-medium text-white">{day.label}</p>
                  <p className="text-xs text-mist-400">{formatDayDate(day.date)}</p>
                </div>
                <div className="flex items-center gap-3">
                  {completedCount === day.activities.length && day.activities.length > 0 && (
                    <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                  )}
                  <span className="text-xs text-mist-500">
                    {completedCount}/{day.activities.length}
                  </span>
                  <motion.span animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.25 }}>
                    <ChevronDown className="h-4 w-4 text-mist-400" />
                  </motion.span>
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    id={`itinerary-${day.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className={cn("flex flex-col gap-2 px-3 pb-3 pt-1")}>
                      {day.activities.map((activity) => (
                        <TimelineCard
                          key={activity.id}
                          activity={activity}
                          onToggle={() => onToggleActivity(day.id, activity.id)}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </GlassSurface>
        );
      })}
    </div>
  );
}
