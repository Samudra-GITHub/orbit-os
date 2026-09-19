import { Wallet, TrendingDown, PiggyBank } from "lucide-react";
import { Card } from "@/components/ui/Card";
import type { TripBudgetSummary } from "@/lib/travel/computeStats";
import { formatINR } from "@/lib/finance/format";
import { cn } from "@/lib/utils";

interface TripBudgetCardProps {
  summary: TripBudgetSummary;
}

/** A trip's budget summary — total/spent/remaining, matching Finance OS's
 *  `WalletCard` visual language (emerald accent, the same three-column
 *  breakdown layout) so Travel's budget page reads as part of the same
 *  system. */
export function TripBudgetCard({ summary }: TripBudgetCardProps) {
  const isOver = summary.remaining < 0;

  return (
    <Card index={0} variant="elevated" className="rounded-4xl">
      <div className="flex flex-col gap-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-mist-400">Trip budget</p>
          <p className="mt-2 bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text font-display text-4xl font-semibold tracking-tight text-transparent">
            {formatINR(summary.budget)}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.04] p-4">
            <p className="flex items-center gap-1.5 text-xs text-mist-400">
              <Wallet className="h-3.5 w-3.5 text-cyan-300" /> Total budget
            </p>
            <p className="mt-1.5 font-mono text-lg font-semibold text-white">{formatINR(summary.budget)}</p>
          </div>
          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.04] p-4">
            <p className="flex items-center gap-1.5 text-xs text-mist-400">
              <TrendingDown className="h-3.5 w-3.5 text-rose-300" /> Spent
            </p>
            <p className="mt-1.5 font-mono text-lg font-semibold text-white">{formatINR(summary.spent)}</p>
          </div>
          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.04] p-4">
            <p className="flex items-center gap-1.5 text-xs text-mist-400">
              <PiggyBank className="h-3.5 w-3.5 text-emerald-300" /> Remaining
            </p>
            <p className={cn("mt-1.5 font-mono text-lg font-semibold", isOver ? "text-rose-300" : "text-white")}>
              {formatINR(summary.remaining)}
            </p>
          </div>
        </div>

        <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
          <div
            style={{ width: `${summary.spentPct}%` }}
            className={cn(
              "h-full rounded-full transition-[width] duration-700 ease-out",
              isOver ? "bg-rose-400" : "bg-gradient-to-r from-emerald-400 to-cyan-400"
            )}
          />
        </div>
      </div>
    </Card>
  );
}
