"use client";

import { forwardRef, useRef, type ReactNode, type RefObject } from "react";
import { motion, useMotionValue, useSpring, type HTMLMotionProps } from "framer-motion";
import { springs, magneticStrength } from "@/lib/motion/springs";
import { cn } from "@/lib/utils";

/** The magnetic-follow physics, decoupled from any one component so
 *  Button (which manages its own ref for the ripple effect too) can wire
 *  it into existing handlers instead of needing a second wrapper element. */
export function useMagnetic(ref: RefObject<HTMLElement | null>, strength: number = magneticStrength.default) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, springs.magnetic);
  const springY = useSpring(y, springs.magnetic);

  function onMouseMove(e: { clientX: number; clientY: number }) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return { style: { x: springX, y: springY }, onMouseMove, onMouseLeave };
}

interface MagneticButtonProps extends Omit<HTMLMotionProps<"div">, "ref" | "children"> {
  strength?: number;
  children?: ReactNode;
}

/**
 * A standalone magnetic wrapper for anything that isn't Orbit's `Button`
 * component (which already has this built in) — an icon link, a custom
 * CTA, a card corner action. Wrap the element and it'll pull gently
 * toward the cursor on hover.
 */
export const MagneticButton = forwardRef<HTMLDivElement, MagneticButtonProps>(function MagneticButton(
  { strength = magneticStrength.default, className, children, onMouseMove, onMouseLeave, ...props },
  forwardedRef
) {
  const innerRef = useRef<HTMLDivElement>(null);
  const { style, onMouseMove: handleMove, onMouseLeave: handleLeave } = useMagnetic(innerRef, strength);

  function setRefs(node: HTMLDivElement | null) {
    innerRef.current = node;
    if (typeof forwardedRef === "function") forwardedRef(node);
    else if (forwardedRef) forwardedRef.current = node;
  }

  return (
    <motion.div
      ref={setRefs}
      style={style}
      onMouseMove={(e) => {
        handleMove(e);
        onMouseMove?.(e);
      }}
      onMouseLeave={(e) => {
        handleLeave();
        onMouseLeave?.(e);
      }}
      className={cn("inline-flex", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
});
