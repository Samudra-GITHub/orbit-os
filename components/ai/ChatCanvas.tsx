"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ArrowUp, Mic, Sparkles } from "lucide-react";
import { MessageBubble } from "@/components/ai/MessageBubble";
import { TypingIndicator } from "@/components/ai/TypingIndicator";
import { SuggestionChips } from "@/components/ai/SuggestionChips";
import { AIOrb } from "@/components/motion/AIOrb";
import { getMockResponse, SUGGESTIONS, type ChatMessage } from "@/lib/constants/ai";

interface ChatCanvasProps {
  initialMessages?: ChatMessage[];
}

let idCounter = 0;
function nextId() {
  idCounter += 1;
  return `msg-${idCounter}`;
}

/**
 * Owns the whole mock conversation: sending a message fakes a "thinking"
 * pause, then reveals the canned reply word-by-word (a setTimeout chain,
 * not a real stream) before attaching a widget if the reply calls for one.
 */
export function ChatCanvas({ initialMessages = [] }: ChatCanvasProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [streamingId, setStreamingId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timers = useRef<Array<ReturnType<typeof setTimeout>>>([]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, streamingId]);

  useEffect(() => {
    const activeTimers = timers.current;
    return () => {
      activeTimers.forEach(clearTimeout);
    };
  }, []);

  function streamAssistantReply(userText: string) {
    setThinking(true);
    const thinkDelay = setTimeout(() => {
      setThinking(false);
      const { content, widget } = getMockResponse(userText);
      const id = nextId();
      setMessages((prev) => [...prev, { id, role: "assistant", content: "", widget }]);
      setStreamingId(id);

      const words = content.split(" ");
      let wordIndex = 0;
      function revealNext() {
        wordIndex += 1;
        const partial = words.slice(0, wordIndex).join(" ");
        setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, content: partial } : m)));
        if (wordIndex < words.length) {
          const t = setTimeout(revealNext, 45 + Math.random() * 45);
          timers.current.push(t);
        } else {
          setStreamingId(null);
        }
      }
      revealNext();
    }, 500);
    timers.current.push(thinkDelay);
  }

  function handleSend(text?: string) {
    const value = (text ?? input).trim();
    if (!value || thinking || streamingId) return;
    setMessages((prev) => [...prev, { id: nextId(), role: "user", content: value }]);
    setInput("");
    streamAssistantReply(value);
  }

  const isEmpty = messages.length === 0;
  const busy = thinking || !!streamingId;

  return (
    <div className="flex h-full flex-col">
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-2 py-4">
        {isEmpty ? (
          <div className="flex h-full flex-col items-center justify-center gap-6 px-4 text-center">
            <AIOrb size="lg" />
            <div>
              <h2 className="font-display text-2xl font-semibold text-white">Ask Orbit anything</h2>
              <p className="mt-1 text-sm text-mist-400">I can check your day, spending, focus time, and more.</p>
            </div>
            <SuggestionChips suggestions={SUGGESTIONS} onSelect={handleSend} />
          </div>
        ) : (
          <div className="flex flex-col gap-5 px-2">
            <AnimatePresence initial={false}>
              {messages.map((m) => (
                <MessageBubble key={m.id} message={m} isStreaming={m.id === streamingId} />
              ))}
            </AnimatePresence>
            {thinking && (
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-400">
                  <Sparkles className="h-4 w-4 text-white" strokeWidth={2} />
                </div>
                <TypingIndicator />
              </div>
            )}
          </div>
        )}
      </div>

      <div className="border-t border-white/10 p-4">
        {!isEmpty && (
          <div className="mb-3">
            <SuggestionChips suggestions={SUGGESTIONS.slice(0, 3)} onSelect={handleSend} />
          </div>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 focus-within:border-violet-400/40"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Message Orbit..."
            aria-label="Message Orbit"
            className="w-full bg-transparent text-sm text-white placeholder:text-mist-500 focus:outline-none"
          />
          <button
            type="button"
            aria-label="Voice input"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-mist-400 transition-colors hover:bg-white/5 hover:text-white"
          >
            <Mic className="h-4 w-4" />
          </button>
          <button
            type="submit"
            aria-label="Send message"
            disabled={!input.trim() || busy}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-ink-900 transition-opacity disabled:opacity-30"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
