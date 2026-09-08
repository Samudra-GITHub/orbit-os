import { Skeleton } from "@/components/ui/Skeleton";
import { cn } from "@/lib/utils";

interface SkeletonTextProps {
  lines?: number;
  className?: string;
  lastLineWidth?: string;
}

/** A paragraph of shimmering placeholder lines, the last one shorter so it
 *  reads as text rather than a solid block. */
export function SkeletonText({ lines = 3, className, lastLineWidth = "w-2/3" }: SkeletonTextProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className={cn("h-3.5", i === lines - 1 ? lastLineWidth : "w-full")} />
      ))}
    </div>
  );
}
