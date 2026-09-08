import { GlassSurface } from "@/components/ui/GlassSurface";
import { Skeleton } from "@/components/ui/Skeleton";
import { cn } from "@/lib/utils";

interface SkeletonWidgetProps {
  className?: string;
}

/** The shape of a typical dashboard widget: eyebrow label, a big stat, and
 *  two supporting lines. Used to build DashboardSkeleton and similar. */
export function SkeletonWidget({ className }: SkeletonWidgetProps) {
  return (
    <GlassSurface intensity="subtle" interactive={false} className={cn("rounded-4xl", className)}>
      <div className="flex flex-col gap-4 p-5">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-2 w-full" />
        <Skeleton className="h-2 w-3/4" />
      </div>
    </GlassSurface>
  );
}
