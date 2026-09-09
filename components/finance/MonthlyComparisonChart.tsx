"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { Card } from "@/components/ui/Card";
import { MONTHLY_COMPARISON } from "@/lib/constants/finance";
import { formatINR } from "@/lib/finance/format";

interface TooltipPayloadItem {
  dataKey: string;
  value: number;
}

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: TooltipPayloadItem[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-2xl border border-white/10 bg-ink-800/95 px-3.5 py-2.5 shadow-glass backdrop-blur-xl">
      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-mist-500">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} className="mt-1 flex items-center justify-between gap-4 text-xs">
          <span className="text-mist-300">{p.dataKey === "income" ? "Income" : "Expenses"}</span>
          <span className="font-mono text-white">{formatINR(p.value)}</span>
        </p>
      ))}
    </div>
  );
}

/** Income vs. expenses, grouped bars, last 6 months — animates in on
 *  first scroll into view (Recharts bars animate on mount by default). */
export function MonthlyComparisonChart() {
  return (
    <Card index={0} variant="widget" className="flex flex-col gap-4 rounded-4xl">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-mist-400">Monthly comparison</p>
        <div className="flex items-center gap-3 text-[11px] text-mist-400">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Income
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400" /> Expenses
          </span>
        </div>
      </div>

      <div style={{ height: 260 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={MONTHLY_COMPARISON} margin={{ top: 4, right: 4, left: 4, bottom: 0 }} barGap={6}>
            <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.06)" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "var(--color-mist-500)", fontSize: 11 }} />
            <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
            <Bar dataKey="income" fill="#34d399" radius={[6, 6, 0, 0]} animationDuration={800} />
            <Bar dataKey="expenses" fill="var(--color-violet-400)" radius={[6, 6, 0, 0]} animationDuration={800} animationBegin={100} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
