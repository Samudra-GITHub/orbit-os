import type { PackingCategory, Trip, TripExpense } from "@/lib/constants/travel";

/** Days until a trip's start (negative once it's begun/passed). */
export function daysUntilTrip(trip: Trip, now = new Date()) {
  const diff = new Date(trip.startDate).getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

/** The soonest trip that hasn't started yet — the "featured" trip the
 *  Dashboard builds its hero, weather preview, and packing summary
 *  around. Falls back to the first trip if every trip has passed. */
export function getFeaturedTrip(trips: Trip[], now = new Date()): Trip {
  const upcoming = trips
    .filter((t) => daysUntilTrip(t, now) >= 0)
    .sort((a, b) => daysUntilTrip(a, now) - daysUntilTrip(b, now));
  return upcoming[0] ?? trips[0];
}

export interface TripBudgetSummary {
  budget: number;
  spent: number;
  remaining: number;
  spentPct: number;
}

export function computeTripBudgetSummary(trip: Trip, expenses: TripExpense[]): TripBudgetSummary {
  const spent = expenses.filter((e) => e.tripId === trip.id).reduce((sum, e) => sum + e.amount, 0);
  return {
    budget: trip.budget,
    spent,
    remaining: trip.budget - spent,
    spentPct: trip.budget > 0 ? Math.min(100, (spent / trip.budget) * 100) : 0,
  };
}

export interface ExpenseCategoryTotal {
  category: TripExpense["category"];
  total: number;
}

export function computeExpenseBreakdown(tripId: string, expenses: TripExpense[]): ExpenseCategoryTotal[] {
  const totals = new Map<TripExpense["category"], number>();
  for (const e of expenses) {
    if (e.tripId !== tripId) continue;
    totals.set(e.category, (totals.get(e.category) ?? 0) + e.amount);
  }
  return Array.from(totals.entries()).map(([category, total]) => ({ category, total }));
}

export interface DailySpendPoint {
  date: string;
  amount: number;
}

/** One point per day an expense was logged for this trip — feeds the
 *  Budget page's daily spending bars. */
export function computeTripDailySpending(tripId: string, expenses: TripExpense[]): DailySpendPoint[] {
  const totals = new Map<string, number>();
  for (const e of expenses) {
    if (e.tripId !== tripId) continue;
    totals.set(e.date, (totals.get(e.date) ?? 0) + e.amount);
  }
  return Array.from(totals.entries())
    .map(([date, amount]) => ({ date, amount }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

export interface PackingProgress {
  totalItems: number;
  packedItems: number;
  pct: number;
}

export function computePackingProgress(categories: PackingCategory[]): PackingProgress {
  const totalItems = categories.reduce((sum, c) => sum + c.items.length, 0);
  const packedItems = categories.reduce((sum, c) => sum + c.items.filter((i) => i.packed).length, 0);
  return { totalItems, packedItems, pct: totalItems > 0 ? (packedItems / totalItems) * 100 : 0 };
}
