# Color Modes — Guardrails

Gamut has a built-in color mode system exported from `@codecademy/gamut-styles`. This file covers the **rules** for when and how to invoke it. For the implementation details (token mapping table, props, hooks, full example), read `components/color-mode.md` before writing any `ColorMode` or `Background` code.

## When to reach for the color mode system

For **any dark or light region, dark or light theme, dark or light section, dark or light area, or dark mode toggle** — including sidebars, footers, hero sections with inverted contrast, callouts, overlays, panels, and whole-app dark mode — use `ColorMode` or `Background` from `@codecademy/gamut-styles`. Do not handle these with custom CSS, hardcoded `rgba` values, or manual color swaps.

## Components at a glance

- **`ColorMode`** — explicit mode. Use when you **know** which mode a region should be (e.g., a sidebar that is always dark). Accepts `mode: 'light' | 'dark' | 'system'`.
- **`Background`** — auto-contrast. Use when the background color is dynamic and Gamut should pick the best mode automatically. Accepts only a `bg` color token; the mode is computed.

## Rules

1. **Never override Gamut component colors with custom CSS** (e.g., `.sidebar-nav-item { color: rgba(255,255,255,0.7) !important }`) when a `ColorMode` or `Background` wrapper achieves the same result through the token system.
2. **Prefer `ColorMode` over `Background`** when the intended mode is known (e.g., a sidebar is always dark). Use `Background` when the background color is dynamic and the mode should adapt.
3. **`ColorMode` renders a `<div>`** — it does not support an `as` prop. For semantic HTML, nest the appropriate element inside (e.g., `<nav>`, `<aside>`, `<footer>`).
4. **System props work on `ColorMode`** — you can apply `position`, `width`, `height`, `p`, `m`, `zIndex`, etc. directly on the component to avoid extra wrapper elements.
5. **`mode="system"` for user-preference toggles** — if the app offers a dark-mode toggle, use `ColorMode` with `mode="system"` or manage the mode value in state and pass it explicitly.
6. **`Card`'s `variant="default"` follows `ColorMode`** — the other variants (`white`/`beige`/`yellow`, `navy`/`hyper`) are fixed regions that intentionally ignore the active mode. See `components/card.md`.

## Before writing code

Read `components/color-mode.md` for the full token mapping table, `ColorMode` / `Background` props reference, hooks (`useColorModes`, `useCurrentMode`, `usePrefersDarkMode`), and a complete dark-sidebar example.
