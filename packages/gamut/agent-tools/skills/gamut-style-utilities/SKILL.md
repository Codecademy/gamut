---
name: gamut-style-utilities
description: Use this skill when authoring Gamut styles with @codecademy/gamut-styles — css(), variant(), states(), StyleProps from variance, or the useTheme() escape hatch; choosing between these APIs and system props; semantic tokens with ColorMode.
---

# Gamut style utilities

Source: `@codecademy/gamut-styles` — `packages/gamut-styles/src/variance/props.ts` (`css`, `variant`, `states` built on `PROPERTIES.all`).

See also: [`gamut-theming`](../gamut-theming/SKILL.md) (which theme, `GamutProvider`, new themes). [`gamut-system-props`](../gamut-system-props/SKILL.md) (`system.*`, responsive props, `Box`). [`gamut-color-mode`](../gamut-color-mode/SKILL.md) (semantic color, `<ColorMode>`, `<Background>`). [Best practices](https://gamut.codecademy.com/?path=/docs-meta-best-practices--page) and [system compose](https://gamut.codecademy.com/?path=/docs-foundations-system-compose--page).

## Overview

Use `css()`, `variant()`, and `states()` from `@codecademy/gamut-styles` for typed, token-scaled style objects (same scales as composed `system.*` props). Prefer semantic color keys so styles track ColorMode and theme.

For layout-heavy styled components, prefer composing `system.*` via `variance.compose()` (see `gamut-system-props`) instead of re-stating every longhand in `css()`.

**Wrapping an existing Gamut component** (`styled(Box)`, `styled(Text)`, …) in a raw template literal or plain object instead of `css()`/`variant()`/`states()` is a common bypass — before reaching for any of the APIs below on an already-Gamut component, read [`gamut-system-props`](../gamut-system-props/SKILL.md#dont-wrap-a-gamut-component-in-styled-to-hand-write-css) first. Most of the time the fix is deleting the `styled()` wrapper entirely, not picking a different one of these three functions.

**Every value inside `css()`/`variant()`/`states()` is only as good as the scale key you type — and a plausible-sounding key that doesn't exist won't warn you, it just silently fails to apply.** Don't infer a key name from what it should logically be called (e.g. `borderRadius: 'max'` for "fully rounded" — the real key is `full`); check the actual scale before typing it:

| Prop group                 | Scale file                                                                                                 | Real keys (non-exhaustive)                                    |
| -------------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| `borderRadius`             | `packages/gamut-styles/src/variables/borderRadii.ts`                                                       | `none`, `sm`, `md`, `lg`, `xl`, `full`                        |
| `p`/`m`/spacing            | `packages/gamut-styles/src/variables/spacing.ts`                                                           | `0`, `4`, `8`, `12`, `16`, `24`, `32`, `40`, `48`, `64`, `96` |
| `fontSize`                 | `packages/gamut-styles/src/variables/typography.ts`                                                        | `14`, `16`, `18`, `20`, `22`, …                               |
| `fontWeight`               | same file                                                                                                  | `base`, `title`, `400`, `700`                                 |
| `lineHeight`               | same file                                                                                                  | `base`, `title`, `spacedTitle`                                |
| `color`/`bg`/`borderColor` | `packages/gamut-styles/src/variables/colors.ts` + theme `modes` in `packages/gamut-styles/src/themes/*.ts` | palette names and the semantic aliases covered above          |

If you're not certain a key exists, grep the relevant file rather than guessing — a wrong key compiles (these are typically loosely typed as strings at the call site) and produces no error, it just doesn't render the intended style.

## `css()` — static style objects

```tsx
import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

// fixed color — deliberately does NOT adapt to color mode (rare; see caveat below)
const Box = styled.div(css({ bg: 'navy-400', p: 4 }));
// semantic color — adapts to color mode (the default choice, not the exception)
const Text = styled.div(css({ color: 'primary', p: 4 }));
```

**Read [`gamut-color-mode`](../gamut-color-mode/SKILL.md) before typing a raw palette name (`navy-400`, `green-0`, `yellow-900`, …) into a `css()`/`variant()`/`states()` color value.** The `navy-400` example above is the _exception_, not a template to copy — it's there to show the fixed-color escape hatch exists, not to model the default path. If you're defining a status/feedback color (success, warning, error, info-adjacent), check first whether a semantic token already covers it — `background-success`/`feedback-success`, `background-warning`/`feedback-warning`, etc. already exist and adapt correctly between light/dark mode; a same-hue raw palette pair (`green-0`/`green-900`) looks similar in whichever mode you tested in but silently stops adapting. Reach for a raw palette value only when the color must **not** adapt (illustrations, brand marks, a permanently fixed surface) — the same exception `gamut-review` Check 4 and `gamut-system-props` use for this exact judgment call.

## `variant()` and `states()` — branching and toggles

- `variant()` — mutually exclusive modes: `base`, `defaultVariant`, and a `variants` map (semantic colors, spacing shorthands, nested selectors such as `'&:hover'`).

```tsx
import { variant } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

const Anchor = styled.a(
  variant({
    base: { p: 4 },
    defaultVariant: 'interface',
    variants: {
      interface: {
        color: 'text',
        '&:hover': { color: 'text-accent' },
      },
      inline: {
        color: 'primary',
        '&:hover': { color: 'secondary' },
      },
    },
  })
);
```

- `states()` — independent boolean-style props (`base` + named keys).

```tsx
import { states } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

const UtilityBox = styled.div(
  states({
    base: { mx: 4, my: 8, p: 16 },
    disabled: { bg: 'background-disabled', color: 'text-disabled' },
    center: { alignItems: 'center', justifyContent: 'center' },
  })
);
```

### `StyleProps` on React components

```tsx
import { states } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';

const panelShellStates = states({ base: { p: 4 }, dense: { p: 2 } });
const PanelShell = styled.div(panelShellStates);

export type PanelShellProps = StyleProps<typeof panelShellStates> & {
  title: string;
};

export const Panel: React.FC<PanelShellProps> = ({ title, ...rest }) => (
  <PanelShell {...rest}>{title}</PanelShell>
);
```

Prefer `variant` / `states` over branching on raw `theme` fields inside styled template literals when the output is Emotion-managed CSS.

## `useTheme()` — escape hatch

Prefer `css()`, `system.*`, `variant()`, and `states()` for styling. Use `useTheme()` from `@emotion/react` when a token value must be read in plain JS (charts, canvas, third-party props), not as the default way to color DOM nodes.

```tsx
import { useTheme } from '@emotion/react';

const Sparkline = () => {
  const theme = useTheme();
  return <path strokeWidth={theme.spacing[4]} d="M0 0 L10 10" />;
};
```

**For colors, `theme.colors[key]` is usually enough — it works with aliases and doesn't need a second lookup step.** `theme.colors[key]` (including semantic aliases like `'primary'` or `'background-current'`) returns a live CSS variable reference (`var(--color-key)`), which the browser resolves through the normal light/dark cascade. This works as a plain attribute value on DOM-rendered elements — including SVG presentation attributes like `stroke`/`fill` — exactly like `RadialProgress` does it in production: `stroke={theme.colors['background-current']}` (`packages/gamut/src/RadialProgress/index.tsx`). Reach for this first; it's simpler and it's what real Gamut components actually do for imperative SVG color.

**The exception**: a `var(...)` string doesn't mean anything to a consumer outside the DOM/CSS rendering pipeline — canvas 2D `fillStyle`, WebGL, or any color-math (contrast calculations, blending) that needs the actual resolved value. For those, use `useColorModes()` instead of bare `useTheme()` — but its `getColorValue()` only accepts a **raw palette key** (`hyper-500`, `navy-800`, …), not an alias: `getColorValue('primary')` silently returns `undefined`, since aliases are never merged into the raw-key map `getColorValue` reads. Resolve the alias first with `isColorAlias`, exactly like `packages/gamut-styles/src/Background.tsx` does before computing contrast:

```tsx
import { isColorAlias, useColorModes } from '@codecademy/gamut-styles';

const useResolvedColor = (color: Colors) => {
  const [, activeColors, , getColorValue] = useColorModes();
  return isColorAlias(activeColors, color)
    ? getColorValue(activeColors[color])
    : getColorValue(color);
};
```

Don't reach for this chain by default — it's for the narrower case where you need a literal value, not for every plain-JS color read.
