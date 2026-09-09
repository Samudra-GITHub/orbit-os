"use client";

import { useEffect, useRef, useState } from "react";

interface UseFocusTimerOptions {
  totalSeconds: number;
  onComplete?: () => void;
}

/** A controlled countdown engine — resets whenever `totalSeconds` changes
 *  (e.g. the user picks a different preset), and calls `onComplete`
 *  exactly once when it reaches zero while running. */
export function useFocusTimer({ totalSeconds, onComplete }: UseFocusTimerOptions) {
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    setSecondsLeft(totalSeconds);
    setRunning(false);
  }, [totalSeconds]);

  useEffect(() => {
    if (running && secondsLeft > 0) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((s) => {
          if (s <= 1) {
            setRunning(false);
            onCompleteRef.current?.();
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running, secondsLeft > 0]);

  const progress = totalSeconds > 0 ? 1 - secondsLeft / totalSeconds : 0;
  const isComplete = secondsLeft === 0;

  function start() {
    if (secondsLeft > 0) setRunning(true);
  }
  function pause() {
    setRunning(false);
  }
  function toggle() {
    setRunning((r) => (secondsLeft > 0 ? !r : false));
  }
  function reset() {
    setRunning(false);
    setSecondsLeft(totalSeconds);
  }

  return { secondsLeft, running, progress, isComplete, start, pause, toggle, reset };
}
