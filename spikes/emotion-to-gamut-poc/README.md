# Panda under the hood, Gamut's styling API unchanged

**What this proves:** Panda CSS can generate Gamut's design tokens and its
components' CSS, while every existing call site keeps working exactly as written.
The only change a consumer makes is one import.

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

**Section 2 is the actual proof.** `StrokeButton`'s own CSS is 100% Panda static
output (`.gmt-stroke-button--variant_primary`), and a consumer extends it with the
untouched Emotion-era API. Panda underneath, API unchanged, in one component.

## 6. Verified mechanically

- `yarn typecheck` clean — and token safety is intact: `fontSize={12}` is
  **rejected**, because 12 isn't a `fontSize` token.
- `yarn build` clean. 30kB of CSS, **3.46kB gzipped** (it compresses hard: mostly
  repeated variable declarations).
- Rendered in jsdom: **85 CSS variables referenced, 333 defined, 0 missing**;
  **32 classes in the DOM, 0 without a matching rule**.
- Panda emits all 5 themes × 2 modes, and all 4 `strokeButton` variant classes via
  `staticCss`.

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

## 8. The one honest caveat

`src/gamut-theme.d.ts` still augments `@emotion/react`. It is **types-only** —
nothing at runtime imports Emotion.

`variance` anchors its whole prop type system to Emotion's `Theme` at two lines:

```
packages/variance/src/types/props.ts:1     import { Theme } from '@emotion/react';
packages/variance/src/types/config.ts:31   scale?: keyof Theme | MapScale | ArrayScale;
```

Without the augmentation `keyof Theme` is `never`, every `scale: 'colors'`
degrades, and you get cascading nonsense errors. Adding that one file took this PoC
**from 20+ type errors to 1**.

This isn't new migration work — **every mono app already has this file** (18, plus
1 in platform). A real migration repoints those two `variance` lines at a
Gamut-owned registry, and the 19 sites change specifier only.

## 9. Scope

```
panda.config.ts        Panda: tokens for 5 themes x 2 modes + a component recipe
src/
  App.tsx              the demo — real mono call sites, only the import changed
  gamut-panda.css      generated by `panda cssgen` (gitignored)
  gamut-theme.d.ts     the types-only Emotion touchpoint (§8)
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
