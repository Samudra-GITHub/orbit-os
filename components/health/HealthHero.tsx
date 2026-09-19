"use client";

import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { HealthScoreCard } from "@/components/health/HealthScoreCard";
import { getGreeting } from "@/lib/utils";
import { MOOD_META, type DailySummary } from "@/lib/constants/health";

/** Dashboard hero — health score ring, greeting, and today's mood/stress
 *  at a glance. Mirrors `TravelHero`/`WalletCard`'s mesh-glow treatment. */
export function HealthHero({ summary }: { summary: DailySummary }) {
  return (
    <Card index={0} variant="elevated" className="relative overflow-hidden rounded-4xl">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-16 -top-24 h-72 w-72 rounded-full bg-violet-500/20 blur-[100px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -right-10 h-64 w-64 rounded-full bg-cyan-400/15 blur-[100px]"
      />

      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-mist-400">{getGreeting()}</p>
          <p className="font-display text-2xl font-semibold text-white sm:text-3xl">Your health score is looking great</p>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <Badge variant="positive">
              {MOOD_META[summary.mood].emoji} {summary.mood}
            </Badge>
            <Badge variant="neutral">Stress · {summary.stressLevel}</Badge>
          </div>
        </div>

        <HealthScoreCard score={summary.healthScore} />
      </div>
    </Card>
  );
}
