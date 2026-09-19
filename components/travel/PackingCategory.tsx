"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Plus, X } from "lucide-react";
import { GlassSurface } from "@/components/ui/GlassSurface";
import { springs } from "@/lib/motion/springs";
import type { PackingCategory as PackingCategoryType } from "@/lib/constants/travel";
import { cn } from "@/lib/utils";

interface PackingCategoryProps {
  category: PackingCategoryType;
  onToggle: (itemId: string) => void;
  onAdd: (label: string) => void;
  onRemove: (itemId: string) => void;
}

/** One packing category — a progress bar, its items (each a checkable
 *  row), and a small inline form to add a mock item. */
export function PackingCategory({ category, onToggle, onAdd, onRemove }: PackingCategoryProps) {
  const [draft, setDraft] = useState("");
  const packedCount = category.items.filter((i) => i.packed).length;
  const pct = category.items.length > 0 ? (packedCount / category.items.length) * 100 : 0;

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!draft.trim()) return;
    onAdd(draft);
    setDraft("");
  }

  return (
    <GlassSurface intensity="subtle" interactive={false} className="rounded-3xl p-5">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <p className="font-medium text-white">{category.label}</p>
          <span className="font-mono text-xs text-mist-400">
            {packedCount}/{category.items.length}
          </span>
        </div>

        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-violet-400 to-cyan-400"
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>

        <div className="flex flex-col gap-1">
          {category.items.map((item) => (
            <div key={item.id} className="group flex items-center gap-2.5 rounded-xl px-1.5 py-1.5 hover:bg-white/[0.03]">
              <button
                type="button"
                onClick={() => onToggle(item.id)}
                aria-pressed={item.packed}
                aria-label={item.packed ? `Mark "${item.label}" as not packed` : `Mark "${item.label}" as packed`}
                className={cn(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400",
                  item.packed ? "border-transparent bg-gradient-to-br from-violet-500 to-cyan-400" : "border-white/20"
                )}
              >
                {item.packed && (
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={springs.snappy}>
                    <Check className="h-3 w-3 text-white" strokeWidth={3} />
                  </motion.span>
                )}
              </button>
              <span className={cn("flex-1 text-sm", item.packed ? "text-mist-500 line-through" : "text-mist-200")}>
                {item.label}
              </span>
              <button
                type="button"
                onClick={() => onRemove(item.id)}
                aria-label={`Remove "${item.label}"`}
                className="opacity-0 transition-opacity focus-visible:opacity-100 group-hover:opacity-100"
              >
                <X className="h-3.5 w-3.5 text-mist-500 hover:text-rose-300" />
              </button>
            </div>
          ))}
        </div>

        <form onSubmit={handleAdd} className="flex items-center gap-2 border-t border-white/[0.08] pt-3">
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Add an item..."
            aria-label={`Add item to ${category.label}`}
            className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-white placeholder:text-mist-500 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
          />
          <button
            type="submit"
            aria-label="Add item"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/10 text-mist-300 transition-colors hover:bg-white/15 hover:text-white"
          >
            <Plus className="h-4 w-4" />
          </button>
        </form>
      </div>
    </GlassSurface>
  );
}
