import { Clock, CheckCircle2, Flame, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/Card";
import type { FocusStatsSummary } from "@/lib/focus/computeStats";

interface FocusStatsProps {
  stats: FocusStatsSummary;
  compact?: boolean;
}

/** A row of key focus metrics — a compact 3-tile version on the Overview
 *  page, and the full set on the Stats page. */
export function FocusStats({ stats, compact = false }: FocusStatsProps) {
  const tiles = [
    { icon: Clock, label: "This week", value: `${stats.weekMinutes}m` },
    { icon: CheckCircle2, label: "Sessions completed", value: String(stats.completedCount) },
    { icon: Flame, label: "Day streak", value: String(stats.streakDays) },
    { icon: TrendingUp, label: "Avg. session", value: `${stats.avgSessionMinutes}m` },
  ];

  const shown = compact ? tiles.slice(0, 3) : tiles;

  return (
    <div className={`grid grid-cols-1 gap-4 sm:grid-cols-3 ${!compact ? "lg:grid-cols-4" : ""}`}>
      {shown.map((t, i) => (
        <Card key={t.label} index={i} variant="widget" className="flex flex-col gap-2 rounded-3xl">
          <div className="flex items-center gap-2 text-mist-400">
            <t.icon className="h-4 w-4 text-cyan-300" strokeWidth={1.75} />
            <span className="text-xs uppercase tracking-[0.14em]">{t.label}</span>
          </div>
          <span className="font-mono text-xl font-semibold text-white">{t.value}</span>
        </Card>
      ))}
    </div>
  );
}
