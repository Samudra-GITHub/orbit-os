"use client";

import { Minus, Plus } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { WaterRing } from "@/components/health/WaterRing";
import { useHydration } from "@/lib/hooks/useHydration";
import { computeHydrationStreak } from "@/lib/health/computeStats";

/** Interactive water tracker — ring + add/remove glass buttons, persisted
 *  to localStorage via `useHydration`. Used on both the Dashboard (compact)
 *  and the Hydration page (full, with streak). */
export function HydrationTracker({ index = 4, compact = false }: { index?: number; compact?: boolean }) {
  const { todayLiters, goalL, addGlass, removeGlass, history } = useHydration();
  const streak = computeHydrationStreak(history, goalL);
  const isGoalMet = todayLiters >= goalL;

  return (
    <Card index={index} variant="widget" className="flex flex-col items-center gap-4 rounded-4xl text-center">
      <div className="flex w-full items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-mist-400">Hydration</p>
        {streak > 0 && <Badge variant={isGoalMet ? "positive" : "neutral"}>{streak}d streak</Badge>}
      </div>

      <WaterRing liters={todayLiters} goalL={goalL} size={compact ? 140 : 168} />

      <div className="flex items-center gap-3">
        <Button
          variant="icon"
          size={compact ? "sm" : "md"}
          aria-label="Remove a glass of water"
          onClick={removeGlass}
          disabled={todayLiters <= 0}
        >
          <Minus className="h-4 w-4" strokeWidth={2} />
        </Button>
        <Button variant="primary" size={compact ? "sm" : "md"} aria-label="Add a glass of water" onClick={addGlass}>
          <Plus className="h-4 w-4" strokeWidth={2} /> Add glass
        </Button>
      </div>
    </Card>
  );
}
