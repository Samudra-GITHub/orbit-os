"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { COMMANDS, RECENT_COMMANDS, type CommandDefinition } from "@/lib/constants/commands";

/**
 * Subsequence fuzzy match: every character of `query` must appear in
 * order somewhere in `text`. Consecutive matches score higher, so tighter
 * matches ("foc" in "Focus Session") outrank scattered ones.
 */
function fuzzyScore(query: string, text: string): number | null {
  const q = query.toLowerCase();
  const t = text.toLowerCase();
  if (!q) return 0;

  let qi = 0;
  let score = 0;
  let streak = 0;
  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) {
      qi++;
      streak++;
      score += streak;
    } else {
      streak = 0;
    }
  }
  return qi === q.length ? score : null;
}

function bestScore(query: string, command: CommandDefinition): number | null {
  const candidates = [command.label, ...(command.keywords ?? [])];
  let best: number | null = null;
  for (const candidate of candidates) {
    const score = fuzzyScore(query, candidate);
    if (score !== null && (best === null || score > best)) best = score;
  }
  return best;
}

export function useCommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const results = useMemo(() => {
    if (!query.trim()) return COMMANDS;
    const q = query.trim();
    return COMMANDS.map((command) => ({ command, score: bestScore(q, command) }))
      .filter((r): r is { command: CommandDefinition; score: number } => r.score !== null)
      .sort((a, b) => b.score - a.score)
      .map((r) => r.command);
  }, [query]);

  const isSearching = query.trim().length > 0;
  const suggested = results.filter((c) => c.group === "suggested");
  const navigation = results.filter((c) => c.group === "navigation");

  useEffect(() => {
    setActiveIndex(0);
  }, [query, open]);

  useEffect(() => {
    itemRefs.current[activeIndex]?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function close() {
    setOpen(false);
    setQuery("");
  }

  function runCommand(command: CommandDefinition) {
    if (command.href) router.push(command.href);
    close();
  }

  function handleInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % Math.max(results.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + results.length) % Math.max(results.length, 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const command = results[activeIndex];
      if (command) runCommand(command);
    }
  }

  return {
    open,
    setOpen,
    close,
    query,
    setQuery,
    results,
    suggested,
    navigation,
    isSearching,
    activeIndex,
    setActiveIndex,
    itemRefs,
    runCommand,
    handleInputKeyDown,
    recentCommands: RECENT_COMMANDS,
  };
}

export type UseCommandPaletteReturn = ReturnType<typeof useCommandPalette>;
