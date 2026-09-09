"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import { Search, Sparkles, Clock } from "lucide-react";
import { GlassSurface } from "@/components/ui/GlassSurface";

const TYPED_QUERY = "plan my day";
const SUGGESTIONS = ["Plan my day", "Summarize inbox", "Start a focus session"];

/** A scripted demo of the real Command Center: Ctrl+K "opens" the panel,
 *  a query types itself out character by character, then suggestions
 *  stagger in — all auto-played once the section scrolls into view. */
export function CommandShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [typed, setTyped] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;

    if (reduceMotion) {
      setOpen(true);
      setTyped(TYPED_QUERY);
      setShowSuggestions(true);
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setOpen(true), 400));

    let i = 0;
    function typeNext() {
      i += 1;
      setTyped(TYPED_QUERY.slice(0, i));
      if (i < TYPED_QUERY.length) {
        timers.push(setTimeout(typeNext, 60));
      } else {
        timers.push(setTimeout(() => setShowSuggestions(true), 300));
      }
    }
    timers.push(setTimeout(typeNext, 1000));

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
        <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">Everything, one shortcut away</h2>
        <p className="mt-2 max-w-md text-sm text-mist-400">
          Press <kbd className="rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 text-xs">Ctrl K</kbd> anywhere in
          Orbit to search, act, or ask.
        </p>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="w-full max-w-md"
          >
            <GlassSurface intensity="overlay" interactive={false} className="overflow-hidden rounded-[36px]">
              <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
                <Search className="h-4 w-4 shrink-0 text-mist-400" />
                <span className="flex-1 text-sm text-white">
                  {typed}
                  <motion.span
                    animate={reduceMotion ? { opacity: 1 } : { opacity: [1, 0, 1] }}
                    transition={reduceMotion ? undefined : { duration: 0.8, repeat: Infinity }}
                    className="ml-0.5 inline-block h-4 w-[2px] bg-cyan-300 align-middle"
                  />
                </span>
                <kbd className="hidden shrink-0 rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] text-mist-400 sm:block">
                  ctrl K
                </kbd>
              </div>

              <div className="p-3">
                {showSuggestions && (
                  <motion.ul initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}>
                    {SUGGESTIONS.map((s, i) => (
                      <motion.li
                        key={s}
                        variants={{ hidden: { opacity: 0, y: 6 }, show: { opacity: 1, y: 0 } }}
                        transition={{ duration: 0.25 }}
                      >
                        <div
                          className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm ${
                            i === 0 ? "bg-white/10 text-white" : "text-mist-300"
                          }`}
                        >
                          {i === 0 ? (
                            <Sparkles className="h-3.5 w-3.5 shrink-0 text-violet-300" />
                          ) : (
                            <Clock className="h-3.5 w-3.5 shrink-0 text-mist-400" />
                          )}
                          {s}
                        </div>
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </div>
            </GlassSurface>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
