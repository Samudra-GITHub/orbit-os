"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { GlassSurface } from "@/components/ui/GlassSurface";
import { MOCK_TRACKS } from "@/lib/constants/focus";
import { cn } from "@/lib/utils";

function formatTime(sec: number) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

interface MusicWidgetProps {
  className?: string;
  transparent?: boolean;
}

/** A mock ambient-music player — no real audio, but the play state,
 *  elapsed time, and track switching are all genuinely wired up so the
 *  progress bar and track list behave like a real player. */
export function MusicWidget({ className, transparent = false }: MusicWidgetProps) {
  const [trackIndex, setTrackIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const track = MOCK_TRACKS[trackIndex];

  useEffect(() => {
    setElapsed(0);
  }, [trackIndex]);

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setElapsed((e) => {
          if (e >= track.durationSec) {
            setTrackIndex((i) => (i + 1) % MOCK_TRACKS.length);
            return 0;
          }
          return e + 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [playing, track.durationSec]);

  function next() {
    setTrackIndex((i) => (i + 1) % MOCK_TRACKS.length);
  }
  function prev() {
    setTrackIndex((i) => (i - 1 + MOCK_TRACKS.length) % MOCK_TRACKS.length);
  }

  const pct = (elapsed / track.durationSec) * 100;

  return (
    <GlassSurface
      intensity={transparent ? "overlay" : "subtle"}
      interactive={false}
      className={cn("flex flex-col gap-3 rounded-3xl p-4", className)}
    >
      <div className="flex items-center gap-3">
        <motion.div
          animate={playing ? { rotate: 360 } : {}}
          transition={playing ? { duration: 8, repeat: Infinity, ease: "linear" } : {}}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-400"
        >
          <Volume2 className="h-4 w-4 text-white" strokeWidth={1.75} />
        </motion.div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-white">{track.title}</p>
          <p className="truncate text-xs text-mist-400">{track.artist}</p>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-violet-400 to-cyan-400"
            animate={{ width: `${pct}%` }}
            transition={{ ease: "linear", duration: 0.4 }}
          />
        </div>
        <div className="flex items-center justify-between text-[11px] text-mist-500">
          <span>{formatTime(elapsed)}</span>
          <span>{formatTime(track.durationSec)}</span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4">
        <button onClick={prev} aria-label="Previous track" className="text-mist-400 transition-colors hover:text-white">
          <SkipBack className="h-4 w-4" />
        </button>
        <button
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? "Pause" : "Play"}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink-900 transition-transform hover:scale-105"
        >
          {playing ? <Pause className="h-4 w-4" fill="currentColor" /> : <Play className="ml-0.5 h-4 w-4" fill="currentColor" />}
        </button>
        <button onClick={next} aria-label="Next track" className="text-mist-400 transition-colors hover:text-white">
          <SkipForward className="h-4 w-4" />
        </button>
      </div>
    </GlassSurface>
  );
}
