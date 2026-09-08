import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  style?: CSSProperties;
}

/** A single shimmering placeholder block. Compose these into the granular
 *  primitives and per-screen layouts under `components/loading/`. */
export function Skeleton({ className, style }: SkeletonProps) {
  return <div className={cn("skeleton-shimmer rounded-xl", className)} style={style} aria-hidden />;
}
