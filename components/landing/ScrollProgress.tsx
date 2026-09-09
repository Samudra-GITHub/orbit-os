"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** A slim gradient bar fixed to the top of the viewport, filling with
 *  overall page scroll progress. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, mass: 0.3 });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-violet-500 via-violet-400 to-cyan-400"
    />
  );
}
