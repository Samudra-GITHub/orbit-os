"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { MessageSquare, Mic, Plus } from "lucide-react";
import { GlassSurface } from "@/components/ui/GlassSurface";
import { springs } from "@/lib/motion/springs";
import { CONVERSATIONS, type ConversationEntry } from "@/lib/constants/ai";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/ai", label: "New chat", icon: Plus },
  { href: "/ai/chat", label: "Chat", icon: MessageSquare },
  { href: "/ai/voice", label: "Voice", icon: Mic },
];

const GROUPS: ConversationEntry["group"][] = ["Today", "Yesterday", "Earlier"];

export function ConversationSidebar() {
  const pathname = usePathname();

  return (
    <GlassSurface
      intensity="subtle"
      interactive={false}
      className="flex w-64 shrink-0 flex-col gap-1 overflow-y-auto rounded-4xl p-3"
    >
      <nav className="flex flex-col gap-0.5 pb-2">
        {NAV.map((item) => {
          const isActive = pathname === item.href;
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
                  layoutId="ai-nav-active"
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

      {GROUPS.map((group) => {
        const items = CONVERSATIONS.filter((c) => c.group === group);
        if (items.length === 0) return null;
        return (
          <div key={group} className="mb-1">
            <p className="px-2 pb-1.5 pt-2 text-[11px] font-medium uppercase tracking-[0.14em] text-mist-500">
              {group}
            </p>
            <div className="flex flex-col gap-0.5">
              {items.map((c) => (
                <button
                  key={c.id}
                  className="truncate rounded-lg px-2 py-1.5 text-left text-xs text-mist-400 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {c.title}
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </GlassSurface>
  );
}
