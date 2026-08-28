# Color Tokens

## Semantic tokens (preferred)

Semantic tokens adapt to the active theme and `ColorMode`. Under `percipioTheme` (the default here), tokens like `background-primary` remap from Core's values to Skillsoft's palette. Always use semantic tokens so colors adapt correctly.

| Token                                                      | Usage                                      |
| ---------------------------------------------------------- | ------------------------------------------ |
| `text`                                                     | Standard text color for all type           |
| `text-accent`                                              | Strong emphasis text                       |
| `text-secondary`                                           | Secondary / supporting text                |
| `background`                                               | Primary surface background                 |
| `background-primary`                                       | Secondary surface fill                     |
| `background-selected`                                      | Selected-state surface                     |
| `background-hover`                                         | Hover-state surface                        |
| `primary`                                                  | Interactive elements with primary action   |
| `secondary`                                                | Interactive elements with secondary action |
| `border-primary`                                           | Default/strong border color                |
| `border-secondary`                                         | Secondary border color                     |
| `feedback-error` / `feedback-success` / `feedback-warning` | Inline feedback copy                       |

This set is not exhaustive — see `components/color-mode.md` for the full light/dark token-mapping table.

**Key principle**: always use these aliases in component styles — never hardcode a specific palette token (like `navy-400`) for anything that needs to change per mode or theme.

## Core palette

When no semantic token applies, use a named core color: `navy · white · black · blue · green · red · yellow · hyper · beige · orange · pink`. Raw palette tokens are for colors that must stay fixed regardless of mode — e.g. `bg` on `Background` for a section surface that intentionally uses a fixed palette color.

## Common hardcodes → token

The values that actually get hardcoded in practice — use this table before reaching for a hex literal:

| Instead of (hardcode)     | Use                                                              |
| ------------------------- | ---------------------------------------------------------------- |
| red / error text          | `feedback-error`                                                 |
| green / success text      | `feedback-success`                                               |
| amber / warning text      | `feedback-warning`                                               |
| tinted status surface     | `background-error` / `background-success` / `background-warning` |
| page / section background | `background-primary` or `<Background bg="…">`                    |
| divider / hairline        | `border-secondary` / `border-tertiary`                           |

## Status & feedback colors

This is the single most-hardcoded case — success/error/warning must always use the `feedback-*` tokens (+ the matching `background-*` surface), never a brand green/red hex value:

```jsx
// correct
<Text color="feedback-error">Overdue</Text>
<Box bg="background-error">…</Box>

// wrong — hardcoded brand/status color
<Text color="#B83C3C">Overdue</Text>
```

Never substitute a raw brand color (e.g. a theme's primary red/green) for a `feedback-*` token even if the hex happens to match — the token is what keeps the color correct across theme and `ColorMode` switches.

## Common mistakes (ColorMode)

A raw `bg` prop on a colored section surface bypasses `ColorMode`'s contrast handling — use `<Background bg="…">` instead. Full detail in `../components/color-mode.md`'s "Common mistakes to avoid" section.

## Departures

If a build genuinely needs a color with no matching token, don't silently reach for hex — call it out explicitly (see `../overview-styling.md`'s Departures section).

## Color decision guide

```
Which product theme is GamutProvider using?
  └─ percipioTheme by default (see overview-setup.md)

Coloring UI text or backgrounds?
  └─ Must adapt to light/dark OR theme? → semantic alias (text, background, primary, …)
  └─ Must stay fixed regardless of mode?  → raw palette token
  └─ Section background with content?     → <Background bg="…">
```

## Rules

- **Never use raw hex values** (e.g., `#FFFFFF`, `#10162F`). Every color must resolve to a Gamut token.
- **Never hardcode core-theme values** like `beige` for something that should adapt — use semantic tokens.
- **For dark/light regions**, never swap color tokens manually. Use `ColorMode` or `Background` (see `overview-color-modes.md` and `components/color-mode.md`).
- If a build genuinely needs a color with no matching token, say so explicitly rather than silently reaching for hex (see the Departures note in `overview-styling.md`).
