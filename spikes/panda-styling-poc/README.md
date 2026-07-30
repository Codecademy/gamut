# Gamut → Panda CSS spike (GMT-1715)

Branch: `cass-GMT-1715` (base `cass-gmt-1709`). Isolated, self-contained — does
**not** touch the gamut workspaces. Explores whether Panda can replace Emotion
while (a) keeping the `variance`-style authoring helpers, (b) keeping type-safe
theme tokens, and (c) keeping runtime **theme + color-mode switching** the way
the Storybook switchers do today. Grounded in the real
`packages/gamut/src/Button` and `packages/styleguide/.storybook`.

## Run it

```
npm install
npm run codegen     # panda codegen → typed styled-system/
npm run typecheck   # tsc --noEmit
npm run cssgen      # → src/gamut-static.css (the one static sheet a consumer imports)
npm run build       # codegen + cssgen + vite build (proves it all bundles/renders)
npm run dev         # interactive: click the theme + colorMode switchers
```

## What it covers

- `styled` JSX factory (`src/gamut/Button.tsx`, and a consumer-authored `Card` in `App.tsx`)
- `GamutProvider`, `ColorMode`, `Background` re-implemented on Panda (`src/gamut/*`)
- A Gamut **facade barrel** (`src/gamut/index.ts`) — consumers import `styled`/`css`/components from here, never from `@emotion/*` or `styled-system/*`
- Runtime **theme** (core/admin) + **colorMode** (light/dark) switchers mirroring `globalTypes` (`src/App.tsx`)

---

## FINDINGS (running log)

### ✅ Type-safe tokens — stronger than today, and it holds across the factory

- `tsc` passes on valid usage; bad token / bad variant / bad size **fail** `tsc`
  (`color: 'chartreuse'` → rejected against generated `ColorToken`; `variant:'ghost'`,
  `size:'huge'` → rejected against the variant unions).
- `Background`'s `bg` prop is typed with Panda's generated `ColorToken` — the
  guardrail extends to component props, not just `css()`.
- **Verdict:** meets the hard requirement natively (generated, not hand-augmented).

### ✅ `styled` JSX factory — works, and comes FROM Gamut

- `styled('button', buttonRecipe)` (Button) and inline-recipe `styled('div', {...})`
  (consumer `Card`) both type-check and build.
- Re-exported from the facade barrel, so consumers do
  `import { styled } from '@codecademy/gamut-styles'` — never `@emotion/styled`.
- **Verdict:** the `createButtonComponent = styled(ButtonBase)(...)` pattern ports.

### ✅ ColorMode / GamutProvider / Background — work, and mostly SHRINK

- All three re-implemented on Panda and render/build cleanly.
- `ColorMode` = set `data-color-mode`; nested modes work (a forced-dark subtree
  inside a light tree resolves correctly via `[data-color-mode=dark] &`).
- `GamutProvider` sheds its Emotion job: **no `CacheProvider`/`createEmotionCache`,
  no Emotion `ThemeProvider`, no `<Global>` injection**. It's now optional (just
  sets the initial mode). Consumers import one static stylesheet instead.
- `Background` keeps the `background-current` React context; only the style
  application changes (Panda `css({ bg })` instead of Emotion `styled`).

### ✅ Theme + ColorMode SWITCHING — YES, matches the Storybook switchers

**This was the key open question.** Today the Storybook decorator swaps a whole
theme _object_ into `<GamutProvider theme={adminTheme}>` and flips color-mode via
`Background`/`ColorMode`. Both are really "swap which set of CSS custom properties
is active" — Emotion's `ThemeProvider` is mostly ceremony.

Panda does the same with **pre-generated static CSS + attribute flips**. The
generated `src/gamut-static.css` contains:

- `[data-color-mode=dark] { --colors-*: … }` (light/dark)
- `[data-panda-theme=admin] { --colors-*: … }` (theme)
- `[data-panda-theme=admin][data-color-mode=dark] { … }` (**combined** — every
  theme × mode combo is expressible)

So the 5 themes × 2 modes switch at runtime by setting `data-panda-theme` +
`data-color-mode` — **no re-render, no theme-object swap, zero runtime cost.**
`App.tsx`'s two `useState` switchers demonstrate it (see `npm run dev`).

- **Verdict:** runtime theme + colorMode switching is fully supported, and is a
  _better_ fit than Emotion because Gamut already themes via CSS variables.

### ✅ Zero-runtime output + bundling

- `panda cssgen` → static `src/gamut-static.css` (all themes/modes/recipes).
- `vite build` → 90 modules, one CSS asset (~18KB) + JS. No runtime style engine.

---

## Consumer-surface change analysis (beyond "`styled` comes from Gamut")

Day-to-day component usage (import components, use `css`/`states`/`variant`/system
props) stays largely the same IF Gamut ships pre-built CSS and keeps the facade
stable. Beyond `styled`'s import source, the real consumer-facing changes are:

| Change                                                                                               | Impact                                                                                                                                                                        |
| ---------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Import one static stylesheet** (`@codecademy/gamut-styles/styles.css`) once                        | NEW, but replaces Emotion cache/SSR extraction wiring — net simpler                                                                                                           |
| **`css` prop** (JSX pragma `@emotion/react`)                                                         | Breaks if used; steer to `css()` + `className` / system props. Hardest lock-in                                                                                                |
| **Theme customization**                                                                              | Custom themes move from Emotion theme objects → Panda `themes` config / token overrides. Affects theme authors                                                                |
| **Reading resolved color VALUES in JS** (`useTheme().colors.x`, chart/canvas libs, `_getColorValue`) | Tokens now resolve to `var(--…)` strings, not hex. JS that needs the computed value needs `getComputedStyle` or a values map. **Watch BarChart / anything drawing to canvas** |
| **SSR**                                                                                              | No Emotion critical-CSS extraction; just ship the static sheet                                                                                                                |
| **Tests**                                                                                            | `@emotion/jest` matchers (`toHaveStyleRule`) change; style assertions rewrite                                                                                                 |
| **Theme/colorMode switching**                                                                        | Same concept (attribute flip); `data-panda-theme` + `data-color-mode` instead of `<GamutProvider theme>` + `Background`                                                       |
| **Build**                                                                                            | Consumers no longer transpile Emotion / run `@emotion/babel-plugin`                                                                                                           |

**Bottom line:** the swap is breaking, but the consumer blast radius beyond
`styled`'s source is concentrated in: the `css` prop, JS-resolved color values
(charts), theme customization, and test style-assertions — all codemoddable or
documentable, consistent with the "breaking + codemod" plan.

---

## Still NOT proven (open per the recommendation)

- **Rspack + Module Federation** with a shared `styled-system`/stylesheet (spike #2,
  the highest-risk unknown for `platform`). Not attempted here.
- **Runtime-dynamic, non-token style values** (arbitrary computed styles) — must
  fall back to inline CSS vars; not exercised.
- **JS-resolved color values** for charts/canvas (`_getColorValue`) — flagged above
  as a real surface, not solved here.
- Full breadth of `system.*` responsive props; the `::after` focus-outline pseudo.
- A browser render was not visually verified (build + type-check only; `npm run dev`
  is available for manual verification).

## Files

- `panda.config.ts` — tokens, semantic (light/dark) tokens, `admin` theme, `button` recipe
- `src/gamut/*` — the facade: `styled` (Button), `ColorMode`, `Background`, `GamutProvider`, barrel
- `src/App.tsx` — consumer view + theme/colorMode switchers
- `src/gamut-static.css` — generated static sheet (after `cssgen`; git-ignored)
