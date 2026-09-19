import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

interface StatTileProps {
  icon: LucideIcon;
  label: string;
  value: string;
  index?: number;
  accent?: string;
  className?: string;
}

/** The "icon + uppercase label + big mono value" stat tile — previously
 *  hand-copied per module (Finance's quick-stats row, Focus's `FocusStats`,
 *  Weather's `MetricCard`). New modules should reach for this instead of
 *  re-authoring the pattern again. */
export function StatTile({ icon: Icon, label, value, index = 0, accent = "text-cyan-300", className }: StatTileProps) {
  return (
    <Card index={index} variant="widget" className={cn("flex flex-col gap-2 rounded-3xl", className)}>
      <div className="flex items-center gap-2 text-mist-400">
        <Icon className={cn("h-4 w-4", accent)} strokeWidth={1.75} />
        <span className="text-xs uppercase tracking-[0.14em]">{label}</span>
      </div>
      <span className="truncate font-mono text-lg font-semibold text-white">{value}</span>
    </Card>
  );
}
