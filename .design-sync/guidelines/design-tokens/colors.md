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
