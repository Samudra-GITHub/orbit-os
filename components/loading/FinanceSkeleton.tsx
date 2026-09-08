import { GlassSurface } from "@/components/ui/GlassSurface";
import { Skeleton } from "@/components/ui/Skeleton";

export function FinanceSkeleton() {
  return (
    <GlassSurface intensity="subtle" interactive={false} className="flex flex-col gap-5 rounded-4xl p-5">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-8 w-28" />
        </div>
        <Skeleton className="h-14 w-14 rounded-full" />
      </div>
      <Skeleton className="h-6 w-40 rounded-full" />
      <div className="flex flex-col gap-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
            <Skeleton className="h-1.5 w-full" />
          </div>
        ))}
      </div>
    </GlassSurface>
  );
}
