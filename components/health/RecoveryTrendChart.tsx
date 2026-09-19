"use client";

import { memo } from "react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { Card } from "@/components/ui/Card";
import type { RecoveryTrendPoint } from "@/lib/constants/health";

interface TooltipPayloadItem {
  value: number;
  dataKey: string;
}

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: TooltipPayloadItem[]; label?: string }) {
  if (!active || !payload?.length) return null;
  const date = label ? new Date(`${label}T00:00:00`).toLocaleDateString("en-IN", { month: "short", day: "numeric" }) : "";
  return (
    <div className="rounded-2xl border border-white/10 bg-ink-800/95 px-3.5 py-2.5 shadow-glass backdrop-blur-xl">
      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-mist-500">{date}</p>
      {payload.map((p) => (
        <p key={p.dataKey} className="mt-1 font-mono text-sm text-white">
          {p.dataKey === "score" ? "Recovery" : p.dataKey.toUpperCase()}: {p.value}
        </p>
      ))}
    </div>
  );
}

function RecoveryTrendChartImpl({ data, index = 5 }: { data: RecoveryTrendPoint[]; index?: number }) {
  return (
    <Card index={index} variant="widget" className="flex flex-col gap-4 rounded-4xl">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-mist-400">Recovery trend</p>
      <div style={{ height: 220 }} role="img" aria-label="Recovery score and HRV trend, shown as a line chart">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 4, right: 4, left: 4, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.06)" />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--color-mist-500)", fontSize: 11 }}
              tickFormatter={(d: string) => new Date(`${d}T00:00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
            />
            <Tooltip content={<ChartTooltip />} cursor={{ stroke: "rgba(255,255,255,0.15)" }} />
            <Line type="monotone" dataKey="score" stroke="var(--color-cyan-400)" strokeWidth={2.5} dot={false} animationDuration={800} />
            <Line type="monotone" dataKey="hrv" stroke="var(--color-violet-400)" strokeWidth={1.5} dot={false} animationDuration={800} strokeDasharray="4 4" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center gap-4 text-[11px] text-mist-400">
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-3 rounded-full bg-cyan-400" /> Recovery score
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-3 rounded-full bg-violet-400" /> HRV
        </span>
      </div>
    </Card>
  );
}

export const RecoveryTrendChart = memo(RecoveryTrendChartImpl);
