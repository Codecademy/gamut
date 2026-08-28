# ColorMode and Background

The detailed reference for Gamut's color mode components. The guardrails that govern _when_ to use these components live in `overview-color-modes.md` (always-loaded). This file is the implementation reference: token mapping, props, hooks, and a full example.

## Core Theme Modes — token mapping

The default `theme` (coreTheme) ships with two modes: **`light`** (default) and **`dark`**. The following semantic tokens automatically remap based on the active mode:

| Semantic Token        | Light Mode Value | Dark Mode Value |
| --------------------- | ---------------- | --------------- |
| `text`                | `navy-800`       | `white`         |
| `text-accent`         | `navy-900`       | `beige`         |
| `text-secondary`      | `navy-600`       | `white-600`     |
| `text-disabled`       | `navy-500`       | `white-500`     |
| `background`          | `white`          | `navy-800`      |
| `background-primary`  | `beige`          | `navy-900`      |
| `background-selected` | `navy-100`       | `white-100`     |
| `background-hover`    | `navy-200`       | `white-200`     |
| `primary`             | `hyper-500`      | `yellow-500`    |
| `secondary`           | `navy-800`       | `white`         |
| `border-primary`      | `navy-800`       | `white`         |
| `border-secondary`    | `navy-600`       | `white-600`     |
| `border-tertiary`     | `navy-300`       | `white-300`     |

## `ColorMode` (explicit mode)

Use when you **know** which mode a region should be. Renders a `<div>` that injects CSS custom properties (`--color-*`) for the selected mode. All Gamut components nested inside automatically use the remapped tokens.

```tsx
import { ColorMode } from '@codecademy/gamut-styles'

// Explicit dark region (e.g., sidebar, footer)
<ColorMode mode="dark" bg="navy-800">
  {/* All Gamut components inside use dark-mode tokens */}
</ColorMode>

// Follow OS preference
<ColorMode mode="system">
  {/* Switches automatically based on prefers-color-scheme */}
</ColorMode>
```

**Props:**

- `mode: 'light' | 'dark' | 'system'` — required; `'system'` uses `matchMedia('(prefers-color-scheme: dark)')`.
- `bg?: Colors` — optional Gamut color token; sets `background-current` for nested components.
- Also accepts all Gamut system props: layout, positioning, spacing, flex, grid, border, color.

## `Background` (auto-contrast mode)

Use when you want Gamut to **automatically pick** the best mode for contrast. It computes which mode (`light` or `dark`) gives the highest text contrast against the given background color.

```tsx
import { Background } from '@codecademy/gamut-styles'

<Background bg="navy-800">
  {/* Auto-detects dark mode because navy-800 is dark */}
</Background>

<Background bg="white">
  {/* Auto-detects light mode because white is light */}
</Background>
```

**Props:**

- `bg: Colors` — required; any Gamut color token.
- Inherits all other props from `ColorMode` except `mode` (which is computed).

## Hooks

| Hook                   | Signature                                           | Purpose                                           |
| ---------------------- | --------------------------------------------------- | ------------------------------------------------- |
| `useColorModes()`      | `() => [mode, modeColors, allModes, getColorValue]` | Read the active mode and its color mappings       |
| `useCurrentMode(m?)`   | `(mode?: ColorModes) => 'light' \| 'dark'`          | Return active mode or provided override           |
| `usePrefersDarkMode()` | `() => boolean`                                     | Detect OS `prefers-color-scheme: dark` preference |

## Example: Dark Sidebar

```tsx
import { FlexBox, Text, Menu, MenuItem } from '@codecademy/gamut';
import { ColorMode } from '@codecademy/gamut-styles';

<ColorMode
  mode="dark"
  bg="navy-800"
  position="fixed"
  top={0}
  left={0}
  height="100vh"
  width="240px"
  py={24}
  zIndex={10}
>
  <FlexBox as="nav" flexDirection="column">
    <Text as="span" variant="title-md">
      App Title
    </Text>
    <Menu variant="fixed">
      <MenuItem icon={SomeIcon} active={isActive} onClick={handleClick}>
        Label
      </MenuItem>
    </Menu>
  </FlexBox>
</ColorMode>;
```

No custom CSS is needed — `MenuItem` text, hover states, and active indicators all resolve through dark-mode tokens automatically.

## `mode="system"` (OS preference)

`system` is not a third color theme — it always resolves to `"light"` or `"dark"` based on the user's OS setting via `window.matchMedia('(prefers-color-scheme: dark)')`. When the OS setting changes, `ColorMode` re-renders and semantic colors update for everything inside the wrapper. It does not read in-app preferences (a theme toggle in account settings/localStorage) — for those, pass `mode="light"`/`mode="dark"` from your own state instead.

Prefer `mode="system"` over wiring `usePrefersDarkMode()` yourself unless you need the OS preference for something other than setting `ColorMode`'s mode (e.g. picking a decorative `bg` in a demo).

## Card and Alert patterns

### Cards

- Background variants: `default` (ColorMode-responsive), `white`, `yellow`, `beige`, `navy`, `hyper`
- Shadow variants: `none` (default), `outline`, `patternLeft`, `patternRight`
- Add `isInteractive` when wrapping in `Anchor` — enables hover shadow + `borderRadius: md`
- Default `borderRadius` is `none`

### Alerts

| Variant | Tokens                                    |
| ------- | ----------------------------------------- |
| Error   | `feedback-error` + `background-error`     |
| Success | `feedback-success` + `background-success` |
| Warning | `feedback-warning` + `background-warning` |

## Common mistakes to avoid

- Do not use raw color tokens (e.g. `navy-400`) for text, backgrounds, or borders that need to be accessible across modes — use semantic aliases instead.
- Do not use a raw `bg` prop for colored section backgrounds that need static, ColorMode-agnostic backgrounds — use `Background` so mode selection is handled for you.
- Do not manually set `ColorMode`'s `mode` from `usePrefersDarkMode()` when `mode="system"` already does it.
