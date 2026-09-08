/**
 * Spacing scale + layout constants shared across the app shell and widgets.
 */

export const spacing = {
  0: "0px",
  px: "1px",
  0.5: "0.125rem",
  1: "0.25rem",
  1.5: "0.375rem",
  2: "0.5rem",
  2.5: "0.625rem",
  3: "0.75rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  8: "2rem",
  10: "2.5rem",
  12: "3rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
} as const;

export const layout = {
  sidebarWidth: "72px",
  sidebarInset: "1rem",
  topbarHeight: "64px",
  contentMaxWidth: "80rem",
  gutter: "1.5rem",
} as const;

export type Spacing = typeof spacing;
export type Layout = typeof layout;
