"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { PartyPopper } from "lucide-react";
import { GlassSurface } from "@/components/ui/GlassSurface";
import { PackingCategory } from "@/components/travel/PackingCategory";
import { springs } from "@/lib/motion/springs";
import { usePackingList } from "@/lib/hooks/usePackingList";
import { computePackingProgress } from "@/lib/travel/computeStats";

const RADIUS = 68;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/** The full packing experience — an overall progress ring plus every
 *  category, each independently checkable/addable/removable and
 *  persisted via `usePackingList`. Shows a one-time celebration when
 *  every item is packed. */
export function PackingChecklist() {
  const reduceMotion = useReducedMotion();
  const { categories, toggleItem, addItem, removeItem } = usePackingList();
  const progress = computePackingProgress(categories);
  const isComplete = progress.totalItems > 0 && progress.packedItems === progress.totalItems;
  const offset = CIRCUMFERENCE - (progress.pct / 100) * CIRCUMFERENCE;

  return (
    <div className="flex flex-col gap-5">
      <GlassSurface intensity="raised" interactive={false} className="rounded-4xl p-6">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <div className="relative flex h-[160px] w-[160px] shrink-0 items-center justify-center">
            <svg viewBox="0 0 160 160" className="h-full w-full -rotate-90">
              <circle cx="80" cy="80" r={RADIUS} fill="none" strokeWidth="10" className="stroke-white/10" />
              <motion.circle
                cx="80"
                cy="80"
                r={RADIUS}
                fill="none"
                stroke="url(#packing-ring-gradient)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                initial={{ strokeDashoffset: reduceMotion ? offset : CIRCUMFERENCE }}
                animate={{ strokeDashoffset: offset }}
                transition={reduceMotion ? { duration: 0 } : { ...springs.gentle, delay: 0.1 }}
              />
              <defs>
                <linearGradient id="packing-ring-gradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="var(--color-violet-400)" />
                  <stop offset="100%" stopColor="var(--color-cyan-400)" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <AnimatePresence mode="wait">
                {isComplete ? (
                  <motion.span
                    key="complete"
                    initial={{ scale: 0.4, rotate: -20, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    transition={springs.snappy}
                  >
                    <PartyPopper className="h-9 w-9 text-emerald-300" />
                  </motion.span>
                ) : (
                  <motion.span key="pct" className="font-mono text-3xl font-semibold text-white">
                    {Math.round(progress.pct)}%
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>
          <div className="text-center sm:text-left">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-mist-400">Packing progress</p>
            <p className="mt-1 text-sm text-mist-300">
              {progress.packedItems} of {progress.totalItems} items packed
            </p>
            {isComplete && <p className="mt-1 text-sm text-emerald-300">All packed — ready to go!</p>}
          </div>
        </div>
      </GlassSurface>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <PackingCategory
            key={category.id}
            category={category}
            onToggle={(itemId) => toggleItem(category.id, itemId)}
            onAdd={(label) => addItem(category.id, label)}
            onRemove={(itemId) => removeItem(category.id, itemId)}
          />
        ))}
      </div>
    </div>
  );
}
