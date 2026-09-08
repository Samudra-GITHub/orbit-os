import { GlassSurface } from "@/components/ui/GlassSurface";
import { Skeleton } from "@/components/ui/Skeleton";

export function AISkeleton() {
  return (
    <div className="flex h-[78vh] min-h-[560px] gap-5">
      <GlassSurface intensity="subtle" interactive={false} className="w-64 shrink-0 rounded-4xl p-3">
        <div className="flex flex-col gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-full" />
          ))}
        </div>
      </GlassSurface>

      <GlassSurface intensity="default" interactive={false} className="min-w-0 flex-1 rounded-4xl p-6">
        <div className="flex flex-col gap-5">
          <Skeleton className="ml-auto h-10 w-2/3 rounded-2xl" />
          <Skeleton className="h-16 w-3/4 rounded-2xl" />
          <Skeleton className="ml-auto h-10 w-1/2 rounded-2xl" />
          <Skeleton className="h-24 w-4/5 rounded-2xl" />
        </div>
      </GlassSurface>

      <GlassSurface intensity="subtle" interactive={false} className="w-72 shrink-0 rounded-4xl p-4">
        <div className="flex flex-col gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full" />
          ))}
        </div>
      </GlassSurface>
    </div>
  );
}
