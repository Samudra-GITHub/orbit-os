"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CommandItemProps {
  icon: LucideIcon;
  label: string;
  active: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
}

export const CommandItem = forwardRef<HTMLButtonElement, CommandItemProps>(function CommandItem(
  { icon: Icon, label, active, onClick, onMouseEnter },
  ref
) {
  return (
    <motion.button
      ref={ref}
      type="button"
      role="option"
      aria-selected={active}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 24 }}
      className={cn(
        "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400",
        active ? "bg-white/10 text-white" : "text-mist-300 hover:bg-white/5 hover:text-white"
      )}
    >
      <Icon className="h-3.5 w-3.5 shrink-0 text-mist-400" strokeWidth={1.75} />
      {label}
    </motion.button>
  );
});
