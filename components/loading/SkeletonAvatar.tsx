import { Skeleton } from "@/components/ui/Skeleton";
import { cn } from "@/lib/utils";

interface SkeletonAvatarProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const SIZES = { sm: "h-8 w-8", md: "h-10 w-10", lg: "h-14 w-14" };

export function SkeletonAvatar({ size = "md", className }: SkeletonAvatarProps) {
  return <Skeleton className={cn("shrink-0 rounded-full", SIZES[size], className)} />;
}
