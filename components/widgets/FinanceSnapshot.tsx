"use client";

import { motion } from "framer-motion";
import { TrendingDown, Repeat } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { label: "Food & Dining", spent: 420, budget: 600, color: "bg-violet-400" },
  { label: "Transport", spent: 180, budget: 200, color: "bg-cyan-400" },
  { label: "Shopping", spent: 260, budget: 500, color: "bg-amber-400" },
];

const SUBSCRIPTIONS = { count: 3, monthly: 95 };

function SpendingRing({ pct }: { pct: number }) {
  return (
    <div
      className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full"
      style={{
        background: `conic-gradient(var(--color-violet-400) ${pct * 3.6}deg, color-mix(in oklab, white 10%, transparent) 0deg)`,
      }}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ink-900">
        <span className="font-mono text-[11px] font-semibold text-white">{Math.round(pct)}%</span>
      </div>
    </div>
  );
}

export function FinanceSnapshot() {
  const totalSpent = CATEGORIES.reduce((sum, c) => sum + c.spent, 0);
  const totalBudget = CATEGORIES.reduce((sum, c) => sum + c.budget, 0);
  const spentPct = (totalSpent / totalBudget) * 100;

  return (
    <Card index={4} variant="widget" className="flex flex-col gap-5 rounded-4xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-mist-400">This month</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-mono text-3xl font-semibold text-white">
              ${totalSpent.toLocaleString()}
            </span>
            <span className="text-sm text-mist-400">/ ${totalBudget.toLocaleString()}</span>
          </div>
        </div>
        <SpendingRing pct={spentPct} />
      </div>

      <Badge variant="positive" className="w-fit">
        <TrendingDown className="h-3 w-3" />
        12% less than last month
      </Badge>

      <div className="flex flex-col gap-3.5">
        {CATEGORIES.map((c, i) => {
          const pct = Math.min(100, (c.spent / c.budget) * 100);
          return (
            <div key={c.label} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-mist-300">{c.label}</span>
                <span className="font-mono text-mist-400">
                  ${c.spent} <span className="text-mist-500">/ ${c.budget}</span>
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.9, delay: 0.15 * i, ease: [0.16, 1, 0.3, 1] }}
                  className={cn("h-full rounded-full", c.color)}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between rounded-2xl border border-white/[0.08] bg-white/[0.04] px-3 py-2.5">
        <span className="flex items-center gap-2 text-xs text-mist-300">
          <Repeat className="h-3.5 w-3.5 text-cyan-300" strokeWidth={1.75} />
          {SUBSCRIPTIONS.count} active subscriptions
        </span>
        <span className="font-mono text-xs text-white">${SUBSCRIPTIONS.monthly}/mo</span>
      </div>
    </Card>
  );
}
