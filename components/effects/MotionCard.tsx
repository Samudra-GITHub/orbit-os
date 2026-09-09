"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { fadeFloatIn, hoverElevate } from "@/lib/motion/variants";

interface MotionCardProps extends Omit<HTMLMotionProps<"div">, "ref" | "children"> {
  /** Stagger index for the entrance animation. */
  index?: number;
  /** Apply the hover lift. Off for static/nested content. */
  interactive?: boolean;
  children?: ReactNode;
}

/**
 * The generic entrance+hover wrapper — `fadeFloatIn` on mount,
 * `hoverElevate` on hover — for anything that isn't a glass surface but
 * still wants Orbit's standard card motion (e.g. a plain content block on
 * a marketing page). `Card`/`GlassSurface` compose the same shared
 * variants directly rather than nesting this, to avoid a redundant
 * wrapper element on every widget.
 */
export function MotionCard({ index = 0, interactive = true, className, children, ...props }: MotionCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      custom={index}
      variants={fadeFloatIn}
      initial={reduceMotion ? false : "hidden"}
      animate="show"
      whileHover={interactive && !reduceMotion ? hoverElevate : undefined}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
