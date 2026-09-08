"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { WidgetMessage } from "@/components/ai/WidgetMessage";
import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/lib/constants/ai";

interface MessageBubbleProps {
  message: ChatMessage;
  isStreaming?: boolean;
}

export function MessageBubble({ message, isStreaming }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={cn("flex items-start gap-3", isUser && "flex-row-reverse")}
    >
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
          isUser ? "bg-white/10 text-white" : "bg-gradient-to-br from-violet-500 to-cyan-400 text-white"
        )}
      >
        {isUser ? (
          <span className="text-xs font-semibold">S</span>
        ) : (
          <Sparkles className="h-4 w-4" strokeWidth={2} />
        )}
      </div>

      <div className={cn("flex max-w-[75%] flex-col gap-2", isUser && "items-end")}>
        <div
          className={cn(
            "rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
            isUser ? "bg-violet-500/20 text-white" : "border border-white/[0.08] bg-white/[0.05] text-white/90"
          )}
        >
          {message.content}
          {isStreaming && (
            <span className="ml-0.5 inline-block h-3.5 w-[2px] animate-pulse-glow bg-cyan-300 align-middle" />
          )}
        </div>
        {message.widget && !isStreaming && <WidgetMessage type={message.widget} />}
      </div>
    </motion.div>
  );
}
