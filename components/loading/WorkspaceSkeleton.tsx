import { GlassSurface } from "@/components/ui/GlassSurface";
import { Skeleton } from "@/components/ui/Skeleton";
import { SkeletonAvatar } from "@/components/loading/SkeletonAvatar";

/** Placeholder for the Workspace home overview — hero row + shortcut
 *  cards + a recent-activity list. */
export function WorkspaceSkeleton() {
  return (
    <div className="flex h-full flex-col gap-5">
      <GlassSurface intensity="default" interactive={false} className="flex items-center gap-4 rounded-4xl p-6">
        <SkeletonAvatar size="md" />
        <div className="flex flex-1 flex-col gap-2">
          <Skeleton className="h-5 w-56" />
          <Skeleton className="h-3 w-40" />
        </div>
      </GlassSurface>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <GlassSurface key={i} intensity="subtle" interactive={false} className="flex flex-col gap-3 rounded-3xl p-5">
            <Skeleton className="h-10 w-10 rounded-2xl" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-32" />
          </GlassSurface>
        ))}
      </div>

      <GlassSurface intensity="subtle" interactive={false} className="flex-1 rounded-3xl p-5">
        <Skeleton className="mb-3 h-3 w-24" />
        <div className="flex flex-col gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-full" />
          ))}
        </div>
      </GlassSurface>
    </div>
  );
}
