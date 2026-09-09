// Explicit "en-IN" locale (never `undefined`) — Node's default locale and
// the browser's can differ, and an implicit locale here would produce a
// server/client text mismatch on hydration. Same fix already applied to
// `lib/skycast/format.ts`.
export function formatINR(amount: number, options?: Intl.NumberFormatOptions) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
    ...options,
  }).format(amount);
}

export function formatCompactINR(amount: number) {
  if (Math.abs(amount) >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
  if (Math.abs(amount) >= 1000) return `₹${(amount / 1000).toFixed(1)}K`;
  return formatINR(amount);
}
