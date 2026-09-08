"use client";

import { forwardRef, useState, type InputHTMLAttributes, type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  trailingIcon?: ReactNode;
  containerClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { icon, trailingIcon, className, containerClassName, onFocus, onBlur, ...props },
  ref
) {
  const [focused, setFocused] = useState(false);

  return (
    <div
      className={cn(
        "relative flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-md transition-colors",
        focused && "border-violet-400/50",
        containerClassName
      )}
    >
      {icon && <span className="shrink-0 text-mist-400">{icon}</span>}
      <input
        ref={ref}
        onFocus={(e) => {
          setFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          onBlur?.(e);
        }}
        className={cn(
          "w-full bg-transparent text-sm text-white placeholder:text-mist-500 focus:outline-none",
          className
        )}
        {...props}
      />
      {trailingIcon && <span className="shrink-0 text-mist-400">{trailingIcon}</span>}
      <motion.span
        aria-hidden
        initial={false}
        animate={{ opacity: focused ? 1 : 0, scale: focused ? 1 : 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-violet-400/40"
      />
    </div>
  );
});
