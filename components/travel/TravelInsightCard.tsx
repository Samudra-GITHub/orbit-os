"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { AIOrb } from "@/components/motion/AIOrb";
import { TRAVEL_INSIGHTS } from "@/lib/constants/travel";

const ROTATE_MS = 6000;

/** Travel's flavor of the AI insight card — same rotating-card pattern
 *  used across Dashboard/Finance, fed travel-specific mock insights. */
export function TravelInsightCard() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % TRAVEL_INSIGHTS.length), ROTATE_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <Card index={3} variant="widget" className="flex h-full flex-col gap-4 rounded-4xl">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-mist-400">AI travel insight</p>
        <AIOrb size="sm" />
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 text-sm text-white"
        >
          {TRAVEL_INSIGHTS[index].text}
        </motion.p>
      </AnimatePresence>

      <div className="flex gap-1.5">
        {TRAVEL_INSIGHTS.map((_, i) => (
          <span
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${i === index ? "bg-violet-400" : "bg-white/10"}`}
          />
        ))}
      </div>
    </Card>
  );
}
