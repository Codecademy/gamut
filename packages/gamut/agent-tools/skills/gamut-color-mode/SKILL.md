---
name: gamut-color-mode
description: Light/dark behavior, semantic color aliases, Background, color-mode hooks, hardcoded hex fixes. When invoked, read guidelines/foundations/modes.md and color.md first.
---

# Gamut ColorMode

## Read first

When this skill applies, read before writing code:

- [`guidelines/foundations/modes.md`](../../guidelines/foundations/modes.md)
- [`guidelines/foundations/color.md`](../../guidelines/foundations/color.md)

Confirm token mappings against root **`DESIGN.md`** and the active theme — do not assume Codecademy Core values.

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

This set is not exhaustive (e.g. `text-accent`, `background-disabled`, `danger` — see the light/dark tables in Storybook).

**Key principle**: Always use these aliases in component styles — never hardcode specific color tokens like `navy-400` for anything that needs to change per mode.

**Storybook:** [Foundations / ColorMode](https://gamut.codecademy.com/?path=/docs-foundations-colormode--page) — interactive reference. [Meta / Best practices](https://gamut.codecademy.com/?path=/docs-meta-best-practices--page) — semantic tokens, `css` / `variant` / `states`, and system props with ColorMode.

**Agent skill:** [`gamut-style-utilities`](../gamut-style-utilities/SKILL.md) — `css` / `variant` / `states` with semantic colors alongside ColorMode.

## `<ColorMode />`

Wraps content in a color mode context. Place `<ColorMode />` as high in the app tree as practical. For a nested or static themed area on a page, use `<Background />` instead.

```tsx
import { ColorMode } from '@codecademy/gamut-styles';

// Explicit light or dark
<ColorMode mode="light">{children}</ColorMode>

// Follow OS light/dark preference (see mode="system" below)
<ColorMode mode="system">{children}</ColorMode>
```

**Props**: `mode="light" | "dark" | "system"`

### `mode="system"` (OS preference)

`system` is **not** a third color theme. It always resolves to `"light"` or `"dark"` based on the user's OS setting.

**How it works**

1. `ColorMode` calls `usePrefersDarkMode()`, which reads `window.matchMedia('(prefers-color-scheme: dark)')`.
2. If the query matches → active mode is `"dark"`; otherwise `"light"`.
3. Descendants receive that mode's semantic color variables (`text`, `background`, `primary`, etc.) — same as passing `mode="light"` or `mode="dark"` directly.

**When the OS changes** (e.g. user toggles system appearance), the media query fires a `change` event, `ColorMode` re-renders, and semantic colors update for everything inside the wrapper.

**What it does not do**

- Read in-app preferences (account settings, a theme toggle in localStorage). For those, pass `mode="light"` or `mode="dark"` yourself from your own state.
- Replace `<Background>`. A colored band still needs `<Background bg="hyper">` if you want contrast-based mode selection for that surface.

**Prefer `mode="system"` over wiring the hook yourself**

```tsx
// Prefer — ColorMode owns light/dark resolution
<ColorMode mode="system">{children}</ColorMode>;

// Avoid — duplicates what mode="system" already does
const prefersDark = usePrefersDarkMode();
<ColorMode mode={prefersDark ? 'dark' : 'light'}>{children}</ColorMode>;
```

Use `usePrefersDarkMode()` only when you need the OS preference for something **other** than setting `ColorMode`'s mode (e.g. picking a decorative palette `bg` in a demo).

Place `<ColorMode mode="system">` high in the tree (often inside `GamutProvider`) so the whole app follows system appearance unless a subtree overrides with `mode="light"`, `mode="dark"`, or `<Background>`.

## `<Background />`

Use `<Background>` instead of putting `bg` on a layout component when a section needs a **fixed palette color** (card, hero, landing band, etc.) — independent of the parent color mode. Pass a **palette token** to `bg` (e.g. `hyper`, `navy`, `paleGreen`), not a semantic alias (`text`, `background`, `primary`).

`<Background>` switches light/dark to whichever mode gives the **highest contrast** between that surface and body `text`. Nested Gamut components inherit readable colors without extra setup.

```tsx
import { Background } from '@codecademy/gamut-styles';

// Single background — mode switches automatically if needed
const Card = ({ children }) => <Background bg="hyper">{children}</Background>;

// Nested backgrounds — each creates its own color context
const Page = () => (
  <Background bg="black" p={24}>
    <Background bg="paleGreen" p={24}>
      {/* content inside inner Background uses its own mode */}
    </Background>
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

// [activeModeKey, activeModeColors, allModes, getColorValue]
const [current, currentColors, modes, getColorValue] = useColorModes();

// Active mode key: "light" | "dark" (optional override argument)
const current = useCurrentMode();
const forced = useCurrentMode('light');

// Boolean from window.matchMedia('(prefers-color-scheme: dark)')
const prefersDark = usePrefersDarkMode();
```

## Decision guide

| Need                                                          | Use                                |
| ------------------------------------------------------------- | ---------------------------------- | ---- | --------- |
| Set a page or section to a specific mode                      | `<ColorMode mode="light            | dark | system">` |
| Place content on a colored background with automatic contrast | `<Background bg="...">`            |
| Read the current mode in JavaScript                           | `useCurrentMode()`                 |
| Access all modes, variables, and resolve raw colors           | `useColorModes()`                  |
| Detect OS dark mode preference                                | `usePrefersDarkMode()`             |
| Access full emotion theme                                     | `useTheme()` from `@emotion/react` |

## Common mistakes to avoid

- Do not use raw color tokens (e.g. `color: 'navy-400'`) for text, backgrounds, or borders that need to be accessible across modes — use semantic aliases instead.
- Do not use a raw `bg` prop for colored section backgrounds that need static, ColorMode-agnostic, background colors — use `<Background>` so mode selection is handled for you.
- Do not manually set `ColorMode`'s `mode` from `usePrefersDarkMode()` when `mode="system"` is enough. The hook is still useful for non-mode concerns (e.g. choosing a decorative `bg` in Storybook demos).
