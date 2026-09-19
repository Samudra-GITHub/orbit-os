"use client";

import { memo } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { Card } from "@/components/ui/Card";
import type { SleepNight } from "@/lib/constants/health";

interface TooltipPayloadItem {
  value: number;
}

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: TooltipPayloadItem[]; label?: string }) {
  if (!active || !payload?.length) return null;
  const date = label ? new Date(`${label}T00:00:00`).toLocaleDateString("en-IN", { month: "short", day: "numeric" }) : "";
  const hours = Math.floor(payload[0].value / 60);
  const minutes = Math.round(payload[0].value % 60);
  return (
    <div className="rounded-2xl border border-white/10 bg-ink-800/95 px-3.5 py-2.5 shadow-glass backdrop-blur-xl">
      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-mist-500">{date}</p>
      <p className="mt-1 font-mono text-sm text-white">
        {hours}h {minutes}m
      </p>
    </div>
  );
}

function SleepChartImpl({ nights, index = 4 }: { nights: SleepNight[]; index?: number }) {
  const data = nights.map((n) => ({ date: n.date, minutes: n.durationMinutes }));

  return (
    <Card index={index} variant="widget" className="flex flex-col gap-4 rounded-4xl">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-mist-400">Weekly sleep trend</p>
      <div style={{ height: 200 }} role="img" aria-label="Weekly sleep duration trend, shown as an area chart">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 4, left: 4, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.06)" />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--color-mist-500)", fontSize: 11 }}
              tickFormatter={(d: string) => new Date(`${d}T00:00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
            />
            <Tooltip content={<ChartTooltip />} cursor={{ stroke: "rgba(255,255,255,0.15)" }} />
            <Area
              type="monotone"
              dataKey="minutes"
              stroke="var(--color-violet-400)"
              fill="url(#sleep-area-gradient)"
              strokeWidth={2}
              animationDuration={800}
            />
            <defs>
              <linearGradient id="sleep-area-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-violet-400)" stopOpacity={0.35} />
                <stop offset="100%" stopColor="var(--color-violet-400)" stopOpacity={0} />
              </linearGradient>
            </defs>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export const SleepChart = memo(SleepChartImpl);
