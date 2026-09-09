"use client";

import { TrendingUp, TrendingDown, PiggyBank } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { WALLET } from "@/lib/constants/finance";
import { formatINR } from "@/lib/finance/format";
import { useCountUp } from "@/lib/hooks/useCountUp";

/** The large wallet card — balance, income, expenses, and savings with
 *  animated counters. Uses an emerald accent (CRED/Apple Wallet-style
 *  "money" color) rather than Orbit's usual violet/cyan, scoped to this
 *  one card via Tailwind's built-in emerald scale. */
export function WalletCard() {
  const balance = useCountUp(WALLET.balance);
  const netChange = WALLET.incomeThisMonth - WALLET.expensesThisMonth;

  return (
    <Card index={0} variant="elevated" className="relative overflow-hidden rounded-4xl">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-16 -top-24 h-72 w-72 rounded-full bg-emerald-500/20 blur-[100px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -right-10 h-64 w-64 rounded-full bg-cyan-400/15 blur-[100px]"
      />

      <div className="relative flex flex-col gap-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-mist-400">Wallet balance</p>
            <p className="mt-2 bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text font-display text-4xl font-semibold tracking-tight text-transparent sm:text-5xl">
              {formatINR(balance)}
            </p>
          </div>

          <Badge variant={netChange >= 0 ? "positive" : "critical"} className="w-fit">
            <PiggyBank className="h-3 w-3" />
            {netChange >= 0 ? "Saved" : "Overspent"} {formatINR(Math.abs(netChange))} this month
          </Badge>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.04] p-4">
            <p className="flex items-center gap-1.5 text-xs text-mist-400">
              <TrendingUp className="h-3.5 w-3.5 text-emerald-300" /> Income this month
            </p>
            <p className="mt-1.5 font-mono text-lg font-semibold text-white">{formatINR(WALLET.incomeThisMonth)}</p>
          </div>
          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.04] p-4">
            <p className="flex items-center gap-1.5 text-xs text-mist-400">
              <TrendingDown className="h-3.5 w-3.5 text-rose-300" /> Expenses this month
            </p>
            <p className="mt-1.5 font-mono text-lg font-semibold text-white">{formatINR(WALLET.expensesThisMonth)}</p>
          </div>
          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.04] p-4">
            <p className="flex items-center gap-1.5 text-xs text-mist-400">
              <PiggyBank className="h-3.5 w-3.5 text-cyan-300" /> Savings
            </p>
            <p className="mt-1.5 font-mono text-lg font-semibold text-white">{formatINR(WALLET.savings)}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
