# Orbit OS — Mobile

A React Native (Expo) companion app for Orbit OS, separate from the Next.js
web app in the repo root. React Native's default bundler is **Metro** —
that's what `expo start` runs underneath; there's no extra setup needed to
"enable" it beyond a normal Expo project, which is what this is.

This is a fresh, minimal scaffold (blank TypeScript template), not a port
of the web app's screens — the two apps intentionally don't share code yet.

## Run it

```bash
npm install
npm run start   # opens the Expo dev server (Metro) with a QR code
npm run android # or: npm run ios / npm run web
```

You'll need [Expo Go](https://expo.dev/go) on a phone (or a simulator) to
open the QR code, unless you run `npm run web`.
