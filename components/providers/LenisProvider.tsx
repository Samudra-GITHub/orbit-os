"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "framer-motion";

interface LenisProviderProps {
  children: ReactNode;
}

/**
 * Smooth scroll, scoped to the landing page only (not the whole app) — the
 * dashboard/workspace/AI screens have their own internal scroll containers
 * and drag-and-drop interactions (Kanban) that don't need or want this.
 * Lenis smooths the real document scroll position, so framer-motion's
 * `useScroll` keeps working unmodified in every landing section.
 */
export function LenisProvider({ children }: LenisProviderProps) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [reduceMotion]);

  return <>{children}</>;
}
