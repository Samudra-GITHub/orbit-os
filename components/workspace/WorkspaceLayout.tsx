"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { pageFade } from "@/lib/motion/variants";
import { usePathname } from "next/navigation";
import { SpacesSidebar } from "@/components/workspace/SpacesSidebar";
import { AIContextPanel } from "@/components/workspace/AIContextPanel";

interface WorkspaceLayoutProps {
  children: ReactNode;
}

/**
 * The three-panel shell every workspace screen shares: Spaces (left),
 * the routed page content (center), and AI Context (right). Center
 * content fades between routes via the pathname-keyed AnimatePresence-free
 * layout transition below (a simple key-based remount fade is enough here
 * since each workspace route is a small, self-contained view).
 */
export function WorkspaceLayout({ children }: WorkspaceLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="flex h-[78vh] min-h-[560px] gap-5">
      <SpacesSidebar />

      <motion.div
        key={pathname}
        {...pageFade}
        className="min-w-0 flex-1 overflow-hidden"
      >
        {children}
      </motion.div>

      <AIContextPanel />
    </div>
  );
}
