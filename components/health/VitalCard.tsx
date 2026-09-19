import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

interface VitalCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  unit?: string;
  index?: number;
  accent?: string;
  className?: string;
}

/** A small vital-sign tile — icon, label, big value, optional unit.
 *  Health's flavor of `StatTile`, kept separate since vitals want an
 *  inline unit suffix that generic stat tiles don't. */
export function VitalCard({ icon: Icon, label, value, unit, index = 0, accent = "text-cyan-300", className }: VitalCardProps) {
  return (
    <Card index={index} variant="widget" className={cn("flex flex-col gap-2 rounded-3xl", className)}>
      <div className="flex items-center gap-2 text-mist-400">
        <Icon className={cn("h-4 w-4", accent)} strokeWidth={1.75} />
        <span className="text-xs uppercase tracking-[0.14em]">{label}</span>
      </div>
      <span className="truncate font-mono text-lg font-semibold text-white">
        {value}
        {unit && <span className="ml-1 text-xs font-normal text-mist-500">{unit}</span>}
      </span>
    </Card>
  );
}
