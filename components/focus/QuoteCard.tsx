"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote } from "lucide-react";
import { GlassSurface } from "@/components/ui/GlassSurface";
import { FOCUS_QUOTES } from "@/lib/constants/focus";
import { cn } from "@/lib/utils";

const ROTATE_MS = 8000;

interface QuoteCardProps {
  className?: string;
  transparent?: boolean;
}

/** A rotating motivational quote — used on the Overview page (as a glass
 *  card) and inside the full-screen overlay (transparent, over the
 *  ambient scene) via `transparent`. */
export function QuoteCard({ className, transparent = false }: QuoteCardProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % FOCUS_QUOTES.length), ROTATE_MS);
    return () => clearInterval(id);
  }, []);

  const quote = FOCUS_QUOTES[index];

  const content = (
    <AnimatePresence mode="wait">
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center gap-2 text-center"
      >
        <Quote className={cn("h-4 w-4", transparent ? "text-white/50" : "text-violet-300")} strokeWidth={1.75} />
        <p className={cn("max-w-md text-sm", transparent ? "text-white/90" : "text-white")}>&ldquo;{quote.text}&rdquo;</p>
        <p className={cn("text-xs", transparent ? "text-white/50" : "text-mist-400")}>{quote.author}</p>
      </motion.div>
    </AnimatePresence>
  );

  if (transparent) {
    return <div className={cn("flex items-center justify-center", className)}>{content}</div>;
  }

  return (
    <GlassSurface intensity="subtle" interactive={false} className={cn("rounded-3xl p-5", className)}>
      {content}
    </GlassSurface>
  );
}
