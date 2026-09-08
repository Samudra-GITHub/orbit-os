"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface RecentCommandProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
}

export function RecentCommand({ icon: Icon, label, onClick }: RecentCommandProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 24 }}
      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-mist-400 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
    >
      <Icon className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} />
      {label}
    </motion.button>
  );
}
