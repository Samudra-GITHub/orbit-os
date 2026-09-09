import { Repeat, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { GlassSurface } from "@/components/ui/GlassSurface";
import { AIOrb } from "@/components/motion/AIOrb";
import { SubscriptionCard } from "@/components/finance/SubscriptionCard";
import { SUBSCRIPTIONS } from "@/lib/constants/finance";
import { daysUntil } from "@/lib/finance/computeStats";
import { formatINR } from "@/lib/finance/format";

const NOW = new Date("2026-09-09T12:00:00");

export default function FinanceSubscriptionsPage() {
  const active = SUBSCRIPTIONS.filter((s) => s.status === "active");
  const expired = SUBSCRIPTIONS.filter((s) => s.status === "expired");
  const upcoming = active.filter((s) => daysUntil(s.renewsOn, NOW) <= 7);
  const rest = active.filter((s) => daysUntil(s.renewsOn, NOW) > 7);

  const monthlyTotal = active.reduce((sum, s) => sum + (s.monthlyCost > 0 ? s.monthlyCost : s.yearlyCost / 12), 0);

  return (
    <div className="flex flex-col gap-5">
      <Card index={0} variant="elevated" className="rounded-4xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-mist-400">Subscriptions</p>
            <p className="mt-2 bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text font-display text-4xl font-semibold tracking-tight text-transparent">
              {formatINR(monthlyTotal)}
              <span className="text-lg text-mist-400">/mo</span>
            </p>
            <p className="mt-2 text-sm text-mist-400">{active.length} active · {expired.length} expired</p>
          </div>
          <div className="flex items-center gap-2.5 rounded-2xl border border-white/[0.08] bg-white/[0.04] px-4 py-3">
            <Repeat className="h-4 w-4 text-cyan-300" strokeWidth={1.75} />
            <span className="text-xs text-mist-300">{SUBSCRIPTIONS.length} subscriptions tracked</span>
          </div>
        </div>
      </Card>

      <GlassSurface intensity="raised" interactive={false} className="rounded-4xl p-5">
        <div className="flex items-center gap-4">
          <AIOrb size="sm" />
          <div className="flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 shrink-0 text-violet-300" />
            <p className="text-sm text-white">
              You can save <span className="font-mono text-emerald-300">₹499/month</span> by cancelling unused subscriptions.
            </p>
          </div>
        </div>
      </GlassSurface>

      {upcoming.length > 0 && (
        <section className="flex flex-col gap-3">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-mist-400">Upcoming renewals</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((sub, i) => (
              <SubscriptionCard key={sub.id} subscription={sub} index={i} />
            ))}
          </div>
        </section>
      )}

      {rest.length > 0 && (
        <section className="flex flex-col gap-3">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-mist-400">Active</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((sub, i) => (
              <SubscriptionCard key={sub.id} subscription={sub} index={i} />
            ))}
          </div>
        </section>
      )}

      {expired.length > 0 && (
        <section className="flex flex-col gap-3">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-mist-400">Expired</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {expired.map((sub, i) => (
              <SubscriptionCard key={sub.id} subscription={sub} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
