# Emotion → Gamut: same API, one import changed

A minimal proof that **today's Gamut styling API keeps working exactly as written**
when `styled` comes from Gamut instead of Emotion.

```bash
yarn install                                  # from the repo root, once
yarn nx run emotion-to-gamut-poc:dev          # → http://localhost:5174
```

Or from this folder: `yarn dev` / `yarn build` / `yarn typecheck`.

---

## The claim

This is the entire migration for a call site:

```diff
- import styled from '@emotion/styled';
+ import { styled } from '@codecademy/gamut-styles';
```

Everything else stays byte-identical. `css`, `variant`, `states`, `styledOptions`,
`Box`, `ColorMode`, `Background` were **already** imported from Gamut, so those
import lines don't move either.

## Why it works

`css()`, `variant()` and `states()` come from `@codecademy/variance`. They already
return `(props) => CSSObject` and already resolve **at runtime**. Emotion's only
real job was merging those results and turning them into a class.

So this PoC replaces that one step — `src/gamut/sheet.ts`, about 100 lines — and
reuses the rest untouched. `variance` is not forked, wrapped, or reimplemented; the
real `@codecademy/variance` and the real Gamut prop config are workspace
dependencies here.

That's why the API survives _exactly_ rather than approximately.

## What's proven, and where to look

Open the page — each numbered section renders live, and the last one dumps the CSS
the engine generated.

| #   | Pattern                                                                                        | Source                                                                           |
| --- | ---------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| 1   | `variant({ prop, base, variants })` + `StyleProps` + `styledOptions`                           | **verbatim** from `mono/libs/ui/brand/src/AppBar/AppBarSection.tsx`              |
| 2   | `css()` + `states()` composed, nested `@media`, responsive `{ _, xs }` values, `withComponent` | **verbatim** from `mono/libs/ui/login-or-register/src/OAuthButtons/elements.tsx` |
| 3   | System props — `<Box p={16} bg="primary" />`                                                   | real Gamut prop config + spacing/colour scales                                   |
| 4   | `<ColorMode mode>` and `<Background bg>`, including nested light-inside-dark                   | same contract as real Gamut                                                      |
| 5   | `` styled.span`…` `` template literals with `${props => …}` interpolation                      | mono has 234 of these                                                            |

Verified mechanically:

- `yarn typecheck` — clean. Token typesafety is intact: `fontSize={12}` is
  **rejected** because 12 isn't a `fontSize` token.
- `yarn build` — clean, and the output bundle contains **zero** Emotion:
  `serializeStyles`, `insertStyles`, `createCache`, `@emotion` all absent.
- Rendered in jsdom: 27 distinct generated classes, 3.8kB of CSS, `@media` rules
  preserved, `--color-*` variables emitted, and state props like `isFancy` stay
  **off** the DOM.

## How the pieces fit

```
src/
  App.tsx            the demo — real mono call sites, only the import changed
  main.tsx           <GamutProvider> wrapper
  gamut-theme.d.ts   the one remaining Emotion touchpoint (types only — see below)
  gamut/             stands in for @codecademy/gamut-styles
    index.ts         the public surface (the "swap target")
    props.ts         css / variant / states / systemProps on the REAL Gamut config
    sheet.ts         style object → class name → <style> tag   ← replaces Emotion
    styled.tsx       the composed styled(C)(a, b, c) shape + template literals
    theme.tsx        GamutProvider, theme context, CSS variables
    components.tsx   Box, FlexBox, Text, ColorMode, Background
```

### Two details worth knowing

**Colour mode reassigns CSS variables** rather than using selector-based
conditions. `<ColorMode mode="dark">` sets `data-color-mode`, which reassigns
`--color-*` for that subtree, so nested modes resolve from the **nearest** ancestor.
A selector-based approach (`[data-color-mode=dark] &`) gets light-inside-dark wrong,
because the inner element matches both conditions and source order wins over
proximity. Section 4 on the page demonstrates the nesting.

**`styledOptions` is now inert.** It's still exported so
`styled('div', styledOptions)` compiles unchanged, but it deliberately provides no
`shouldForwardProp` — `styled` derives the filter from the style functions
themselves (they report which props they read). So hand-maintained lists like
`styledOptions(['isFancy'])` don't need porting.

## The one honest caveat

`src/gamut-theme.d.ts` still augments `@emotion/react`. It is **types-only** —
nothing at runtime imports Emotion, as the bundle check confirms.

The reason: `@codecademy/variance` anchors its entire prop type system to Emotion's
`Theme` at exactly two lines.

```
packages/variance/src/types/props.ts:1     import { Theme } from '@emotion/react';
packages/variance/src/types/config.ts:31   scale?: keyof Theme | MapScale | ArrayScale;
```

Without the augmentation, `Theme` is `{}`, so `keyof Theme` is `never`, every
`scale: 'colors'` degrades, and you get cascading nonsense errors. (Building this
PoC, adding that one file took it from 20+ type errors to 1.)

This is not extra migration work — **every mono app already has this file** (18 of
them, plus 1 in platform). A real migration repoints those two `variance` lines at a
Gamut-owned registry, and the augmentation becomes:

```ts
declare module '@codecademy/gamut-styles' {
  export interface GamutTheme extends CoreTheme {}
}
```

Same shape, different specifier — a mechanical change at 19 sites.

## Scope

Deliberately out of scope, so this stays readable:

- **Zero-runtime / static CSS.** This PoC resolves styles at runtime, which is what
  makes the import-swap claim work with no build-tool changes. Producing static CSS
  via Panda is a separate concern.
- **SSR.** `sheet.ts` writes straight to the DOM. Class names are already
  deterministic (content-hashed), so server rendering is additive, not a redesign.
- **Performance.** Not measured here.
- `Global`, `keyframes`, and the `css` prop.
