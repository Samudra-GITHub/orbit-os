import { GlassSurface } from "@/components/ui/GlassSurface";
import { SkeletonAvatar } from "@/components/loading/SkeletonAvatar";
import { SkeletonText } from "@/components/loading/SkeletonText";
import { cn } from "@/lib/utils";

interface SkeletonCardProps {
  withAvatar?: boolean;
  lines?: number;
  className?: string;
}

/** A generic glass card placeholder — avatar/heading row plus a few lines
 *  of body text. Compose this for list items, chat bubbles, previews. */
export function SkeletonCard({ withAvatar = true, lines = 2, className }: SkeletonCardProps) {
  return (
    <GlassSurface intensity="subtle" interactive={false} className={cn("flex flex-col gap-3 rounded-3xl p-4", className)}>
      {withAvatar && (
        <div className="flex items-center gap-3">
          <SkeletonAvatar size="sm" />
          <SkeletonText lines={1} lastLineWidth="w-24" className="flex-1" />
        </div>
      )}
      <SkeletonText lines={lines} />
    </GlassSurface>
  );
}
