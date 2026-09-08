"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { SplashLogo } from "@/components/branding/SplashLogo";
import { Button } from "@/components/ui/Button";

interface AwakeningScreenProps {
  onContinue: () => void;
}

export function AwakeningScreen({ onContinue }: AwakeningScreenProps) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="flex flex-col items-center gap-8 text-center">
      {/* black-screen veil that lifts to reveal the cosmic scene */}
      <motion.div
        aria-hidden
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="pointer-events-none fixed inset-0 z-40 bg-void"
      />

      <SplashLogo onComplete={() => setRevealed(true)} />

      {revealed && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-6"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-mist-400">Your day, orchestrated</p>
          <Button variant="primary" size="lg" onClick={onContinue} className="gap-1.5 rounded-full px-8">
            Continue
            <ChevronRight className="h-4 w-4" />
          </Button>
        </motion.div>
      )}
    </div>
  );
}
