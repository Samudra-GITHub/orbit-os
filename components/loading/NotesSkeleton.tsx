import { GlassSurface } from "@/components/ui/GlassSurface";
import { Skeleton } from "@/components/ui/Skeleton";

export function NotesSkeleton() {
  return (
    <GlassSurface intensity="default" interactive={false} className="flex h-full flex-col gap-6 rounded-4xl p-8">
      <Skeleton className="h-8 w-2/3" />
      <Skeleton className="h-3 w-40" />
      <div className="mt-2 flex flex-col gap-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-11/12" />
        <Skeleton className="h-4 w-4/5" />
      </div>
      <Skeleton className="h-20 w-full rounded-2xl" />
      <div className="flex flex-col gap-2.5">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center gap-2.5">
            <Skeleton className="h-4 w-4 shrink-0 rounded" />
            <Skeleton className="h-4 flex-1" />
          </div>
        ))}
      </div>
    </GlassSurface>
  );
}
