import type { HTMLAttributes, ReactNode } from "react";
import { GlassSurface, type GlassIntensity } from "@/components/ui/GlassSurface";
import { cn } from "@/lib/utils";

export type CardVariant = "default" | "glass" | "elevated" | "widget";

interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"> {
  variant?: CardVariant;
  /** Animate in on mount + spring hover lift + ambient glow. Off for static/nested cards. */
  interactive?: boolean;
  /** Stagger index, used to offset the mount animation. */
  index?: number;
  /** Shared-element id for cross-page morph transitions (framer-motion layoutId). */
  layoutId?: string;
  children?: ReactNode;
}

const glassIntensityByVariant: Record<Exclude<CardVariant, "default">, GlassIntensity> = {
  glass: "default",
  elevated: "raised",
  widget: "default",
};

/**
 * "glass" / "elevated" / "widget" render through `GlassSurface` — the Liquid
 * Spatial Material — so every widget inherits its hover glow, refraction
 * sheen, and highlight automatically. "default" stays a plain flat card.
 */
export function Card({
  variant = "default",
  interactive = true,
  index = 0,
  className,
  children,
  ...props
}: CardProps) {
  if (variant === "default") {
    return (
      <div className={cn("rounded-3xl border border-white/10 bg-ink-800 p-5", className)} {...props}>
        {children}
      </div>
    );
  }

  return (
    <GlassSurface
      intensity={glassIntensityByVariant[variant]}
      interactive={interactive}
      animateEntrance
      index={index}
      className={cn(
        "rounded-3xl p-5",
        variant === "widget" && "hover:border-violet-400/20",
        className
      )}
      {...props}
    >
      {children}
    </GlassSurface>
  );
}
