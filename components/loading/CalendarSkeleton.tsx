import { GlassSurface } from "@/components/ui/GlassSurface";
import { Skeleton } from "@/components/ui/Skeleton";

export function CalendarSkeleton() {
  return (
    <GlassSurface intensity="subtle" interactive={false} className="flex flex-col gap-5 rounded-4xl p-5">
      <div className="flex items-center justify-between">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-5 w-5 rounded-full" />
      </div>
      <div className="flex flex-col gap-4 pl-1">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <Skeleton className="h-3.5 w-3.5 shrink-0 rounded-full" />
            <Skeleton className="h-3 w-10 shrink-0" />
            <Skeleton className="h-10 flex-1 rounded-xl" />
          </div>
        ))}
      </div>
    </GlassSurface>
  );
}
