"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GlassSurface } from "@/components/ui/GlassSurface";
import { ProjectCard } from "@/components/workspace/ProjectCard";
import { cn } from "@/lib/utils";
import { INITIAL_KANBAN_CARDS, KANBAN_COLUMNS, type KanbanColumnId } from "@/lib/constants/workspace";

export function KanbanBoard() {
  const [cards, setCards] = useState(INITIAL_KANBAN_CARDS);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [overColumn, setOverColumn] = useState<KanbanColumnId | null>(null);

  function handleDrop(columnId: KanbanColumnId) {
    if (!draggingId) return;
    setCards((prev) => prev.map((c) => (c.id === draggingId ? { ...c, columnId } : c)));
    setDraggingId(null);
    setOverColumn(null);
  }

  return (
    <div className="flex h-full gap-4 overflow-x-auto pb-2">
      {KANBAN_COLUMNS.map((column) => {
        const columnCards = cards.filter((c) => c.columnId === column.id);
        const isOver = overColumn === column.id;

        return (
          <GlassSurface
            key={column.id}
            intensity="subtle"
            interactive={false}
            onDragOver={(e) => {
              e.preventDefault();
              setOverColumn(column.id);
            }}
            onDragLeave={() => setOverColumn((c) => (c === column.id ? null : c))}
            onDrop={() => handleDrop(column.id)}
            className={cn(
              "flex h-full w-72 shrink-0 flex-col gap-3 rounded-3xl p-3 transition-colors",
              isOver && "border-violet-400/40 bg-violet-500/[0.06]"
            )}
          >
            <div className="flex items-center justify-between px-1">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-mist-400">{column.label}</p>
              <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-mist-500">
                {columnCards.length}
              </span>
            </div>

            <motion.div layout className="flex flex-1 flex-col gap-2.5 overflow-y-auto">
              {columnCards.map((card) => (
                <ProjectCard
                  key={card.id}
                  card={card}
                  isDragging={draggingId === card.id}
                  onDragStart={setDraggingId}
                  onDragEnd={() => {
                    setDraggingId(null);
                    setOverColumn(null);
                  }}
                />
              ))}
              {columnCards.length === 0 && (
                <div className="flex flex-1 items-center justify-center rounded-2xl border border-dashed border-white/10 py-6 text-center text-xs text-mist-500">
                  Drop a card here
                </div>
              )}
            </motion.div>
          </GlassSurface>
        );
      })}
    </div>
  );
}
