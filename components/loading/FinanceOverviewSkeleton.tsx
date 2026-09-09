import { GlassSurface } from "@/components/ui/GlassSurface";
import { Skeleton } from "@/components/ui/Skeleton";
import { SkeletonChart } from "@/components/loading/SkeletonChart";

/** Mirrors the Finance Overview layout (hero + chart/insight row +
 *  transactions/breakdown row) so loading doesn't jump once real content mounts. */
export function FinanceOverviewSkeleton() {
  return (
    <div className="flex flex-col gap-5">
      <GlassSurface intensity="default" interactive={false} className="rounded-4xl">
        <div className="flex flex-col gap-6 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-3 w-28" />
              <Skeleton className="h-10 w-48" />
            </div>
            <Skeleton className="h-6 w-40 rounded-full" />
          </div>
          <div className="flex gap-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-24 flex-1 rounded-3xl" />
            ))}
          </div>
        </div>
      </GlassSurface>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <GlassSurface intensity="subtle" interactive={false} className="flex flex-col gap-4 rounded-4xl p-5 lg:col-span-2">
          <Skeleton className="h-3 w-32" />
          <SkeletonChart />
        </GlassSurface>
        <GlassSurface intensity="subtle" interactive={false} className="flex flex-col gap-4 rounded-4xl p-5">
          <Skeleton className="h-3 w-32" />
          <Skeleton className="h-16 w-full" />
        </GlassSurface>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <GlassSurface intensity="subtle" interactive={false} className="flex flex-col gap-2 rounded-4xl p-5 lg:col-span-2">
          <Skeleton className="mb-2 h-3 w-32" />
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </GlassSurface>
        <GlassSurface intensity="subtle" interactive={false} className="flex flex-col gap-4 rounded-4xl p-5">
          <Skeleton className="h-3 w-32" />
          <Skeleton className="mx-auto h-32 w-32 rounded-full" />
        </GlassSurface>
      </div>
    </div>
  );
}
