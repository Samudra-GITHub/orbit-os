import {
  CloudSun,
  CalendarClock,
  Sparkles,
  Wallet,
  HeartPulse,
  Settings,
  type LucideIcon,
} from "lucide-react";

export type NotificationCategory = "weather" | "calendar" | "ai" | "finance" | "health" | "system";

export interface NotificationEntry {
  id: string;
  category: NotificationCategory;
  title: string;
  message: string;
  time: string;
  unread: boolean;
}

export const CATEGORY_META: Record<NotificationCategory, { label: string; icon: LucideIcon; accent: string; chip: string }> = {
  weather: { label: "Weather", icon: CloudSun, accent: "text-cyan-300", chip: "bg-cyan-400/15 text-cyan-300" },
  calendar: { label: "Calendar", icon: CalendarClock, accent: "text-violet-300", chip: "bg-violet-500/15 text-violet-300" },
  ai: { label: "AI", icon: Sparkles, accent: "text-violet-300", chip: "bg-violet-500/15 text-violet-300" },
  finance: { label: "Finance", icon: Wallet, accent: "text-amber-300", chip: "bg-amber-400/15 text-amber-300" },
  health: { label: "Health", icon: HeartPulse, accent: "text-rose-300", chip: "bg-rose-400/15 text-rose-300" },
  system: { label: "System", icon: Settings, accent: "text-mist-300", chip: "bg-white/10 text-mist-300" },
};

export const NOTIFICATIONS: NotificationEntry[] = [
  {
    id: "n1",
    category: "weather",
    title: "Rain expected",
    message: "Rain expected after 5 PM in Bengaluru — grab an umbrella.",
    time: "12m ago",
    unread: true,
  },
  {
    id: "n2",
    category: "calendar",
    title: "Class starting soon",
    message: "Systems Programming class starts in 15 minutes.",
    time: "18m ago",
    unread: true,
  },
  {
    id: "n3",
    category: "ai",
    title: "Notes summarized",
    message: "Orbit summarized your notes from today's design sync.",
    time: "34m ago",
    unread: true,
  },
  {
    id: "n4",
    category: "ai",
    title: "Focus session completed",
    message: "25-minute session completed — nice streak going.",
    time: "1h ago",
    unread: false,
  },
  {
    id: "n5",
    category: "finance",
    title: "Spending update",
    message: "You're 12% under budget this month — nice pace.",
    time: "2h ago",
    unread: false,
  },
  {
    id: "n6",
    category: "health",
    title: "Move reminder",
    message: "You've been sitting for 90 minutes. A short walk might help.",
    time: "3h ago",
    unread: false,
  },
  {
    id: "n7",
    category: "system",
    title: "Workspace synced",
    message: "Workspace synced successfully across all your notes and files.",
    time: "1d ago",
    unread: false,
  },
];
