# Panda under the hood, Gamut's styling API unchanged

**What this proves:** Panda CSS can generate Gamut's design tokens and its
components' CSS, while every existing call site keeps working exactly as written —
with **Emotion gone entirely, runtime and types**. A consumer changes one import
plus one type-augmentation specifier.

```bash
yarn install                              # once, from the repo root
yarn nx run emotion-to-gamut-poc:dev      # → http://localhost:5174
```

Or from this folder: `yarn dev` / `yarn build` / `yarn typecheck`.

---

## 1. The only line that changes

```diff
- import styled from '@emotion/styled';
+ import { styled } from '@codecademy/gamut-styles';
```

`css`, `variant`, `states`, `styledOptions`, `Box`, `ColorMode`, `Background` were
**already** imported from Gamut, so those lines don't move either.

## 2. Who does what, and why

| | does what | why |
| --- | --- | --- |
| **Panda** (build time) | every design token as a CSS variable, for all 5 themes × 2 colour modes; static CSS for Gamut's own components | tokens and design-system components are a **closed set** Gamut controls, so they can be enumerated and emitted ahead of time — no JS needed to style them |
| **Gamut** (`variance`, runtime) | resolves `css()` / `variant()` / `states()` / system props at call sites | consumer values are **open** — `width="37.5%"`, a colour from an API, a prop-driven ternary. A build-time extractor can't see them, so something must resolve them at runtime |
| **This PoC's ~100 lines** (`src/gamut/sheet.ts`) | turns a resolved style object into a class name | this is *all* Emotion was doing for Gamut. Replacing only this is why nothing else has to change |

The split follows from what's knowable when. That's the whole design.

## 3. Why the API survives untouched

`css()`, `variant()` and `states()` come from `@codecademy/variance`. They already
return `(props) => CSSObject`, and they already resolve at runtime.

Emotion's only real job was **merging those results and hashing them into a
class.** So swapping Emotion out is a one-layer change, and `variance` isn't
forked, wrapped, or reimplemented — the real `@codecademy/variance` and the real
Gamut prop config are workspace dependencies here.

## 4. How theme mapping works

Gamut's theme object stores colours as CSS-variable **references**:

```ts
coreTheme.colors.primary === 'var(--color-primary)'
```

So `variance` never touches a hex value — it emits that reference, and something
must **define** it. Today a React `<Variables>` component does, at runtime. Here
Panda does, at build time.

A theme is then just a different set of alias assignments over the same palette:

| theme | light `--color-primary` |
| --- | --- |
| core | `var(--color-hyper-500)` |
| admin | `var(--color-blue-500)` |
| platform | `var(--color-hyper-500)` |
| lxStudio | `var(--color-sapphire)` |
| percipio | `var(--color-sapphire)` |

Switching theme or colour mode is therefore an **attribute flip** — `data-theme`
and `data-color-mode`. No rebuild, no re-render of styles, because only variable
*assignments* change. Both switchers are live on the page.

Colour mode **reassigns** variables rather than using selector conditions, which is
what makes nesting correct: a `[data-color-mode]` resolves from the *nearest*
ancestor. A descendant-selector approach (`[data-color-mode=dark] &`) gets
light-inside-dark wrong, because the inner element matches both conditions and
source order beats proximity. Section 4 on the page nests white-inside-navy to show
it.

## 5. What's demonstrated

Two sections are copied **verbatim** out of mono.

| # | Pattern | Source |
| --- | --- | --- |
| 1 | `variant({ prop, base, variants })` + `StyleProps` + `styledOptions` | **verbatim** `mono/libs/ui/brand/src/AppBar/AppBarSection.tsx` |
| 2 | A **Panda-backed** `StrokeButton` extended by the unchanged `styled(X)(css(…), states(…))` API — nested `@media`, responsive `{ _, xs }`, `withComponent` | **verbatim** `mono/libs/ui/login-or-register/src/OAuthButtons/elements.tsx` |
| 3 | System props — `<Box p={16} bg="primary" />` | real Gamut prop config + scales |
| 4 | `<ColorMode>` / `<Background>`, incl. nested light-inside-dark | — |
| 5 | `` styled.span`…` `` with `${props => …}` interpolation | mono has 234 of these |
| 6 | `<Global>` and `keyframes()` — the last two Emotion APIs Gamut used | 10 + 5 references in `packages/*` |

**Section 2 is the actual proof.** `StrokeButton`'s own CSS is 100% Panda static
output (`.gmt-stroke-button--variant_primary`), and a consumer extends it with the
untouched Emotion-era API. Panda underneath, API unchanged, in one component.

### Every Emotion API Gamut uses, and its replacement

The point of §6 on the page: **nothing is left over.** Measured across
`packages/*/src`:

| Emotion API | sites | replaced by |
| --- | --- | --- |
| `styled` | 111 | `src/gamut/styled.tsx` — same composed call shape |
| `css` | 17 | Gamut's own `css()` (already `variance`), or `injectGlobal` for globals |
| `Theme` / `useTheme` / `ThemeProvider` / `ThemeContext` | 17 | `src/gamut/theme.tsx` + variance's registry (§8) |
| `Global` | 10 | `<Global styles={…} />` — same call shape, plain style object |
| `keyframes` | 5 | `keyframes()` → returns the generated animation name |
| `isPropValid` | 4 | the prop config is already the source of truth |
| `createCache` / `CacheProvider` / `Options` / `StylisPlugin` | 10 | **nothing — not needed.** Class names are content-hashed and deterministic, so there's no per-request cache to thread and no stylis plugin chain to configure |
| `SerializedStyles` / `CSSObject` | 4 | `CSSObject` from `@codecademy/variance` |

The one genuinely unreplaced item is `@emotion/jest`'s `matchers` (4 test sites),
which assert on Emotion-generated CSS. Those need an equivalent matcher against
the Gamut stylesheet — straightforward, but not built here.

## 6. Verified mechanically

- `yarn typecheck` clean — including `src/type-safety.test-d.tsx`, 9 negative
  cases that must each error (see §8). Token safety intact: `fontSize={12}` is
  **rejected**.
- `yarn build` clean. 30kB of CSS, **3.46kB gzipped** (it compresses hard: mostly
  repeated variable declarations).
- Rendered in jsdom: **85 CSS variables referenced, 333 defined, 0 missing**;
  **32 classes in the DOM, 0 without a matching rule**.
- Panda emits all 5 themes × 2 modes, and all 4 `strokeButton` variant classes via
  `staticCss`.
- `<Global>` emits `body{margin:0}` **unscoped** (no class prefix), and
  `keyframes()` emits a complete `@keyframes gmt-kf-…{0%, 100%{opacity:1}50%{opacity:0.35}}`
  that the animating element references by name.
- `grep '@emotion' packages/variance/src` returns nothing; the built bundle
  contains no `serializeStyles` / `insertStyles` / `createCache` / `@emotion`.

## 7. Three things worth knowing (all found the hard way)

**Panda's extractor collides with Gamut's `css()`.** Both are called `css`. Point
Panda's `include` at files using Gamut's and it "extracts" them into nonsense —
`.bg_primary { background: primary }`, `.pos_left { position: left }` (from
`variant()` *keys*), `.__43 { _: 43px }` (from responsive `{ _: 43 }`). Nothing
references those classes so it renders fine; it just silently inflated the
stylesheet from 11kB to 27kB. Fix: Panda scans only its own config here. For a
consumer who *does* want Panda extracting their call sites, `importMap` is the
supported way to disambiguate.

**Core's palette is not a superset.** lxStudio and percipio add their own tokens
(`--color-sapphire`, `--color-percipioTextPrimary`, `--color-lxStudioSuccess`, plus
code-editor colours). Emitting only Core's palette left **33 variables dangling** —
and dangling variables fail silently, rendering unstyled. Fix: emit the union, plus
per-theme overrides.

**Dropping `preset-panda` halves the output.** Panda's default palette
(rose/fuchsia/violet/…) is dead weight for a design system with its own tokens.
Keeping `preset-base` for utilities and conditions is enough.

## 8. Theme type safety with no Emotion at all — including in the types

**Emotion is now gone from this PoC completely, types included.** The bundle check
above covers runtime; this section covers types.

### Why Emotion was in the types at all

`variance` needs **one mutable, global type slot** to learn what your theme
contains, so `scale: 'colors'` typechecks and token names autocomplete. That slot
used to be Emotion's `Theme` interface — and Emotion did nothing with it. It just
happened to be the interface everyone augmented.

`variance` already defined its own theme types (`BaseTheme`, `Breakpoints` in
`types/theme.ts`); it was *borrowing* Emotion's interface purely as the registry.
So it now owns the slot:

```ts
// packages/variance/src/types/theme.ts
export interface Theme extends BaseTheme {}   // ← augment this
```

Four files changed, all types-only: `types/theme.ts` (owns the registry and drops
`declare module '@emotion/react'`), plus `types/props.ts`, `types/config.ts` and
`utils/serializeTokens.ts` importing `Theme` from `./theme` instead. **`grep
'@emotion' packages/variance/src` now returns nothing.**

> Correction: earlier notes on this said "exactly two lines." That was wrong —
> it's four files, and one of them was variance augmenting Emotion itself.

### What a consumer changes

Same shape, different module:

```diff
- declare module '@emotion/react'       { export interface Theme extends CoreTheme {} }
+ declare module '@codecademy/variance' { export interface Theme extends CoreTheme {} }
```

That's the whole migration for the 19 real augmentation sites (18 in mono, 1 in
`platform/src/themes/platform.d.ts`). See `src/gamut-theme.d.ts`.

### Proof that nothing was lost: `src/type-safety.test-d.tsx`

`yarn typecheck` **is** the assertion — there's no runtime in that file. It pins
both halves of the question, and it fails in both directions: if a negative case
silently started compiling, TypeScript reports `Unused '@ts-expect-error'
directive`. (Verified by deliberately breaking one case.)

**Scale-valued props still validate against the theme** — these all error:

```ts
css({ fontSize: 12 });          // not a fontSize token
css({ p: 5 });                  // not a spacing token
css({ bg: 'chartreuse' });      // not a colour token or alias
<Box p={5} />;                  // still rejected as a JSX prop
```

**`variant()` and `states()` produce dependable types.** Resolved shapes:

```ts
StyleProps<typeof positionVariants>
//  = VariantProps<"position", false | "left" | "right" | "center"> & { theme?: Theme }
StyleProps<typeof toggleStates>
//  = Partial<Record<"compact" | "isFancy", boolean>>              & { theme?: Theme }
```

So the prop is named after `prop`, its values are the exact literal union of the
declared keys, and states are exactly the declared booleans. These all error:

```ts
{ position: 'middle' }    // not a declared variant
{ variant: 'left' }       // the prop is `position`
{ isFancy: 'yes' }        // states are booleans
{ hasBorder: true }       // never declared
```

**Worth knowing why this holds:** `variant()` and `states()` derive their prop
types from the **config object you pass them**, not from the theme. `Theme` only
appears in the `theme?:` member. So the registry swap can't affect them — only
scale-valued props (`p`, `bg`, `fontSize`) depend on `keyof Theme`, and those are
verified above.

## 9. Scope

```
panda.config.ts        Panda: tokens for 5 themes x 2 modes + a component recipe
src/
  App.tsx              the demo — real mono call sites, only the import changed
  gamut-panda.css      generated by `panda cssgen` (gitignored)
  gamut-theme.d.ts     the theme registry augmentation (§8)
  type-safety.test-d.tsx  compile-time proof that token safety survived (§8)
  gamut/               stands in for @codecademy/gamut-styles
    index.ts           the public surface — the "swap target"
    props.ts           css / variant / states / systemProps on the REAL config
    sheet.ts           style object → class name → <style>   ← replaces Emotion
    styled.tsx         the composed styled(C)(a, b, c) shape + template literals
    theme.tsx          GamutProvider, theme context, the 5 themes
    components.tsx     Box, FlexBox, Text, ColorMode, Background, StrokeButton
```

Deliberately out of scope, to keep this readable: SSR, performance measurement,
migrating Gamut's ~109 existing internal `styled` call sites to recipes, and
`Global` / `keyframes` / the `css` prop.
