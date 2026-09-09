"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

/** Manages the click-ripple burst state for one element. `trigger` takes
 *  the element's own bounding rect origin, so the ripple lands exactly
 *  where the pointer clicked. */
export function useGlassRipple() {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const seq = useRef(0);
  const reduceMotion = useReducedMotion();

  function trigger(el: HTMLElement, clientX: number, clientY: number) {
    if (reduceMotion) return;
    const rect = el.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.8;
    seq.current += 1;
    const id = seq.current;
    setRipples((prev) => [
      ...prev,
      { id, x: clientX - rect.left - size / 2, y: clientY - rect.top - size / 2, size },
    ]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 600);
  }

  return { ripples, trigger };
}

/** Renders the ripple burst — mount once inside the (overflow-hidden)
 *  element that calls `trigger`. */
export function GlassRipple({ ripples }: { ripples: Ripple[] }) {
  return (
    <AnimatePresence>
      {ripples.map((r) => (
        <motion.span
          key={r.id}
          aria-hidden
          initial={{ opacity: 0.5, scale: 0 }}
          animate={{ opacity: 0, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="pointer-events-none absolute rounded-full bg-white/40"
          style={{ left: r.x, top: r.y, width: r.size, height: r.size }}
        />
      ))}
    </AnimatePresence>
  );
}
