"use client";

import { forwardRef, useRef, type CSSProperties, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { springs } from "@/lib/motion/springs";
import { fadeFloatIn } from "@/lib/motion/variants";
import { updateSpotlight, clearSpotlight, CursorSpotlight } from "@/components/effects/CursorSpotlight";

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

// Border/shadow per intensity — background and blur are handled separately
// below via CSS custom properties, so Settings > Appearance's Glass
// Intensity slider can scale them globally without touching this file again.
const intensityStyles: Record<GlassIntensity, string> = {
  subtle: "border-white/[0.08]",
  default: "border-white/10 shadow-glass hover:border-white/20",
  raised: "border-white/[0.16] shadow-glass-lg hover:border-white/25",
  overlay: "border-white/[0.14] shadow-glass-lg",
};

// Background opacity ~16%, backdrop blur 32-48px per the Liquid Spatial
// Material spec, tuned slightly per intensity for visual hierarchy. These
// feed `.group\/glass` in globals.css, which multiplies them by the global
// `--glass-intensity` (and `--glass-contrast-boost`) — at the defaults
// (1, 1) this renders pixel-identical to the old static Tailwind classes.
const intensityVars: Record<GlassIntensity, CSSProperties> = {
  subtle: { "--glass-bg-base": "8%", "--glass-blur-base": "28px", "--glass-blur-hover-base": "32px" } as CSSProperties,
  default: { "--glass-bg-base": "16%", "--glass-blur-base": "32px", "--glass-blur-hover-base": "40px" } as CSSProperties,
  raised: { "--glass-bg-base": "18%", "--glass-blur-base": "40px", "--glass-blur-hover-base": "48px" } as CSSProperties,
  overlay: { "--glass-bg-base": "14%", "--glass-blur-base": "48px", "--glass-blur-hover-base": "48px" } as CSSProperties,
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
    style,
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

  function handlePointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    if (localRef.current) updateSpotlight(localRef.current, e.clientX, e.clientY);
    onPointerMove?.(e);
  }

  function handlePointerLeave(e: ReactPointerEvent<HTMLDivElement>) {
    if (localRef.current) clearSpotlight(localRef.current);
    onPointerLeave?.(e);
  }

  return (
    <motion.div
      ref={setRefs}
      onPointerMove={interactive ? handlePointerMove : onPointerMove}
      onPointerLeave={interactive ? handlePointerLeave : onPointerLeave}
      custom={custom ?? index}
      variants={animateEntrance ? (variants ?? fadeFloatIn) : variants}
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
                transition: { ...springs.default },
              }
          : undefined
      }
      className={cn(
        "group/glass relative overflow-hidden rounded-3xl border transition-[backdrop-filter,background-color,border-color,box-shadow] duration-500",
        intensityStyles[intensity],
        interactive && "cursor-default",
        className
      )}
      style={{ ...intensityVars[intensity], ...style }}
      {...props}
    >
      {/* inner top highlight — specular edge */}
      <span aria-hidden className="glass-top-highlight pointer-events-none absolute inset-x-0 top-0 h-px" />

      {/* translucent gradient overlay */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-black/10"
      />

      {/* subtle diagonal refraction sheen + cursor spotlight — both are
          hover/interaction affordances, so non-interactive surfaces (nested
          preview widgets, sidebar rails with interactive={false}) skip the
          extra blur layer and pointer-tracking entirely. */}
      {interactive && (
        <span
          aria-hidden
          className="glass-refraction pointer-events-none absolute -inset-x-6 -top-8 h-20 rotate-[6deg] opacity-60 blur-xl"
        />
      )}

      {/* 2% noise overlay */}
      <span aria-hidden className="bg-cosmic-noise pointer-events-none absolute inset-0 opacity-[0.02] mix-blend-overlay" />

      {interactive && <CursorSpotlight />}

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
