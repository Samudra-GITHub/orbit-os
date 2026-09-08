import { GlassSurface } from "@/components/ui/GlassSurface";
import { Skeleton } from "@/components/ui/Skeleton";

function WidgetSkeleton({ className }: { className?: string }) {
  return (
    <GlassSurface intensity="subtle" interactive={false} className={className}>
      <div className="flex flex-col gap-4 p-5">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-2 w-full" />
        <Skeleton className="h-2 w-3/4" />
      </div>
    </GlassSurface>
  );
}

/** Mirrors the dashboard's bento grid so the loading state doesn't jump
 *  around once real content mounts. */
export function DashboardSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:gap-5 lg:grid-cols-12 lg:gap-6">
      <GlassSurface intensity="default" interactive={false} className="col-span-full rounded-4xl">
        <div className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Skeleton className="h-14 w-14 shrink-0 rounded-full" />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-3 w-32" />
              <Skeleton className="h-7 w-48" />
            </div>
          </div>
          <Skeleton className="h-11 w-full rounded-full md:w-64" />
        </div>
      </GlassSurface>

      <WidgetSkeleton className="rounded-4xl md:col-span-3 lg:col-span-5" />
      <WidgetSkeleton className="rounded-4xl md:col-span-3 lg:col-span-7" />
      <WidgetSkeleton className="rounded-4xl md:col-span-3 lg:col-span-5" />
      <WidgetSkeleton className="rounded-4xl md:col-span-3 lg:col-span-7" />
      <WidgetSkeleton className="rounded-4xl md:col-span-2 lg:col-span-4" />
      <WidgetSkeleton className="rounded-4xl md:col-span-2 lg:col-span-4" />
      <WidgetSkeleton className="rounded-4xl md:col-span-2 lg:col-span-4" />
    </div>
  );
}
