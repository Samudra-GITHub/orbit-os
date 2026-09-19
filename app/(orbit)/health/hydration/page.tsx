"use client";

import { motion } from "framer-motion";
import { Droplets } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { HydrationTracker } from "@/components/health/HydrationTracker";
import { useHydration } from "@/lib/hooks/useHydration";
import { fadeUp } from "@/lib/motion/variants";

function heatTint(liters: number, goal: number) {
  const pct = Math.min(1, liters / goal);
  if (pct <= 0) return "transparent";
  return `color-mix(in oklab, var(--color-cyan-400) ${Math.round(pct * 80 + 15)}%, transparent)`;
}

export default function HealthHydrationPage() {
  const { history, goalL } = useHydration();

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-2xl font-semibold text-white">Hydration</h1>
        <p className="mt-1 text-sm text-mist-400">Track today&apos;s water intake — saved as you go.</p>
      </div>

      <HydrationTracker index={0} />

      <Card index={1} variant="widget" className="flex flex-col gap-4 rounded-4xl">
        <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.2em] text-mist-400">
          <Droplets className="h-3.5 w-3.5 text-cyan-300" /> Last 30 days
        </p>
        <div className="grid grid-cols-7 gap-1.5 sm:grid-cols-10">
          {history.map((day, i) => {
            const label = new Date(`${day.date}T00:00:00`).toLocaleDateString("en-IN", { month: "short", day: "numeric" });
            return (
              <motion.div
                key={day.date}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                title={`${label} — ${day.liters.toFixed(1)}L`}
                tabIndex={0}
                role="img"
                aria-label={`${label}, ${day.liters.toFixed(1)} liters`}
                className="flex aspect-square items-center justify-center rounded-lg border border-white/[0.04] text-[10px] font-mono text-mist-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
                style={{ background: heatTint(day.liters, goalL) }}
              >
                {day.liters >= goalL ? "✓" : ""}
              </motion.div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
