# Orbit OS

**Experimental futuristic operating system interface.**

A glass-surfaced, widget-driven desktop concept — not a real OS, but an interface exploration of what a personal dashboard could feel like if it borrowed from operating-system design instead of dashboard templates.

<br/>

<img src="./assets/hero-placeholder.svg" width="100%" alt="Orbit OS hero" />

<br/>

## Floating Desktop

The workspace is a canvas of floating, glass-surfaced widgets rather than a fixed grid — weather, finance, health, focus timer, music player, and calendar all coexist as independent panels.

<br/>

## Widgets

| Widget | Purpose |
|:--|:--|
| `GreetingCard` | Time-aware greeting |
| `WeatherWidget` / `WeatherPageContent` | Current conditions and a dedicated weather view |
| `FinanceSnapshot` | At-a-glance financial summary |
| `HealthSnapshot` | Health metrics summary |
| `FocusTimer` | Focus/pomodoro-style timer |
| `MusicPlayer` | In-workspace music controls |
| `CalendarTimeline` | Timeline view of upcoming events |
| `AIInsightWidget` | AI-generated insight surface |

<br/>

## Animations

Motion is split across two engines: **Framer Motion** for component-level transitions and **GSAP** for more complex sequenced animation.

<br/>

## Glass UI

Built on Radix UI primitives with a glassmorphic visual language throughout — translucent panels, soft depth, and a system-style notification center (`components/system`).

<br/>

## Components

`components/` is organized by domain: `ai`, `branding`, `command` (command palette), `empty-states`, `layout`, `loading`, `motion`, `onboarding`, `providers`, `system` (notifications/toasts), `ui`, `widgets`, `workspace`.

<br/>

## Folder Structure

```
orbit-os/
├── app/
│   ├── (orbit)/
│   │   ├── ai/
│   │   ├── dashboard/
│   │   ├── weather/
│   │   └── workspace/
│   └── onboarding/
├── components/
│   ├── ai/
│   ├── command/
│   ├── system/          # notifications, toasts
│   ├── widgets/          # weather, finance, health, focus, music, calendar, AI insight
│   ├── workspace/
│   └── ui/
├── lib/
├── docs/
└── scripts/
```

<br/>

## Tech Stack

`Next.js 16` · `React 19` · `TypeScript` · `Framer Motion` · `GSAP` · `Recharts` · `Radix UI` · `Tailwind CSS 4`

<br/>

## Setup

```bash
git clone https://github.com/Samudra-GITHub/orbit-os.git
cd orbit-os
npm install
npm run dev
```

No environment variables required.

<br/>

## Roadmap

- [x] Floating widget desktop with glassmorphic UI
- [x] Weather, finance, health, focus, music, and calendar widgets
- [x] Notification center and command palette
- [x] Onboarding flow
- [ ] Persistent workspace layouts
- [ ] Real data connections for finance/health widgets

<br/>

## License

MIT — see [LICENSE](./LICENSE).

<br/>

<sub>Part of the Sams Studio product ecosystem. See the [profile](https://github.com/Samudra-GITHub) for the full lineup.</sub>
