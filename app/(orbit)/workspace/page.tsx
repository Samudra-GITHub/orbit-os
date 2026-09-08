"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, KanbanSquare, FolderOpen, ArrowUpRight } from "lucide-react";
import { GlassSurface } from "@/components/ui/GlassSurface";
import { AIOrb } from "@/components/motion/AIOrb";
import { NOTES, INITIAL_KANBAN_CARDS, KANBAN_COLUMNS } from "@/lib/constants/workspace";

const SHORTCUTS = [
  { href: "/workspace/notes", label: "Notes", description: "Write and organize ideas", icon: FileText },
  { href: "/workspace/projects", label: "Projects", description: "Track work on the Kanban board", icon: KanbanSquare },
  { href: "/workspace/files", label: "Files", description: "Browse documents and assets", icon: FolderOpen },
];

export default function WorkspaceHomePage() {
  const activeCount = INITIAL_KANBAN_CARDS.filter((c) => c.columnId !== "completed").length;
  const doneCount = INITIAL_KANBAN_CARDS.filter((c) => c.columnId === "completed").length;

  return (
    <div className="flex h-full flex-col gap-5 overflow-y-auto">
      <GlassSurface intensity="default" interactive={false} className="flex items-center gap-4 rounded-4xl p-6">
        <AIOrb size="md" />
        <div>
          <h1 className="font-display text-2xl font-semibold text-white">Welcome back to Workspace</h1>
          <p className="mt-1 text-sm text-mist-400">
            {activeCount} cards in motion · {doneCount} completed this cycle
          </p>
        </div>
      </GlassSurface>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {SHORTCUTS.map((s, i) => (
          <motion.div
            key={s.href}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link href={s.href}>
              <GlassSurface intensity="subtle" className="flex h-full flex-col gap-3 rounded-3xl p-5">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/25 to-cyan-400/25">
                    <s.icon className="h-5 w-5 text-cyan-300" strokeWidth={1.75} />
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-mist-500" />
                </div>
                <div>
                  <p className="font-medium text-white">{s.label}</p>
                  <p className="mt-0.5 text-xs text-mist-400">{s.description}</p>
                </div>
              </GlassSurface>
            </Link>
          </motion.div>
        ))}
      </div>

      <GlassSurface intensity="subtle" interactive={false} className="flex-1 rounded-3xl p-5">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-mist-500">Recent notes</p>
        <div className="flex flex-col gap-1">
          {NOTES.map((note) => (
            <div
              key={note.id}
              className="flex items-center gap-2.5 rounded-xl px-2 py-2 text-sm text-mist-300 transition-colors hover:bg-white/5 hover:text-white"
            >
              <span>{note.icon}</span>
              <span>{note.title}</span>
            </div>
          ))}
        </div>

        <p className="mb-3 mt-5 text-xs font-medium uppercase tracking-[0.14em] text-mist-500">Board snapshot</p>
        <div className="flex flex-wrap gap-2">
          {KANBAN_COLUMNS.map((col) => {
            const count = INITIAL_KANBAN_CARDS.filter((c) => c.columnId === col.id).length;
            return (
              <span
                key={col.id}
                className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-xs text-mist-300"
              >
                {col.label} · {count}
              </span>
            );
          })}
        </div>
      </GlassSurface>
    </div>
  );
}
