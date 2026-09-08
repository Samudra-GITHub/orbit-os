import type { Variants } from "framer-motion";

export const springTransition = {
  type: "spring" as const,
  stiffness: 260,
  damping: 22,
  mass: 0.9,
};

export const fadeFloatIn: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      ...springTransition,
      delay: 0.06 * i,
    },
  }),
};

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const hoverElevate = {
  y: -6,
  scale: 1.015,
  transition: springTransition,
};
