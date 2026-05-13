---
name: gamut-theming
description: Use this skill when working with GamutProvider themes, Emotion theme tokens, or behavior that differs across Core, Admin, Platform, LX Studio, and Percipio — including new themes, token access in styled components, or debugging theme-specific styles.
---

# Gamut Theming

Source: `@codecademy/gamut-styles`

## Overview

Gamut uses Emotion's theme system. All styled components have access to a typed theme object containing every design token. Themes are org-specific collections of tokens; components work across all themes without modification as long as they use token aliases rather than hardcoded values.

## Available themes

| Theme     | Used for                                                   |
| --------- | ---------------------------------------------------------- |
| Core      | Codecademy default (public-facing products)                |
| Admin     | Codecademy admin tools                                     |
| Platform  | Codecademy learning environment / shared platform surfaces |
| LX Studio | Learning Experience Studio                                 |
| Percipio  | Skillsoft Percipio platform                                |

The active theme is set at the app level via `<GamutProvider>`. Components inside receive the current theme via Emotion's context.

## Accessing tokens in styled components

### Via `css()` utility (recommended for static styles)

```tsx
import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

// Static color token
const Box = styled.div(css({ bg: 'navy-400', p: 4 }));

// Semantic color alias (adapts to color mode and theme)
const Text = styled.div(css({ color: 'primary', p: 4 }));
```

### Via `theme` prop (for dynamic styles)

Every Emotion styled component receives `theme` as a prop:

```tsx
import styled from '@emotion/styled';

const DynamicBox = styled.div`
  color: ${({ theme }) => theme.colors.blue};
  font-size: ${({ theme }) => theme.fontSize[16]};
`;
```

### Via imported `theme` object (outside styled components)

```tsx
import { css as emotionCss } from '@emotion/react';
import { theme } from '@codecademy/gamut-styles';

// For use in plain CSS-in-JS outside of styled components
const myStyles = emotionCss`
  font-size: ${theme.fontSize[14]};
  color: ${theme.colors['navy-400']};
`;
```

### Via `useTheme()` hook

```tsx
import { useTheme } from '@emotion/react';

const MyComponent = () => {
  const theme = useTheme();
  return <div style={{ color: theme.colors.primary }} />;
};
```

## System props as the primary token API

For most styling needs, use **system props** (see the `gamut-system-props` skill) rather than accessing the theme directly. System props are the idiomatic way to use design tokens in Gamut components:

```tsx
import { variance } from '@codecademy/variance';
import { system } from '@codecademy/gamut-styles';

const Card = styled.div(
  variance.compose(system.layout, system.space, system.color)
);

// token scale values are validated at the type level
<Card bg="navy-400" p={16} width="100%" />;
```

## Theme-aware vs. color-mode-aware

| Concern                                        | Tool                                       |
| ---------------------------------------------- | ------------------------------------------ |
| Tokens change per theme (colors, sizes, fonts) | Access via `theme.*` or system props       |
| Colors change per light/dark mode              | Use semantic color aliases + `<ColorMode>` |
| Background contrast                            | Use `<Background>` from ColorMode          |

Semantic aliases like `primary`, `secondary`, `text`, `background` serve double duty: they resolve to theme-specific values **and** switch between light/dark variants automatically.

## Creating a new theme

See `CreatingThemes.mdx` in the styleguide (`packages/styleguide/src/lib/Foundations/Theme/CreatingThemes.mdx`) for the full guide. Themes are defined in `@codecademy/gamut-styles` and must extend the base theme shape with all required token keys.

## Key principles

- Prefer semantic token aliases over raw token values when the style needs to respond to color mode changes.
- Use raw tokens (e.g. `navy-400`) only for styles that should be fixed regardless of mode.
- Never hardcode hex values in styled components — always go through the theme/system props.
- The `GamutProvider` at the app root wires up the theme, color mode, and logical properties settings; components should not need to know which theme is active.
