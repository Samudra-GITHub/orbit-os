"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ConversationSidebar } from "@/components/ai/ConversationSidebar";
import { ContextPanel } from "@/components/ai/ContextPanel";

interface AIWorkspaceProps {
  children: ReactNode;
}

/** The three-panel shell every AI screen shares: conversation history
 *  (left), the routed canvas (center), and live context (right). */
export function AIWorkspace({ children }: AIWorkspaceProps) {
  const pathname = usePathname();

  return (
    <div className="flex h-[78vh] min-h-[560px] gap-5">
      <ConversationSidebar />

      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="min-w-0 flex-1 overflow-hidden"
      >
        {children}
      </motion.div>

      <ContextPanel />
    </div>
  );
}
