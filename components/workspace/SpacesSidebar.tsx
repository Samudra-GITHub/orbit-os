"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { FileText, KanbanSquare, FolderOpen, Home, ChevronRight, Plus } from "lucide-react";
import { GlassSurface } from "@/components/ui/GlassSurface";
import { springs } from "@/lib/motion/springs";
import { SPACES } from "@/lib/constants/workspace";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/workspace", label: "Home", icon: Home },
  { href: "/workspace/notes", label: "Notes", icon: FileText },
  { href: "/workspace/projects", label: "Projects", icon: KanbanSquare },
  { href: "/workspace/files", label: "Files", icon: FolderOpen },
];

export function SpacesSidebar() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ product: true });

  function toggle(id: string) {
    setExpanded((e) => ({ ...e, [id]: !e[id] }));
  }

  return (
    <GlassSurface
      intensity="subtle"
      interactive={false}
      className="flex w-64 shrink-0 flex-col gap-1 overflow-y-auto rounded-4xl p-3"
    >
      <nav className="flex flex-col gap-0.5 pb-2">
        {NAV.map((item) => {
          const isActive = item.href === "/workspace" ? pathname === item.href : pathname?.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm transition-colors",
                isActive ? "bg-white/10 text-white" : "text-mist-300 hover:bg-white/5 hover:text-white"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="workspace-nav-active"
                  transition={springs.navActive}
                  className="absolute inset-0 rounded-xl bg-white/10 ring-1 ring-white/10"
                />
              )}
              <item.icon className="relative h-4 w-4 shrink-0" strokeWidth={1.75} />
              <span className="relative">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center justify-between px-2 pb-1 pt-2">
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-mist-500">Spaces</p>
        <button
          aria-label="New space"
          className="flex h-5 w-5 items-center justify-center rounded-md text-mist-500 transition-colors hover:bg-white/5 hover:text-white"
        >
          <Plus className="h-3 w-3" />
        </button>
      </div>

      <div className="flex flex-col gap-0.5">
        {SPACES.map((space) => (
          <div key={space.id}>
            <button
              onClick={() => toggle(space.id)}
              className="flex w-full items-center gap-1.5 rounded-lg px-2 py-1.5 text-left text-xs font-medium text-mist-300 transition-colors hover:bg-white/5 hover:text-white"
            >
              <ChevronRight
                className={cn("h-3 w-3 shrink-0 transition-transform", expanded[space.id] && "rotate-90")}
              />
              {space.label}
            </button>
            {expanded[space.id] && (
              <div className="ml-4 flex flex-col gap-0.5 border-l border-white/[0.06] pl-2">
                {space.items.map((item) => (
                  <button
                    key={item.id}
                    className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-left text-xs text-mist-400 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    <span>{item.icon}</span>
                    <span className="truncate">{item.title}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </GlassSurface>
  );
}
