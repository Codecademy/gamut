---
name: gamut-color-mode
description: Use this skill when implementing light/dark behavior, semantic color aliases, the Background component for contrast-safe surfaces, or color-mode hooks in Gamut — including replacing hardcoded hex, fixing mode bugs, or reviewing color usage.
---

# Gamut ColorMode

Source: `@codecademy/gamut-styles` — [`ColorMode.tsx`](https://github.com/Codecademy/gamut/blob/main/packages/gamut-styles/src/ColorMode.tsx)

## Overview

Gamut's color system uses semantic aliases instead of raw color tokens. This means components automatically adapt across light and dark modes without configuration.

### Semantic color aliases

| Alias        | Purpose                                    |
| ------------ | ------------------------------------------ |
| `text`       | Standard text color for all type           |
| `background` | Base background color                      |
| `primary`    | Interactive elements with primary action   |
| `secondary`  | Interactive elements with secondary action |

This set is not exhaustive (e.g. `text-accent`, `background-disabled`, `danger` — see the light/dark tables in Storybook).

Key principle: Always use these aliases in component styles — never hardcode specific color tokens like `navy-400` for anything that needs to change per mode.

Storybook: [Foundations / ColorMode](https://gamut.codecademy.com/?path=/docs-foundations-colormode--page) — interactive reference. [Meta / Best practices](https://gamut.codecademy.com/?path=/docs-meta-best-practices--page) — semantic tokens, `css` / `variant` / `states`, and system props with ColorMode.

Agent skill: [`gamut-style-utilities`](../gamut-style-utilities/SKILL.md) — `css` / `variant` / `states` with semantic colors alongside ColorMode.

## `<ColorMode />`

Wraps content in a color mode context. Place `<ColorMode />` as high in the app tree as practical. For a nested or static themed area on a page, use `<Background />` instead.

```tsx
import { ColorMode } from '@codecademy/gamut-styles';

// Explicit light or dark
<ColorMode mode="light">{children}</ColorMode>

// Follow OS light/dark preference (see mode="system" below)
<ColorMode mode="system">{children}</ColorMode>
```

Props: `mode="light" | "dark" | "system"`

### `mode="system"` (OS preference)

`system` is not a third color theme. It always resolves to `"light"` or `"dark"` based on the user's OS setting.

How it works

1. `ColorMode` calls `usePrefersDarkMode()`, which reads `window.matchMedia('(prefers-color-scheme: dark)')`.
2. If the query matches → active mode is `"dark"`; otherwise `"light"`.
3. Descendants receive that mode's semantic color variables (`text`, `background`, `primary`, etc.) — same as passing `mode="light"` or `mode="dark"` directly.

When the OS changes (e.g. user toggles system appearance), the media query fires a `change` event, `ColorMode` re-renders, and semantic colors update for everything inside the wrapper.

What it does not do

- Read in-app preferences (account settings, a theme toggle in localStorage). For those, pass `mode="light"` or `mode="dark"` yourself from your own state.
- Replace `<Background>`. A colored band still needs `<Background bg="hyper">` if you want contrast-based mode selection for that surface.

Prefer `mode="system"` over wiring the hook yourself

```tsx
// Prefer — ColorMode owns light/dark resolution
<ColorMode mode="system">{children}</ColorMode>;

// Avoid — duplicates what mode="system" already does
const prefersDark = usePrefersDarkMode();
<ColorMode mode={prefersDark ? 'dark' : 'light'}>{children}</ColorMode>;
```

Use `usePrefersDarkMode()` only when you need the OS preference for something other than setting `ColorMode`'s mode (e.g. picking a decorative palette `bg` in a demo).

Place `<ColorMode mode="system">` high in the tree (often inside `GamutProvider`) so the whole app follows system appearance unless a subtree overrides with `mode="light"`, `mode="dark"`, or `<Background>`.

## `<Background />`

Use `<Background>` instead of putting `bg` on a layout component when a section needs a fixed palette color (card, hero, landing band, etc.) — independent of the parent color mode. Pass a palette token to `bg` (e.g. `hyper`, `navy`, `paleGreen`), not a semantic alias (`text`, `background`, `primary`).

`<Background>` switches light/dark to whichever mode gives the highest contrast between that surface and body `text`. Nested Gamut components inherit readable colors without extra setup.

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

## Semantic aliases (theme-stable names)

These tokens describe roles. Actual colors come from the active theme + ColorMode. Never assume Codecademy Core hex when advising another product.

### Text

| Token            | Use for                     |
| ---------------- | --------------------------- |
| `text`           | Default body and UI text    |
| `text-accent`    | Stronger emphasis text      |
| `text-secondary` | Supporting / secondary copy |
| `text-disabled`  | Disabled state labels       |

### Background

| Token                 | Use for                           |
| --------------------- | --------------------------------- |
| `background`          | Default page/component background |
| `background-primary`  | Slightly elevated surfaces        |
| `background-contrast` | Maximum contrast surface          |
| `background-selected` | Selected row / item               |
| `background-hover`    | Hover state overlay               |
| `background-disabled` | Disabled surface                  |
| `background-success`  | Success state container           |
| `background-warning`  | Warning state container           |
| `background-error`    | Error state container             |

### Interactive

| Token             | Use for                                   |
| ----------------- | ----------------------------------------- |
| `primary`         | Primary CTA, links, focus accents         |
| `primary-hover`   | Hover on primary interactive              |
| `primary-inverse` | Accent on top of primary-colored surfaces |
| `secondary`       | Secondary CTA, ghost buttons              |
| `secondary-hover` | Hover on secondary interactive            |
| `danger`          | Destructive actions, error emphasis       |
| `danger-hover`    | Hover on danger interactive               |

### Border

| Token              | Use for                    |
| ------------------ | -------------------------- |
| `border-primary`   | Strong borders, dividers   |
| `border-secondary` | Medium-weight borders      |
| `border-tertiary`  | Subtle borders, separators |
| `border-disabled`  | Disabled input borders     |

### Feedback

| Token              | Use for                    |
| ------------------ | -------------------------- |
| `feedback-error`   | Error messages, validation |
| `feedback-success` | Success messages           |
| `feedback-warning` | Warning messages           |

## Where resolved colors are documented

- Storybook [ColorMode](https://gamut.codecademy.com/?path=/docs-foundations-colormode--page)
- [Core](https://gamut.codecademy.com/?path=/docs-foundations-theme-core-theme--docs) · [Admin](https://gamut.codecademy.com/?path=/docs-foundations-theme-admin-theme--docs) · [Platform](https://gamut.codecademy.com/?path=/docs-foundations-theme-platform-theme--docs) · [Percipio](https://gamut.codecademy.com/?path=/docs-foundations-theme-percipio-theme--docs) · [LX Studio](https://gamut.codecademy.com/?path=/docs-foundations-theme-lx-studio-theme--docs) theme pages
- Root `DESIGN.md` from agent-tools (`DESIGN.Codecademy.md`, `DESIGN.Percipio.md`, `DESIGN.LXStudio.md`)
- Source: [`packages/gamut-styles/src/themes`](https://github.com/Codecademy/gamut/tree/main/packages/gamut-styles/src/themes)

## Codecademy Core — illustrative light/dark hex only

Not valid for Percipio, LX Studio, or other themes. Quick mental model for Core defaults only.

| Token            | Light     | Dark      |
| ---------------- | --------- | --------- |
| `text`           | `#10162F` | `#ffffff` |
| `text-accent`    | `#0A0D1C` | `#FFF0E5` |
| `background`     | `#ffffff` | `#10162F` |
| `primary`        | `#3A10E5` | `#FFD300` |
| `primary-hover`  | `#5533FF` | `#CCA900` |
| `secondary`      | `#10162F` | `#ffffff` |
| `danger`         | `#E91C11` | `#E85D7F` |
| `feedback-error` | `#BE1809` | `#E85D7F` |

Full tables: Storybook theme pages or audit with [`gamut-review`](../gamut-review/SKILL.md) Appendix A/B for hex triage.

## Raw palette (Core-centric reference)

Raw tokens name fixed swatches for `<Background bg="…">`, illustration, and surfaces. Confirm allowed keys in the active theme or `DESIGN.md` before using in non-Core apps.

Named shorthand aliases on Core: `beige`, `blue`, `green`, `hyper`, `navy`, `orange`, `pink`, `red`, `yellow`, `black`, `white`

## Color decision guide

```
Which product theme is GamutProvider using?
  └─ Unknown → check DESIGN.md / gamut-theming / Storybook theme page

Coloring UI text or backgrounds?
  └─ Must adapt to light/dark OR theme? → semantic alias (text, background, primary, …)
  └─ Must stay fixed regardless of mode?  → raw palette token (confirm key in that theme)
  └─ Section background with content?     → <Background bg="…">
```

## Card and alert patterns

### Cards

- Background variants: `default` (ColorMode-responsive), `white`, `yellow`, `beige`, `navy`, `hyper`
- Shadow variants: `none` (default), `outline`, `patternLeft`, `patternRight`
- Add `isInteractive` when wrapping in `<Anchor>` — enables hover shadow + `borderRadius: md`
- Default `borderRadius` is `none`; override with `borderRadius` prop

### Alerts

| Variant | Tokens                                    |
| ------- | ----------------------------------------- |
| Error   | `feedback-error` + `background-error`     |
| Success | `feedback-success` + `background-success` |
| Warning | `feedback-warning` + `background-warning` |

52 components have Figma ↔ code mappings via Code Connect (`packages/code-connect/`).
