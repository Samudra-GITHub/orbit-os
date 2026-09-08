"use client";

import { useEffect, useState } from "react";
import { animate, motion, useReducedMotion } from "framer-motion";
import {
  Droplets,
  Wind,
  Gauge,
  Sunrise,
  Sunset,
  Eye,
  Thermometer,
  Sun,
  CloudRain,
  Waves,
  type LucideIcon,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatLocalClock, formatLocalDay, formatLocalHour, getWeatherIcon, type WeatherBundle } from "@/lib/skycast";

function useCountUp(target: number) {
  const [value, setValue] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) {
      setValue(target);
      return;
    }
    const controls = animate(0, target, {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [target, reduceMotion]);

  return value;
}

function buildSparkPoints(values: number[]) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const stepX = 100 / (values.length - 1 || 1);
  return values.map((v, i) => ({ x: i * stepX, y: 40 - ((v - min) / span) * 32 - 4 }));
}

interface MetricCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  index: number;
}

function MetricCard({ icon: Icon, label, value, index }: MetricCardProps) {
  return (
    <Card index={index} variant="widget" className="flex flex-col gap-2 rounded-3xl">
      <div className="flex items-center gap-2 text-mist-400">
        <Icon className="h-4 w-4 text-cyan-300" strokeWidth={1.75} />
        <span className="text-xs uppercase tracking-[0.14em]">{label}</span>
      </div>
      <span className="font-mono text-xl font-semibold text-white">{value}</span>
    </Card>
  );
}

function buildInsights(bundle: WeatherBundle): string[] {
  const { current, aqi } = bundle;
  const insights: string[] = [];

  if (aqi.aqi >= 3) insights.push(`Air quality is ${aqi.label.toLowerCase()} — consider limiting outdoor time.`);
  else insights.push(`Air quality is ${aqi.label.toLowerCase()} — good day to be outside.`);

  if (current.uvIndex >= 6) insights.push("UV index is high — sunscreen recommended.");
  else if (current.uvIndex >= 3) insights.push("UV index is moderate through midday.");

  if (current.humidity >= 70) insights.push("High humidity may make it feel warmer than the reading.");

  const rainSoon = bundle.hourly.some((h) => h.pop >= 0.4);
  insights.push(rainSoon ? "Rain is likely in the next few hours." : "No significant rain expected soon.");

  return insights.slice(0, 4);
}

interface WeatherPageContentProps {
  bundle: WeatherBundle;
}

export function WeatherPageContent({ bundle }: WeatherPageContentProps) {
  const { current, hourly, daily, aqi } = bundle;
  const reduceMotion = useReducedMotion();
  const tempDisplay = useCountUp(current.tempC);
  const HeroIcon = getWeatherIcon(current.condition, current.isDay);

  const points = buildSparkPoints(hourly.map((h) => h.tempC));
  const sparkPath = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");

  const metrics: MetricCardProps[] = [
    { icon: Gauge, label: "AQI", value: `${aqi.aqi} · ${aqi.label}`, index: 0 },
    { icon: Sun, label: "UV Index", value: `${current.uvIndex}`, index: 1 },
    { icon: Droplets, label: "Humidity", value: `${current.humidity}%`, index: 2 },
    { icon: Wind, label: "Wind", value: `${current.windSpeedKph} km/h`, index: 3 },
    { icon: Waves, label: "Pressure", value: `${current.pressure} hPa`, index: 4 },
    { icon: Eye, label: "Visibility", value: `${(current.visibilityM / 1000).toFixed(1)} km`, index: 5 },
    { icon: Thermometer, label: "Dew Point", value: `${current.dewPointC}°`, index: 6 },
  ];

  const insights = buildInsights(bundle);

  return (
    <div className="flex flex-col gap-6">
      {/* 1 — Hero */}
      <Card index={0} variant="elevated" className="relative overflow-hidden rounded-4xl">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-16 -top-24 h-72 w-72 rounded-full bg-violet-500/25 blur-[100px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -right-10 h-64 w-64 rounded-full bg-cyan-400/15 blur-[100px]"
        />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-mist-400">
              {current.city}
              {current.country ? `, ${current.country}` : ""}
            </p>
            <div className="mt-2 flex items-end gap-3">
              <span className="text-gradient-accent font-display text-7xl font-semibold tabular-nums">
                {tempDisplay}°
              </span>
              <span className="mb-2 text-base capitalize text-mist-300">{current.description}</span>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-mist-400">
              <span>Feels like {current.feelsLikeC}°</span>
              <span>
                H:{current.tempMaxC}° L:{current.tempMinC}°
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <motion.div
              animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
              transition={reduceMotion ? undefined : { duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-400/20 to-violet-500/20"
            >
              <HeroIcon className="h-14 w-14 text-cyan-300" strokeWidth={1.5} />
            </motion.div>
            <div className="flex flex-col gap-2 text-sm text-mist-300">
              <span className="flex items-center gap-2">
                <Sunrise className="h-4 w-4 text-amber-400" />
                {formatLocalClock(current.sunrise, current.timezoneOffset)}
              </span>
              <span className="flex items-center gap-2">
                <Sunset className="h-4 w-4 text-amber-400" />
                {formatLocalClock(current.sunset, current.timezoneOffset)}
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* 2 — Hourly forecast */}
      <Card index={1} variant="widget" className="flex flex-col gap-4 rounded-4xl">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-mist-400">Hourly forecast</p>
        <div className="relative h-12 w-full">
          <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="h-full w-full overflow-visible">
            <path d={sparkPath} fill="none" className="stroke-cyan-400/60" strokeWidth="1.5" />
          </svg>
        </div>
        <div className="flex gap-5 overflow-x-auto pb-1">
          {hourly.map((h) => {
            const HourIcon = getWeatherIcon(h.condition);
            return (
              <div key={h.dt} className="flex shrink-0 flex-col items-center gap-1.5 text-xs text-mist-400">
                <span>{formatLocalHour(h.dt, current.timezoneOffset)}</span>
                <HourIcon className="h-4 w-4 text-cyan-300" strokeWidth={1.75} />
                <span className="font-medium text-white">{h.tempC}°</span>
              </div>
            );
          })}
        </div>
      </Card>

      {/* 3 — Metrics grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {metrics.map((m) => (
          <MetricCard key={m.label} {...m} />
        ))}
      </div>

      {/* 4 — Seven-day forecast */}
      <Card index={8} variant="widget" className="flex flex-col gap-4 rounded-4xl">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-mist-400">7-day forecast</p>
        <div className="flex flex-col gap-2.5">
          {daily.map((d) => {
            const DayIcon = getWeatherIcon(d.condition);
            const rangeMin = Math.min(...daily.map((x) => x.tempMinC));
            const rangeMax = Math.max(...daily.map((x) => x.tempMaxC));
            const span = rangeMax - rangeMin || 1;
            const leftPct = ((d.tempMinC - rangeMin) / span) * 100;
            const widthPct = ((d.tempMaxC - d.tempMinC) / span) * 100;
            return (
              <div key={d.dt} className="flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.03] px-3 py-2.5">
                <span className="w-10 shrink-0 text-xs font-medium text-mist-300">
                  {formatLocalDay(d.dt, current.timezoneOffset)}
                </span>
                <DayIcon className="h-4 w-4 shrink-0 text-cyan-300" strokeWidth={1.75} />
                <span className="flex w-12 shrink-0 items-center gap-1 text-[11px] text-mist-400">
                  <CloudRain className="h-3 w-3" />
                  {Math.round(d.pop * 100)}%
                </span>
                <div className="relative h-1.5 flex-1 rounded-full bg-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${widthPct}%` }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{ left: `${leftPct}%` }}
                    className="absolute h-full rounded-full bg-gradient-to-r from-violet-400 to-cyan-400"
                  />
                </div>
                <span className="w-16 shrink-0 text-right text-xs text-mist-400">
                  <span className="text-white">{d.tempMaxC}°</span> / {d.tempMinC}°
                </span>
              </div>
            );
          })}
        </div>
      </Card>

      {/* 5 — Atmospheric conditions */}
      <div className="flex flex-wrap gap-2.5">
        {insights.map((text) => (
          <Badge key={text} variant="accent" className="px-3 py-2 text-xs font-normal normal-case">
            {text}
          </Badge>
        ))}
      </div>
    </div>
  );
}
