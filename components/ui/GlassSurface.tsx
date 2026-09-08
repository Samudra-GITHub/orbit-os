"use client";

import { forwardRef, useRef, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import { motion, useReducedMotion, type HTMLMotionProps, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { spring } from "@/styles/motion";

export type GlassIntensity = "subtle" | "default" | "raised" | "overlay";

interface GlassSurfaceProps extends Omit<HTMLMotionProps<"div">, "ref" | "children"> {
  intensity?: GlassIntensity;
  /** Spring hover lift + ambient purple/cyan glow. */
  interactive?: boolean;
  /** Play the fade-float-in mount animation (off by default — standalone
   *  usages like the command palette panel provide their own entrance). */
  animateEntrance?: boolean;
  /** Stagger index, used when `animateEntrance` is on. */
  index?: number;
  children?: ReactNode;
}

// Background opacity ~16%, backdrop blur 32-48px per the Liquid Spatial
// Material spec, tuned slightly per intensity for visual hierarchy.
const intensityStyles: Record<GlassIntensity, string> = {
  subtle:
    "border-white/[0.08] bg-white/[0.08] backdrop-blur-[28px] hover:backdrop-blur-[32px] backdrop-saturate-150",
  default:
    "border-white/10 bg-white/[0.16] shadow-glass backdrop-blur-[32px] hover:backdrop-blur-[40px] backdrop-saturate-150 hover:border-white/20",
  raised:
    "border-white/[0.16] bg-white/[0.18] shadow-glass-lg backdrop-blur-[40px] hover:backdrop-blur-[48px] backdrop-saturate-150 hover:border-white/25",
  overlay:
    "border-white/[0.14] bg-white/[0.14] shadow-glass-lg backdrop-blur-[48px] backdrop-saturate-150",
};

export const glassEntrance: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { ...spring.default, delay: 0.08 * i },
  }),
};

export const GlassSurface = forwardRef<HTMLDivElement, GlassSurfaceProps>(function GlassSurface(
  {
    intensity = "default",
    interactive = true,
    animateEntrance = false,
    index = 0,
    className,
    children,
    variants,
    initial,
    animate,
    custom,
    onPointerMove,
    onPointerLeave,
    ...props
  },
  forwardedRef
) {
  const reduceMotion = useReducedMotion();
  const localRef = useRef<HTMLDivElement>(null);

  function setRefs(node: HTMLDivElement | null) {
    localRef.current = node;
    if (typeof forwardedRef === "function") forwardedRef(node);
    else if (forwardedRef) forwardedRef.current = node;
  }

  // Cursor Spotlight: every glass surface tracks the pointer locally via
  // CSS custom properties (no state, no heavy libraries) and fades a soft
  // radial light toward it, blended with the material.
  function handlePointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    const el = localRef.current;
    if (el) {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
      el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
      el.style.setProperty("--spot-opacity", "1");
    }
    onPointerMove?.(e);
  }

  function handlePointerLeave(e: ReactPointerEvent<HTMLDivElement>) {
    localRef.current?.style.setProperty("--spot-opacity", "0");
    onPointerLeave?.(e);
  }

  return (
    <motion.div
      ref={setRefs}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      custom={custom ?? index}
      variants={animateEntrance ? (variants ?? glassEntrance) : variants}
      initial={initial ?? (animateEntrance && !reduceMotion ? "hidden" : false)}
      animate={animate ?? (animateEntrance ? "show" : false)}
      whileHover={
        interactive
          ? reduceMotion
            ? undefined
            : {
                y: -6,
                scale: 1.015,
                boxShadow: "var(--shadow-glass-lg), var(--shadow-glow-accent), var(--shadow-glow-cyan)",
                transition: { ...spring.default },
              }
          : undefined
      }
      className={cn(
        "group/glass relative overflow-hidden rounded-3xl border transition-[backdrop-filter,border-color,box-shadow]",
        intensityStyles[intensity],
        interactive && "cursor-default",
        className
      )}
      {...props}
    >
      {/* inner top highlight — specular edge */}
      <span aria-hidden className="glass-top-highlight pointer-events-none absolute inset-x-0 top-0 h-px" />

      {/* translucent gradient overlay */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-black/10"
      />

      {/* subtle diagonal refraction sheen */}
      <span
        aria-hidden
        className="glass-refraction pointer-events-none absolute -inset-x-6 -top-8 h-20 rotate-[6deg] opacity-60 blur-xl"
      />

      {/* 2% noise overlay */}
      <span aria-hidden className="bg-cosmic-noise pointer-events-none absolute inset-0 opacity-[0.02] mix-blend-overlay" />

      {/* cursor spotlight — follows the pointer locally on this surface */}
      <span
        aria-hidden
        className="glass-spotlight pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
        style={{ opacity: "var(--spot-opacity, 0)" }}
      />

      {/* animated ambient glow on hover */}
      {interactive && (
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-1 -z-10 rounded-[inherit] bg-gradient-to-br from-violet-500/25 via-transparent to-cyan-400/25 opacity-0 blur-xl transition-opacity duration-500 group-hover/glass:opacity-100"
        />
      )}

      <div className="relative">{children}</div>
    </motion.div>
  );
});
