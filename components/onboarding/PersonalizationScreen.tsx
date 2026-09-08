"use client";

import { Check } from "lucide-react";
import { GlassSurface } from "@/components/ui/GlassSurface";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { ACCENTS, WALLPAPERS, type OnboardingProfile } from "@/lib/constants/onboarding";

interface PersonalizationScreenProps {
  profile: OnboardingProfile;
  onChange: (profile: OnboardingProfile) => void;
  onContinue: () => void;
  onBack: () => void;
}

export function PersonalizationScreen({ profile, onChange, onContinue, onBack }: PersonalizationScreenProps) {
  return (
    <div className="relative w-full max-w-xl px-4">
      {/* background morph — crossfaded gradient washes, one per wallpaper */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-[6]">
        {WALLPAPERS.map((w) => (
          <div
            key={w.id}
            className={cn(
              "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-700",
              w.swatch,
              profile.wallpaper === w.id && "opacity-[0.12]"
            )}
          />
        ))}
      </div>

      <GlassSurface intensity="raised" interactive={false} className="flex flex-col gap-6 rounded-4xl p-8">
        <div>
          <h1 className="font-display text-2xl font-semibold text-white sm:text-3xl">Make it yours</h1>
          <p className="mt-1 text-sm text-mist-400">A few details so Orbit feels like home.</p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.14em] text-mist-500">
              Name
            </label>
            <Input
              value={profile.name}
              onChange={(e) => onChange({ ...profile, name: e.target.value })}
              placeholder="Your name"
            />
          </div>
          <div className="flex-1">
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.14em] text-mist-500">
              City
            </label>
            <Input
              value={profile.city}
              onChange={(e) => onChange({ ...profile, city: e.target.value })}
              placeholder="City"
            />
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-mist-500">Wallpaper</p>
          <div className="grid grid-cols-4 gap-3">
            {WALLPAPERS.map((w) => (
              <button
                key={w.id}
                type="button"
                onClick={() => onChange({ ...profile, wallpaper: w.id })}
                aria-label={w.label}
                aria-pressed={profile.wallpaper === w.id}
                className={cn(
                  "relative h-16 overflow-hidden rounded-2xl bg-gradient-to-br transition-transform hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400",
                  w.swatch,
                  profile.wallpaper === w.id ? "ring-2 ring-white/70" : "ring-1 ring-white/10"
                )}
              >
                {profile.wallpaper === w.id && (
                  <span className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <Check className="h-5 w-5 text-white" />
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-mist-500">Accent color</p>
          <div className="flex gap-3">
            {ACCENTS.map((a) => (
              <button
                key={a.id}
                type="button"
                onClick={() => onChange({ ...profile, accent: a.id })}
                aria-label={a.label}
                aria-pressed={profile.accent === a.id}
                className={cn(
                  "h-9 w-9 rounded-full transition-transform hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400",
                  a.className,
                  profile.accent === a.id && "ring-2 ring-white ring-offset-2 ring-offset-ink-900"
                )}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <Button variant="ghost" onClick={onBack}>
            Back
          </Button>
          <Button variant="primary" size="lg" onClick={onContinue} className="rounded-full px-8">
            Continue
          </Button>
        </div>
      </GlassSurface>
    </div>
  );
}
