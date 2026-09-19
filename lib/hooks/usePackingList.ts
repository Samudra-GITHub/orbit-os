"use client";

import { useEffect, useState } from "react";
import { PACKING_CATEGORIES, type PackingCategory } from "@/lib/constants/travel";

const STORAGE_KEY = "orbit-travel-packing";

/** The packing checklist — seeded from `PACKING_CATEGORIES`, then
 *  genuinely mutable (toggle/add/remove) and persisted locally, the same
 *  hydrate-then-persist pattern as `useFocusSessions`. */
export function usePackingList() {
  const [categories, setCategories] = useState<PackingCategory[]>(PACKING_CATEGORIES);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setCategories(JSON.parse(raw));
    } catch {
      // Corrupt or inaccessible storage — fall back to seed data silently.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
    } catch {
      // Storage full or unavailable — list still works for this session.
    }
  }, [categories, hydrated]);

  function toggleItem(categoryId: string, itemId: string) {
    setCategories((prev) =>
      prev.map((c) =>
        c.id !== categoryId
          ? c
          : { ...c, items: c.items.map((i) => (i.id === itemId ? { ...i, packed: !i.packed } : i)) }
      )
    );
  }

  function addItem(categoryId: string, label: string) {
    if (!label.trim()) return;
    setCategories((prev) =>
      prev.map((c) =>
        c.id !== categoryId
          ? c
          : { ...c, items: [...c.items, { id: `item-${Date.now()}`, label: label.trim(), packed: false }] }
      )
    );
  }

  function removeItem(categoryId: string, itemId: string) {
    setCategories((prev) =>
      prev.map((c) => (c.id !== categoryId ? c : { ...c, items: c.items.filter((i) => i.id !== itemId) }))
    );
  }

  return { categories, toggleItem, addItem, removeItem };
}
