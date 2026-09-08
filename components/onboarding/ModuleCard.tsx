"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { GlassSurface } from "@/components/ui/GlassSurface";

interface ModuleCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

export function ModuleCard({ icon: Icon, title, description, index }: ModuleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 * index, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.06 }}
      className="shrink-0 snap-start"
    >
      <GlassSurface intensity="default" className="flex h-44 w-48 flex-col justify-between p-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/30 to-cyan-400/30">
          <Icon className="h-5 w-5 text-cyan-300" strokeWidth={1.75} />
        </div>
        <div>
          <p className="font-medium text-white">{title}</p>
          <p className="mt-1 text-xs text-mist-400">{description}</p>
        </div>
      </GlassSurface>
    </motion.div>
  );
}
