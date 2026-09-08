"use client";

import { forwardRef, type ChangeEvent, type KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { VoiceButton } from "@/components/command/VoiceButton";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  onClose: () => void;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(function SearchInput(
  { value, onChange, onKeyDown, onClose },
  ref
) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-center gap-3 border-b border-white/10 px-5 py-4"
    >
      <Search className="h-4 w-4 shrink-0 text-mist-400" />
      <input
        ref={ref}
        autoFocus
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Ask Orbit anything..."
        aria-label="Command search"
        className="w-full bg-transparent text-sm text-white placeholder:text-mist-500 focus:outline-none"
      />
      <VoiceButton />
      <kbd className="hidden shrink-0 rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] text-mist-400 sm:block">
        ctrl K
      </kbd>
      <button
        onClick={onClose}
        aria-label="Close"
        className="rounded-md text-mist-400 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
      >
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  );
});
