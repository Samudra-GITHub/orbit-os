"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Mic } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * UI-only voice trigger — toggles a "listening" pulse for a couple of
 * seconds then resets on its own. No microphone access, no AI chat yet;
 * this is purely the affordance for a future voice command flow.
 */
export function VoiceButton() {
  const [listening, setListening] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!listening) return;
    const id = setTimeout(() => setListening(false), 2200);
    return () => clearTimeout(id);
  }, [listening]);

  return (
    <button
      type="button"
      onClick={() => setListening((v) => !v)}
      aria-pressed={listening}
      aria-label={listening ? "Stop voice input" : "Start voice input"}
      className={cn(
        "relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors",
        listening ? "text-cyan-300" : "text-mist-400 hover:bg-white/5 hover:text-white"
      )}
    >
      {listening && !reduceMotion && (
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full bg-cyan-400/20"
          animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
          transition={{ duration: 1.1, repeat: Infinity, ease: "easeOut" }}
        />
      )}
      <Mic className="relative h-3.5 w-3.5" />
    </button>
  );
}
