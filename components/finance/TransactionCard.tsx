"use client";

import { motion } from "framer-motion";
import {
  ArrowDownLeft,
  ArrowUpRight,
  UtensilsCrossed,
  Car,
  ShoppingBag,
  Receipt,
  Clapperboard,
  GraduationCap,
  HeartPulse,
  Repeat,
  Clock,
  XCircle,
  type LucideIcon,
} from "lucide-react";
import type { Transaction } from "@/lib/constants/finance";
import { formatINR } from "@/lib/finance/format";
import { cn } from "@/lib/utils";

const categoryIcon: Record<Transaction["category"], LucideIcon> = {
  food: UtensilsCrossed,
  shopping: ShoppingBag,
  transport: Car,
  bills: Receipt,
  entertainment: Clapperboard,
  education: GraduationCap,
  health: HeartPulse,
  income: ArrowDownLeft,
  transfer: Repeat,
};

const categoryTint: Record<Transaction["category"], string> = {
  food: "bg-violet-500/15 text-violet-300",
  shopping: "bg-amber-400/15 text-amber-300",
  transport: "bg-cyan-400/15 text-cyan-300",
  bills: "bg-indigo-400/15 text-indigo-300",
  entertainment: "bg-rose-400/15 text-rose-300",
  education: "bg-emerald-400/15 text-emerald-300",
  health: "bg-cyan-500/15 text-cyan-300",
  income: "bg-emerald-400/15 text-emerald-300",
  transfer: "bg-white/10 text-mist-300",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", { month: "short", day: "numeric" });
}

interface TransactionCardProps {
  transaction: Transaction;
  index?: number;
}

/** One transaction row — a merchant "logo" (initial, tinted by category),
 *  amount, payment method, and a status indicator for pending/failed
 *  transactions. Used inside `TransactionList`'s scrollable glass list and,
 *  at narrow widths, as a standalone stacked card. */
export function TransactionCard({ transaction: t, index = 0 }: TransactionCardProps) {
  const Icon = categoryIcon[t.category];
  const isCredit = t.kind === "credit";

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.03, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-center gap-3 rounded-2xl px-2 py-2.5 transition-colors hover:bg-white/[0.04]"
    >
      <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-full", categoryTint[t.category])}>
        <Icon className="h-4 w-4" strokeWidth={1.75} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm text-white">{t.merchant}</p>
        <p className="flex items-center gap-1 truncate text-[11px] text-mist-500">
          {formatDate(t.date)} · {t.paymentMethod}
          {t.status === "pending" && (
            <span className="flex items-center gap-0.5 text-amber-400">
              <Clock className="h-2.5 w-2.5" /> Pending
            </span>
          )}
          {t.status === "failed" && (
            <span className="flex items-center gap-0.5 text-rose-400">
              <XCircle className="h-2.5 w-2.5" /> Failed
            </span>
          )}
        </p>
      </div>
      <span
        className={cn(
          "flex shrink-0 items-center gap-1 font-mono text-sm",
          t.status === "failed" ? "text-mist-500 line-through" : isCredit ? "text-emerald-300" : "text-mist-200"
        )}
      >
        {isCredit ? <ArrowDownLeft className="h-3 w-3" /> : <ArrowUpRight className="h-3 w-3" />}
        {isCredit ? "+" : "-"}
        {formatINR(t.amount)}
      </span>
    </motion.div>
  );
}
