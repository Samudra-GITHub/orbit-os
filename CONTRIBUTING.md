# Contributing to Orbit OS

Thanks for considering a contribution to this interface experiment.

## Getting set up

```bash
git clone https://github.com/Samudra-GITHub/orbit-os.git
cd orbit-os
npm install
npm run dev
```

## Before opening a PR

```bash
npm run lint
npm run build
```

Both must pass.

## Scope

- New widgets belong in `components/widgets/`, following the existing card/panel pattern.
- System-level UI (notifications, toasts) belongs in `components/system/`.
- Prefer Framer Motion for simple transitions and GSAP for sequenced/complex animation, matching existing usage.

## Reporting issues

Use the issue templates under `.github/ISSUE_TEMPLATE/`.
