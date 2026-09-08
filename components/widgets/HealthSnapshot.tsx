"use client";

import { motion } from "framer-motion";
import { HeartPulse, Footprints, Moon } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const METRICS = [
  { label: "Steps", value: "8,240", target: "10,000", pct: 82, icon: Footprints },
  { label: "Sleep", value: "7h 12m", target: "8h", pct: 90, icon: Moon },
];

export function HealthSnapshot() {
  return (
    <Card index={5} variant="widget" className="flex flex-col gap-5 rounded-4xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-mist-400">Health</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-mono text-3xl font-semibold text-white">62</span>
            <span className="text-sm text-mist-400">bpm resting</span>
          </div>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-400/20 to-transparent">
          <HeartPulse className="h-5 w-5 text-rose-300" strokeWidth={1.75} />
        </div>
      </div>

      <Badge variant="positive" className="w-fit">
        On track for today
      </Badge>

      <div className="flex flex-col gap-3.5">
        {METRICS.map((m, i) => (
          <div key={m.label} className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-mist-300">
                <m.icon className="h-3.5 w-3.5 text-cyan-400" strokeWidth={1.75} />
                {m.label}
              </span>
              <span className="font-mono text-mist-400">
                {m.value} <span className="text-mist-500">/ {m.target}</span>
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${m.pct}%` }}
                transition={{ duration: 0.9, delay: 0.15 * i, ease: [0.16, 1, 0.3, 1] }}
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-400"
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
