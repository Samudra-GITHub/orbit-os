"use client";

import { motion, useTransform, useReducedMotion, type MotionValue } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { GlassSurface } from "@/components/ui/GlassSurface";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  depth: number;
  index: number;
  mx: MotionValue<number>;
  my: MotionValue<number>;
}

/**
 * Three nested layers, each owning one concern, so they don't fight over
 * the same transform: entrance fade (outer), cursor parallax (middle,
 * driven by shared mx/my motion values), independent idle float (inner,
 * phase-offset per card index so they never move in sync).
 */
export function FeatureCard({ icon: Icon, title, description, depth, index, mx, my }: FeatureCardProps) {
  const reduceMotion = useReducedMotion();
  const parallaxX = useTransform(mx, (v) => v * depth);
  const parallaxY = useTransform(my, (v) => v * depth);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 * index, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div style={{ x: parallaxX, y: parallaxY }}>
        <motion.div
          animate={reduceMotion ? undefined : { y: [0, -7, 0] }}
          transition={
            reduceMotion
              ? undefined
              : { duration: 4.5 + index * 0.6, delay: index * 0.4, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <GlassSurface intensity="default" className="flex w-56 flex-col items-center gap-3 p-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/30 to-cyan-400/30">
              <Icon className="h-6 w-6 text-cyan-300" strokeWidth={1.75} />
            </div>
            <p className="font-medium text-white">{title}</p>
            <p className="text-xs text-mist-400">{description}</p>
          </GlassSurface>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
