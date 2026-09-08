"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Play, Pause, Music2 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const TRACK = {
  title: "Nightfall Drift",
  artist: "Auric Waves",
  duration: 214,
};

export function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(46);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setProgress((p) => (p >= 100 ? 0 : p + 100 / TRACK.duration));
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [playing]);

  return (
    <Card index={6} variant="widget" className="flex flex-col gap-4 rounded-4xl">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-mist-400">Now playing</p>

      <div className="flex items-center gap-3">
        <motion.div
          animate={reduceMotion ? undefined : { y: [0, -3, 0] }}
          transition={reduceMotion ? undefined : { duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            animate={playing && !reduceMotion ? { rotate: 360 } : { rotate: 0 }}
            transition={playing && !reduceMotion ? { duration: 8, repeat: Infinity, ease: "linear" } : { duration: 0.4 }}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 via-fuchsia-500/60 to-cyan-400 p-[2px]"
          >
            <div className="flex h-full w-full items-center justify-center rounded-full bg-ink-900">
              <Music2 className="h-4 w-4 text-violet-300" />
            </div>
          </motion.div>
        </motion.div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-white">{TRACK.title}</p>
          <p className="truncate text-xs text-mist-400">{TRACK.artist}</p>
        </div>

        <Button
          variant="icon"
          size="md"
          aria-label={playing ? "Pause" : "Play"}
          onClick={() => setPlaying((p) => !p)}
          className="rounded-full bg-white text-ink-900 shadow-glow-white hover:bg-white"
        >
          {playing ? <Pause className="h-4 w-4" fill="currentColor" /> : <Play className="ml-0.5 h-4 w-4" fill="currentColor" />}
        </Button>
      </div>

      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-violet-400 to-cyan-400"
          animate={{ width: `${progress}%` }}
          transition={{ ease: "linear", duration: 0.3 }}
        />
      </div>
    </Card>
  );
}
