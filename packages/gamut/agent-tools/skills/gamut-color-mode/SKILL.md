---
name: gamut-color-mode
description: Use this skill when implementing light/dark behavior, semantic color aliases, the Background component for contrast-safe surfaces, or color-mode hooks in Gamut — including replacing hardcoded hex, fixing mode bugs, or reviewing color usage.
---

# Gamut ColorMode

Source: `@codecademy/gamut-styles` — [`ColorMode.tsx`](https://github.com/Codecademy/gamut/blob/main/packages/gamut-styles/src/ColorMode.tsx)

## Overview

Gamut's color system uses **semantic aliases** instead of raw color tokens. This means components automatically adapt across light and dark modes without configuration.

### Semantic color aliases

| Alias        | Purpose                                    |
| ------------ | ------------------------------------------ |
| `text`       | Standard text color for all type           |
| `background` | Base background color                      |
| `primary`    | Interactive elements with primary action   |
| `secondary`  | Interactive elements with secondary action |

**Key principle**: Always use these aliases in component styles — never hardcode specific color tokens like `navy-400` for anything that needs to change per mode.

**Storybook:** [Foundations / ColorMode](https://gamut.codecademy.com/?path=/docs-foundations-colormode--page) — interactive reference. [Meta / Best practices](https://gamut.codecademy.com/?path=/docs-meta-best-practices--page) — semantic tokens, `css` / `variant` / `states`, and system props with ColorMode.

## `<ColorMode />`

Wraps content in a color mode context. Nest these to create scoped mode regions.

```tsx
import { ColorMode } from '@codecademy/gamut-styles';

// Explicit light or dark mode
const Page = ({ children }) => <ColorMode mode="light">{children}</ColorMode>;

// Follows the user's OS preference (prefers-color-scheme)
const Page = ({ children }) => <ColorMode mode="system">{children}</ColorMode>;
```

**Props**: `mode="light" | "dark" | "system"`

## `<Background />`

Use `<Background>` — not raw `bg` prop — whenever you need a specific background color for a section (card, landing page, hero, etc.). It **automatically switches the color mode** to ensure the content inside meets contrast requirements.

```tsx
import { Background } from '@codecademy/gamut-styles';

// Single background — mode switches automatically if needed
const Card = ({ children }) => <Background bg="hyper">{children}</Background>;

// Nested backgrounds — each creates its own accessible color context
const Page = () => (
  <Background bg="black">
    <Background bg="paleGreen" />
  </Background>
);
```

### `background-current` CSS variable

When `<Background>` is rendered, it sets a `background-current` CSS variable on the theme. Use this to reference an ancestor's background color (e.g. for simulating transparency or masking content).

## Color mode hooks

```tsx
import {
  useColorModes,
  useCurrentMode,
  usePrefersDarkMode,
} from '@codecademy/gamut-styles';

// Returns [activeModeKey, currentModeColorMap, allModesConfig, getColorValue]
const [mode, modeColors, modes, getColorValue] = useColorModes();

// Returns just the active mode key: "light" | "dark"
const activeMode = useCurrentMode();

// Returns boolean from window.matchMedia('(prefers-color-scheme: dark)')
const prefersDark = usePrefersDarkMode();
```

## Decision guide

| Need                                                                                              | Use                                                           |
| ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| Set a page or section to a specific mode                                                          | `<ColorMode mode="light">`, `mode="dark"`, or `mode="system"` |
| Place content on a colored background with automatic contrast                                     | `<Background bg="...">`                                       |
| Read the current mode in JavaScript                                                               | `useCurrentMode()`                                            |
| Access active mode, resolved semantic colors for that mode, all mode configs, and `getColorValue` | `useColorModes()`                                             |
| Detect OS dark mode preference                                                                    | `usePrefersDarkMode()`                                        |
| Access full Emotion theme                                                                         | `useTheme()` from `@emotion/react`                            |

## Common mistakes to avoid

- Do not use raw color tokens (e.g. `color: 'navy-400'`) for text, backgrounds, or borders that need to be accessible across modes — use semantic aliases instead.
- Do not use raw `bg` prop for colored section backgrounds that contain text or interactive elements — use `<Background>` so contrast is guaranteed.
- Do not manually toggle modes based on `usePrefersDarkMode()` — use `<ColorMode mode="system">` instead.
