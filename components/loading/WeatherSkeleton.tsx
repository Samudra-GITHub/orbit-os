import { GlassSurface } from "@/components/ui/GlassSurface";
import { Skeleton } from "@/components/ui/Skeleton";

export function WeatherSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <GlassSurface intensity="raised" interactive={false} className="rounded-4xl">
        <div className="flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-3">
            <Skeleton className="h-3 w-28" />
            <Skeleton className="h-16 w-40" />
            <Skeleton className="h-3 w-36" />
          </div>
          <Skeleton className="h-20 w-20 shrink-0 rounded-2xl" />
        </div>
      </GlassSurface>

      <GlassSurface intensity="subtle" interactive={false} className="rounded-4xl p-5">
        <Skeleton className="mb-4 h-2 w-full" />
        <div className="flex items-center justify-between">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-8" />
          ))}
        </div>
      </GlassSurface>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {Array.from({ length: 7 }).map((_, i) => (
          <GlassSurface key={i} intensity="subtle" interactive={false} className="rounded-3xl p-4">
            <Skeleton className="mb-2 h-3 w-16" />
            <Skeleton className="h-5 w-20" />
          </GlassSurface>
        ))}
      </div>
    </div>
  );
}
