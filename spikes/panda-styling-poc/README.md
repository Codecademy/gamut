# Gamut → Panda CSS spike (GMT-1715)

Branch: `cass-GMT-1715` (base `cass-gmt-1709`). A **yarn workspace + nx project**
(`spikes/panda-styling-poc`, registered via root `workspaces: ["spikes/*"]`),
isolated from the published `packages/*`. Explores whether Panda can replace
Emotion while keeping (a) the `variance`-style authoring helpers, (b) type-safe
theme tokens, (c) runtime **theme + color-mode switching** like the Storybook
switchers, and (d) an **external API that barely changes**. Grounded in the real
`packages/gamut/src/Button`, `packages/styleguide/.storybook`, and the
`gamut-style-utilities` / `gamut-system-props` / `gamut-color-mode` /
`gamut-theming` skills.

**Uses the REAL Gamut Core theme.** Panda tokens are derived directly from
`@codecademy/gamut-styles` (a workspace dep) — the actual `corePalette`, the
`coreTheme`/`adminTheme` semantic light/dark `.modes`, and the real spacing /
fontSize / fontFamily / fontWeight / lineHeight / borderRadii scales — so values
match production (e.g. `hyper-500 #3A10E5`, `navy-800 #10162F`). Real Apercu +
Suisse web fonts load from Codecademy's CDN via `src/fonts.css`.

## Run it (yarn + nx)

```
yarn install                              # from repo root — installs the workspace
yarn nx run panda-styling-poc:dev         # example page → http://localhost:5173
yarn nx run panda-styling-poc:build       # codegen + cssgen + vite build
yarn nx run panda-styling-poc:typecheck   # tsc --noEmit (proves token type-safety)
```

`codegen` (typed `styled-system/`) and `cssgen` (`src/gamut-static.css`) run
automatically as nx target dependencies.

## Example page (`src/App.tsx`)

A small Vite page demonstrating **Panda variants** and switching:

- the `Button` recipe across every `variant` × `size` (+ `disabled`)
- a `variant()`-style recipe (`<Anchor tone="…">`) and `states()`-style booleans (`<Wrapper disabled center>`)
- ambient **colorMode** (light/dark) + **theme** (core/admin) switchers (attribute flips)
- a static **`<Background bg="navy">`** surface with its own contrast-selected mode

---

## FINDINGS (running log)

### ✅ Type-safe tokens — native, stronger than today

`tsc` passes on valid usage; bad token / variant / size all **fail** `tsc`
(`strictTokens` + generated `ColorToken` / variant unions). The guardrail even
caught a raw `minHeight="100vh"` (wanted the `screen` size token). `Background`'s
`bg` prop is typed to the raw palette tokens.

### ✅ API shape — NO `className`; prop/object authoring, close to today

You style with **system-style props on components** + typed variant/state props +
the `css` prop — not `className={css(...)}`. `src/authoring-comparison.tsx` maps
every Best-practices idiom:

| Today (gamut, Emotion)                                  | Panda equivalent                                                                       | Closeness                                                     |
| ------------------------------------------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| `<Box padding={4} bg="primary" />`                      | `<Box padding="4" bg="primary" />`                                                     | ~identical (token keys are strings)                           |
| `<FillButton variant="primary" size="small" />`         | `<Button variant="primary" size="small" />`                                            | identical                                                     |
| `styled.div(css({ p: 4 }))`                             | `styled('div', { base: { p: '4' } })` / `<Box p="4" />` / `<styled.div css={{...}} />` | **shape changes** (fn-composition → recipe config / css prop) |
| `styled.a(variant({ base, defaultVariant, variants }))` | `styled('a', { base, variants, defaultVariants })`                                     | very close                                                    |
| `styled.div(states({ disabled, center }))`              | `styled('div', { variants: { disabled: { true }, center: { true } } })`                | call site identical: `<Wrapper disabled center />`            |
| `StyleProps<typeof someStates>`                         | `StyledVariantProps<typeof Wrapper>`                                                   | 1:1                                                           |
| semantic tokens as values (`bg="primary"`)              | same                                                                                   | identical                                                     |

**The one real divergence:** `styled.div(css({...}))` — calling the factory with
a _style function_ — becomes `styled('div', { base })` (recipe config) or the
`css` prop, because Panda's static analyzer must see literal style objects.

### ✅ Background owns STATIC color-mode context (per the ColorMode/theming skills)

`<ColorMode mode="light|dark|system">` sets the **ambient** mode (high in the
tree, via `GamutProvider`). `<Background bg="<palette token>">` is for a
**static** fixed-palette surface — it picks the light/dark mode with best contrast
and establishes its OWN color-mode context + `background-current` for descendants.
The POC's `Background` sets `data-color-mode` from the palette (`src/gamut/Background.tsx`);
the navy `<Background>` on the example page makes `text` resolve to the dark value
with no `<ColorMode>` wrapper. Correct per skill guidance.

### ✅ `styled` factory + `GamutProvider` — work, and `GamutProvider` SHRINKS

`styled('button', recipe)` (Button) and inline `styled('div', {...})` (Card)
build; `styled` is re-exported from the Gamut facade (never `@emotion/styled`).
`GamutProvider` sheds its Emotion job — no `CacheProvider`/`createEmotionCache`,
no Emotion `ThemeProvider`, no `<Global>` injection; consumers import one static
stylesheet instead.

### ✅ Theme + ColorMode SWITCHING — matches the Storybook switchers

Today the decorator swaps a theme _object_ into `<GamutProvider theme={adminTheme}>`
and flips mode via `Background`/`ColorMode` — both are really "swap which CSS
custom properties are active." Panda does the same with pre-generated static CSS +
attribute flips. `src/gamut-static.css` contains `[data-color-mode=dark]`,
`[data-panda-theme=admin]`, and the combined `[data-panda-theme=admin][data-color-mode=dark]`
— so 5 themes × 2 modes switch at runtime by flipping attributes, **no re-render,
zero runtime cost**. The example page's switchers demonstrate it.

### ✅ Zero-runtime + bundling

`nx build` runs `codegen` → `cssgen` → `vite build`: 92 modules, one static CSS
asset (~19KB), no runtime style engine.

### ✅ Escape hatches — the two residuals are covered, API stays compatible

The usage survey found two things that don't fit pure zero-runtime; both are
handled by small facade additions so the external API stays compatible:

- **`getColorValue(alias, mode, theme)`** (`src/gamut/color-values.ts`) — reads a
  resolved color VALUE in JS (the charts/canvas case). Returns raw hex derived
  from the SAME real Gamut theme (`@codecademy/gamut-styles` `.modes` + `corePalette`)
  that builds the CSS vars, so it can't drift.
  The example page feeds it into an SVG "chart" that recolors when you flip the
  theme/colorMode switchers. Analog of gamut's `_getColorValue`.
- **`styledDynamic(Tag)(props => styles)`** (`src/gamut/styledDynamic.tsx`) —
  keeps the `styled(fn)` authoring shape for genuinely dynamic VALUES; applies the
  computed object as inline `style` (forfeits zero-runtime for that one
  component). `$`-prefixed transient props are stripped from the DOM. The example
  page drives a prop-controlled `<Meter>` width with it. Use `variant()`/`states()`
  for dynamic + pseudo-selector cases.

Both Panda's CSS vars and `getColorValue` read the same real
`@codecademy/gamut-styles` theme — the portable-token story, and what makes the
JS resolver safe (it can't drift from the CSS).

### ⚠️ Dynamic variant selection needs `staticCss` (design-system requirement)

Panda tree-shakes recipe variants to those it sees as **static literals**. The
example page selects variants in a `.map()` (`variant={variant}`), so at first
`secondary`/`large` were **missing** from the CSS. A design system must force-emit
all variants so consumers can pass any variant (incl. dynamically):
`staticCss: { recipes: { button: ['*'] }, themes: ['admin'] }`. After that, all
`gmt-button--variant_*` / `--size_*` classes ship.

### ⚠️ When runtime styles ARE genuinely needed (per Panda docs)

Panda is build-time; it "silently skips" styles it can't statically read (dynamic
keys, computed values, function-derived values, `colorMap[runtimeKey]`). Genuine
cases that need a runtime path, and the Panda-sanctioned mechanism:

| Case (Gamut-relevant)                                                                 | Mechanism                                                                                                                                                    |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Value unknown at build — user/CMS/API color, drag/popover coordinates, computed px    | inline `style` + CSS var, `style={{ '--x': token.var('colors.primary') }}` then `css({ color: 'var(--x)' })` — **stays a token, so ColorMode still applies** |
| Dynamically-selected recipe variant (`variant={x}`)                                   | `staticCss` (pre-generate) — above                                                                                                                           |
| Non-CSS consumer needs a resolved VALUE — @nivo/canvas/`fill`, 3rd-party inline style | `token()` / our `getColorValue()` (raw hex; not themeable after read)                                                                                        |
| Prop-conditional style with pseudo-selectors                                          | `variant()`/`states()` (static) — not the inline hatch                                                                                                       |
| Truly runtime theme (arbitrary, not a predefined theme)                               | Panda `injectTheme()` (dynamic theme injection)                                                                                                              |
| Progress/meter width, dynamic non-token values                                        | inline `style` (our `styledDynamic`)                                                                                                                         |

**CSP note:** the recommended dynamic path is inline styles, which strict CSP
`style-src` blocks (chakra-ui/panda #1709). Gamut passes a CSP nonce to Emotion's
cache today; under Panda the _static sheet_ needs no nonce, but the inline-style
escape hatch for dynamic values reintroduces a CSP consideration for consumers
with strict policies. **Prefer the CSS-var pattern (themeable + fewer inline
styles) over raw inline hex wherever the value is a token.**

---

## Consumer-surface change analysis (beyond "`styled` comes from Gamut")

Day-to-day usage (components + system props + semantic tokens + variants) stays
largely the same. Beyond `styled`'s import source, the real changes are:

| Change                                                                                           | Impact                                                                                                                                            |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Import one static stylesheet once                                                                | NEW, but replaces Emotion cache/SSR wiring — net simpler                                                                                          |
| **`css` prop** (Emotion JSX pragma)                                                              | Breaks if used; steer to system props / `css()` / `styled`. Hardest lock-in                                                                       |
| Theme customization                                                                              | Emotion theme objects → Panda `themes` config / token overrides                                                                                   |
| **Reading resolved color VALUES in JS** (`useTheme().colors.x`, charts/canvas, `_getColorValue`) | Tokens resolve to `var(--…)`, not hex → use the provided **`getColorValue()`** escape hatch. **Watch BarChart / canvas**                          |
| **Dynamic prop-driven `styled(fn)` styles**                                                      | Not statically extractable → codemod to `variant()`/`states()`, or use the **`styledDynamic()`** escape hatch (inline style, that component only) |
| SSR                                                                                              | No Emotion critical-CSS extraction; ship the static sheet                                                                                         |
| Tests                                                                                            | `@emotion/jest` matchers (`toHaveStyleRule`) change                                                                                               |
| Build                                                                                            | Consumers no longer transpile Emotion / run `@emotion/babel-plugin`                                                                               |

---

## Still NOT proven (open per the recommendation)

- **Rspack + Module Federation** with a shared stylesheet (platform — highest risk).
- A browser render wasn't visually verified beyond dev-server boot (`yarn nx run panda-styling-poc:dev`).
- The escape hatches are prototypes: `styledDynamic` handles dynamic values but not
  dynamic + pseudo-selectors; `getColorValue` is theme+mode aware but resolves for
  the mode you pass (charts re-resolve on mode change).

## Files

- `panda.config.ts` — derives Panda tokens/themes/recipe from the REAL `@codecademy/gamut-styles` theme (corePalette + coreTheme/adminTheme `.modes` + scales)
- `src/fonts.css` — real Apercu/Suisse `@font-face` (Codecademy CDN)
- `src/gamut/*` — facade: `styled`, `Box`, `Button`, `ColorMode`, `Background`, `GamutProvider`, `getColorValue`, `styledDynamic`, barrel
- `src/authoring-comparison.tsx` — today's idioms vs Panda, side by side
- `src/App.tsx` — the example page (variants + switchers + escape-hatch demos)
- `project.json` — nx targets (codegen/cssgen/typecheck/build/dev)
