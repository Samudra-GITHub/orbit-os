import type { Subscription, Transaction, Wallet } from "@/lib/constants/finance";

function isSpend(t: Transaction) {
  return t.kind === "debit" && t.category !== "transfer" && t.status !== "failed";
}

export interface DailySpendPoint {
  day: number;
  amount: number;
}

/** Daily spend totals for a given month, day 1 through today (or month
 *  end) — feeds `SpendingChart`'s area chart. Derived from `TRANSACTIONS`
 *  rather than a separate series, so the chart and the transaction list
 *  can never drift out of sync. */
export function computeDailySpending(transactions: Transaction[], year: number, month: number, throughDay: number): DailySpendPoint[] {
  const totals = new Array(throughDay).fill(0);
  for (const t of transactions) {
    if (!isSpend(t)) continue;
    const d = new Date(t.date);
    if (d.getFullYear() === year && d.getMonth() === month) {
      const day = d.getDate();
      if (day <= throughDay) totals[day - 1] += t.amount;
    }
  }
  return totals.map((amount, i) => ({ day: i + 1, amount }));
}

export interface HeatmapCell {
  date: string;
  amount: number;
}

/** One cell per day for the last `weeks` weeks — feeds `SpendingHeatmap`. */
export function computeHeatmapData(transactions: Transaction[], weeks = 12, now = new Date()): HeatmapCell[] {
  const totalsByDate = new Map<string, number>();
  for (const t of transactions) {
    if (!isSpend(t)) continue;
    const key = t.date.slice(0, 10);
    totalsByDate.set(key, (totalsByDate.get(key) ?? 0) + t.amount);
  }

  const days = weeks * 7;
  const cells: HeatmapCell[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    cells.push({ date: key, amount: totalsByDate.get(key) ?? 0 });
  }
  return cells;
}

export interface QuickStats {
  spendingToday: number;
  spendingThisWeek: number;
  savingsRate: number;
  nextSubscription: Subscription | null;
}

export function computeQuickStats(transactions: Transaction[], subscriptions: Subscription[], wallet: Wallet, now = new Date()): QuickStats {
  const todayKey = now.toISOString().slice(0, 10);
  const weekAgo = new Date(now);
  weekAgo.setDate(weekAgo.getDate() - 6);

  const spendingToday = transactions
    .filter((t) => isSpend(t) && t.date.slice(0, 10) === todayKey)
    .reduce((sum, t) => sum + t.amount, 0);

  const spendingThisWeek = transactions
    .filter((t) => isSpend(t) && new Date(t.date) >= weekAgo)
    .reduce((sum, t) => sum + t.amount, 0);

  const savingsRate = wallet.incomeThisMonth > 0 ? Math.round((wallet.savings / wallet.incomeThisMonth) * 100) : 0;

  const upcoming = subscriptions
    .filter((s) => s.status === "active" && new Date(s.renewsOn) >= now)
    .sort((a, b) => new Date(a.renewsOn).getTime() - new Date(b.renewsOn).getTime());

  return { spendingToday, spendingThisWeek, savingsRate, nextSubscription: upcoming[0] ?? null };
}

/** Days until a subscription renews (or has renewed), rounded down. */
export function daysUntil(dateStr: string, now = new Date()) {
  const diff = new Date(dateStr).getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}
