"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { GlassSurface } from "@/components/ui/GlassSurface";
import { AIOrb } from "@/components/motion/AIOrb";
import { AI_SUGGESTIONS, type AIContextTopic } from "@/lib/constants/workspace";

function topicFromPathname(pathname: string | null): AIContextTopic {
  if (!pathname) return "home";
  if (pathname.startsWith("/workspace/notes")) return "notes";
  if (pathname.startsWith("/workspace/projects")) return "projects";
  if (pathname.startsWith("/workspace/files")) return "files";
  return "home";
}

const TOPIC_LABEL: Record<AIContextTopic, string> = {
  home: "Workspace overview",
  notes: "This note",
  projects: "This board",
  files: "This file",
};

export function AIContextPanel() {
  const pathname = usePathname();
  const topic = topicFromPathname(pathname);
  const [applied, setApplied] = useState<string | null>(null);

  function handleApply(suggestion: string) {
    setApplied(suggestion);
    setTimeout(() => setApplied(null), 1800);
  }

  return (
    <GlassSurface
      intensity="subtle"
      interactive={false}
      className="flex w-72 shrink-0 flex-col gap-4 overflow-y-auto rounded-4xl p-4"
    >
      <div className="flex items-center gap-2.5">
        <AIOrb size="sm" />
        <div>
          <p className="text-sm font-medium text-white">Orbit AI</p>
          <p className="text-xs text-mist-400">Context: {TOPIC_LABEL[topic]}</p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <AnimatePresence mode="popLayout">
          {AI_SUGGESTIONS[topic].map((suggestion, i) => {
            const isApplied = applied === suggestion;
            return (
              <motion.button
                key={suggestion}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                whileHover={{ y: -2 }}
                onClick={() => handleApply(suggestion)}
                className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-2.5 text-left text-xs text-mist-300 transition-colors hover:border-violet-400/25 hover:bg-white/[0.07] hover:text-white"
              >
                {isApplied ? (
                  <Check className="h-3.5 w-3.5 shrink-0 text-cyan-300" />
                ) : (
                  <Sparkles className="h-3.5 w-3.5 shrink-0 text-violet-300" />
                )}
                {isApplied ? "Applied" : suggestion}
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="mt-auto rounded-2xl border border-white/[0.06] bg-white/[0.03] p-3">
        <p className="text-[11px] text-mist-500">
          Suggestions are mock previews for this sprint — Orbit isn&rsquo;t connected to a live model yet.
        </p>
      </div>
    </GlassSurface>
  );
}
