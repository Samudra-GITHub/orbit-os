"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/Card";
import { TRANSACTIONS } from "@/lib/constants/finance";
import { computeHeatmapData } from "@/lib/finance/computeStats";
import { formatINR } from "@/lib/finance/format";
import { cn } from "@/lib/utils";

const NOW = new Date("2026-09-09T12:00:00");
const WEEKS = 12;

function levelFor(amount: number) {
  if (amount <= 0) return 0;
  if (amount < 400) return 1;
  if (amount < 1000) return 2;
  if (amount < 2000) return 3;
  return 4;
}

const LEVEL_CLASS = [
  "bg-white/5",
  "bg-violet-500/30",
  "bg-violet-400/55",
  "bg-teal-400/65",
  "bg-emerald-400",
];

/** A GitHub-style contribution heatmap of daily spend — purple at low
 *  intensity, emerald at high — derived from `TRANSACTIONS`. */
export function SpendingHeatmap() {
  const cells = useMemo(() => computeHeatmapData(TRANSACTIONS, WEEKS, NOW), []);
  const [hovered, setHovered] = useState<{ date: string; amount: number } | null>(null);

  // Pad the front so the grid starts on a Sunday, matching GitHub's layout.
  const firstDay = new Date(cells[0].date).getDay();
  const padded = [...Array(firstDay).fill(null), ...cells];
  const weeks: (typeof cells[number] | null)[][] = [];
  for (let i = 0; i < padded.length; i += 7) weeks.push(padded.slice(i, i + 7));

  return (
    <Card index={1} variant="widget" className="flex flex-col gap-4 rounded-4xl">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-mist-400">Spending heatmap</p>
        {hovered && (
          <span className="text-xs text-mist-300">
            {new Date(hovered.date).toLocaleDateString("en-IN", { month: "short", day: "numeric" })} ·{" "}
            <span className="font-mono text-white">{formatINR(hovered.amount)}</span>
          </span>
        )}
      </div>

      <div className="flex gap-[3px] overflow-x-auto pb-1">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[3px]">
            {week.map((cell, di) =>
              cell ? (
                <button
                  key={cell.date}
                  type="button"
                  aria-label={`${cell.date}: ${formatINR(cell.amount)}`}
                  onMouseEnter={() => setHovered(cell)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(cell)}
                  className={cn("h-3 w-3 shrink-0 rounded-[3px] transition-transform hover:scale-125", LEVEL_CLASS[levelFor(cell.amount)])}
                />
              ) : (
                <span key={di} className="h-3 w-3 shrink-0" aria-hidden />
              )
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-end gap-1.5 text-[10px] text-mist-500">
        Less
        {LEVEL_CLASS.map((c, i) => (
          <span key={i} className={cn("h-2.5 w-2.5 rounded-[2px]", c)} />
        ))}
        More
      </div>
    </Card>
  );
}
