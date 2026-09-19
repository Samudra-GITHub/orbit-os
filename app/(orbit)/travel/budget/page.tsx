"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { Card } from "@/components/ui/Card";
import { TripBudgetCard } from "@/components/travel/TripBudgetCard";
import { TRIPS, TRIP_EXPENSES } from "@/lib/constants/travel";
import { getFeaturedTrip, computeTripBudgetSummary, computeExpenseBreakdown, computeTripDailySpending } from "@/lib/travel/computeStats";
import { formatINR } from "@/lib/finance/format";

const ExpenseBreakdown = dynamic(() => import("@/components/travel/ExpenseBreakdown").then((m) => m.ExpenseBreakdown), {
  loading: () => <div className="h-[240px] animate-pulse rounded-4xl bg-white/[0.03]" />,
});

const NOW = new Date("2026-09-09T12:00:00");

interface TooltipPayloadItem {
  value: number;
}

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: TooltipPayloadItem[]; label?: string }) {
  if (!active || !payload?.length) return null;
  const date = label ? new Date(label).toLocaleDateString("en-IN", { month: "short", day: "numeric" }) : "";
  return (
    <div className="rounded-2xl border border-white/10 bg-ink-800/95 px-3.5 py-2.5 shadow-glass backdrop-blur-xl">
      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-mist-500">{date}</p>
      <p className="mt-1 font-mono text-sm text-white">{formatINR(payload[0].value)}</p>
    </div>
  );
}

export default function TravelBudgetPage() {
  const featuredTrip = useMemo(() => getFeaturedTrip(TRIPS, NOW), []);
  const summary = useMemo(() => computeTripBudgetSummary(featuredTrip, TRIP_EXPENSES), [featuredTrip]);
  const breakdown = useMemo(() => computeExpenseBreakdown(featuredTrip.id, TRIP_EXPENSES), [featuredTrip]);
  const daily = useMemo(() => computeTripDailySpending(featuredTrip.id, TRIP_EXPENSES), [featuredTrip]);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-2xl font-semibold text-white">Trip budget</h1>
        <p className="mt-1 text-sm text-mist-400">
          {featuredTrip.destination}, {featuredTrip.country} — same styling as Finance OS.
        </p>
      </div>

      <TripBudgetCard summary={summary} />
      <ExpenseBreakdown breakdown={breakdown} />

      <Card index={2} variant="widget" className="flex flex-col gap-4 rounded-4xl">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-mist-400">Daily spending</p>
        <div style={{ height: 220 }} role="img" aria-label="Daily trip spending, shown as a bar chart">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={daily} margin={{ top: 4, right: 4, left: 4, bottom: 0 }}>
              <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.06)" />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "var(--color-mist-500)", fontSize: 11 }}
                tickFormatter={(d: string) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
              />
              <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
              <Bar dataKey="amount" radius={[6, 6, 0, 0]} fill="url(#travel-bar-gradient)" animationDuration={800} />
              <defs>
                <linearGradient id="travel-bar-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-cyan-400)" />
                  <stop offset="100%" stopColor="var(--color-violet-400)" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
