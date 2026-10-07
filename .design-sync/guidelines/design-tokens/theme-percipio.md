# Theme: Percipio (default in this project)

Resolved values and brand voice for `percipioTheme`. Semantic token _names_ are theme-agnostic (see `../colors.md`); this file has what those names actually resolve to under Percipio, plus voice/atmosphere context a design agent can't infer from token names alone.

## Voice & atmosphere

Percipio communicates **professional clarity** — clean, trustworthy, enterprise-ready. Neutral and corporate: functional, with clear hierarchy. Brand blue drives interactive affordances; neutral grays define text and structure. Density: medium — information-dense layouts with softer shadows and a muted neutral palette.

Supports both light and dark mode via `ColorMode` — always render inside a `ColorMode` wrapper (`mode="light"` or `mode="dark"`) so semantic tokens resolve; don't assume light-only.

## Color resolution (semantic → actual value)

| Token                       | Resolves to                                                                                                                                                                                        |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `text` / `text-accent`      | `percipioTextPrimary` (`#222325`)                                                                                                                                                                  |
| `text-secondary`            | `percipioTextSecondary`                                                                                                                                                                            |
| `background`                | `white`                                                                                                                                                                                            |
| `background-primary`        | `percipioBgPrimary` (`#FAFBFC`)                                                                                                                                                                    |
| `primary`                   | `sapphire` (`#1C50BB`)                                                                                                                                                                             |
| `primary-hover`             | `percipioActionPrimaryHover` (`#141C36`)                                                                                                                                                           |
| `secondary`                 | `percipioActionSecondary` (`#6A6E75`)                                                                                                                                                              |
| `danger` / `feedback-error` | `percipioDanger` (`#B83C3C`)                                                                                                                                                                       |
| `feedback-success`          | `percipioFeedbackSuccess` (`#1B8057`)                                                                                                                                                              |
| `feedback-warning`          | `percipioFeedbackWarning` (`#EF5B0D`)                                                                                                                                                              |
| `border-primary`            | `navy-400` — mid-weight; note Percipio's border order is non-standard: `secondary` is the _lightest_ weight, `tertiary` is the _strongest_ (solid navy) — use by semantic intent, not numeric rank |
| `shadow-primary`            | `navy-200` (soft)                                                                                                                                                                                  |

**The values above are the light-mode resolutions.** Dark-mode equivalents
aren't documented here — if the design calls for a dark region under
Percipio, still wrap it in `<ColorMode mode="dark">` (semantic tokens will
resolve to the theme's dark values) rather than assuming light-only or
hand-picking a dark color yourself.

## About to type a hex value? Use the token instead

| If you're about to type… | Use                  |
| ------------------------ | -------------------- |
| `#1C50BB`                | `primary`            |
| `#B83C3C`                | `feedback-error`     |
| `#1B8057`                | `feedback-success`   |
| `#222325`                | `text`               |
| `#FAFBFC`                | `background-primary` |

## Typography specifics

- Fonts: **Skillsoft Text** (base/headlines), **Skillsoft Sans** (accent UI), Roboto Mono (code).
- **Skillsoft Text Medium (`fontWeight="title"` → `500`)** for headlines/CTAs/buttons — **never literal `700`**, that's the Core/Admin/Platform value and breaks Percipio branding.
- Left-aligned by default; never right-align; don't adjust letter-spacing.

## Component notes

- `FillButton` → `bg: primary`, `hover: primary-hover`.
- `Card` → `shadow-primary` (soft, `navy-200`); `patternLeft`/`patternRight` available but rarely used here.
- Checkbox/Toggle → `bg: primary`, `hover: primary-hover`.

## Agent quick reference

| Scenario       | Tokens                                                                                             |
| -------------- | -------------------------------------------------------------------------------------------------- |
| Primary button | `bg: primary`, `color: primary-inverse`, `hover: primary-hover`                                    |
| Headline       | `color: text`, `weight: title (500 — not 700)`, `lineHeight: title (1.2)`                          |
| Card default   | `bg: background`, `borderRadius: none` (add `isInteractive` for hover shadow + `borderRadius: md`) |
| Error state    | `color: feedback-error`, `bg: background-error`, `borderColor: danger`                             |
| Disabled state | `color: text-disabled`, `bg: background-disabled`, `borderColor: border-disabled`                  |
