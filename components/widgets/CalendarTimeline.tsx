"use client";

import { motion } from "framer-motion";
import { CalendarClock } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

const EVENTS = [
  { time: "9:00", duration: "45m", title: "Design sync", tag: "Team", color: "bg-violet-400", active: false },
  {
    time: "11:30",
    duration: "1h 30m",
    title: "Focus block · Orbit v2",
    tag: "Deep work",
    color: "bg-cyan-400",
    active: true,
  },
  { time: "14:00", duration: "30m", title: "1:1 with Ravi", tag: "Meeting", color: "bg-amber-400", active: false },
  { time: "16:30", duration: "45m", title: "Ship review", tag: "Product", color: "bg-rose-400", active: false },
];

// "Now" sits between events 1 and 2 for this mock timeline.
const NOW_POSITION_INDEX = 1;

export function CalendarTimeline() {
  return (
    <Card index={3} variant="widget" className="flex flex-col gap-5 rounded-4xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-mist-400">Today</p>
          <h2 className="mt-1 font-display text-lg font-semibold text-white">Timeline</h2>
        </div>
        <CalendarClock className="h-5 w-5 text-mist-400" strokeWidth={1.75} />
      </div>

      <div className="relative flex flex-col gap-5 pl-1">
        <div className="absolute bottom-1 left-[7px] top-1 w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent" />

        {EVENTS.map((e, i) => (
          <motion.div key={e.title}>
            {i === NOW_POSITION_INDEX && (
              <div className="relative mb-5 flex items-center gap-2 pl-5">
                <span className="absolute -left-[3px] h-2 w-2 rounded-full bg-rose-400 shadow-glow-cyan" />
                <span className="h-px flex-1 bg-rose-400/40" />
                <span className="text-[10px] font-medium uppercase tracking-wide text-rose-300">Now</span>
              </div>
            )}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.08, duration: 0.4 }}
              className="group relative flex items-start gap-4 rounded-xl pl-5 transition-colors hover:bg-white/[0.03]"
            >
              <span
                className={cn(
                  "absolute left-0 top-1 h-3.5 w-3.5 rounded-full ring-4 ring-ink-900",
                  e.color,
                  e.active && "animate-pulse-glow"
                )}
              />
              <span className="w-12 shrink-0 pt-0.5 font-mono text-xs font-medium text-mist-400">{e.time}</span>
              <div
                className={cn(
                  "flex-1 rounded-xl border border-white/5 px-3 py-2 transition-colors",
                  e.active ? "border-cyan-400/30 bg-cyan-400/5" : "bg-white/[0.03] group-hover:border-white/10"
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium text-white">{e.title}</p>
                  <span className="shrink-0 rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-mist-400">
                    {e.duration}
                  </span>
                </div>
                <p className="text-xs text-mist-400">{e.tag}</p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}
