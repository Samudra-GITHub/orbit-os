"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface SuggestionChipsProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
}

export function SuggestionChips({ suggestions, onSelect }: SuggestionChipsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {suggestions.map((s, i) => (
        <motion.button
          key={s}
          type="button"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06, duration: 0.3 }}
          whileHover={{ y: -2 }}
          onClick={() => onSelect(s)}
          className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-mist-300 transition-colors hover:border-violet-400/30 hover:bg-white/[0.08] hover:text-white"
        >
          <Sparkles className="h-3.5 w-3.5 text-violet-300" />
          {s}
        </motion.button>
      ))}
    </div>
  );
}
