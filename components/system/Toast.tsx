"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from "lucide-react";
import { GlassSurface } from "@/components/ui/GlassSurface";
import { cn } from "@/lib/utils";

export type ToastVariant = "success" | "warning" | "error" | "info";

export interface ToastProps {
  title: string;
  description?: string;
  variant: ToastVariant;
  onDismiss: () => void;
}

const VARIANT_META: Record<ToastVariant, { icon: typeof Info; className: string }> = {
  success: { icon: CheckCircle2, className: "text-cyan-300" },
  warning: { icon: AlertTriangle, className: "text-amber-300" },
  error: { icon: XCircle, className: "text-rose-300" },
  info: { icon: Info, className: "text-violet-300" },
};

export function Toast({ title, description, variant, onDismiss }: ToastProps) {
  const meta = VARIANT_META[variant];
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      layout
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, filter: "blur(4px)", scale: 0.97 }}
      transition={{ type: "spring", stiffness: 340, damping: 30 }}
      className="pointer-events-auto w-full max-w-sm"
    >
      <GlassSurface intensity="overlay" interactive={false} className="rounded-3xl p-4">
        <div className="flex items-start gap-3">
          <meta.icon className={cn("mt-0.5 h-4 w-4 shrink-0", meta.className)} strokeWidth={2} />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-white">{title}</p>
            {description && <p className="mt-0.5 text-xs text-mist-400">{description}</p>}
          </div>
          <button
            onClick={onDismiss}
            aria-label="Dismiss notification"
            className="shrink-0 rounded-md text-mist-500 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </GlassSurface>
    </motion.div>
  );
}
