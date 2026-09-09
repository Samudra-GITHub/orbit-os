"use client";

import type { ReactNode } from "react";
import { motion, type HTMLMotionProps, type Transition } from "framer-motion";
import { springs } from "@/lib/motion/springs";

interface SharedMorphProps extends Omit<HTMLMotionProps<"div">, "ref" | "children"> {
  /** The shared `layoutId` two elements need in common to morph between
   *  each other. */
  id: string;
  children?: ReactNode;
  transition?: Transition;
}

/**
 * A `layoutId` shared-element wrapper — for morphing one piece of UI into
 * another WITHIN a single mounted page (e.g. the landing page's
 * Notes/Projects/Files panel swapping content, or a tab indicator sliding
 * between tabs).
 *
 * Do NOT pair a `layoutId` across two different Next.js routes. An
 * earlier attempt at exactly that (a dashboard widget morphing into its
 * own full page) broke navigation outright: the wrapper carrying the
 * shared id was keyed above Next's routing boundary, so the destination
 * page mounted on a fresh fiber disconnected from the one Next's Suspense
 * streaming was resolving into — `/weather`'s async data fetch would
 * "land" on a fiber that no longer existed, and the page hung on its
 * loading skeleton forever (only via client-side Link navigation; a hard
 * reload was fine, which is what made it easy to miss in testing). The
 * fix was `router.push()` on a plain button instead of a `layoutId`
 * bridging the two routes. If you need a "morph into a real page" effect,
 * reach for `PageTransition` instead, not this.
 */
export function SharedMorph({ id, transition, className, children, ...props }: SharedMorphProps) {
  return (
    <motion.div layoutId={id} transition={transition ?? springs.default} className={className} {...props}>
      {children}
    </motion.div>
  );
}
