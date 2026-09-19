"use client";

import {
  UtensilsCrossed,
  ShoppingBag,
  Car,
  Receipt,
  Clapperboard,
  GraduationCap,
  HeartPulse,
  AlertTriangle,
  type LucideIcon,
} from "lucide-react";
import { GlassSurface } from "@/components/ui/GlassSurface";
import type { CategoryBudget, CategoryId } from "@/lib/constants/finance";
import { formatINR } from "@/lib/finance/format";
import { cn } from "@/lib/utils";

const categoryIcon: Record<CategoryId, LucideIcon> = {
  food: UtensilsCrossed,
  shopping: ShoppingBag,
  transport: Car,
  bills: Receipt,
  entertainment: Clapperboard,
  education: GraduationCap,
  health: HeartPulse,
};

interface SpendingCategoryCardProps {
  category: CategoryBudget;
  onBudgetChange: (id: CategoryId, budget: number) => void;
  index?: number;
}

/** One budget category — spent/remaining, a progress bar that ambers past
 *  80% and turns critical past 100%, and a slider to adjust the budget
 *  (a mock, client-only update — nothing is persisted server-side). */
export function SpendingCategoryCard({ category, onBudgetChange, index = 0 }: SpendingCategoryCardProps) {
  const Icon = categoryIcon[category.id];
  const pct = category.budget > 0 ? (category.spent / category.budget) * 100 : 0;
  const remaining = category.budget - category.spent;
  const isWarning = pct >= 80 && pct < 100;
  const isOver = pct >= 100;

  return (
    <GlassSurface intensity="subtle" className="h-full rounded-3xl p-5" index={index}>
      <div className="flex h-full flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/15">
              <Icon className="h-4 w-4 text-violet-300" strokeWidth={1.75} />
            </div>
            <p className="font-medium text-white">{category.label}</p>
          </div>
          {(isWarning || isOver) && (
            <span className={cn("flex items-center gap-1 text-[11px] font-medium", isOver ? "text-rose-300" : "text-amber-300")}>
              <AlertTriangle className="h-3 w-3" /> {isOver ? "Over budget" : "Near limit"}
            </span>
          )}
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <p className="text-[10px] uppercase tracking-[0.1em] text-mist-500">Budget</p>
            <p className="mt-0.5 font-mono text-sm text-white">{formatINR(category.budget)}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.1em] text-mist-500">Used</p>
            <p className="mt-0.5 font-mono text-sm text-white">{formatINR(category.spent)}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.1em] text-mist-500">Left</p>
            <p className={cn("mt-0.5 font-mono text-sm", remaining < 0 ? "text-rose-300" : "text-emerald-300")}>
              {formatINR(remaining)}
            </p>
          </div>
        </div>

        <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
          <div
            style={{ width: `${Math.min(100, pct)}%` }}
            className={cn(
              "h-full rounded-full transition-[width] duration-700 ease-out",
              isOver ? "bg-rose-400" : isWarning ? "bg-amber-400" : "bg-gradient-to-r from-violet-400 to-cyan-400"
            )}
          />
        </div>

        <div className="mt-auto flex flex-col gap-1.5 border-t border-white/[0.08] pt-3.5">
          <div className="flex items-center justify-between text-[11px] text-mist-500">
            <label htmlFor={`budget-${category.id}`}>Adjust budget</label>
            <span className="font-mono text-mist-300">{formatINR(category.budget)}</span>
          </div>
          <input
            id={`budget-${category.id}`}
            type="range"
            min={1000}
            max={15000}
            step={500}
            value={category.budget}
            onChange={(e) => onBudgetChange(category.id, Number(e.target.value))}
            aria-label={`${category.label} monthly budget`}
            className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-violet-400"
          />
        </div>
      </div>
    </GlassSurface>
  );
}
