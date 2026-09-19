"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import { Line, LineChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, Legend } from "recharts";
import { Card } from "@/components/ui/Card";
import { TRANSACTIONS, CATEGORY_TREND } from "@/lib/constants/finance";
import { computeDailySpending } from "@/lib/finance/computeStats";
import { formatINR } from "@/lib/finance/format";
import { cn } from "@/lib/utils";

const MonthlyComparisonChart = dynamic(
  () => import("@/components/finance/MonthlyComparisonChart").then((m) => m.MonthlyComparisonChart),
  { loading: () => <div className="h-[260px] animate-pulse rounded-4xl bg-white/[0.03]" /> }
);
const SpendingHeatmap = dynamic(() => import("@/components/finance/SpendingHeatmap").then((m) => m.SpendingHeatmap), {
  loading: () => <div className="h-40 animate-pulse rounded-4xl bg-white/[0.03]" />,
});

interface TooltipPayloadItem {
  dataKey: string;
  value: number;
  color: string;
}

function TrendTooltip({ active, payload, label }: { active?: boolean; payload?: TooltipPayloadItem[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-2xl border border-white/10 bg-ink-800/95 px-3.5 py-2.5 shadow-glass backdrop-blur-xl">
      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-mist-500">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} className="mt-1 flex items-center justify-between gap-4 text-xs">
          <span className="flex items-center gap-1.5 capitalize text-mist-300">
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: p.color }} /> {p.dataKey}
          </span>
          <span className="font-mono text-white">{formatINR(p.value)}</span>
        </p>
      ))}
    </div>
  );
}

function levelClass(amount: number) {
  if (amount <= 0) return "bg-white/[0.03] text-mist-600";
  if (amount < 500) return "bg-violet-500/20 text-mist-300";
  if (amount < 1500) return "bg-violet-400/40 text-white";
  return "bg-emerald-400/70 text-ink-900";
}

export default function FinanceAnalyticsPage() {
  const calendar = useMemo(() => computeDailySpending(TRANSACTIONS, 2026, 8, 30), []);
  // September 1, 2026 falls on a Tuesday — pad so the grid starts on Sunday.
  const leadingBlanks = 2;

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-2xl font-semibold text-white">Analytics</h1>
        <p className="mt-1 text-sm text-mist-400">Deeper spending patterns across the last few months.</p>
      </div>

      <MonthlyComparisonChart />
      <SpendingHeatmap />

      <Card index={2} variant="widget" className="flex flex-col gap-4 rounded-4xl">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-mist-400">Category trend — Food, Transport, Shopping</p>
        <div style={{ height: 260 }} role="img" aria-label="Spending trend for Food, Transport, and Shopping, shown as a line chart">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={CATEGORY_TREND} margin={{ top: 4, right: 4, left: 4, bottom: 0 }}>
              <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: "var(--color-mist-500)", fontSize: 11 }} />
              <Tooltip content={<TrendTooltip />} cursor={{ stroke: "rgba(255,255,255,0.12)" }} />
              <Legend
                wrapperStyle={{ fontSize: 11 }}
                formatter={(value) => <span className="capitalize text-mist-400">{value}</span>}
              />
              <Line type="monotone" dataKey="food" stroke="var(--color-violet-400)" strokeWidth={2.5} dot={false} animationDuration={800} />
              <Line type="monotone" dataKey="transport" stroke="var(--color-cyan-400)" strokeWidth={2.5} dot={false} animationDuration={800} />
              <Line type="monotone" dataKey="shopping" stroke="var(--color-amber-400)" strokeWidth={2.5} dot={false} animationDuration={800} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card index={3} variant="widget" className="flex flex-col gap-4 rounded-4xl">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-mist-400">Spending calendar — September</p>
        <div className="grid grid-cols-7 gap-1.5 text-center text-[10px] text-mist-500">
          {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
            <span key={i}>{d}</span>
          ))}
          {Array.from({ length: leadingBlanks }).map((_, i) => (
            <span key={`blank-${i}`} />
          ))}
          {calendar.map((cell) => (
            <div
              key={cell.day}
              title={formatINR(cell.amount)}
              className={cn("flex aspect-square items-center justify-center rounded-lg text-xs font-medium", levelClass(cell.amount))}
            >
              {cell.day}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
