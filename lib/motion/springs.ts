/**
 * Every spring physics preset Orbit uses. Spring-based only — per the
 * Design Bible, interactive elements never use a linear/ease-only
 * transition. Import these instead of writing `{ type: "spring", ... }`
 * inline so every card, button, and panel shares the same feel.
 */

export const springs = {
  /** Default entrance/hover spring — cards, panels, most UI motion. */
  default: { type: "spring", stiffness: 260, damping: 22, mass: 0.9 } as const,
  /** Quick, tight — active-state indicators, nav highlights. */
  snappy: { type: "spring", stiffness: 400, damping: 28, mass: 0.6 } as const,
  /** Soft, slow settle — large surfaces, page-level motion. */
  gentle: { type: "spring", stiffness: 180, damping: 24, mass: 1 } as const,
  /** Overlays and modals — command palette, notification panel. */
  overlay: { type: "spring", stiffness: 300, damping: 28, mass: 0.8 } as const,
  /** Magnetic button follow — needs to feel light and immediate. */
  magnetic: { stiffness: 300, damping: 20, mass: 0.5 } as const,
  /** The active-item highlight `layoutId` pill every sidebar/tab rail
   *  shares (desktop rail, mobile dock, Finance/Travel/Health/Settings/
   *  Workspace/AI sub-nav). Previously hand-rolled per file as
   *  `{ type: "spring", stiffness: 340, damping: 28 }` — import this
   *  instead so the seven copies stay in sync. */
  navActive: { type: "spring", stiffness: 340, damping: 28 } as const,
  /** Picker swatch selection (theme/accent/wallpaper/ambient-scene cards)
   *  — was hand-rolled as `{ stiffness: 420, damping: 24 }` in three
   *  separate Settings/Focus components. */
  picker: { type: "spring", stiffness: 420, damping: 24 } as const,
} as const;

/** Magnetic-hover pull strength (fraction of cursor offset the element
 *  follows), not a spring — kept alongside the springs since magnetic
 *  buttons are the main consumer of both. */
export const magneticStrength = {
  default: 0.3,
  strong: 0.5,
} as const;

export type SpringName = keyof typeof springs;
