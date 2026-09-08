"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Mic, MicOff } from "lucide-react";
import { AIOrb } from "@/components/motion/AIOrb";
import { Button } from "@/components/ui/Button";

const BAR_COUNT = 24;
const BARS = Array.from({ length: BAR_COUNT }, (_, i) => ({
  angle: (i / BAR_COUNT) * 360,
  height: 8 + ((i * 37) % 16),
  duration: 0.6 + (i % 5) * 0.15,
  delay: (i % 6) * 0.08,
}));

/**
 * Voice mode UI only — no microphone is actually captured. The waveform
 * ring animates purely to sell the "listening" state.
 */
export function VoiceOrb() {
  const [listening, setListening] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <div className="flex h-full flex-col items-center justify-center gap-8 px-4 text-center">
      <div className="relative flex h-56 w-56 items-center justify-center">
        {!reduceMotion &&
          BARS.map((bar, i) => (
            <motion.span
              key={i}
              className="absolute left-1/2 top-1/2 w-1 rounded-full bg-gradient-to-t from-violet-500 to-cyan-400"
              style={{
                height: bar.height,
                transform: `translate(-50%, -50%) rotate(${bar.angle}deg) translateY(-84px)`,
              }}
              animate={listening ? { scaleY: [1, 1.9, 1], opacity: [0.6, 1, 0.6] } : { scaleY: 1, opacity: 0.4 }}
              transition={
                listening
                  ? { duration: bar.duration, delay: bar.delay, repeat: Infinity, ease: "easeInOut" }
                  : { duration: 0.3 }
              }
            />
          ))}

        <AIOrb size="lg" className="h-24 w-24" />
      </div>

      <div>
        <p className="font-display text-xl font-semibold text-white">
          {listening ? "Listening..." : "Tap to talk"}
        </p>
        <p className="mt-1 text-sm text-mist-400">Voice mode UI — no microphone is captured yet.</p>
      </div>

      <Button
        variant="primary"
        size="lg"
        onClick={() => setListening((v) => !v)}
        className="h-16 w-16 rounded-full shadow-glow-accent-lg"
        aria-label={listening ? "Stop listening" : "Start listening"}
      >
        {listening ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
      </Button>
    </div>
  );
}
