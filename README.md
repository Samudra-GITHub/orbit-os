<div align="center">

<img src="public/branding/logo-mark.svg" width="96" alt="Orbit OS logo" />

# Orbit OS

**An experimental operating-system interface for a personal dashboard, built from glass panels and spring motion.**

Widgets · AI workspace · notes, files and projects · command palette · notification center

<br />

**[Overview](#overview)** &nbsp;·&nbsp; **[Features](#features)** &nbsp;·&nbsp; **[Getting started](#getting-started)** &nbsp;·&nbsp; **[Architecture](#architecture)** &nbsp;·&nbsp; **[Structure](#project-structure)**

<br />

![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=nextdotjs&logoColor=white) ![React](https://img.shields.io/badge/React-19-20232a?style=flat-square&logo=react&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript&logoColor=white) ![Tailwind](https://img.shields.io/badge/Tailwind-4-06b6d4?style=flat-square&logo=tailwindcss&logoColor=white) ![Framer_Motion](https://img.shields.io/badge/Framer_Motion-animation-0055ff?style=flat-square&logo=framer&logoColor=white) ![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

</div>

---

## Overview

Orbit OS is an interface exploration, not a real OS. It asks what a personal dashboard would feel like if it borrowed from operating-system design (a persistent shell, a command palette, a notification center, a workspace of notes, files and projects, an AI surface) instead of dashboard templates. The visual language is a dark "Liquid Spatial UI" with translucent glass panels and a purple/cyan identity.

Most data is mocked. Only the weather views can call a live API.

## Preview

<p align="center">
  <img src="docs/screenshots/desktop-dashboard.webp" width="880" alt="Orbit OS dashboard: greeting card, weather, focus timer, timeline and finance widgets" />
</p>

<p align="center">
  <img src="docs/screenshots/command-palette.gif" width="640" alt="Opening the command palette and searching for weather" />
  <br />
  <sub>The command palette, recorded from the running app. Dashboard data and AI replies are mock data.</sub>
</p>

| AI chat | Workspace projects | Onboarding |
| :-- | :-- | :-- |
| <img src="docs/screenshots/desktop-ai-chat.webp" width="290" alt="AI chat with inline calendar and weather cards" /> | <img src="docs/screenshots/desktop-workspace.webp" width="290" alt="Kanban project board" /> | <img src="docs/screenshots/desktop-onboarding.webp" width="290" alt="Onboarding welcome screen" /> |

## Features

- **Dashboard** of independent glass widgets: greeting, weather, finance, health, focus timer, music player, calendar timeline and an AI insight card
- **AI workspace** with a chat canvas, conversation sidebar, context panel and a voice orb (`/ai`, `/ai/chat`, `/ai/voice`)
- **Workspace** with a notes editor, file explorer and preview, and a Kanban project board
- **Command center**: a command palette overlay with fuzzy search, suggestions and recent commands
- **System layer**: notification center, toasts, and theme and system providers
- **Onboarding flow** with a branded logo set and favicons (see [docs/branding.md](docs/branding.md))
- **Weather** from OpenWeatherMap, falling back to mock data if the key is missing or the request fails
- Spring-based motion, with `prefers-reduced-motion` handled globally

## Tech Stack

| Area | Technology |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS v4 (`@theme` tokens in `styles/globals.css`), `clsx`, `tailwind-merge` |
| Motion | Framer Motion, GSAP (cinematic moments only) |
| UI | Lucide icons, Recharts, `@radix-ui/react-slot` |
| Tooling | Prettier (with Tailwind plugin), `sharp` and `png-to-ico` for icon generation |

## Project Structure

```
orbit-os/
├── app/
│   ├── (orbit)/            # Shell-wrapped routes
│   │   ├── dashboard/
│   │   ├── ai/             # chat/, voice/
│   │   ├── weather/
│   │   └── workspace/      # notes/, files/, projects/
│   ├── onboarding/
│   └── page.tsx
├── components/
│   ├── layout/             # AppShell, Sidebar, Topbar, PageTransition
│   ├── ui/                 # Primitives: GlassSurface, Button, Card, Input, ...
│   ├── widgets/            # Dashboard widgets
│   ├── ai/  command/  workspace/  system/  motion/  ...
├── lib/
│   ├── constants/          # Commands, notifications, onboarding, theme data
│   ├── hooks/              # useCommandPalette
│   └── skycast/            # Weather client, parsers, mock data
├── styles/                 # globals.css plus colour, motion, radius, shadow and spacing tokens
├── public/                 # Branding assets, web manifest
├── scripts/                # generate-icons.mjs
└── docs/                   # design-bible.md, branding.md
```

## Getting Started

Requires Node.js and npm.

```bash
git clone https://github.com/Samudra-GITHub/orbit-os.git
cd orbit-os
npm install
npm run dev        # http://localhost:3000
```

Other scripts: `npm run build`, `npm run start`, `npm run lint`.

## Configuration

| Variable | Required | Purpose |
| --- | --- | --- |
| `OPENWEATHER_API_KEY` | No | Live weather data. Without it the weather widget and page use mock data. |

Copy `.env.example` to `.env.local` to set it.

## Architecture

Every route under `app/(orbit)/` shares one layout built on `AppShell` (sidebar, topbar, page transitions). Design tokens live in `styles/` and the Tailwind `@theme` block, and components consume tokens instead of hardcoded colors. The weather layer in `lib/skycast/` decides between a live OpenWeatherMap call (revalidated every 10 minutes) and mock data in one place, so widgets don't need to know which they received.

The design and engineering rules are written down in [docs/design-bible.md](docs/design-bible.md).

## Deployment

No deployment configuration is included. It is a standard Next.js app, so `npm run build` followed by `npm run start` serves it.

## Future Improvements

- Persistent workspace layouts
- Real data connections for the finance and health widgets
- Add real screenshots to this README

## License

MIT, see [LICENSE](LICENSE).
