"use client";

import { motion } from "framer-motion";
import { Tv, Sparkles, Dumbbell, Cloud, Newspaper, type LucideIcon } from "lucide-react";
import { GlassSurface } from "@/components/ui/GlassSurface";
import { Badge } from "@/components/ui/Badge";
import type { Subscription, SubscriptionCategory } from "@/lib/constants/finance";
import { daysUntil } from "@/lib/finance/computeStats";
import { formatINR } from "@/lib/finance/format";
import { cn } from "@/lib/utils";

const categoryIcon: Record<SubscriptionCategory, LucideIcon> = {
  entertainment: Tv,
  productivity: Sparkles,
  wellness: Dumbbell,
  cloud: Cloud,
  news: Newspaper,
};

const categoryGradient: Record<SubscriptionCategory, string> = {
  entertainment: "from-rose-400/30 to-violet-500/20",
  productivity: "from-violet-500/30 to-indigo-500/20",
  wellness: "from-cyan-400/25 to-cyan-500/15",
  cloud: "from-indigo-400/30 to-violet-500/15",
  news: "from-amber-400/25 to-rose-400/15",
};

const NOW = new Date("2026-09-09T12:00:00");

interface SubscriptionCardProps {
  subscription: Subscription;
  index?: number;
}

/** A subscription tile — logo (category icon in a gradient badge), name,
 *  monthly and annualized cost, renewal date, and an active/expired badge. */
export function SubscriptionCard({ subscription, index = 0 }: SubscriptionCardProps) {
  const Icon = categoryIcon[subscription.category];
  const days = daysUntil(subscription.renewsOn, NOW);
  const isExpired = subscription.status === "expired";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <GlassSurface intensity="subtle" className={cn("flex h-full flex-col gap-4 rounded-3xl p-5", isExpired && "opacity-60")}>
        <div className="flex items-center justify-between">
          <div
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br",
              categoryGradient[subscription.category]
            )}
          >
            <Icon className="h-5 w-5 text-white" strokeWidth={1.75} />
          </div>
          <Badge variant={isExpired ? "neutral" : "positive"} className="text-[10px]">
            {isExpired ? "Expired" : "Active"}
          </Badge>
        </div>

        <div>
          <p className="font-medium text-white">{subscription.name}</p>
          <p className="mt-0.5 text-xs capitalize text-mist-400">{subscription.category}</p>
        </div>

        <div className="mt-auto flex items-end justify-between border-t border-white/[0.08] pt-3.5">
          <div>
            <p className="font-mono text-lg font-semibold text-white">
              {subscription.monthlyCost > 0 ? formatINR(subscription.monthlyCost) : formatINR(subscription.yearlyCost)}
            </p>
            <p className="text-[11px] text-mist-500">
              per {subscription.monthlyCost > 0 ? "month" : "year"} · {formatINR(subscription.yearlyCost)}/yr
            </p>
          </div>
          <p className={cn("text-[11px]", isExpired ? "text-mist-500" : days <= 5 ? "text-amber-300" : "text-mist-400")}>
            {isExpired ? `Expired ${Math.abs(days)}d ago` : `Renews in ${days}d`}
          </p>
        </div>
      </GlassSurface>
    </motion.div>
  );
}
