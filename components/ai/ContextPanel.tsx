"use client";

import { CloudSun, CalendarClock, Wallet, Timer } from "lucide-react";
import { GlassSurface } from "@/components/ui/GlassSurface";
import { AIOrb } from "@/components/motion/AIOrb";

const CONTEXT_ITEMS = [
  { icon: CloudSun, label: "Weather", value: "24° · Partly cloudy" },
  { icon: CalendarClock, label: "Next up", value: "Focus block · 11:30" },
  { icon: Wallet, label: "This month", value: "$860 / $1,400" },
  { icon: Timer, label: "Focus streak", value: "12 days" },
];

/**
 * Shows what Orbit already knows — the live context available to the
 * assistant for this conversation. Mock data only; wiring this to the
 * real dashboard state is future work.
 */
export function ContextPanel() {
  return (
    <GlassSurface
      intensity="subtle"
      interactive={false}
      className="flex w-72 shrink-0 flex-col gap-4 overflow-y-auto rounded-4xl p-4"
    >
      <div className="flex items-center gap-2.5">
        <AIOrb size="sm" />
        <div>
          <p className="text-sm font-medium text-white">Live context</p>
          <p className="text-xs text-mist-400">What Orbit sees right now</p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {CONTEXT_ITEMS.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-2.5"
          >
            <item.icon className="h-4 w-4 shrink-0 text-cyan-300" strokeWidth={1.75} />
            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-[0.1em] text-mist-500">{item.label}</p>
              <p className="truncate text-xs text-white">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto rounded-2xl border border-white/[0.06] bg-white/[0.03] p-3">
        <p className="text-[11px] text-mist-500">
          Context is mock data for this sprint — Orbit isn&rsquo;t connected to a live model yet.
        </p>
      </div>
    </GlassSurface>
  );
}
