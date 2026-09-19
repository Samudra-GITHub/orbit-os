"use client";

import { memo } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { Card } from "@/components/ui/Card";
import type { ExpenseCategory } from "@/lib/constants/travel";
import type { ExpenseCategoryTotal } from "@/lib/travel/computeStats";
import { formatCompactINR } from "@/lib/finance/format";
import { cn } from "@/lib/utils";

const categoryColor: Record<ExpenseCategory, string> = {
  flights: "var(--color-violet-400)",
  hotels: "var(--color-indigo-400)",
  food: "var(--color-amber-400)",
  shopping: "var(--color-rose-400)",
  transport: "var(--color-cyan-400)",
  activities: "#34d399",
};

const categoryDot: Record<ExpenseCategory, string> = {
  flights: "bg-violet-400",
  hotels: "bg-indigo-400",
  food: "bg-amber-400",
  shopping: "bg-rose-400",
  transport: "bg-cyan-400",
  activities: "bg-emerald-400",
};

const categoryLabel: Record<ExpenseCategory, string> = {
  flights: "Flights",
  hotels: "Hotels",
  food: "Food",
  shopping: "Shopping",
  transport: "Local transport",
  activities: "Activities",
};

interface ExpenseBreakdownProps {
  breakdown: ExpenseCategoryTotal[];
}

/** A trip's expense-by-category donut — same recipe as Finance's
 *  `CategoryBreakdown`. Memoized: this chart's inputs only change when the
 *  featured trip changes, not on every parent re-render (e.g. the budget
 *  page's other client state). */
function ExpenseBreakdownImpl({ breakdown }: ExpenseBreakdownProps) {
  const total = breakdown.reduce((sum, c) => sum + c.total, 0);
  const sorted = [...breakdown].sort((a, b) => b.total - a.total);

  return (
    <Card index={1} variant="widget" className="flex flex-col gap-4 rounded-4xl">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-mist-400">Expense breakdown</p>

      <div className="flex flex-col items-center gap-5 sm:flex-row">
        <div className="relative h-32 w-32 shrink-0" role="img" aria-label={`Expense breakdown by category, total ${formatCompactINR(total)}`}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={breakdown}
                dataKey="total"
                nameKey="category"
                innerRadius="68%"
                outerRadius="100%"
                paddingAngle={3}
                stroke="none"
                animationDuration={800}
                animationEasing="ease-out"
              >
                {breakdown.map((c) => (
                  <Cell key={c.category} fill={categoryColor[c.category]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-mono text-base font-semibold text-white">{formatCompactINR(total)}</span>
            <span className="text-[10px] uppercase tracking-[0.14em] text-mist-500">Total</span>
          </div>
        </div>

        <div className="flex w-full flex-1 flex-col gap-2.5">
          {sorted.map((c) => (
            <div key={c.category} className="flex items-center justify-between gap-2 text-xs">
              <span className="flex items-center gap-2 text-mist-300">
                <span className={cn("h-2 w-2 shrink-0 rounded-full", categoryDot[c.category])} />
                {categoryLabel[c.category]}
              </span>
              <span className="font-mono text-white">{formatCompactINR(c.total)}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

export const ExpenseBreakdown = memo(ExpenseBreakdownImpl);
