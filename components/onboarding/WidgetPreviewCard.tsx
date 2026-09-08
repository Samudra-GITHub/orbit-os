"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { GlassSurface } from "@/components/ui/GlassSurface";

interface WidgetPreviewCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  index: number;
}

export function WidgetPreviewCard({ icon: Icon, title, value, index }: WidgetPreviewCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.5 + index * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <GlassSurface intensity="subtle" className="flex flex-col items-center gap-2 p-4 text-center">
        <Icon className="h-5 w-5 text-cyan-300" strokeWidth={1.75} />
        <p className="text-xs font-medium text-white">{title}</p>
        <p className="text-[11px] text-mist-400">{value}</p>
      </GlassSurface>
    </motion.div>
  );
}
