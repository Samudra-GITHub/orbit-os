"use client";

import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { CalendarClock } from "lucide-react";
import { GlassSurface } from "@/components/ui/GlassSurface";
import type { Trip } from "@/lib/constants/travel";
import { daysUntilTrip } from "@/lib/travel/computeStats";

const NOW = new Date("2026-09-09T12:00:00");

interface CountdownCardProps {
  trip: Trip;
  compact?: boolean;
}

/** Days-until-departure, ticking in on mount via a spring — each digit
 *  crossfades when it changes rather than snapping. */
export function CountdownCard({ trip, compact = false }: CountdownCardProps) {
  const reduceMotion = useReducedMotion();
  const days = daysUntilTrip(trip, NOW);
  const label = days === 0 ? "Today" : days === 1 ? "Tomorrow" : `${days} days`;

  const content = (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-violet-500/15">
        <CalendarClock className="h-5 w-5 text-violet-300" strokeWidth={1.75} />
      </div>
      <div>
        <p className="text-[11px] uppercase tracking-[0.14em] text-mist-500">Departs in</p>
        <AnimatePresence mode="wait">
          <motion.p
            key={label}
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono text-lg font-semibold text-white"
          >
            {label}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );

  if (compact) return content;

  return (
    <GlassSurface intensity="subtle" interactive={false} className="rounded-3xl p-4">
      {content}
    </GlassSurface>
  );
}
