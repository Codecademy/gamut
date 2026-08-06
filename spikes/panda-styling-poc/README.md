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

**Headline result:** (d) turned out to be stronger than "barely changes" —
`styled(C)(css(…), variant(…), states(…))` survives **unchanged**, because
`variance` already resolves styles at runtime and Emotion was only merging and
injecting them. Replacing that one layer (`src/gamut/engine/`) removes Emotion
internally and externally with no call-site migration. See
[`src/proof/`](./src/proof) and
`~/code/base camp/reboot/panda-via-gamut-option-a.md`.

**Uses the REAL Gamut Core theme.** Panda tokens are derived directly from
`@codecademy/gamut-styles` (a workspace dep) — the actual `corePalette`, the
`coreTheme`/`adminTheme` semantic light/dark `.modes`, and the real spacing /
fontSize / fontFamily / fontWeight / lineHeight / borderRadii scales — so values
match production (e.g. `hyper-500 #3A10E5`, `navy-800 #10162F`). Real Apercu +
Suisse web fonts load from Codecademy's CDN via `src/fonts.css`.

**Migrating consumers?** See [`BREAKING-CHANGES.md`](./BREAKING-CHANGES.md) for the
known Emotion→Panda breaking changes with before/after code examples.

## Run it (yarn + nx)

```
yarn install                              # from repo root — installs the workspace
yarn nx run panda-styling-poc:dev         # example page → http://localhost:5173
yarn nx run panda-styling-poc:build       # codegen + cssgen + vite build
yarn nx run panda-styling-poc:typecheck   # tsc --noEmit (proves token type-safety)
yarn nx run panda-styling-poc:proof       # 21 call-site parity checks (Option A)
yarn nx run panda-styling-poc:measure     # CSS size: prebuilt atomics vs injector
```

`codegen` (typed `styled-system/`) and `cssgen` (`src/gamut-static.css`) run
automatically as nx target dependencies.

## Two authoring models, both in here

This spike covers **both** halves of the styling question. They are not
alternatives to pick between — they're different tiers of the same design.

|            | Panda-native (Gamut's own internals)            | the Emotion-free engine (consumer surface) |
| ---------- | ----------------------------------------------- | ------------------------------------------ |
| for        | Gamut's **own** components                      | **existing consumer call sites**           |
| shape      | `styled(tag, recipe)`, `css({…})` → class names | `styled(C)(css(…), variant(…), states(…))` |
| resolution | static, zero-runtime                            | runtime (`variance` → `insertRule`)        |
| where      | `src/gamut/Button.tsx`, `src/App.tsx`           | `src/gamut/engine/`, `src/proof/`          |

Note the "three tiers" section further down numbers the **consumer-facing**
authoring paths (system props / module-scope `styled` / `styled` + a build step).
That's a different axis from this table, which splits Gamut's internals from the
consumer surface.

### `src/gamut/engine/` — Option A

An Emotion-free `styled` that preserves the **existing external API exactly**, so
today's Emotion-authored call sites migrate by changing one import. `variance` is
reused untouched — `css`/`variant`/`states` are the same factories consumers use
now, which is why the composed shape survives at full fidelity rather than being
approximated.

- `props.ts` — `css`/`variant`/`states`/`system.*` rebuilt on the **real** Gamut
  prop config, zero Emotion imports.
- `sheet.ts` — the injector that replaces Emotion: deterministic FNV-1a hashing
  (so SSR can't mismatch), `@layer gamut.consumer` for override precedence, the
  `focusVisible` stylis-plugin behaviour reimplemented, CSP nonce support, and
  `extractStyles()` in place of `extractCriticalToChunks`.
- `styled.tsx` — the composed call shape, `withComponent`, and a small CSS parser
  so `` styled.div`…` `` template literals work too.
- `theme.tsx` — the augmentable theme registry replacing
  `declare module '@emotion/react'`.

`src/proof/parity.tsx` renders a call site copied **verbatim** from
`mono/libs/ui/login-or-register/src/OAuthButtons/elements.tsx` (chosen because it
hits nested `@media`, responsive object values, system-prop aliases,
`withComponent`, and the bare-identifier `styled(X)(a, b)` shape at once) plus the
cases static extraction provably cannot reach — prop functions, `theme.x` access,
computed enum keys, ternaries, template literals. 21/21 pass, and the check for
"zero Emotion in the bundled runtime" reads its own bundle rather than asserting.

Findings write-up: `~/code/base camp/reboot/panda-via-gamut-option-a.md`.

## Which authoring path should I use? (three tiers)

The useful distinction isn't "runtime vs zero-runtime" — it's **per-instance vs
per-definition**. A `styled(...)` call at module scope has its styles fixed when
the module loads, so its class can be resolved once and reused by every instance.
Inline system props can't do that, because their values arrive per instance.

| tier | how you write it                 | when styles resolve                                   | reach for it when                                      |
| ---- | -------------------------------- | ----------------------------------------------------- | ------------------------------------------------------ |
| 1    | inline system props              | every render, per instance                            | values vary per instance, or it's a one-off            |
| 2    | `styled(...)` at module scope    | **once** per theme + variant combo, then a Map lookup | the component is reused, or rendered many times        |
| 3    | tier 2 **+** Panda in your build | build time; zero JS                                   | you want true zero-runtime and will add the build step |

### Tier 1 — inline system props: values that vary per instance

```tsx
// GOOD: a one-off nudge, and layout that differs at this usage site
<Box mt={16} px={24}>
  <FlexBox columnGap={12} alignItems="center" />
</Box>
```

Each distinct **combination** of values becomes one injected class, deduped by
hash. So 500 `<Box p={16} />` share a single class — the _lookup_ runs per render,
but the CSS does not grow.

```tsx
// AVOID: the same 6 props repeated at 40 call sites. The output is fine, but you
// pay per-instance resolution 40x and duplicate the intent. Promote to tier 2.
<Box p={24} mb={16} bg="background" borderRadius="md" border={1} borderColor="border-primary">
```

```tsx
// DON'T: a continuous value baked into a style prop. Every distinct value hashes
// to a NEW CLASS — animate this 0->100 and you have emitted 100 rules that will
// never be reused. Measured: `yarn nx run panda-styling-poc:measure` section C.
<Box width={`${percentComplete}%`} />
```

### When you genuinely need a runtime value — and what to do about it

Some values simply cannot be known ahead of time. The legitimate cases:

| case                     | example                                                      |
| ------------------------ | ------------------------------------------------------------ |
| driven by state or props | progress bars, sliders, expanding panels                     |
| measured from the DOM    | sticky offsets, virtualised row heights, popover placement   |
| supplied by data         | a brand colour from an API, an author-chosen accent in a CMS |
| animated                 | anything interpolating a value per frame                     |
| genuinely arbitrary      | `width: 37.5%`, `calc(100% - 17px)`, a computed `translateY` |

**The pattern for all of them is the same: keep the class static, make only the
_value_ dynamic, via a CSS custom property.** The class is then a tier-2 constant
that resolves once, and the per-instance part rides an inline `style` attribute —
which costs no CSS at all.

```tsx
// RECOMMENDED — one class, forever, no matter how many values occur.
const ProgressFill = styled(Box)(
  css({ height: 8, bg: 'primary', width: 'var(--fill-width)' })
);

<ProgressFill style={{ '--fill-width': `${percentComplete}%` }} />;
```

Measured on 100 distinct widths: **100 classes baked in vs 1 class via a custom
property.** The custom-property count doesn't grow with your data; the naive one
grows linearly and never stops.

This also survives SSR cleanly, because the class name is constant and the varying
part is a plain HTML attribute — nothing to extract, nothing to mismatch.

If you'd rather keep the old `styled(Tag)(props => styles)` authoring shape while
migrating, `styledDynamic` (`src/gamut/styledDynamic.tsx`) preserves it and applies
the computed styles as an inline `style` object. It forfeits pseudo-selectors and
media queries for that component — use `variant()`/`states()` for those, and this
hatch only for dynamic _values_.

### Tier 2 — `styled(...)` at module scope: reusable components

```tsx
import { css, states, styled, variant } from '@codecademy/gamut-styles';

// Resolves ONCE at first render. Every instance after is a Map lookup.
const Card = styled(Box)(
  css({ p: 24, mb: 16, bg: 'background', borderRadius: 'md' }),
  variant({
    defaultVariant: 'raised',
    variants: { raised: { boxShadow: 'md' }, flat: { boxShadow: 'none' } },
  }),
  states({ interactive: { cursor: 'pointer' } })
);

<Card variant="flat" interactive />;
```

Memoisation applies because every argument is _predictable_ — `css()` reads only
the theme, `variant()`/`states()` declare which props they read. A hand-written
function opts the component out, since it could read anything:

```tsx
// NOT memoised — resolves per render. Correct, just not free.
const Bar = styled(Box)<{ $pct: number }>((props) => ({
  width: `${props.$pct}%`,
}));
```

That's the rule of thumb: **fixed styles → `styled`; per-instance values →
system props.** They compose freely, so the usual shape is a `styled` component
with a couple of system props at the call site:

```tsx
<Card variant="raised" mt={32} /> // tier 2 for the component, tier 1 for the nudge
```

### Tier 3 — add Panda to your build for true zero-runtime

**The component code does not change at all.** You add a ~12-line config and a
build step; the same tier-2 `Card` above now resolves at build time instead of at
first render.

```ts
// your-app/panda.config.ts — the ONLY new code
import { defineConfig } from '@pandacss/dev';
import { gamutPreset } from '@codecademy/gamut-styles/panda-preset';

export default defineConfig({
  presets: [gamutPreset], // Gamut's tokens, semantic colours, recipes
  importMap: {
    // tells Panda's extractor that css/styled imported from Gamut are Panda calls
    css: '@codecademy/gamut-styles',
    jsx: '@codecademy/gamut-styles',
  },
  include: ['./src/**/*.{ts,tsx}'],
  outdir: 'styled-system',
  jsxFramework: 'react',
});
```

```jsonc
// package.json — extraction runs before your bundler's CSS pipeline
"scripts": { "prebuild": "panda cssgen --outfile src/app-static.css" }
```

Verified across a real package boundary — including that Gamut's build and the
consumer's build produce **byte-identical class names** for identical styles, the
failure that would otherwise render components silently unstyled. See
`~/code/base camp/reboot/panda-via-gamut-option-b.md`.

Worth it when: you have a measured styling cost on a hot page, or a hard
zero-runtime requirement. Not worth it when: you'd rather not own Panda in your
build pipeline — tiers 1 and 2 work with **zero** build configuration, which is
the whole point of the facade.

## Example page (`src/App.tsx`)

A small Vite page demonstrating **Panda variants** and switching:

- the **Button atoms** (`FillButton`/`StrokeButton`/`TextButton`/`CTAButton`/`IconButton`) with the real prop surface (`variant`/`size`/`icon`/`iconPosition`/`href`/`disabled`)
- a `FillButton` grid across every `variant` × `size` (+ `disabled`)
- a `variant()`-style recipe (`<Anchor tone="…">`) and `states()`-style booleans (`<Wrapper disabled center>`)
- ambient **colorMode** (light/dark) + **theme** (core/admin) switchers (attribute flips)
- a static **`<Background bg="navy-800">`** surface with its own contrast-selected mode

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

### ✅ Button atoms — SAME external API as Gamut (the key proof)

`src/gamut/Button.tsx` reproduces the real atoms — `FillButton`, `StrokeButton`,
`TextButton`, `CTAButton`, `IconButton` — with the actual prop surface: `variant`
(`primary`/`secondary`/`danger`/`interface`), `size` (`small`/`normal`/`large`),
`icon` + `iconPosition` (via an `InlineIconButton` equivalent), `href` (polymorphic
`ButtonBase` renders an `<a>`), `disabled`, and system props. Backed by per-atom
Panda recipes (`gmt-fill/stroke/text/cta/icon-button`). A consumer's
`<FillButton variant="primary" size="small" icon={Icon}>` / `<IconButton icon tip tipProps>`
/ `<FillButton href="…">` compiles and renders unchanged — the only difference is
`styled` comes from Gamut, not Emotion. `IconButton` wraps a **Panda-native
`ToolTip` rebuild** (`src/gamut/ToolTip.tsx`) — same API (`info`/`placement`/
`alignment`/`closeOnClick`/`id`) authored in Panda `css`, NOT imported from the
Emotion package (spike stays Emotion-free). Simplified to top-center placement.

### ✅ Provider / ColorMode / Background separation matches real usage

Per mono's idiom, `GamutProvider` is the PROVIDER (selects the theme — `data-panda-theme`);
a single `<ColorMode mode>` sets the ambient mode; `<Background bg="<palette>">`
handles individual static-themed surfaces (contrast-selected mode). `ColorMode` is
used once. `GamutProvider` sheds its Emotion job — no `CacheProvider`/
`createEmotionCache`, no Emotion `ThemeProvider`, no `<Global>` injection; consumers
import one static stylesheet instead. `styled` is re-exported from the facade
(never `@emotion/styled`).

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
- `src/gamut/*` — facade: `styled`, `Box`, the Button atoms (`Button.tsx`) + polymorphic `ButtonBase`, `ToolTip` (Panda rebuild), `ColorMode`, `Background`, `GamutProvider`, `getColorValue`, `styledDynamic`, barrel
- `src/authoring-comparison.tsx` — today's idioms vs Panda, side by side
- `src/App.tsx` — the example page (variants + switchers + escape-hatch demos)
- `project.json` — nx targets (codegen/cssgen/typecheck/build/dev)
