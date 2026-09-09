"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { SpendingCategoryCard } from "@/components/finance/SpendingCategoryCard";
import { CATEGORY_BUDGETS, type CategoryId } from "@/lib/constants/finance";
import { formatINR } from "@/lib/finance/format";

/** The interactive budget grid — owns the (client-only, mock) budget
 *  state so dragging a category's slider updates its card, the summary
 *  totals above, and nothing else — no backend, no persistence. */
export function BudgetPlanner() {
  const [budgets, setBudgets] = useState(CATEGORY_BUDGETS);

  function handleBudgetChange(id: CategoryId, budget: number) {
    setBudgets((prev) => prev.map((c) => (c.id === id ? { ...c, budget } : c)));
  }

  const totalBudget = budgets.reduce((sum, c) => sum + c.budget, 0);
  const totalSpent = budgets.reduce((sum, c) => sum + c.spent, 0);

  return (
    <div className="flex flex-col gap-5">
      <Card index={0} variant="widget" className="rounded-4xl">
        <div className="grid grid-cols-3 gap-4 text-center sm:text-left">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-mist-500">Total budget</p>
            <p className="mt-1 font-mono text-xl font-semibold text-white">{formatINR(totalBudget)}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-mist-500">Total used</p>
            <p className="mt-1 font-mono text-xl font-semibold text-white">{formatINR(totalSpent)}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-mist-500">Remaining</p>
            <p className="mt-1 font-mono text-xl font-semibold text-emerald-300">{formatINR(totalBudget - totalSpent)}</p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {budgets.map((category, i) => (
          <SpendingCategoryCard key={category.id} category={category} onBudgetChange={handleBudgetChange} index={i} />
        ))}
      </div>
    </div>
  );
}
