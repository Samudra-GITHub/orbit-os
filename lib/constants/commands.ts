import {
  CloudSun,
  CalendarClock,
  Timer,
  Wallet,
  Briefcase,
  HeartPulse,
  Music2,
  FileSearch,
  Clock,
  type LucideIcon,
} from "lucide-react";

export type CommandGroup = "navigation" | "suggested";

export interface CommandDefinition {
  id: string;
  label: string;
  group: CommandGroup;
  icon: LucideIcon;
  /** Extra terms the fuzzy matcher also searches against. */
  keywords?: string[];
  /** Present for commands that navigate somewhere real; absent ones are mock actions. */
  href?: string;
}

export const COMMANDS: CommandDefinition[] = [
  {
    id: "open-weather",
    label: "Open SkyCast Weather",
    group: "navigation",
    icon: CloudSun,
    href: "/weather",
    keywords: ["weather", "forecast", "sky", "temperature"],
  },
  {
    id: "today-calendar",
    label: "Today's Calendar",
    group: "suggested",
    icon: CalendarClock,
    keywords: ["calendar", "schedule", "events", "timeline", "meetings"],
  },
  {
    id: "start-focus",
    label: "Start Focus Session",
    group: "suggested",
    icon: Timer,
    keywords: ["focus", "pomodoro", "deep work", "timer"],
  },
  {
    id: "open-finance",
    label: "Open Finance",
    group: "navigation",
    icon: Wallet,
    href: "/finance",
    keywords: ["money", "spending", "budget", "expenses"],
  },
  {
    id: "open-workspace",
    label: "Open Workspace",
    group: "navigation",
    icon: Briefcase,
    href: "/workspace",
    keywords: ["work", "projects", "tasks"],
  },
  {
    id: "view-health",
    label: "View Health",
    group: "navigation",
    icon: HeartPulse,
    href: "/health",
    keywords: ["health", "fitness", "sleep", "steps"],
  },
  {
    id: "continue-playlist",
    label: "Continue Playlist",
    group: "suggested",
    icon: Music2,
    keywords: ["music", "play", "song", "playlist"],
  },
  {
    id: "search-notes",
    label: "Search Notes",
    group: "suggested",
    icon: FileSearch,
    keywords: ["notes", "docs", "find", "search"],
  },
];

export interface RecentCommandEntry {
  id: string;
  label: string;
  icon: LucideIcon;
}

/** Mock recent-activity feed — not persisted, just seed data for the section. */
export const RECENT_COMMANDS: RecentCommandEntry[] = [
  { id: "recent-focus", label: "Started a focus session", icon: Clock },
  { id: "recent-weather", label: "Opened SkyCast Weather", icon: Clock },
  { id: "recent-notes", label: "Searched notes for \"orbit\"", icon: Clock },
];
