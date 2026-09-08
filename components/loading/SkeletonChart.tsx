import { Skeleton } from "@/components/ui/Skeleton";
import { cn } from "@/lib/utils";

interface SkeletonChartProps {
  bars?: number;
  className?: string;
}

// Deterministic pseudo-random bar heights (no Math.random — avoids
// server/client hydration mismatches for a shape nobody notices anyway).
function barHeight(i: number) {
  return 30 + ((i * 47) % 60);
}

/** A row of shimmering bars — for sparklines, spending charts, mini graphs. */
export function SkeletonChart({ bars = 7, className }: SkeletonChartProps) {
  return (
    <div className={cn("flex h-24 items-end gap-2", className)}>
      {Array.from({ length: bars }).map((_, i) => (
        <Skeleton key={i} className="flex-1 rounded-t-lg rounded-b-none" style={{ height: `${barHeight(i)}%` }} />
      ))}
    </div>
  );
}
