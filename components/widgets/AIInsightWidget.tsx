"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarClock, TrendingUp, Zap, CloudRain, type LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { AIOrb } from "@/components/motion/AIOrb";

interface Insight {
  icon: LucideIcon;
  text: string;
}

const INSIGHTS: Insight[] = [
  { icon: CalendarClock, text: "3 meetings cluster before noon today." },
  { icon: Zap, text: "Your best focus window is 2 – 4 PM." },
  { icon: TrendingUp, text: "Energy is trending up vs. yesterday." },
  { icon: CloudRain, text: "Rain is expected after 5 PM — plan indoors." },
];

const ROTATE_MS = 5000;

export function AIInsightWidget() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % INSIGHTS.length), ROTATE_MS);
    return () => clearInterval(id);
  }, []);

  const insight = INSIGHTS[index];

  return (
    <Card index={7} variant="widget" className="flex h-full flex-col gap-4 rounded-4xl">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-mist-400">AI insight</p>
        <AIOrb size="sm" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-1 items-start gap-2.5"
        >
          <insight.icon className="mt-0.5 h-4 w-4 shrink-0 text-violet-300" strokeWidth={1.75} />
          <p className="text-sm text-white">{insight.text}</p>
        </motion.div>
      </AnimatePresence>

      <div className="flex gap-1.5">
        {INSIGHTS.map((_, i) => (
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
