"use client";

import { motion } from "framer-motion";
import { Bold, Italic, Underline, Heading2, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

interface FloatingToolbarProps {
  top: number;
  left: number;
  onCommand: (command: string) => void;
}

const ACTIONS = [
  { command: "bold", icon: Bold, label: "Bold" },
  { command: "italic", icon: Italic, label: "Italic" },
  { command: "underline", icon: Underline, label: "Underline" },
  { command: "formatBlock:h2", icon: Heading2, label: "Heading" },
  { command: "formatBlock:blockquote", icon: Quote, label: "Quote" },
];

/**
 * Appears above a live text selection inside NotesEditor and applies
 * formatting via document.execCommand — a browser API, not a network one,
 * so it fits the "no backend APIs, mock data only" scope of this sprint.
 */
export function FloatingToolbar({ top, left, onCommand }: FloatingToolbarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.96 }}
      transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
      style={{ top, left }}
      className="fixed z-40 flex -translate-x-1/2 items-center gap-0.5 rounded-2xl border border-white/10 bg-ink-800/95 p-1 shadow-glass-lg backdrop-blur-xl"
    >
      {ACTIONS.map((action) => (
        <button
          key={action.command}
          type="button"
          aria-label={action.label}
          onMouseDown={(e) => {
            e.preventDefault();
            onCommand(action.command);
          }}
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-xl text-mist-300 transition-colors hover:bg-white/10 hover:text-white"
          )}
        >
          <action.icon className="h-3.5 w-3.5" strokeWidth={1.75} />
        </button>
      ))}
    </motion.div>
  );
}
