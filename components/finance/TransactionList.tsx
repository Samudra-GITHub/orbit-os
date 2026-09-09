"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { TransactionCard } from "@/components/finance/TransactionCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { TRANSACTIONS, type CategoryId } from "@/lib/constants/finance";
import { cn } from "@/lib/utils";

type ChipFilter = "all" | "today" | "week" | "month" | CategoryId;

const CHIPS: { id: ChipFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "today", label: "Today" },
  { id: "week", label: "Week" },
  { id: "month", label: "Month" },
  { id: "food", label: "Food" },
  { id: "bills", label: "Bills" },
  { id: "shopping", label: "Shopping" },
];

// Fixed "now" — TRANSACTIONS is seeded through Sep 9, 2026; using the real
// current date would make Today/Week filters go empty once that date passes.
const NOW = new Date("2026-09-09T23:59:59");

interface TransactionListProps {
  limit?: number;
  className?: string;
  categoryFilter?: CategoryId | null;
}

/** The scrollable transaction list — search, date/category filter chips.
 *  Each row still plays its own staggered entrance transition (see
 *  `TransactionCard`) when the filtered set changes; the list itself is
 *  a plain keyed map rather than an `AnimatePresence`, which for a
 *  same-size-class list re-render is simpler and avoids exit-animation
 *  edge cases with no visible cost (rows swap fast enough that an exit
 *  fade added little). `categoryFilter` (driven by clicking a
 *  `CategoryBreakdown` slice) syncs into the chip row so both controls
 *  always agree on what's being shown. */
export function TransactionList({ limit, className, categoryFilter }: TransactionListProps) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<ChipFilter>("all");

  useEffect(() => {
    if (categoryFilter) setFilter(categoryFilter);
  }, [categoryFilter]);

  const filtered = useMemo(() => {
    const list = TRANSACTIONS.filter((t) => {
      if (query && !t.merchant.toLowerCase().includes(query.toLowerCase())) return false;
      if (filter === "all") return true;
      if (filter === "today") return t.date.slice(0, 10) === "2026-09-09";
      if (filter === "week") {
        const weekAgo = new Date(NOW);
        weekAgo.setDate(weekAgo.getDate() - 6);
        return new Date(t.date) >= weekAgo;
      }
      if (filter === "month") {
        const d = new Date(t.date);
        return d.getFullYear() === 2026 && d.getMonth() === 8;
      }
      return t.category === filter;
    });
    return limit ? list.slice(0, limit) : list;
  }, [query, filter, limit]);

  return (
    <Card index={4} variant="widget" className={cn("flex flex-col gap-3 rounded-4xl", className)}>
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-mist-400">Recent transactions</p>

      <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5">
        <Search className="h-3.5 w-3.5 shrink-0 text-mist-500" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search transactions..."
          aria-label="Search transactions"
          className="w-full bg-transparent text-sm text-white placeholder:text-mist-500 focus:outline-none"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {CHIPS.map((chip) => (
          <button
            key={chip.id}
            type="button"
            onClick={() => setFilter(chip.id)}
            aria-pressed={filter === chip.id}
            className={cn(
              "shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400",
              filter === chip.id
                ? "border-violet-400/40 bg-white/10 text-white"
                : "border-white/10 bg-white/[0.03] text-mist-400 hover:text-mist-200"
            )}
          >
            {chip.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col">
        {filtered.length > 0 ? (
          filtered.map((t, i) => <TransactionCard key={t.id} transaction={t} index={i} />)
        ) : (
          <EmptyState
            icon={Search}
            title="No transactions found"
            description="Try a different search term or filter."
            className="py-8"
          />
        )}
      </div>
    </Card>
  );
}
