"use client";

import { forwardRef, useRef } from "react";
import { motion, useMotionValue, useSpring, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "icon";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Magnetic cursor-follow on hover. Defaults on for primary/icon, off otherwise. */
  magnetic?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-br from-violet-500 to-cyan-400 text-white shadow-glow-accent hover:shadow-glow-accent-lg",
  secondary: "border border-white/10 bg-white/10 text-white hover:bg-white/[0.14]",
  ghost: "bg-transparent text-mist-300 hover:bg-white/5 hover:text-white",
  outline:
    "border border-white/15 bg-transparent text-white hover:border-violet-400/50 hover:bg-white/5",
  icon: "border border-white/10 bg-white/5 text-mist-300 hover:bg-white/10 hover:text-white",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 gap-1.5 rounded-lg px-3 text-xs",
  md: "h-10 gap-2 rounded-xl px-4 text-sm",
  lg: "h-12 gap-2.5 rounded-2xl px-6 text-base",
};

const iconSizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 w-8 rounded-lg",
  md: "h-10 w-10 rounded-xl",
  lg: "h-12 w-12 rounded-2xl",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", magnetic, className, children, ...props },
  forwardedRef
) {
  const isMagnetic = magnetic ?? (variant === "primary" || variant === "icon");
  const innerRef = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.5 });

  function setRefs(node: HTMLButtonElement | null) {
    innerRef.current = node;
    if (typeof forwardedRef === "function") forwardedRef(node);
    else if (forwardedRef) forwardedRef.current = node;
  }

  function handleMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
    if (!isMagnetic) return;
    const el = innerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.3);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.3);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.button
      ref={setRefs}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={isMagnetic ? { x: springX, y: springY } : undefined}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className={cn(
        "relative inline-flex items-center justify-center font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400 disabled:pointer-events-none disabled:opacity-40",
        variant === "icon" ? iconSizeStyles[size] : sizeStyles[size],
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
});
