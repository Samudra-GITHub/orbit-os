import { Moon } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatDurationHM } from "@/lib/health/computeStats";
import type { SleepNight } from "@/lib/constants/health";

interface SleepCardProps {
  night: SleepNight;
  index?: number;
}

function qualityVariant(score: number): "positive" | "warning" | "critical" {
  if (score >= 75) return "positive";
  if (score >= 55) return "warning";
  return "critical";
}

/** Compact "last night" summary — duration, bed/wake times, quality badge.
 *  Used on the Dashboard; the Sleep page's own cards go deeper. */
export function SleepCard({ night, index = 0 }: SleepCardProps) {
  return (
    <Card index={index} variant="widget" className="flex h-full flex-col gap-4 rounded-4xl">
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.2em] text-mist-400">
          <Moon className="h-3.5 w-3.5 text-violet-300" strokeWidth={1.75} /> Sleep
        </p>
        <Badge variant={qualityVariant(night.qualityScore)}>{night.qualityScore}/100</Badge>
      </div>

      <p className="font-display text-3xl font-semibold text-white">{formatDurationHM(night.durationMinutes)}</p>

      <div className="flex items-center justify-between border-t border-white/[0.08] pt-3.5 text-xs">
        <span className="text-mist-400">
          Bedtime <span className="font-mono text-white">{night.bedtime}</span>
        </span>
        <span className="text-mist-400">
          Wake <span className="font-mono text-white">{night.wakeTime}</span>
        </span>
      </div>
    </Card>
  );
}
