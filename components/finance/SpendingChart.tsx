"use client";

import { useMemo } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { Card } from "@/components/ui/Card";
import { TRANSACTIONS } from "@/lib/constants/finance";
import { computeDailySpending } from "@/lib/finance/computeStats";
import { formatINR } from "@/lib/finance/format";
import { cn } from "@/lib/utils";

interface TooltipPayloadItem {
  value: number;
}

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: TooltipPayloadItem[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-2xl border border-white/10 bg-ink-800/95 px-3.5 py-2.5 shadow-glass backdrop-blur-xl">
      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-mist-500">Sep {label}</p>
      <p className="mt-1 font-mono text-sm text-white">{formatINR(payload[0].value)}</p>
    </div>
  );
}

interface SpendingChartProps {
  className?: string;
}

/** Daily spending for the current month, rendered as a gradient area
 *  chart — derived from `TRANSACTIONS` (via `computeDailySpending`) so it
 *  can never disagree with the transaction list below it. */
export function SpendingChart({ className }: SpendingChartProps) {
  // Fixed "today" (2026-09-09) rather than `new Date()` — TRANSACTIONS is
  // seeded through Sep 9, 2026, and the real current date would otherwise
  // show an empty chart once that date passes.
  const data = useMemo(() => computeDailySpending(TRANSACTIONS, 2026, 8, 9), []);

  return (
    <Card index={1} variant="widget" className={cn("flex flex-col gap-4 rounded-4xl", className)}>
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-mist-400">Spending overview — September</p>

      <div style={{ height: 240 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 4, left: 4, bottom: 0 }}>
            <defs>
              <linearGradient id="spending-area-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-cyan-400)" stopOpacity={0.35} />
                <stop offset="100%" stopColor="var(--color-cyan-400)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="spending-area-stroke" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="var(--color-violet-400)" />
                <stop offset="100%" stopColor="var(--color-cyan-400)" />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.06)" />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--color-mist-500)", fontSize: 11 }}
            />
            <Tooltip content={<ChartTooltip />} cursor={{ stroke: "rgba(255,255,255,0.12)" }} />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="url(#spending-area-stroke)"
              strokeWidth={2.5}
              fill="url(#spending-area-fill)"
              animationDuration={900}
              animationEasing="ease-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
