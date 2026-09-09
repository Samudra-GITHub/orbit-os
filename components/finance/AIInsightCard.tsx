"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { AIOrb } from "@/components/motion/AIOrb";
import { AI_FINANCE_INSIGHTS } from "@/lib/constants/finance";

const ROTATE_MS = 5000;

/** Finance's flavor of the dashboard AI insight widget — rotates through
 *  spending/subscription/goal callouts and deep-links to the AI Workspace. */
export function AIInsightCard() {
  const [index, setIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % AI_FINANCE_INSIGHTS.length), ROTATE_MS);
    return () => clearInterval(id);
  }, []);

  function openAIWorkspace() {
    router.push("/ai");
  }

  return (
    <Card
      index={3}
      variant="widget"
      role="link"
      tabIndex={0}
      aria-label="Ask Orbit about your finances"
      onClick={openAIWorkspace}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openAIWorkspace();
        }
      }}
      className="flex h-full cursor-pointer flex-col gap-4 rounded-4xl"
    >
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-mist-400">AI financial insight</p>
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
          {AI_FINANCE_INSIGHTS[index]}
        </motion.p>
      </AnimatePresence>

      <div className="flex gap-1.5">
        {AI_FINANCE_INSIGHTS.map((_, i) => (
          <span
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${
              i === index ? "bg-violet-400" : "bg-white/10"
            }`}
          />
        ))}
      </div>
    </Card>
  );
}
