import { GlassSurface } from "@/components/ui/GlassSurface";
import { Skeleton } from "@/components/ui/Skeleton";

/**
 * The AIWorkspace layout (sidebar + context panel) already persists while
 * this loads, so only the center canvas needs a placeholder here — using
 * the full AIWorkspaceSkeleton would nest a second fake sidebar inside the
 * real one.
 */
export default function AILoading() {
  return (
    <GlassSurface intensity="default" interactive={false} className="flex h-full flex-col rounded-4xl p-6">
      <div className="flex flex-col gap-5">
        <Skeleton className="ml-auto h-10 w-2/3 rounded-2xl" />
        <Skeleton className="h-16 w-3/4 rounded-2xl" />
        <Skeleton className="ml-auto h-10 w-1/2 rounded-2xl" />
        <Skeleton className="h-24 w-4/5 rounded-2xl" />
      </div>
    </GlassSurface>
  );
}
