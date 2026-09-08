"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { motion, useAnimationControls, useReducedMotion } from "framer-motion";

interface PageTransitionProps {
  children: ReactNode;
}

/**
 * Fades/lifts content in when moving between top-level sections (dashboard
 * / weather / workspace / ai). Keyed animation deliberately avoided: an
 * earlier version used `key={section}` on a wrapper to get a true
 * AnimatePresence cross-fade (fade out old + fade in new), but that key
 * sits *above* Next's own routing boundary — remounting it discards the
 * fiber Next's Suspense streaming was resolving into, so /weather's async
 * Server Component fetch would land on a fiber that no longer existed and
 * the page would hang on its loading skeleton forever on client-side nav
 * (hard navigation was fine; only Link-driven transitions broke).
 *
 * This version never remounts anything — it just re-triggers an imperative
 * enter animation via animation controls whenever the top-level section
 * changes, leaving React's normal reconciliation (and Next's Suspense
 * handling) completely untouched. Trade-off: no exit animation for the
 * outgoing page (that requires keeping its old DOM around, which is the
 * same remount-adjacent territory that caused the bug) — enter only.
 */
export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const controls = useAnimationControls();
  const sectionKey = pathname?.split("/")[1] || "home";
  const prevSection = useRef(sectionKey);

  useEffect(() => {
    if (prevSection.current === sectionKey) return;
    prevSection.current = sectionKey;
    if (reduceMotion) return;
    controls.set({ opacity: 0, y: 12, filter: "blur(8px)" });
    controls.start({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 260, damping: 26, mass: 0.9 },
    });
  }, [sectionKey, controls, reduceMotion]);

  return <motion.div animate={controls}>{children}</motion.div>;
}
