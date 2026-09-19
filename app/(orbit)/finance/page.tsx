"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { CalendarClock, CalendarRange, PiggyBank, Repeat } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { FinanceHero } from "@/components/finance/FinanceHero";
import { WalletCard } from "@/components/finance/WalletCard";
import { AIInsightCard } from "@/components/finance/AIInsightCard";
import { TransactionList } from "@/components/finance/TransactionList";
import { TRANSACTIONS, SUBSCRIPTIONS, WALLET, type CategoryId } from "@/lib/constants/finance";
import { computeQuickStats, daysUntil } from "@/lib/finance/computeStats";
import { formatINR } from "@/lib/finance/format";

const NOW = new Date("2026-09-09T12:00:00");

// Both pull in recharts — deferred so the initial Finance chunk doesn't pay
// for it until these scroll into view.
const SpendingChart = dynamic(() => import("@/components/finance/SpendingChart").then((m) => m.SpendingChart), {
  loading: () => <div className="h-[240px] animate-pulse rounded-4xl bg-white/[0.03] lg:col-span-2" />,
});
const CategoryBreakdown = dynamic(() => import("@/components/finance/CategoryBreakdown").then((m) => m.CategoryBreakdown), {
  loading: () => <div className="h-[240px] animate-pulse rounded-4xl bg-white/[0.03]" />,
});

export default function FinancePage() {
  const [categoryFilter, setCategoryFilter] = useState<CategoryId | null>(null);
  const stats = computeQuickStats(TRANSACTIONS, SUBSCRIPTIONS, WALLET, NOW);

  const quickStats = [
    { icon: CalendarClock, label: "Spending today", value: formatINR(stats.spendingToday) },
    { icon: CalendarRange, label: "Spending this week", value: formatINR(stats.spendingThisWeek) },
    { icon: PiggyBank, label: "Savings rate", value: `${stats.savingsRate}%` },
    {
      icon: Repeat,
      label: "Next subscription",
      value: stats.nextSubscription ? `${stats.nextSubscription.name} · ${daysUntil(stats.nextSubscription.renewsOn, NOW)}d` : "None due",
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      <FinanceHero />
      <WalletCard />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {quickStats.map((s, i) => (
          <Card key={s.label} index={i} variant="widget" className="flex flex-col gap-2 rounded-3xl">
            <div className="flex items-center gap-2 text-mist-400">
              <s.icon className="h-4 w-4 text-emerald-300" strokeWidth={1.75} />
              <span className="text-xs uppercase tracking-[0.14em]">{s.label}</span>
            </div>
            <span className="truncate font-mono text-lg font-semibold text-white">{s.value}</span>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <SpendingChart className="lg:col-span-2" />
        <AIInsightCard />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <TransactionList categoryFilter={categoryFilter} limit={10} className="lg:col-span-2" />
        <CategoryBreakdown compact selected={categoryFilter} onSelect={(id) => setCategoryFilter((prev) => (prev === id ? null : id))} />
      </div>
    </div>
  );
}
