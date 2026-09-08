"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * A subtle radial glow that follows the pointer across the content area.
 * Pure decoration — pointer-events-none, and skipped entirely when the
 * user prefers reduced motion.
 */
export function CursorSpotlight() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduceMotion) return;
    const el = ref.current;
    if (!el) return;

    function handleMove(e: PointerEvent) {
      el!.style.setProperty("--spotlight-x", `${e.clientX}px`);
      el!.style.setProperty("--spotlight-y", `${e.clientY}px`);
      el!.style.opacity = "1";
    }
    function handleLeave() {
      el!.style.opacity = "0";
    }

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerleave", handleLeave);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerleave", handleLeave);
    };
  }, [reduceMotion]);

  if (reduceMotion) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-10 opacity-0 transition-opacity duration-500"
      style={{
        background:
          "radial-gradient(480px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), color-mix(in oklab, var(--color-violet-500) 10%, transparent), transparent 70%)",
      }}
    />
  );
}
