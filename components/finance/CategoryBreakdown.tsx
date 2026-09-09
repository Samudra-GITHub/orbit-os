"use client";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { Card } from "@/components/ui/Card";
import { CATEGORY_BUDGETS, type CategoryId } from "@/lib/constants/finance";
import { formatCompactINR } from "@/lib/finance/format";
import { cn } from "@/lib/utils";

const categoryColor: Record<CategoryId, string> = {
  food: "var(--color-violet-400)",
  shopping: "var(--color-amber-400)",
  transport: "var(--color-cyan-400)",
  bills: "var(--color-indigo-400)",
  entertainment: "var(--color-rose-400)",
  education: "#34d399",
  health: "var(--color-cyan-500)",
};

const categoryDot: Record<CategoryId, string> = {
  food: "bg-violet-400",
  shopping: "bg-amber-400",
  transport: "bg-cyan-400",
  bills: "bg-indigo-400",
  entertainment: "bg-rose-400",
  education: "bg-emerald-400",
  health: "bg-cyan-500",
};

interface CategoryBreakdownProps {
  compact?: boolean;
  className?: string;
  selected?: CategoryId | null;
  onSelect?: (id: CategoryId) => void;
}

/** Spending-by-category donut with a matching legend. `compact` trims the
 *  legend to the top categories for the Overview page; the full page use
 *  (Analytics/Budget) shows every category. Clicking a slice or legend
 *  row calls `onSelect`, which the Overview page uses to filter the
 *  transaction list below it. */
export function CategoryBreakdown({ compact = false, className, selected, onSelect }: CategoryBreakdownProps) {
  const totalSpent = CATEGORY_BUDGETS.reduce((sum, c) => sum + c.spent, 0);
  const categories = compact
    ? [...CATEGORY_BUDGETS].sort((a, b) => b.spent - a.spent).slice(0, 4)
    : CATEGORY_BUDGETS;

  return (
    <Card index={2} variant="widget" className={cn("flex flex-col gap-4 rounded-4xl", className)}>
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-mist-400">Spending by category</p>

      <div className="flex flex-col items-center gap-5 sm:flex-row">
        <div className="relative h-32 w-32 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={CATEGORY_BUDGETS}
                dataKey="spent"
                nameKey="label"
                innerRadius="68%"
                outerRadius="100%"
                paddingAngle={3}
                stroke="none"
                animationDuration={800}
                animationEasing="ease-out"
                className={onSelect ? "cursor-pointer" : undefined}
              >
                {CATEGORY_BUDGETS.map((c) => (
                  <Cell
                    key={c.id}
                    fill={categoryColor[c.id]}
                    opacity={!selected || selected === c.id ? 1 : 0.35}
                    onClick={() => onSelect?.(c.id)}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-mono text-base font-semibold text-white">{formatCompactINR(totalSpent)}</span>
            <span className="text-[10px] uppercase tracking-[0.14em] text-mist-500">Total</span>
          </div>
        </div>

        <div className="flex w-full flex-1 flex-col gap-2.5">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => onSelect?.(c.id)}
              aria-pressed={selected === c.id}
              className={cn(
                "flex items-center justify-between gap-2 rounded-lg px-1.5 py-0.5 text-xs transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400",
                onSelect && "cursor-pointer hover:bg-white/[0.04]",
                selected && selected !== c.id && "opacity-40"
              )}
            >
              <span className="flex items-center gap-2 text-mist-300">
                <span className={cn("h-2 w-2 shrink-0 rounded-full", categoryDot[c.id])} />
                {c.label}
              </span>
              <span className="font-mono text-white">{formatCompactINR(c.spent)}</span>
            </button>
          ))}
        </div>
      </div>
    </Card>
  );
}
