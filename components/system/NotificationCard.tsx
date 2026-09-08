"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import { CATEGORY_META, type NotificationEntry } from "@/lib/constants/notifications";
import { cn } from "@/lib/utils";

interface NotificationCardProps {
  entry: NotificationEntry;
  onDismiss: (id: string) => void;
}

export function NotificationCard({ entry, onDismiss }: NotificationCardProps) {
  const meta = CATEGORY_META[entry.category];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 40, height: 0 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "group flex items-start gap-3 rounded-2xl border px-3 py-3 transition-colors",
        entry.unread
          ? "border-violet-400/20 bg-violet-500/[0.06]"
          : "border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04]"
      )}
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/5">
        <meta.icon className={cn("h-4 w-4", meta.accent)} strokeWidth={1.75} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-sm font-medium text-white">{entry.title}</p>
          {entry.unread && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />}
        </div>
        <p className="mt-0.5 text-xs leading-relaxed text-mist-400">{entry.message}</p>
        <div className="mt-1.5 flex items-center gap-2">
          <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium", meta.chip)}>{meta.label}</span>
          <span className="text-[10px] text-mist-500">{entry.time}</span>
        </div>
      </div>
      <button
        onClick={() => onDismiss(entry.id)}
        aria-label="Dismiss notification"
        className="shrink-0 rounded-md p-1 text-mist-500 opacity-0 transition-opacity hover:text-white focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400 group-hover:opacity-100"
      >
        <X className="h-3 w-3" />
      </button>
    </motion.div>
  );
}
