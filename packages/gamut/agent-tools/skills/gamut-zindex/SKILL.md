---
name: gamut-zindex
description: Use this skill when setting a `zIndex` on a Gamut component or styled component, choosing a stacking layer for an overlay/portal/sticky element, typing a `zIndex` prop with `ZIndexType`, or fixing a raw numeric z-index flagged by `gamut/no-raw-z-index` — not for other system props (see gamut-system-props) or general css()/variant()/states() authoring (see gamut-style-utilities).
---

# Gamut Z-Index

Source: `@codecademy/gamut-styles` — `packages/gamut-styles/src/variables/zIndexes.ts` (scale + `ZIndexType`), `packages/gamut-styles/src/variance/config.ts` (`zIndex` system prop config). Lint rule: `packages/eslint-plugin-gamut/src/no-raw-z-index.ts`.

See also: [`gamut-system-props`](../gamut-system-props/SKILL.md) (`system.positioning`, the rest of the `zIndex` prop group). [`gamut-style-utilities`](../gamut-style-utilities/SKILL.md) (`css()`, `variant()`, `states()`). Storybook: [Foundations / Z-Index](https://gamut.codecademy.com/?path=/docs-foundations-z-index--page), [Meta / ESLint rules](https://gamut.codecademy.com/?path=/docs-meta-eslint-rules--page).

## Overview

Gamut coordinates stacking order through one semantic scale, `zIndexes`, exported from `@codecademy/gamut-styles`. Every `zIndex` in Gamut should reference a token from this scale rather than a magic number — a repo-wide eslint rule, `gamut/no-raw-z-index`, enforces it.

```tsx
import { zIndexes } from '@codecademy/gamut-styles';

<Box zIndex="modal">…</Box>              // token name — preferred
<Box zIndex={zIndexes.modal}>…</Box>      // equivalent numeric value
```

## The scale

Tokens are spaced by 100, low to high, leaving room for in-between escape-hatch numbers:

| Token        | Value | Use for                                                                                                 |
| ------------ | ----- | ------------------------------------------------------------------------------------------------------- |
| `underlay`   | -100  | Decorative layer behind content (underlines, backdrops, shadows)                                        |
| `base`       | 0     | Ground layer — local stacking context without lifting above siblings                                    |
| `foreground` | 100   | Raised in-flow layer above `underlay`/siblings, below all portal overlays; also sticky headers          |
| `floating`   | 200   | Portal floor — `BodyPortal` default; persistent floating page furniture (AI chat launcher, help bubble) |
| `appBar`     | 300   | Global app header/nav bar (aliased by the legacy `elements.headerZ` constant)                           |
| `flyout`     | 400   | Portaled side panel (`Flyout` = `Drawer` inside `Overlay`)                                              |
| `modal`      | 500   | `Overlay`, `Modal`, `Dialog` (share one portal primitive)                                               |
| `popover`    | 600   | Portal-mode `Popover` and the portaled `SelectDropdown` menu — above modal                              |
| `topmost`    | 700   | Top-most transient overlays: floating tooltips, toasts/notifications — nothing in Gamut sits above this |

**Talk to web platform before adding a new token to the scale.** Third-party widgets (injected marketing/chat scripts) set their own z-index and are outside Gamut's control — `topmost` is the ceiling for anything Gamut owns.

## Usage

### `zIndex` system prop

Available on `Box`/`FlexBox`/`GridBox` and any styled component composing `system.positioning`. Accepts, in order of preference:

1. A token name: `zIndex="popover"`
2. The scale's numeric value: `zIndex={zIndexes.popover}`
3. Arithmetic on a token, for a deliberate offset within a layer: `zIndex={zIndexes.foreground - 2}`
4. A raw number as an escape hatch for a genuine one-off: `zIndex={550}` — leave a comment justifying it

```tsx
<Box position="absolute" zIndex="popover">
  …
</Box>
```

### In `css()` / `variant()` / `states()`

Token names resolve the same way inside these — including in nested pseudo-selector objects — because they share the same scale-aware property config as the `zIndex` prop:

```tsx
import { css, variant } from '@codecademy/gamut-styles';

const styles = css({
  position: 'absolute',
  zIndex: 'popover',
  '&::before': {
    content: '""',
    zIndex: 'underlay',
  },
});

const cardVariants = variant({
  base: { zIndex: 'base' },
  variants: { raised: { zIndex: 'foreground' } },
});
```

### Typing a component's `zIndex` prop

Use `ZIndexType` (a token name, a raw number, or a CSS global like `'inherit'`) instead of `number` so consumers can pass a token:

```tsx
import { ZIndexType } from '@codecademy/gamut-styles';

export interface OverlayProps {
  zIndex?: ZIndexType;
}
```

### Portal / overlay component defaults

Several Gamut components already default their `zIndex` prop to a scale token — override only for a deliberate custom stacking order:

| Component                       | Default      | Notes                                                      |
| ------------------------------- | ------------ | ---------------------------------------------------------- |
| `BodyPortal`                    | `"floating"` | Base portal primitive several others build on              |
| `Overlay` (→ `Modal`, `Dialog`) | `"modal"`    |                                                            |
| `Flyout`                        | `"flyout"`   | Passes `zIndex="flyout"` to its internal `Overlay`         |
| `PopoverContainer`, `Popover`   | `"popover"`  | Portals via `<BodyPortal zIndex="popover">`                |
| `SelectDropdown` menu           | `"popover"`  | `react-select`'s `menuPortal`, portaled to `document.body` |
| `Toaster`                       | `"topmost"`  |                                                            |

## The `gamut/no-raw-z-index` eslint rule

**Level:** `error` (repo-wide, via root `.eslintrc.js`)

Flags a raw numeric literal in a `zIndex` JSX prop or a `zIndex`/`'z-index'` style-object key. Token names and arithmetic on a token are allowed; a variable is never flagged (the rule can't know what it resolves to).

```tsx
// ❌ Flagged
<Box zIndex={2} />;
const styles = css({ zIndex: 100 });

// ✅ OK
<Box zIndex="foreground" />;
const styles = css({ zIndex: 'popover' });
<Box zIndex={zIndexes.foreground + 1} />; // deliberate offset, arithmetic on a token
```

For a genuine one-off that doesn't map to a token, disable the rule inline with a comment justifying the choice:

```tsx
// eslint-disable-next-line gamut/no-raw-z-index -- must sit one layer below the legacy FCN nav (12)
<Box zIndex={11} />
```

## Common mistakes to avoid

- Don't hardcode a number when a token already names the intent (`zIndex={500}` → `zIndex="modal"`).
- Don't reference `elements.headerZ` in new code — it's a legacy alias for `zIndexes.appBar`; use the token directly.
- Don't type a new `zIndex` prop as `number` — use `ZIndexType` so callers can pass a token name.
- Don't add a new token to the scale without checking with web platform first; reach for the escape hatch (a raw number, or arithmetic on a token) for a one-off instead.
