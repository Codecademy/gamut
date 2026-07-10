# Theme: LX Studio

Resolved values and brand voice for `lxStudioTheme`. Semantic token _names_ are theme-agnostic (see `../colors.md`); this file has what those names actually resolve to under LX Studio, plus voice/atmosphere context a design agent can't infer from token names alone.

## Voice & atmosphere

LX Studio communicates **modern professional craft** — clean, precise, tool-like. An authoring environment for content creators: capable and unobtrusive, prioritizing clarity and control over personality. Larger border radii and soft shadows reduce visual weight versus Core/Percipio.

**Light mode only — no dark mode support.**

## Color resolution (semantic → actual value)

| Token                | Resolves to                                                                                                          |
| -------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `text`               | `navy-800`                                                                                                           |
| `text-accent`        | `navy-900`                                                                                                           |
| `text-secondary`     | `navy-600`                                                                                                           |
| `background`         | `white`                                                                                                              |
| `background-primary` | `lxStudioBgPrimary`                                                                                                  |
| `primary`            | `sapphire`                                                                                                           |
| `primary-hover`      | `navy-800` (**note**: this differs from Percipio, where `primary-hover` is a dedicated hover swatch, not `navy-800`) |
| `secondary`          | `navy-800`                                                                                                           |
| `danger`             | `red-500`                                                                                                            |
| `feedback-success`   | `lxStudioSuccess`                                                                                                    |
| `border-primary`     | `navy-400`                                                                                                           |
| `shadow-primary`     | `navy-200` (soft)                                                                                                    |

## Border radius differs from Core/Percipio — do not reuse `design-tokens/border-radius.md`'s pixel values here

LX Studio uses **larger** radii for a softer, more modern feel — this is a deliberate per-theme override, not a typo:

| Token  | Core/Percipio | **LX Studio** |
| ------ | ------------- | ------------- |
| `sm`   | 2px           | **4px**       |
| `md`   | 4px           | **8px**       |
| `lg`   | 8px           | **12px**      |
| `xl`   | 16px          | 16px (same)   |
| `full` | 999px         | 999px (same)  |

Buttons and inputs use `borderRadius: md` (8px here) — this larger radius is a defining part of the LX Studio feel.

## Typography specifics

Same as Percipio: **Skillsoft Text** (base), **Skillsoft Sans** (accent), `fontWeight="title"` → `500` (never literal `700`).

## Agent quick reference

| Scenario        | Tokens                                                                                         |
| --------------- | ---------------------------------------------------------------------------------------------- |
| Primary button  | `bg: primary`, `color: white`, `hover: primary-hover`, `borderRadius: md` (8px)                |
| Headline        | `color: text-accent`, `weight: title (500)`, `lineHeight: title (1.2)`                         |
| Card default    | `bg: background`, `borderRadius: none` (elevated surfaces use `background-primary`, not beige) |
| Checkbox/Toggle | `bg: primary`, `hover: primary-hover`, `borderRadius: sm` (4px here)                           |
