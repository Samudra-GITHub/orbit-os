"use client";

import { Timer, Brain, Waves, CheckCircle2, XCircle, type LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useFocusSessions } from "@/lib/hooks/useFocusSessions";
import type { PresetId } from "@/lib/constants/focus";

const presetIcon: Record<PresetId, LucideIcon> = {
  pomodoro: Timer,
  "deep-work": Brain,
  flow: Waves,
};

function formatDateTime(iso: string) {
  const d = new Date(iso);
  return {
    date: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    time: d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
  };
}

export default function FocusSessionsPage() {
  const { sessions } = useFocusSessions();
  const sorted = [...sessions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display text-2xl font-semibold text-white">Sessions</h1>
        <p className="mt-1 text-sm text-mist-400">{sessions.length} sessions logged.</p>
      </div>

      <Card index={0} variant="widget" className="rounded-4xl">
        <div className="flex flex-col gap-1">
          {sorted.map((session, i) => {
            const Icon = presetIcon[session.presetId];
            const { date, time } = formatDateTime(session.date);
            return (
              <div
                key={session.id}
                className={`flex items-center gap-3 py-3 ${i > 0 ? "border-t border-white/[0.06]" : ""}`}
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-500/15">
                  <Icon className="h-4 w-4 text-violet-300" strokeWidth={1.75} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-white">{session.presetLabel}</p>
                  <p className="text-xs text-mist-500">
                    {date} · {time}
                  </p>
                </div>
                <span className="font-mono text-sm text-mist-300">{session.durationMinutes}m</span>
                {session.completed ? (
                  <Badge variant="positive" className="shrink-0">
                    <CheckCircle2 className="h-3 w-3" /> Completed
                  </Badge>
                ) : (
                  <Badge variant="neutral" className="shrink-0">
                    <XCircle className="h-3 w-3" /> Interrupted
                  </Badge>
                )}
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
