"use client";

/**
 * Per-surface cursor spotlight — the soft radial light that follows the
 * pointer across a GlassSurface. Plain DOM mutation via CSS custom
 * properties (no React state, no re-renders), so it's effectively free to
 * run on every pointermove. Exported as functions rather than a hook so
 * callers that already manage their own ref (like GlassSurface) can wire
 * these into their existing pointer handlers instead of fighting over a
 * second ref.
 */

export function updateSpotlight(el: HTMLElement, clientX: number, clientY: number) {
  const rect = el.getBoundingClientRect();
  el.style.setProperty("--spot-x", `${clientX - rect.left}px`);
  el.style.setProperty("--spot-y", `${clientY - rect.top}px`);
  el.style.setProperty("--spot-opacity", "1");
}

export function clearSpotlight(el: HTMLElement) {
  el.style.setProperty("--spot-opacity", "0");
}

/** The visual layer itself — render this inside any surface that calls
 *  `updateSpotlight`/`clearSpotlight` on pointer events. */
export function CursorSpotlight() {
  return (
    <span
      aria-hidden
      className="glass-spotlight pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
      style={{ opacity: "var(--spot-opacity, 0)" }}
    />
  );
}
