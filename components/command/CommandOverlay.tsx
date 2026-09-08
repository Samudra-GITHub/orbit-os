"use client";

import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface CommandOverlayProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

/**
 * Fullscreen backdrop: dims + blurs the app behind the command panel, and
 * closes on an outside click. The panel itself handles its own entrance.
 */
export function CommandOverlay({ open, onClose, children }: CommandOverlayProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
          animate={{ opacity: 1, backdropFilter: "blur(6px)" }}
          exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 pt-[14vh]"
          onClick={onClose}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
