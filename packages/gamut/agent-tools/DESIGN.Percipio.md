---
version: alpha
name: Percipio Design System
description: Design tokens for the Skillsoft Percipio platform.
colors:
  # palette — raw swatches; set once on :root and then always reference by token name, never use hex values directly in code
  percipioTextPrimary: '#222325'
  percipioTextSecondary: 'rgba(34, 35, 37, 0.75)'
  percipioTextDisabled: '#AFB6C2'
  sapphire: '#1C50BB'
  percipioActionPrimaryHover: '#141C36'
  percipioActionSecondary: '#6A6E75'
  percipioActionSecondaryHover: 'rgba(106, 110, 117, 0.86)'
  percipioActionDangerHover: '#A52020'
  percipioDanger: '#B83C3C'
  percipioFeedbackSuccess: '#1B8057'
  percipioFeedbackWarning: '#EF5B0D'
  percipioBgPrimary: '#FAFBFC'
  percipioBgSuccess: '#EEF7F3'
  percipioBgWarning: '#FFF7E0'
  percipioBgError: '#FFF1F5'
  navy-800: '#10162F'
  navy-400: 'rgba(16, 22, 47, 0.47)'
  navy-300: 'rgba(16, 22, 47, 0.28)'
  navy-200: 'rgba(16, 22, 47, 0.12)'
  navy-100: 'rgba(16, 22, 47, 0.04)'
  white: '#ffffff'
  # semantic aliases — use these in code, not palette swatches or hex values
  text: '{colors.percipioTextPrimary}'
  text-accent: '{colors.percipioTextPrimary}'
  text-secondary: '{colors.percipioTextSecondary}'
  text-disabled: '{colors.percipioTextDisabled}'
  background: '{colors.white}'
  background-primary: '{colors.percipioBgPrimary}'
  background-selected: '{colors.navy-100}'
  background-hover: '{colors.navy-200}'
  background-disabled: '{colors.navy-200}'
  background-success: '{colors.percipioBgSuccess}'
  background-warning: '{colors.percipioBgWarning}'
  background-error: '{colors.percipioBgError}'
  primary: '{colors.sapphire}'
  primary-hover: '{colors.percipioActionPrimaryHover}'
  primary-inverse: '{colors.white}'
  secondary: '{colors.percipioActionSecondary}'
  secondary-hover: '{colors.percipioActionSecondaryHover}'
  danger: '{colors.percipioDanger}'
  danger-hover: '{colors.percipioActionDangerHover}'
  feedback-error: '{colors.percipioDanger}'
  feedback-success: '{colors.percipioFeedbackSuccess}'
  feedback-warning: '{colors.percipioFeedbackWarning}'
  border-primary: '{colors.navy-400}'
  border-secondary: '{colors.navy-200}'
  border-tertiary: '{colors.navy-800}'
  border-disabled: '{colors.navy-300}'
  shadow-primary: '{colors.navy-200}'
  shadow-secondary: '{colors.navy-400}'
typography:
  base:
    fontFamily: '"Skillsoft Text", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif'
    fontSize: '1rem'
    fontWeight: '400'
    lineHeight: '1.5'
  accent:
    fontFamily: '"Skillsoft Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif'
    fontSize: '0.875rem'
    fontWeight: '400'
    lineHeight: '1.5'
  title:
    fontFamily: '"Skillsoft Text", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif'
    fontSize: '2.125rem'
    fontWeight: '500'
    lineHeight: '1.2'
  monospace:
    fontFamily: '"Roboto Mono", monospace'
components:
  FillButton:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.primary-inverse}'
    rounded: '{rounded.md}'
  FillButton-hover:
    backgroundColor: '{colors.primary-hover}'
    textColor: '{colors.primary-inverse}'
  FillButton-danger:
    backgroundColor: '{colors.danger}'
    textColor: '{colors.white}'
    rounded: '{rounded.md}'
  FillButton-danger-hover:
    backgroundColor: '{colors.danger-hover}'
    textColor: '{colors.white}'
  StrokeButton:
    backgroundColor: 'transparent'
    textColor: '{colors.secondary}'
    rounded: '{rounded.md}'
  Input:
    backgroundColor: '{colors.background}'
    textColor: '{colors.text}'
    rounded: '{rounded.md}'
    borderColor: '{colors.border-primary}'
  Checkbox:
    backgroundColor: '{colors.primary}'
    rounded: '{rounded.sm}'
  Checkbox-hover:
    backgroundColor: '{colors.primary-hover}'
  Alert-error:
    backgroundColor: '{colors.background-error}'
    textColor: '{colors.feedback-error}'
  Alert-success:
    backgroundColor: '{colors.background-success}'
    textColor: '{colors.text}'
  Alert-warning:
    backgroundColor: '{colors.background-warning}'
    textColor: '{colors.text}'
---

# Percipio

This file defines the visual design tokens for the Skillsoft Percipio platform, implemented using the Gamut design system (`@codecademy/gamut`, `@codecademy/gamut-styles`). Percipio uses a dedicated Gamut theme that applies its own colors and typography — all Gamut components work without modification.

**Storybook**: https://gamut.codecademy.com

> **Other Gamut themes:** This document covers **Percipio** only. For Codecademy (Core/Admin/Platform) or LX Studio, install that product's `DESIGN.md` instead: `gamut plugin install cursor --theme core` or `--theme lxstudio`.

---

## Visual Theme & Atmosphere

Percipio communicates **professional clarity** — clean, trustworthy, and enterprise-ready. The design voice is neutral and corporate: functional, with clear hierarchy. Brand blue drives interactive affordances; neutral grays define text and structure.

**Density**: Medium. Information-dense layouts with softer shadows and a muted neutral palette.

**Design philosophy**:

- Dark mode is supported but not bespoke — `percipioTheme` only overrides light-mode tokens (see `packages/gamut-styles/src/themes/percipio.ts`); dark mode falls back to Core's dark palette unmodified (see Semantic Color Aliases below)
- Brand blue (`sapphire` / `primary`) for buttons, links, and focus rings in **light mode** — in dark mode `primary` resolves to Core's `yellow-500`, not `sapphire`
- Text uses dedicated Percipio palette tokens (`percipioTextPrimary`, etc.)
- Shadows are soft and minimal (`shadow-primary` → `navy-200`)
- Title font weight is **500** via `fontWeight="title"` — use semantic weight, not literal `700`

---

## Themes

Percipio uses a single Gamut theme with both light and dark modes.

| Theme        | Use case                    | Base font             | Dark mode                                             |
| ------------ | --------------------------- | --------------------- | ----------------------------------------------------- |
| **Percipio** | Skillsoft Percipio platform | Skillsoft Text / Sans | ✓ light + dark (dark inherited from Core, unmodified) |

The active theme is set at the app root via `<GamutProvider theme={percipioTheme}>`. `percipioTheme` calls `.addColorModes('light', { light: {...} })` with **only** a `light` override map — there is no `dark` key in the theme definition, so every semantic token falls back to Core's `dark` values for that token when the app is in dark mode. This is different from `adminTheme`/`platformTheme`, which define their own explicit `dark` overrides on top of Core.

---

## Semantic Color Aliases

Use these token names when specifying colors — they work in both light and dark mode via `<ColorMode>`. **Light** below is Percipio's own value (overridden in `percipio.ts` where noted); **Dark** is Core's unmodified dark value for that same token, since `percipioTheme` never defines a `dark` override map. A token whose Light column is a plain palette name (not a `percipio*` token) is itself inherited from Core in light mode too — Percipio didn't touch it in either mode.

### Text

| Token            | Light                                                 | Dark        | Use for                     |
| ---------------- | ----------------------------------------------------- | ----------- | --------------------------- |
| `text`           | `percipioTextPrimary`                                 | `white`     | Default body and UI text    |
| `text-accent`    | `percipioTextAccent` (same hex as `text` in Percipio) | `beige`     | Stronger emphasis text      |
| `text-secondary` | `percipioTextSecondary`                               | `white-600` | Supporting / secondary copy |
| `text-disabled`  | `percipioTextDisabled`                                | `white-500` | Disabled state labels       |

### Background

| Token                 | Light               | Dark         | Use for                           |
| --------------------- | ------------------- | ------------ | --------------------------------- |
| `background`          | `white`             | `navy-800`   | Default page/component background |
| `background-primary`  | `percipioBgPrimary` | `navy-900`   | Slightly elevated surfaces        |
| `background-selected` | `navy-100`          | `white-100`  | Selected row / item               |
| `background-hover`    | `navy-200`          | `white-200`  | Hover state overlay               |
| `background-disabled` | `navy-200`          | `white-200`  | Disabled surface                  |
| `background-success`  | `percipioBgSuccess` | `green-900`  | Success state container           |
| `background-warning`  | `percipioBgWarning` | `yellow-900` | Warning state container           |
| `background-error`    | `percipioBgError`   | `red-900`    | Error state container             |

Note the dark values for `background-primary`/`success`/`warning`/`error` are **Core's** dark tokens, not Percipio-specific — the `percipioBg*` tokens Percipio defines have no dark counterpart.

### Interactive

| Token             | Light                          | Dark         | Use for                              |
| ----------------- | ------------------------------ | ------------ | ------------------------------------ |
| `primary`         | `sapphire`                     | `yellow-500` | Primary CTA, links, focus rings      |
| `primary-hover`   | `percipioActionPrimaryHover`   | `yellow-400` | Hover state of primary interactive   |
| `primary-inverse` | `white`                        | `hyper-500`  | Primary on a colored background      |
| `secondary`       | `percipioActionSecondary`      | `white`      | Secondary CTA, ghost buttons         |
| `secondary-hover` | `percipioActionSecondaryHover` | `white-700`  | Hover state of secondary interactive |
| `danger`          | `percipioDanger`               | `red-300`    | Destructive actions, error states    |
| `danger-hover`    | `percipioActionDangerHover`    | `red-400`    | Hover on danger interactive          |

**`primary` does not stay Percipio's brand blue in dark mode.** `sapphire` is a light-mode-only override; dark mode uses Core's `yellow-500` (the same value Core itself uses, since `percipioTheme` never defines a `dark` override). If a design calls for `sapphire` to persist in dark mode, that requires an actual theme change — adding a `dark` override to `percipioTheme` — not a documentation fix. Flag it rather than assuming the token already does this.

### Border

Percipio's border weights use a non-standard order in light mode: `primary` is mid-weight, `secondary` is very light, `tertiary` is the strongest (solid navy). Use them for their semantic intent, not their numeric rank. Dark values are Core's unmodified dark borders.

| Token              | Light      | Dark        | Use for                             |
| ------------------ | ---------- | ----------- | ----------------------------------- |
| `border-primary`   | `navy-400` | `white`     | Standard input and card borders     |
| `border-secondary` | `navy-600` | `white-600` | Subtle dividers, section separators |
| `border-tertiary`  | `navy-800` | `white-300` | Strong structural borders           |
| `border-disabled`  | `navy-300` | `white-500` | Disabled input borders              |

### Feedback

| Token              | Light                     | Dark        | Use for                          |
| ------------------ | ------------------------- | ----------- | -------------------------------- |
| `feedback-error`   | `percipioDanger`          | `red-300`   | Error messages, validation       |
| `feedback-success` | `percipioFeedbackSuccess` | `green-400` | Success messages, confirmations  |
| `feedback-warning` | `percipioFeedbackWarning` | `yellow-0`  | Warning messages, caution states |

### Shadow

| Token              | Light      | Dark        |
| ------------------ | ---------- | ----------- |
| `shadow-primary`   | `navy-200` | `white`     |
| `shadow-secondary` | `navy-400` | `white-600` |

Use `shadow-primary` for standard elevated surfaces.

---

## Percipio Color Palette

Percipio introduces its own named semantic colors. These are the source values behind the aliases above. Use the semantic aliases in designs, not the raw named colors.

| Palette token                  | Semantic alias(es)         |
| ------------------------------ | -------------------------- |
| `percipioTextPrimary`          | `text`, `text-accent`      |
| `percipioTextSecondary`        | `text-secondary`           |
| `percipioTextDisabled`         | `text-disabled`            |
| `sapphire`                     | `primary`                  |
| `percipioActionPrimaryHover`   | `primary-hover`            |
| `percipioActionSecondary`      | `secondary`                |
| `percipioActionSecondaryHover` | `secondary-hover`          |
| `percipioActionDangerHover`    | `danger-hover`             |
| `percipioDanger`               | `danger`, `feedback-error` |
| `percipioFeedbackSuccess`      | `feedback-success`         |
| `percipioFeedbackWarning`      | `feedback-warning`         |
| `percipioBgPrimary`            | `background-primary`       |
| `percipioBgSuccess`            | `background-success`       |
| `percipioBgWarning`            | `background-warning`       |
| `percipioBgError`              | `background-error`         |

The full core swatch palette (navy, blue, green, yellow, red, etc.) is also available, but the semantic aliases above are how Percipio maps them. Raw swatches should only be used for fixed colors that must not adapt (illustrations, data viz, etc.).

---

## Typography

### Typefaces

Percipio uses **Skillsoft Text** for body and headlines and **Skillsoft Sans** for accent UI. Roboto Mono is used for code; the `system` slot still uses Roboto.

| Token       | Font                           | Use for                                   |
| ----------- | ------------------------------ | ----------------------------------------- |
| `base`      | `"Skillsoft Text", sans-serif` | All default UI text, headlines, body copy |
| `accent`    | `"Skillsoft Sans", sans-serif` | Labels, captions, accent UI               |
| `monospace` | `"Roboto Mono", monospace`     | Code editor contexts                      |
| `system`    | `"Roboto", sans-serif`         | Performance-critical surfaces             |

### Rules

- **Skillsoft Text Medium (500)** for headlines, sub-headlines, CTAs, and buttons — use `fontWeight="title"`, not literal `700`.
- **Skillsoft Text Regular (400)** for body text, UI labels, and menu items.
- Text is **left-aligned** by default. Center-align only for short marketing headlines. Never right-align.
- Do not adjust letter-spacing.

### Font weight scale

| Token   | Value   | Use                      |
| ------- | ------- | ------------------------ |
| `base`  | 400     | Body text, UI labels     |
| `title` | **500** | Headlines, CTAs, buttons |

### Font size scale

Standard Gamut font size scale:

| Token key | Size | Common use                   |
| --------- | ---- | ---------------------------- |
| `64`      | 64px | Hero / display               |
| `44`      | 44px | Page titles                  |
| `34`      | 34px | Section titles               |
| `26`      | 26px | Sub-section titles           |
| `22`      | 22px | Card titles, large UI labels |
| `20`      | 20px | Secondary titles             |
| `18`      | 18px | Large body, intro text       |
| `16`      | 16px | Default body text            |
| `14`      | 14px | Small body, captions, labels |

### Line height scale

Standard Gamut line height scale:

| Token         | Value | Use                             |
| ------------- | ----- | ------------------------------- |
| `base`        | 1.5   | Body text                       |
| `spacedTitle` | 1.3   | Sub-headlines and medium titles |
| `title`       | 1.2   | Large headlines                 |

### Line length

Target 45–85 characters per line; 66 characters is ideal. Max 50 for multi-column layouts.

---

## Spacing Scale

All spacing is multiples of 4px on an 8px grid.

| Token | Value |
| ----- | ----- |
| `0`   | 0     |
| `4`   | 4px   |
| `8`   | 8px   |
| `12`  | 12px  |
| `16`  | 16px  |
| `24`  | 24px  |
| `32`  | 32px  |
| `40`  | 40px  |
| `48`  | 48px  |
| `64`  | 64px  |
| `96`  | 96px  |

---

## Border Radius Scale

| Token  | Value | Use                      |
| ------ | ----- | ------------------------ |
| `none` | 0px   | Non-interactive elements |
| `sm`   | 2px   | Overlays                 |
| `md`   | 4px   | Interactive elements     |
| `lg`   | 8px   | Non-interactive elements |
| `xl`   | 16px  | Non-interactive elements |
| `full` | 999px | Toggles, badges          |

---

## Responsive Behavior

Mobile-first; apply styles from the named breakpoint up.

| Token    | Min-width | Max content |
| -------- | --------- | ----------- |
| _(base)_ | 0         | 288px       |
| `xs`     | 480px     | 448px       |
| `sm`     | 768px     | 704px       |
| `md`     | 1024px    | 896px       |
| `lg`     | 1200px    | 1072px      |
| `xl`     | 1440px    | 1248px      |

12-column grid at all breakpoints.

| Usage                 | Recommended values                               |
| --------------------- | ------------------------------------------------ |
| Horizontal margins    | 64px (lg+), 48px (md), 32px (sm/xs), 16px (base) |
| Column gaps (gutters) | 32px (lg+), 24px (md), 16px (sm/xs), 8px (base)  |
| Row gaps              | 32px (lg+), 24px (md), 16px (sm/xs), 8px (base)  |

Minimum interactive touch target: **44×44px** on mobile breakpoints.

---

## Component Library

Gamut atoms, molecules, and organisms all apply. Use semantic tokens below for Percipio-specific styling.

Key patterns:

- `FillButton` — `bg: primary`, `hover: primary-hover`
- `Checkbox` / `Toggle` — `primary`, `hover: primary-hover`
- `Card` — `shadow-primary` (`navy-200`); `patternLeft` / `patternRight` are available but rarely used

---

## Do's and Don'ts

### Colors

- **Do** use semantic color aliases (`primary`, `text`, `background`, etc.) — never hardcode hex values.
- **Do** use `primary` (resolves to palette `sapphire` in light mode) as the brand interactive color.
- **Don't** assume Percipio has a bespoke dark palette — it inherits Core's dark values unmodified (see Semantic Color Aliases). `primary` in particular becomes Core's `yellow-500` in dark mode, not `sapphire` — verify visually rather than assuming brand color persists.

### Typography

- **Do** use title weight (500) for headlines, CTAs, and buttons — not 700.
- **Do** keep body text at 150–175% line height for readability.
- **Don't** use fonts outside the Percipio theme stack (Skillsoft Text, Skillsoft Sans, Roboto Mono for code).
- **Don't** right-align or center-align body paragraphs.
- **Don't** adjust letter-spacing.

### Layout & Spacing

- **Do** use multiples of 8px for block-element spacing (4px only for inline / typographic relationships).
- **Do** begin design work at 1440px (XL), then adapt down.
- **Do** align elements to the 12-column grid.

---

## Agent Prompt Guide

Quick color/token reference for generating or specifying Percipio UI:

| Scenario         | Tokens                                                                                             |
| ---------------- | -------------------------------------------------------------------------------------------------- |
| Primary button   | `bg: primary`, `color: primary-inverse`, `hover: primary-hover`                                    |
| Body text        | `color: text`, `font: base`, `size: 16`, `weight: 400`, `lineHeight: base`                         |
| Headline         | `color: text`, `font: base`, `size: 34–64`, `weight: title`, `lineHeight: title`                   |
| Secondary text   | `color: text-secondary`                                                                            |
| Disabled text    | `color: text-disabled`                                                                             |
| Elevated surface | `bg: background-primary`                                                                           |
| Card default     | `bg: background`, `borderRadius: none` — add `isInteractive` for hover shadow + `borderRadius: md` |
| Error state      | `color: feedback-error`, `bg: background-error`, `borderColor: danger`                             |
| Success state    | `color: feedback-success`, `bg: background-success`                                                |
| Warning state    | `color: feedback-warning`, `bg: background-warning`                                                |
| Disabled state   | `color: text-disabled`, `bg: background-disabled`, `borderColor: border-disabled`                  |

### Component token cheatsheet

```
FillButton      → bg: primary,      color: primary-inverse, hover: primary-hover
StrokeButton    → bg: transparent, borderColor: secondary, hover: secondary-hover
Checkbox/Toggle → bg: primary,      hover: primary-hover
Card            → bg: background,  shadow: shadow-primary (navy-200, soft)
Alert (error)   → uses feedback-error + background-error
Alert (success) → uses feedback-success + background-success
Alert (warning) → uses feedback-warning + background-warning
```
