import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant = "neutral" | "accent" | "positive" | "warning" | "critical";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  neutral: "bg-white/10 text-mist-300",
  accent: "bg-violet-500/15 text-violet-300",
  positive: "bg-cyan-400/15 text-cyan-300",
  warning: "bg-amber-400/15 text-amber-300",
  critical: "bg-rose-400/15 text-rose-300",
};

export function Badge({ variant = "neutral", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}
