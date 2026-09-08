"use client";

import { motion } from "framer-motion";
import { GripVertical } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import type { KanbanCard } from "@/lib/constants/workspace";

interface ProjectCardProps {
  card: KanbanCard;
  isDragging: boolean;
  onDragStart: (id: string) => void;
  onDragEnd: () => void;
}

const PRIORITY_VARIANT = {
  low: "neutral",
  medium: "accent",
  high: "critical",
} as const;

/**
 * Native HTML5 drag-and-drop (no extra dependency) drives cross-column
 * moves; the plain outer <div> carries the drag attributes because
 * framer-motion's `motion.div` redefines onDragStart/onDragEnd for its own
 * pointer-gesture system, and we want the real DOM drag events here. The
 * inner motion.div only handles the `layout` reflow animation.
 */
export function ProjectCard({ card, isDragging, onDragStart, onDragEnd }: ProjectCardProps) {
  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("text/plain", card.id);
        onDragStart(card.id);
      }}
      onDragEnd={onDragEnd}
      className="cursor-grab active:cursor-grabbing"
    >
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: isDragging ? 0.4 : 1, scale: 1 }}
        whileHover={{ y: -3 }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
        className="group flex flex-col gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.05] p-3.5"
      >
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm text-white">{card.title}</p>
          <GripVertical className="h-3.5 w-3.5 shrink-0 text-mist-500 opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="neutral" className="bg-white/5 text-[10px] text-mist-300">
            {card.tag}
          </Badge>
          <Badge variant={PRIORITY_VARIANT[card.priority]} className="text-[10px]">
            {card.priority}
          </Badge>
        </div>
      </motion.div>
    </div>
  );
}
