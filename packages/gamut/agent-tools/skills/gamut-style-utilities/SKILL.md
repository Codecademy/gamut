---
name: gamut-style-utilities
description: Use this skill when authoring Gamut styles with @codecademy/gamut-styles — css(), variant(), states(), StyleProps from variance, or the useTheme() escape hatch; choosing between these APIs and system props; semantic tokens with ColorMode.
---

# Gamut style utilities

Source: `@codecademy/gamut-styles` — [`variance/props.ts`](https://github.com/Codecademy/gamut/blob/main/packages/gamut-styles/src/variance/props.ts) (`css`, `variant`, `states` built on `PROPERTIES.all`).

**See also:** [`gamut-theming`](../gamut-theming/SKILL.md) (which theme, `GamutProvider`, new themes). [`gamut-system-props`](../gamut-system-props/SKILL.md) (`system.*`, responsive props, `Box`). [`gamut-color-mode`](../gamut-color-mode/SKILL.md) (semantic color, `<ColorMode>`, `<Background>`). [Best practices](../../../../styleguide/src/lib/Meta/Best%20practices.mdx) and [system compose](https://gamut.codecademy.com/?path=/docs-foundations-system-compose--page).

## Overview

Use **`css()`**, **`variant()`**, and **`states()`** from `@codecademy/gamut-styles` for **typed, token-scaled** style objects (same scales as composed **`system.*`** props). Prefer **semantic** color keys so styles track **ColorMode** and theme.

For **layout-heavy** styled components, prefer composing **`system.*`** via `variance.compose()` (see **`gamut-system-props`**) instead of re-stating every longhand in `css()`.

## `css()` — static style objects

```tsx
import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

const Box = styled.div(css({ bg: 'navy-400', p: 4 }));
const Text = styled.div(css({ color: 'primary', p: 4 }));
```

## `variant()` and `states()` — branching and toggles

- **`variant()`** — mutually exclusive modes: `base`, `defaultVariant`, and a `variants` map (semantic colors, spacing shorthands, nested selectors such as `'&:hover'`).

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

- **`states()`** — independent boolean-style props (`base` + named keys).

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

Prefer **`variant` / `states`** over branching on raw `theme` fields inside styled **template literals** when the output is Emotion-managed CSS.

## `useTheme()` — escape hatch

Prefer **`css()`**, **`system.*`**, **`variant()`**, and **`states()`** for styling. Use **`useTheme()`** from `@emotion/react` when a token value must be read in **plain JS** (charts, canvas, third-party props), not as the default way to color DOM nodes.

```tsx
import { useTheme } from '@emotion/react';

const Sparkline = () => {
  const theme = useTheme();
  return <path strokeWidth={theme.spacing[4]} d="M0 0 L10 10" />;
};
```

## Key principles

- Prefer **semantic** color keys in `css` / `variant` / `states` so **ColorMode** and theme switches apply; see **`gamut-color-mode`**.
- Never hardcode hex in component styles — use tokens / semantic aliases.
- Prefer **`variant` / `states`** for modes and toggles instead of ad-hoc `theme` interpolation in template literals.
