import nextConfig from "eslint-config-next";
import nextTypescriptConfig from "eslint-config-next/typescript";

/**
 * Flat config (ESLint 9 / Next.js 16). `eslint-config-next`'s default
 * export wires React, JSX a11y, and import-order rules on top of
 * `next/core-web-vitals`; the `/typescript` subpath layers in
 * typescript-eslint's recommended rule set for `.ts`/`.tsx` files. Both
 * are designed to be combined — see node_modules/eslint-config-next/dist.
 */
const eslintConfig = [
  {
    ignores: [".next/**", "out/**", "build/**", "node_modules/**", "next-env.d.ts"],
  },
  ...nextConfig,
  ...nextTypescriptConfig,
  {
    // `eslint-plugin-react-hooks@7`'s "recommended" set (pulled in above via
    // `eslint-config-next`) added React Compiler-oriented safety rules as
    // hard errors. Orbit doesn't build with the React Compiler, and two of
    // these fire on patterns used deliberately and extensively across the
    // app:
    //   - `set-state-in-effect`: every "hydrate from localStorage on mount,
    //     then persist on change" hook (useHydration, useMood, useItinerary,
    //     usePackingList, useFocusSettings, useFocusSessions, ThemeProvider,
    //     useCountUp, useCommandPalette) calls setState inside an effect —
    //     this is exactly the "synchronize with an external system" case
    //     React's own docs carve out as correct effect usage.
    //   - `static-components`: components resolved dynamically from data
    //     (`getWeatherIcon(condition)` → `<Icon />`) look identical to a
    //     genuine "component created during render" bug to this rule, but
    //     it doesn't flag the equivalent object-lookup form (`icons[id]`)
    //     used just as often elsewhere in the codebase — inconsistent
    //     enough to not be a reliable gate.
    //   - `preserve-manual-memoization`: a React Compiler readiness check —
    //     it flags a couple of plain `useMemo(() => fn(seedData), [])` calls
    //     it can't prove it could re-derive on its own. Since Orbit has no
    //     `babel-plugin-react-compiler` wired into the build, there's no
    //     actual compiler pass to satisfy; this only matters if that changes.
    // Downgraded to warnings rather than disabled: still visible in `npm
    // run lint`, and worth revisiting if Orbit ever adopts the Compiler.
    rules: {
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/static-components": "warn",
      "react-hooks/preserve-manual-memoization": "warn",
    },
  },
];

export default eslintConfig;
