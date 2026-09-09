"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { Card } from "@/components/ui/Card";
import { GlassSurface } from "@/components/ui/GlassSurface";
import { ProductivityRing } from "@/components/focus/ProductivityRing";
import { FocusStats } from "@/components/focus/FocusStats";
import { useFocusSessions } from "@/lib/hooks/useFocusSessions";
import { computeFocusStats, computeWeeklySeries } from "@/lib/focus/computeStats";
import { DAILY_FOCUS_GOAL_MINUTES, FOCUS_PRESETS } from "@/lib/constants/focus";

interface ChartTooltipPayload {
  value: number;
}

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: ChartTooltipPayload[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-2xl border border-white/10 bg-ink-800/95 px-3.5 py-2.5 shadow-glass backdrop-blur-xl">
      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-mist-500">{label}</p>
      <p className="mt-1 font-mono text-sm text-white">{payload[0].value} min</p>
    </div>
  );
}

export default function FocusStatsPage() {
  const { sessions } = useFocusSessions();
  const stats = computeFocusStats(sessions);
  const weekly = computeWeeklySeries(sessions);

  const completed = sessions.filter((s) => s.completed);
  const byPreset = FOCUS_PRESETS.map((p) => ({
    label: p.label,
    count: completed.filter((s) => s.presetId === p.id).length,
  })).filter((p) => p.count > 0);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-2xl font-semibold text-white">Stats</h1>
        <p className="mt-1 text-sm text-mist-400">Your focus habits over the last week.</p>
      </div>

      <GlassSurface intensity="raised" interactive={false} className="rounded-4xl p-6">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
          <ProductivityRing minutes={stats.todayMinutes} goalMinutes={DAILY_FOCUS_GOAL_MINUTES} size="lg" />
          <div className="text-center sm:text-left">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-mist-400">Today's goal</p>
            <p className="mt-1 text-sm text-mist-300">
              {stats.todayMinutes} of {DAILY_FOCUS_GOAL_MINUTES} minutes focused today.
            </p>
          </div>
        </div>
      </GlassSurface>

      <FocusStats stats={stats} />

      <Card index={0} variant="widget" className="flex flex-col gap-4 rounded-4xl">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-mist-400">Focus minutes this week</p>
        <div style={{ height: 220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weekly} margin={{ top: 4, right: 4, left: 4, bottom: 0 }}>
              <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "var(--color-mist-500)", fontSize: 11 }} />
              <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
              <Bar dataKey="minutes" radius={[6, 6, 0, 0]} fill="url(#focus-bar-gradient)" animationDuration={800} />
              <defs>
                <linearGradient id="focus-bar-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-violet-400)" />
                  <stop offset="100%" stopColor="var(--color-cyan-400)" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {byPreset.length > 0 && (
        <Card index={1} variant="widget" className="flex flex-col gap-3 rounded-4xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-mist-400">Sessions by preset</p>
          <div className="flex flex-col gap-2.5">
            {byPreset.map((p) => (
              <div key={p.label} className="flex items-center justify-between text-sm">
                <span className="text-mist-300">{p.label}</span>
                <span className="font-mono text-white">{p.count}</span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
