"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Sparkles, CalendarClock } from "lucide-react";
import { GlassSurface } from "@/components/ui/GlassSurface";
import { AIOrb } from "@/components/motion/AIOrb";

const QUESTION = "What does my day look like?";
const ANSWER = "You have 4 events today, with a clear two-hour block this afternoon for deep work.";

/** A scripted, auto-playing conversation (not real input) that plays once
 *  when scrolled into view: the question appears, then the reply streams
 *  in word-by-word, then a generated calendar widget fades in — the same
 *  beat as the real AI Workspace's mock streaming, replayed here for
 *  storytelling rather than interaction. */
export function AIShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduceMotion = useReducedMotion();
  const [reply, setReply] = useState("");
  const [showWidget, setShowWidget] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;

    if (reduceMotion) {
      setReply(ANSWER);
      setShowWidget(true);
      return;
    }

    const words = ANSWER.split(" ");
    let i = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];

    function revealNext() {
      i += 1;
      setReply(words.slice(0, i).join(" "));
      if (i < words.length) {
        timers.push(setTimeout(revealNext, 90));
      } else {
        timers.push(setTimeout(() => setShowWidget(true), 300));
      }
    }
    timers.push(setTimeout(revealNext, 800));

    return () => timers.forEach(clearTimeout);
  }, [inView, reduceMotion]);

  return (
    <section ref={ref} className="relative flex min-h-[100dvh] flex-col items-center justify-center px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className="mb-10 text-center"
      >
        <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">Ask Orbit anything</h2>
        <p className="mt-2 max-w-md text-sm text-mist-400">
          Orbit answers in plain language — and generates the widget to back it up.
        </p>
      </motion.div>

      <div className="w-full max-w-md space-y-4">
        <div className="flex items-start justify-end gap-3">
          <div className="max-w-[75%] rounded-2xl bg-violet-500/20 px-4 py-2.5 text-sm text-white">{QUESTION}</div>
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-semibold text-white">
            S
          </div>
        </div>

        <div className="flex items-start gap-3">
          <AIOrb size="sm" />
          <div className="flex max-w-[80%] flex-col gap-2">
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.05] px-4 py-2.5 text-sm text-white/90">
              {reply || <Sparkles className="h-3.5 w-3.5 animate-pulse-glow text-violet-300" />}
            </div>
            {showWidget && (
              <motion.div initial={{ opacity: 0, y: 10, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.35 }}>
                <GlassSurface intensity="subtle" className="flex max-w-xs flex-col gap-2 rounded-3xl p-4">
                  <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-mist-500">
                    <CalendarClock className="h-3.5 w-3.5 text-violet-300" />
                    Calendar
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="font-mono text-xs text-mist-400">11:30</span>
                    <span className="text-white">Focus block · Orbit v2</span>
                  </div>
                </GlassSurface>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
