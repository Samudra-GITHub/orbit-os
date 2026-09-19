"use client";

import { useEffect, useState, type MouseEvent } from "react";
import {
  LayoutGrid,
  Sparkles,
  Timer,
  Wallet,
  HeartPulse,
  CloudSun,
  Briefcase,
  Settings,
  Search,
  Wifi,
  BatteryCharging,
  Volume2,
  Calendar,
  Play,
  Pause,
  RotateCcw,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  TrendingUp,
  Clock,
  Flame,
  CloudRain,
  Activity,
  Moon,
  Command,
  type LucideIcon,
} from "lucide-react";

/**
 * Fully interactive "card-free" dashboard mockup — Tailwind + lucide-react
 * only, no framer-motion. Ships its own top bar + sidebar (rather than the
 * real `AppShell`/`Sidebar`), so it's meant to be rendered standalone at
 * `/orbit-preview` rather than nested inside the `(orbit)` route group.
 * Ported from a plain-JS reference file — state/behavior kept 1:1, typed
 * for this project's strict TypeScript config.
 */

interface TimelineEvent {
  id: number;
  time: string;
  title: string;
  category: string;
  duration: string;
  completed: boolean;
  active: boolean;
}

const INITIAL_EVENTS: TimelineEvent[] = [
  { id: 1, time: "10:00", title: "Design sync", category: "Team", duration: "45m", completed: true, active: false },
  { id: 2, time: "11:30", title: "Focus block - Orbit v2", category: "Deep work", duration: "1h 30m", completed: false, active: true },
  { id: 3, time: "14:00", title: "1:1 with Ravi", category: "Meeting", duration: "30m", completed: false, active: false },
  { id: 4, time: "16:30", title: "Ship review", category: "Product", duration: "45m", completed: false, active: false },
];

const NAV_ITEMS: { id: string; icon: LucideIcon; label: string }[] = [
  { id: "dashboard", icon: LayoutGrid, label: "Overview" },
  { id: "ai", icon: Sparkles, label: "Intelligence" },
  { id: "timer", icon: Timer, label: "Focus" },
  { id: "finance", icon: Wallet, label: "Finance" },
  { id: "health", icon: HeartPulse, label: "Biometrics" },
  { id: "weather", icon: CloudSun, label: "Atmosphere" },
  { id: "work", icon: Briefcase, label: "Projects" },
];

function formatTimer(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function OrbitDashboardPreview() {
  // Navigation & shell state
  const [activeNav, setActiveNav] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Live clock
  const [currentTime, setCurrentTime] = useState({ time: "09:41 AM", date: "Sat, Sep 19" });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      const dateStr = now.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" });
      setCurrentTime({ time: timeStr, date: dateStr });
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Focus timer (Pomodoro)
  const [focusSecondsLeft, setFocusSecondsLeft] = useState(25 * 60);
  const [isFocusActive, setIsFocusActive] = useState(false);

  useEffect(() => {
    if (!isFocusActive || focusSecondsLeft <= 0) return;
    const timer = setInterval(() => {
      setFocusSecondsLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isFocusActive, focusSecondsLeft]);

  useEffect(() => {
    if (focusSecondsLeft === 0) setIsFocusActive(false);
  }, [focusSecondsLeft]);

  function resetFocusTimer() {
    setIsFocusActive(false);
    setFocusSecondsLeft(25 * 60);
  }

  // Now playing
  const [isPlaying, setIsPlaying] = useState(true);
  const [trackProgress, setTrackProgress] = useState(42);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isLoop, setIsLoop] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;
    const musicInterval = setInterval(() => {
      setTrackProgress((prev) => (prev >= 100 ? 0 : prev + 0.5));
    }, 800);
    return () => clearInterval(musicInterval);
  }, [isPlaying]);

  // Timeline events
  const [events, setEvents] = useState<TimelineEvent[]>(INITIAL_EVENTS);

  function toggleEventCompleted(id: number) {
    setEvents((prev) => prev.map((ev) => (ev.id === id ? { ...ev, completed: !ev.completed } : ev)));
  }

  function handleScrub(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    setTrackProgress((clickX / rect.width) * 100);
  }

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#06080e] font-sans text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Aurora ambient multi-color radial background */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div
          className="absolute -top-[15%] left-[5%] h-[600px] w-[650px] rounded-full opacity-25 blur-[140px]"
          style={{ background: "radial-gradient(circle, rgba(14,165,164,0.7) 0%, rgba(6,78,99,0.3) 60%, transparent 100%)" }}
        />
        <div
          className="absolute left-[10%] top-[2%] h-[340px] w-[380px] rounded-full opacity-20 blur-[120px]"
          style={{ background: "radial-gradient(circle, rgba(234,179,8,0.6) 0%, transparent 80%)" }}
        />
        <div
          className="absolute right-[15%] top-[25%] h-[550px] w-[580px] rounded-full opacity-20 blur-[160px]"
          style={{ background: "radial-gradient(circle, rgba(16,185,129,0.5) 0%, rgba(13,148,136,0.2) 70%, transparent 100%)" }}
        />
        <div
          className="absolute -bottom-[10%] left-[20%] h-[500px] w-[620px] rounded-full opacity-15 blur-[150px]"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.4) 0%, rgba(99,102,241,0.2) 60%, transparent 100%)" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] opacity-30 [background-size:32px_32px]" />
      </div>

      {/* Top bar */}
      <header className="relative z-20 flex h-14 w-full items-center justify-between border-b border-white/[0.04] bg-[#06080e]/60 px-4 backdrop-blur-xl md:px-8">
        <div className="flex items-center space-x-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500 to-teal-400 shadow-lg shadow-cyan-500/20">
            <div className="h-3 w-3 animate-pulse rounded-full border-2 border-[#06080e] bg-white" />
          </div>
          <span className="text-sm font-semibold uppercase tracking-wider text-slate-200">
            Orbit <span className="font-light text-cyan-400">OS</span>
          </span>
          <span className="hidden rounded-full border border-white/[0.06] bg-white/[0.04] px-2 py-0.5 font-mono text-[11px] text-slate-400 sm:inline-block">
            v2.4.0
          </span>
        </div>

        <div className="flex items-center space-x-2 rounded-full border border-white/[0.05] bg-white/[0.02] px-3.5 py-1 font-mono text-xs tracking-tight text-slate-300 shadow-inner">
          <Clock className="h-3.5 w-3.5 animate-spin-slow text-cyan-400" />
          <span className="font-semibold text-white">{currentTime.time}</span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-400">{currentTime.date}</span>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden items-center space-x-3 text-slate-400 sm:flex">
            <button className="p-1 transition-colors hover:text-white" title="Signal Good">
              <Wifi className="h-4 w-4 text-emerald-400" />
            </button>
            <button className="p-1 transition-colors hover:text-white" title="Audio 80%">
              <Volume2 className="h-4 w-4" />
            </button>
            <div className="flex items-center space-x-1 font-mono text-[11px] text-slate-300">
              <BatteryCharging className="h-4 w-4 text-cyan-400" />
              <span>98%</span>
            </div>
          </div>

          <div className="hidden h-4 w-[1px] bg-white/[0.08] sm:block" />

          <div className="group flex cursor-pointer items-center space-x-2 pl-1">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120"
                alt="Samudra"
                className="h-7 w-7 rounded-full object-cover ring-1 ring-white/20 transition-all duration-300 group-hover:ring-cyan-400"
              />
              <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-[#06080e]" />
            </div>
            <span className="hidden text-xs font-medium text-slate-300 transition-colors group-hover:text-white md:inline-block">
              Samudra
            </span>
          </div>
        </div>
      </header>

      <div className="relative z-10 flex min-h-[calc(100vh-3.5rem)] w-full">
        {/* Sidebar */}
        <aside className="hidden w-16 flex-col items-center justify-between border-r border-white/[0.04] bg-white/[0.01] py-6 backdrop-blur-lg lg:flex">
          <div className="flex flex-col items-center space-y-5">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveNav(item.id)}
                  title={item.label}
                  className={`group relative rounded-2xl p-2.5 transition-all duration-300 ${
                    isActive
                      ? "border border-cyan-500/30 bg-cyan-500/15 text-cyan-300 shadow-lg shadow-cyan-500/20"
                      : "text-slate-400 hover:bg-white/[0.03] hover:text-slate-200"
                  }`}
                >
                  <Icon className={`h-5 w-5 transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-105"}`} />
                  {isActive && <span className="absolute -left-1 top-1/2 h-3 w-1 -translate-y-1/2 rounded-r-full bg-cyan-400" />}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col items-center space-y-4">
            <button className="rounded-2xl p-2.5 text-slate-400 transition-colors hover:bg-white/[0.04] hover:text-slate-200" title="System Preferences">
              <Settings className="h-5 w-5" />
            </button>
            <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-slate-800 to-slate-900 text-xs font-bold text-slate-300 shadow-md transition-all hover:border-cyan-400/50 hover:text-cyan-300">
              N
            </div>
          </div>
        </aside>

        <main className="mx-auto max-w-[1720px] flex-1 space-y-7 px-4 py-6 sm:px-6 md:px-8 lg:px-10">
          {/* Header banner */}
          <section className="relative overflow-hidden rounded-3xl border border-white/[0.05] bg-white/[0.015] p-6 backdrop-blur-md sm:p-7">
            <div className="pointer-events-none absolute left-0 top-0 h-48 w-96 bg-gradient-to-r from-amber-500/10 via-teal-500/10 to-transparent blur-3xl" />

            <div className="relative z-10 flex flex-col items-start justify-between gap-6 xl:flex-row xl:items-center">
              <div className="flex items-start space-x-5 sm:items-center">
                <div className="relative flex-shrink-0">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-400/80 via-emerald-400/70 to-teal-400 shadow-lg shadow-amber-500/20 ring-1 ring-white/30">
                    <Sparkles className="h-7 w-7 stroke-[2.2] text-slate-950" />
                  </div>
                  <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
                    <span className="relative inline-flex h-3.5 w-3.5 rounded-full border border-[#06080e] bg-teal-500" />
                  </span>
                </div>

                <div>
                  <div className="font-mono text-[11px] font-semibold uppercase tracking-wider text-amber-300/90">
                    Saturday, September 19
                  </div>
                  <h1 className="mt-0.5 text-2xl font-bold tracking-tight text-white sm:text-3xl">Good morning, Samudra</h1>
                  <p className="mt-1 flex flex-wrap items-center gap-1.5 text-xs font-normal text-slate-400 sm:text-sm">
                    <span>4 events today</span>
                    <span className="text-slate-600">•</span>
                    <span>2 focus sessions left</span>
                    <span className="text-slate-600">•</span>
                    <span className="font-medium text-cyan-400">saved 25 min</span>
                    <span>of commute</span>
                    <span className="text-slate-600">•</span>
                    <span className="font-medium text-emerald-400">spending down vs yesterday</span>
                  </p>
                </div>
              </div>

              <div className="flex w-full flex-wrap items-center gap-4 xl:w-auto">
                <div
                  className={`relative flex w-full items-center rounded-2xl border bg-white/[0.03] px-3.5 py-2.5 transition-all duration-300 sm:w-64 lg:w-72 ${
                    isSearchFocused ? "border-cyan-400/60 bg-white/[0.06] ring-2 ring-cyan-500/20" : "border-white/[0.07] hover:border-white/[0.15]"
                  }`}
                >
                  <Search className="mr-2 h-4 w-4 flex-shrink-0 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    placeholder="Ask Orbit anything..."
                    className="w-full bg-transparent text-xs text-slate-200 placeholder-slate-500 focus:outline-none sm:text-sm"
                  />
                  <div className="ml-2 flex items-center space-x-0.5 rounded border border-white/10 px-1.5 py-0.5 font-mono text-[10px] text-slate-500">
                    <Command className="mr-0.5 h-3 w-3" /> K
                  </div>
                </div>

                <div className="flex items-center space-x-3 rounded-2xl border border-white/[0.05] bg-white/[0.02] px-3 py-2">
                  <div className="relative flex h-9 w-9 items-center justify-center">
                    <svg className="h-9 w-9 -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-slate-800"
                        strokeWidth="3.5"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-cyan-400"
                        strokeDasharray="82, 100"
                        strokeLinecap="round"
                        strokeWidth="3.5"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <span className="absolute font-mono text-[11px] font-bold text-white">82</span>
                  </div>
                  <div className="text-left leading-tight">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Focus Score</div>
                    <div className="text-[11px] font-medium text-emerald-400">Trending up</div>
                  </div>
                </div>

                <div className="flex items-center space-x-2.5 rounded-2xl border border-white/[0.05] bg-white/[0.02] px-3.5 py-2">
                  <CloudSun className="h-5 w-5 text-teal-300" />
                  <div className="text-left leading-tight">
                    <div className="font-mono text-xs font-bold text-white">22°C</div>
                    <div className="text-[10px] text-slate-400">Bengaluru</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-white/[0.04] pt-4 text-xs sm:gap-3">
              <span className="inline-flex items-center rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-1.5 text-slate-300 transition-colors hover:bg-white/[0.05]">
                <Calendar className="mr-2 h-3.5 w-3.5 text-cyan-400" />
                3 meetings before noon
              </span>
              <span className="inline-flex items-center rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-1.5 text-slate-300 transition-colors hover:bg-white/[0.05]">
                <Sparkles className="mr-2 h-3.5 w-3.5 text-amber-400" />
                Best focus window 2–4 PM
              </span>
              <span className="inline-flex items-center rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-1.5 text-slate-300 transition-colors hover:bg-white/[0.05]">
                <TrendingUp className="mr-2 h-3.5 w-3.5 text-emerald-400" />
                Energy trending up vs. yesterday
              </span>
              <span className="inline-flex items-center rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-1.5 text-slate-300 transition-colors hover:bg-white/[0.05]">
                <CloudRain className="mr-2 h-3.5 w-3.5 text-teal-400" />
                Rain expected after 5 PM
              </span>
            </div>
          </section>

          <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2 xl:grid-cols-4">
            {/* Column 1 — Timeline */}
            <div className="space-y-4 rounded-3xl border border-white/[0.04] bg-white/[0.015] p-5 backdrop-blur-sm transition-all hover:border-white/[0.08]">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400">Schedule</span>
                  <h2 className="flex items-center gap-2 text-base font-semibold text-white">Timeline</h2>
                </div>
                <button
                  onClick={() => alert("Timeline calendar opened")}
                  className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-white/[0.04] hover:text-cyan-400"
                >
                  <Calendar className="h-4 w-4" />
                </button>
              </div>

              <div className="relative space-y-4 pl-6 pt-1">
                <div className="absolute bottom-2 left-2.5 top-2 w-[2px] bg-gradient-to-b from-amber-400/40 via-cyan-400/60 to-slate-800" />

                <div onClick={() => toggleEventCompleted(1)} className="group relative cursor-pointer">
                  <div className="absolute -left-[19px] top-1.5 h-3 w-3 rounded-full bg-amber-400/80 ring-4 ring-[#06080e] transition-transform group-hover:scale-125" />
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-[11px] text-slate-400">10:00</span>
                    <span className="font-mono text-[10px] text-slate-500">45m</span>
                  </div>
                  <div className="mt-0.5">
                    <div className={`text-sm font-medium transition-colors ${events[0].completed ? "text-slate-500 line-through" : "text-slate-200 group-hover:text-cyan-300"}`}>
                      {events[0].title}
                    </div>
                    <div className="text-[11px] text-slate-400">{events[0].category}</div>
                  </div>
                </div>

                <div className="relative flex items-center py-1">
                  <div className="absolute -left-[23px] flex h-5 w-5 items-center justify-center rounded-full bg-cyan-500/20">
                    <div className="h-2 w-2 animate-ping rounded-full bg-cyan-400" />
                  </div>
                  <div className="flex flex-1 items-center gap-2">
                    <div className="h-[1px] flex-1 bg-cyan-500/40" />
                    <span className="rounded-full border border-cyan-500/30 bg-cyan-950/60 px-2 py-0.5 font-mono text-[9px] font-bold tracking-widest text-cyan-300">
                      NOW
                    </span>
                    <div className="h-[1px] w-4 bg-cyan-500/40" />
                  </div>
                </div>

                <div
                  onClick={() => toggleEventCompleted(2)}
                  className="group relative cursor-pointer rounded-2xl border border-cyan-500/30 bg-cyan-500/[0.06] p-3 shadow-lg shadow-cyan-950/40 backdrop-blur-md"
                >
                  <div className="absolute -left-[27px] top-4 h-3.5 w-3.5 rounded-full bg-cyan-400 shadow-md shadow-cyan-400 ring-4 ring-[#06080e]" />
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-[11px] font-semibold text-cyan-300">11:30</span>
                    <span className="rounded bg-cyan-500/20 px-1.5 py-0.5 font-mono text-[10px] text-cyan-200">1h 30m</span>
                  </div>
                  <div className="mt-1">
                    <div className="text-sm font-semibold text-white transition-colors group-hover:text-cyan-200">{events[1].title}</div>
                    <div className="text-[11px] font-medium text-cyan-400/80">Deep work • Orbit Design System</div>
                  </div>
                </div>

                <div onClick={() => toggleEventCompleted(3)} className="group relative cursor-pointer pt-1">
                  <div className="absolute -left-[19px] top-2.5 h-3 w-3 rounded-full bg-amber-400/80 ring-4 ring-[#06080e] transition-transform group-hover:scale-125" />
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-[11px] text-slate-400">14:00</span>
                    <span className="font-mono text-[10px] text-slate-500">30m</span>
                  </div>
                  <div className="mt-0.5">
                    <div className={`text-sm font-medium transition-colors ${events[2].completed ? "text-slate-500 line-through" : "text-slate-200 group-hover:text-cyan-300"}`}>
                      {events[2].title}
                    </div>
                    <div className="text-[11px] text-slate-400">{events[2].category}</div>
                  </div>
                </div>

                <div onClick={() => toggleEventCompleted(4)} className="group relative cursor-pointer pt-1">
                  <div className="absolute -left-[19px] top-2.5 h-3 w-3 rounded-full bg-rose-400/80 ring-4 ring-[#06080e] transition-transform group-hover:scale-125" />
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-[11px] text-slate-400">16:30</span>
                    <span className="font-mono text-[10px] text-slate-500">45m</span>
                  </div>
                  <div className="mt-0.5">
                    <div className={`text-sm font-medium transition-colors ${events[3].completed ? "text-slate-500 line-through" : "text-slate-200 group-hover:text-cyan-300"}`}>
                      {events[3].title}
                    </div>
                    <div className="text-[11px] text-slate-400">{events[3].category}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 2 — Focus session + Weather */}
            <div className="space-y-6">
              <div className="space-y-4 rounded-3xl border border-white/[0.04] bg-white/[0.015] p-5 backdrop-blur-sm transition-all hover:border-white/[0.08]">
                <div className="flex items-center justify-between">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-slate-400">Focus Session</div>
                  <span className="inline-flex items-center rounded-full border border-amber-400/20 bg-amber-400/10 px-2 py-0.5 text-[10px] font-medium text-amber-300">
                    <Flame className="mr-1 h-3 w-3 fill-amber-400 text-amber-400" />
                    12-day streak
                  </span>
                </div>

                <div className="flex flex-col items-center justify-center py-2">
                  <div className="relative flex h-40 w-40 items-center justify-center">
                    <svg className="h-40 w-40 -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="42" className="text-slate-800/80" strokeWidth="6" stroke="currentColor" fill="transparent" />
                      <circle
                        cx="50"
                        cy="50"
                        r="42"
                        className="text-cyan-400 transition-all duration-700 ease-linear drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]"
                        strokeWidth="6"
                        strokeDasharray={264}
                        strokeDashoffset={264 - 264 * (focusSecondsLeft / (25 * 60))}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                      />
                    </svg>

                    <div className="absolute flex flex-col items-center justify-center text-center">
                      <span className="font-mono text-2xl font-bold tracking-tight text-white sm:text-3xl">{formatTimer(focusSecondsLeft)}</span>
                      <span className="text-[11px] font-medium text-cyan-300/80">Deep Work</span>
                      <span className="mt-0.5 font-mono text-[9px] text-slate-500">Ends 10:45 AM</span>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center space-x-3">
                    <button
                      onClick={resetFocusTimer}
                      title="Reset Session"
                      className="rounded-full bg-white/[0.04] p-2 text-slate-400 transition-colors hover:bg-white/[0.08] hover:text-white"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setIsFocusActive(!isFocusActive)}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-cyan-500 to-teal-400 text-slate-950 shadow-lg shadow-cyan-500/25 transition-transform hover:scale-105 active:scale-95"
                    >
                      {isFocusActive ? <Pause className="h-4 w-4 fill-slate-950" /> : <Play className="ml-0.5 h-4 w-4 fill-slate-950" />}
                    </button>
                    <div className="pl-1 font-mono text-xs text-slate-400">2/5 today</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 rounded-3xl border border-white/[0.04] bg-white/[0.015] p-5 backdrop-blur-sm transition-all hover:border-white/[0.08]">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400">Weather</span>
                    <div className="text-xs font-medium text-slate-300">Bengaluru, IN</div>
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-2xl border border-teal-500/20 bg-teal-500/10">
                    <CloudRain className="h-5 w-5 text-teal-300" />
                  </div>
                </div>

                <div className="flex items-baseline justify-between">
                  <div>
                    <div className="font-mono text-3xl font-bold tracking-tight text-white">28°</div>
                    <div className="text-xs text-slate-400">Light Rain • Feels like 29°</div>
                  </div>
                  <div className="space-y-0.5 text-right font-mono text-[11px] text-slate-400">
                    <div>
                      AQI 2 • <span className="text-emerald-400">Fair</span>
                    </div>
                    <div>Humidity 54%</div>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="flex justify-between pb-1 font-mono text-[10px] text-slate-500">
                    <span>8 PM</span>
                    <span>11 PM</span>
                    <span>2 AM</span>
                    <span>5 AM</span>
                    <span>8 AM</span>
                    <span>11 AM</span>
                  </div>
                  <svg className="h-12 w-full overflow-visible" viewBox="0 0 300 50">
                    <defs>
                      <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M 0 25 Q 50 15 100 30 T 200 35 T 300 20 L 300 50 L 0 50 Z" fill="url(#tempGradient)" />
                    <path d="M 0 25 Q 50 15 100 30 T 200 35 T 300 20" fill="none" stroke="#2dd4bf" strokeWidth="2.2" strokeLinecap="round" />
                    <circle cx="100" cy="30" r="3.5" fill="#2dd4bf" className="animate-ping" />
                    <circle cx="100" cy="30" r="3.5" fill="#ffffff" />
                  </svg>
                  <div className="flex justify-between pt-1 font-mono text-[10px] text-slate-400">
                    <span>27°</span>
                    <span>27°</span>
                    <span>23°</span>
                    <span>22°</span>
                    <span>24°</span>
                    <span>27°</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 3 — Finance + AI */}
            <div className="space-y-6">
              <div className="space-y-4 rounded-3xl border border-white/[0.04] bg-white/[0.015] p-5 backdrop-blur-sm transition-all hover:border-white/[0.08]">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400">This Month</span>
                    <h2 className="text-base font-semibold text-white">Financial Overview</h2>
                  </div>
                  <div className="relative flex h-9 w-9 items-center justify-center">
                    <svg className="h-9 w-9 -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-slate-800"
                        strokeWidth="3.5"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-amber-400"
                        strokeDasharray="66, 100"
                        strokeLinecap="round"
                        strokeWidth="3.5"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <span className="absolute font-mono text-[10px] font-bold text-white">66%</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-baseline space-x-2">
                    <span className="font-mono text-2xl font-bold tracking-tight text-white sm:text-3xl">$860</span>
                    <span className="font-mono text-sm text-slate-500">/ $1,300</span>
                  </div>
                  <div className="inline-flex items-center text-[11px] font-medium text-teal-400">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    12% less than last month
                  </div>
                </div>

                <div className="space-y-3 pt-1">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-300">Food & Dining</span>
                      <span className="font-mono text-slate-400">
                        $420 <span className="text-slate-600">/ $600</span>
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-white/[0.04]">
                      <div className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-300 shadow-[0_0_8px_rgba(245,158,11,0.5)]" style={{ width: "70%" }} />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-300">Transport</span>
                      <span className="font-mono text-slate-400">
                        $180 <span className="text-slate-600">/ $200</span>
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-white/[0.04]">
                      <div className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-teal-300 shadow-[0_0_8px_rgba(20,184,166,0.5)]" style={{ width: "90%" }} />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-300">Shopping</span>
                      <span className="font-mono text-slate-400">
                        $260 <span className="text-slate-600">/ $500</span>
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-white/[0.04]">
                      <div className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-400 shadow-[0_0_8px_rgba(168,85,247,0.5)]" style={{ width: "52%" }} />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-white/[0.04] pt-2 text-xs text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-cyan-400" />
                    3 active subscriptions
                  </span>
                  <span className="font-mono text-white">$95/mo</span>
                </div>
              </div>

              <div className="space-y-2 rounded-3xl border border-amber-400/20 bg-gradient-to-br from-amber-500/[0.04] to-teal-500/[0.02] p-4 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-amber-300/80">AI Insight</span>
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-400/20">
                    <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                  </div>
                </div>
                <p className="text-xs leading-relaxed text-slate-200">
                  Energy is trending{" "}
                  <span className="font-semibold text-amber-300 underline decoration-amber-400/60 decoration-2 underline-offset-4">
                    up vs. yesterday
                  </span>
                  . Recommended deep work session starts at 2:00 PM.
                </p>
              </div>
            </div>

            {/* Column 4 — Health + Now Playing */}
            <div className="space-y-6">
              <div className="space-y-4 rounded-3xl border border-white/[0.04] bg-white/[0.015] p-5 backdrop-blur-sm transition-all hover:border-white/[0.08]">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400">Health</span>
                  <div className="flex h-7 w-7 items-center justify-center rounded-xl border border-rose-500/20 bg-rose-500/10">
                    <HeartPulse className="h-4 w-4 animate-pulse text-rose-400" />
                  </div>
                </div>

                <div className="flex items-baseline space-x-2">
                  <span className="font-mono text-3xl font-bold tracking-tight text-white">62</span>
                  <span className="text-xs font-medium text-slate-400">bpm resting</span>
                </div>

                <div className="space-y-3 pt-1">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="flex items-center gap-1.5 text-slate-300">
                        <Activity className="h-3.5 w-3.5 text-teal-400" /> Step progress
                      </span>
                      <span className="font-mono text-[11px] text-slate-300">
                        8,248 <span className="text-slate-600">/ 10,000</span>
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-white/[0.04]">
                      <div className="h-full rounded-full bg-gradient-to-r from-teal-400 to-cyan-300 shadow-[0_0_8px_rgba(45,212,191,0.4)]" style={{ width: "82%" }} />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="flex items-center gap-1.5 text-slate-300">
                        <Moon className="h-3.5 w-3.5 text-indigo-400" /> Sleep
                      </span>
                      <span className="font-mono text-[11px] text-slate-300">
                        7h 12m <span className="text-slate-600">/ 8h</span>
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-white/[0.04]">
                      <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 shadow-[0_0_8px_rgba(99,102,241,0.4)]" style={{ width: "90%" }} />
                    </div>
                  </div>
                </div>

                <div className="pt-1 text-[11px] font-medium text-emerald-400">✓ On track for today&apos;s recovery targets</div>
              </div>

              <div className="space-y-4 rounded-3xl border border-white/[0.04] bg-white/[0.015] p-5 backdrop-blur-sm transition-all hover:border-white/[0.08]">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400">Now Playing</span>
                  <div className="flex items-center space-x-1">
                    <span className={`h-3 w-1 rounded-full bg-cyan-400 ${isPlaying ? "animate-bounce" : ""}`} />
                    <span className={`h-4 w-1 rounded-full bg-cyan-300 ${isPlaying ? "animate-bounce delay-75" : ""}`} />
                    <span className={`h-2 w-1 rounded-full bg-cyan-500 ${isPlaying ? "animate-bounce delay-150" : ""}`} />
                  </div>
                </div>

                <div className="flex items-center space-x-3.5">
                  <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 shadow-lg shadow-purple-900/40 ring-1 ring-white/10">
                    <div
                      className="absolute inset-0 bg-cover bg-center opacity-80"
                      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=150')" }}
                    />
                    <div className="relative z-10 flex h-full w-full items-center justify-center">
                      <div className="h-4 w-4 rounded-full border-2 border-white/60" />
                    </div>
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-semibold text-white">Nightfall Drift</h3>
                    <p className="truncate text-xs text-slate-400">Auric Waves • Lo-Fi Beats</p>
                  </div>
                </div>

                <div className="space-y-1.5 pt-1">
                  <div onClick={handleScrub} className="group relative h-1.5 w-full cursor-pointer rounded-full bg-white/[0.08]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-teal-300 shadow-[0_0_8px_rgba(34,211,238,0.5)] transition-all"
                      style={{ width: `${trackProgress}%` }}
                    />
                    <div
                      className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-white opacity-0 shadow-md transition-opacity group-hover:opacity-100"
                      style={{ left: `calc(${trackProgress}% - 6px)` }}
                    />
                  </div>
                  <div className="flex justify-between font-mono text-[10px] text-slate-500">
                    <span>1:42</span>
                    <span>3:30</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 text-slate-400">
                  <button
                    onClick={() => setIsShuffle(!isShuffle)}
                    className={`rounded-lg p-1.5 transition-colors ${isShuffle ? "bg-cyan-400/10 text-cyan-400" : "hover:text-white"}`}
                  >
                    <Shuffle className="h-3.5 w-3.5" />
                  </button>

                  <button className="p-1.5 transition-colors hover:text-white">
                    <SkipBack className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-950 shadow-lg shadow-white/20 transition-transform hover:scale-105 active:scale-95"
                  >
                    {isPlaying ? <Pause className="h-4 w-4 fill-slate-950" /> : <Play className="ml-0.5 h-4 w-4 fill-slate-950" />}
                  </button>

                  <button className="p-1.5 transition-colors hover:text-white">
                    <SkipForward className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => setIsLoop(!isLoop)}
                    className={`rounded-lg p-1.5 transition-colors ${isLoop ? "bg-cyan-400/10 text-cyan-400" : "hover:text-white"}`}
                  >
                    <Repeat className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <div className="fixed bottom-6 right-6 z-30">
        <button
          onClick={() => setIsSearchFocused(true)}
          className="group flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/[0.08] text-white shadow-2xl backdrop-blur-xl transition-all hover:scale-105 hover:bg-white/[0.14] active:scale-95"
          title="Command Menu"
        >
          <Command className="h-5 w-5 text-cyan-300 transition-transform group-hover:rotate-12" />
        </button>
      </div>
    </div>
  );
}
