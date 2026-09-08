"use client";

import { Droplets, Wind, Gauge, Sunrise, Sunset, CloudRain } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { formatLocalClock, formatLocalHour, getWeatherIcon, type WeatherBundle } from "@/lib/skycast";

function buildSparkPoints(values: number[]) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const stepX = 100 / (values.length - 1 || 1);
  return values.map((v, i) => ({ x: i * stepX, y: 24 - ((v - min) / span) * 20 - 2 }));
}

interface WeatherWidgetViewProps {
  bundle: WeatherBundle;
}

export function WeatherWidgetView({ bundle }: WeatherWidgetViewProps) {
  const reduceMotion = useReducedMotion();
  const { current, hourly, aqi } = bundle;
  const Icon = getWeatherIcon(current.condition, current.isDay);

  const hourlySlice = hourly.slice(0, 6);
  const points = buildSparkPoints(hourlySlice.map((h) => h.tempC));
  const sparkPath = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");

  const stats = [
    { icon: Droplets, label: `${current.humidity}%` },
    { icon: Wind, label: `${current.windSpeedKph} km/h` },
    { icon: Gauge, label: `AQI ${aqi.aqi} · ${aqi.label}` },
    { icon: CloudRain, label: `${Math.round((hourlySlice[0]?.pop ?? 0) * 100)}%` },
  ];

  return (
    <Card index={1} variant="widget" className="flex flex-col gap-5 rounded-4xl">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-mist-400">
            Weather · {current.city}
          </p>
          <div className="mt-2 flex items-end gap-2">
            <span className="text-gradient-accent font-display text-5xl font-semibold">
              {current.tempC}°
            </span>
            <span className="mb-1.5 text-sm capitalize text-mist-300">{current.description}</span>
          </div>
          <p className="mt-1 text-xs text-mist-400">Feels like {current.feelsLikeC}°</p>
        </div>
        <motion.div
          animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
          transition={reduceMotion ? undefined : { duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/20 to-violet-500/20"
        >
          <Icon className="h-10 w-10 text-cyan-300" strokeWidth={1.5} />
        </motion.div>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-cyan-300">
        {stats.map((s) => (
          <span key={s.label} className="flex items-center gap-1.5">
            <s.icon className="h-3.5 w-3.5" /> {s.label}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between text-[11px] text-mist-400">
        <span className="flex items-center gap-1.5">
          <Sunrise className="h-3.5 w-3.5 text-amber-400" />
          {formatLocalClock(current.sunrise, current.timezoneOffset)}
        </span>
        <span className="flex items-center gap-1.5">
          <Sunset className="h-3.5 w-3.5 text-amber-400" />
          {formatLocalClock(current.sunset, current.timezoneOffset)}
        </span>
      </div>

      <div className="border-t border-white/10 pt-4">
        <div className="relative mb-2 h-6 w-full">
          <svg viewBox="0 0 100 24" preserveAspectRatio="none" className="h-full w-full overflow-visible">
            <path d={sparkPath} fill="none" className="stroke-cyan-400/60" strokeWidth="1.5" />
            <motion.circle
              cx={points[0]?.x ?? 0}
              cy={points[0]?.y ?? 0}
              r="2.5"
              className="fill-cyan-300"
              animate={reduceMotion ? undefined : { scale: [1, 1.6, 1], opacity: [1, 0.6, 1] }}
              transition={reduceMotion ? undefined : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </svg>
        </div>
        <div className="flex items-center justify-between">
          {hourlySlice.map((h) => (
            <div key={h.dt} className="flex flex-col items-center gap-1 text-xs text-mist-400">
              <span>{formatLocalHour(h.dt, current.timezoneOffset)}</span>
              <span className="font-medium text-white">{h.tempC}°</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
