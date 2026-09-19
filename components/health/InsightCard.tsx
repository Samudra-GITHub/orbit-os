"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { AIOrb } from "@/components/motion/AIOrb";
import { HEALTH_INSIGHTS } from "@/lib/constants/health";

const ROTATE_MS = 5000;

/** Health's rotating AI insight card — same pattern as Finance/Travel's,
 *  fed wellness-specific mock insights. */
export function InsightCard({ index = 0 }: { index?: number }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % HEALTH_INSIGHTS.length), ROTATE_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <Card index={index} variant="widget" className="flex h-full flex-col gap-4 rounded-4xl">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-mist-400">AI health insight</p>
        <AIOrb size="sm" />
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={i}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 text-sm text-white"
        >
          {HEALTH_INSIGHTS[i].text}
        </motion.p>
      </AnimatePresence>

      <div className="flex gap-1.5">
        {HEALTH_INSIGHTS.map((_, dot) => (
          <span
            key={dot}
            className={`h-1 flex-1 rounded-full transition-colors ${dot === i ? "bg-violet-400" : "bg-white/10"}`}
          />
        ))}
      </div>
    </Card>
  );
}
