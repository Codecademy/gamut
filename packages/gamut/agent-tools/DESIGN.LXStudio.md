---
version: alpha
name: LX Studio Design System
description: Design tokens for the Skillsoft LX Studio authoring platform.
colors:
  # LX Studio additions — custom brand tokens
  sapphire: '#1C50BB'
  lxStudioSuccess: '#06844F'
  lxStudioBgPrimary: '#FAFBFC'
  # core palette — referenced by semantic aliases below
  hyper-500: '#3A10E5'
  hyper-400: '#5533FF'
  navy-900: '#0A0D1C'
  navy-800: '#10162F'
  navy-700: 'rgba(16, 22, 47, 0.86)'
  navy-600: 'rgba(16, 22, 47, 0.75)'
  navy-500: 'rgba(16, 22, 47, 0.63)'
  navy-400: 'rgba(16, 22, 47, 0.47)'
  navy-300: 'rgba(16, 22, 47, 0.28)'
  navy-200: 'rgba(16, 22, 47, 0.12)'
  navy-100: 'rgba(16, 22, 47, 0.04)'
  yellow-500: '#FFD300'
  yellow-0: '#FFFAE5'
  green-700: '#008A27'
  green-0: '#F5FFE3'
  red-600: '#BE1809'
  red-500: '#E91C11'
  red-0: '#FBF1F0'
  white: '#ffffff'
  # semantic aliases — use these in code, not palette swatches or hex values
  text: '{colors.navy-800}'
  text-accent: '{colors.navy-900}'
  text-secondary: '{colors.navy-600}'
  text-disabled: '{colors.navy-500}'
  background: '{colors.white}'
  background-primary: '{colors.lxStudioBgPrimary}'
  background-contrast: '{colors.white}'
  background-selected: '{colors.navy-100}'
  background-hover: '{colors.navy-200}'
  background-disabled: '{colors.navy-200}'
  background-success: '{colors.green-0}'
  background-warning: '{colors.yellow-0}'
  background-error: '{colors.red-0}'
  primary: '{colors.sapphire}'
  primary-hover: '{colors.navy-800}'
  primary-inverse: '{colors.yellow-500}'
  secondary: '{colors.navy-800}'
  secondary-hover: '{colors.navy-700}'
  danger: '{colors.red-500}'
  danger-hover: '{colors.red-600}'
  feedback-error: '{colors.red-600}'
  feedback-success: '{colors.lxStudioSuccess}'
  feedback-warning: '{colors.yellow-500}'
  border-primary: '{colors.navy-400}'
  border-secondary: '{colors.navy-600}'
  border-tertiary: '{colors.navy-800}'
  border-disabled: '{colors.navy-300}'
  shadow-primary: '{colors.navy-200}'
  shadow-secondary: '{colors.navy-600}'
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
    fontFamily: 'Monaco, Menlo, "Ubuntu Mono", "Droid Sans Mono", Consolas, monospace'
rounded:
  none: '0px'
  sm: '4px'
  md: '8px'
  lg: '12px'
  xl: '16px'
  full: '999px'
components:
  FillButton:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.white}'
    rounded: '{rounded.md}'
  FillButton-hover:
    backgroundColor: '{colors.primary-hover}'
    textColor: '{colors.white}'
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

# LX Studio

This file defines the visual design tokens for the Skillsoft LX Studio authoring platform, implemented using the Gamut design system (`@codecademy/gamut`, `@codecademy/gamut-styles`). LX Studio uses a dedicated Gamut theme that extends Core with its own brand colors, typography, and border radii — all Gamut components work without modification.

**Storybook**: https://gamut.codecademy.com

---

## Visual Theme & Atmosphere

LX Studio communicates **modern professional craft** — clean, precise, and tool-like. As an authoring environment for learning content creators, the interface must feel capable and unobtrusive. The design voice prioritizes clarity and control over personality.

**Density**: Medium. Layouts are information-dense but well-spaced; generous border radii and soft shadows reduce visual weight.

**Design philosophy**:

- Light mode only — no dark mode support
- Larger border radii than Core give the UI a softer, more modern feel
- Brand blue (`sapphire` / `primary`) drives CTAs, buttons, and links
- Shadows are soft (navy-200) rather than hard (navy-800 in Core light mode)
- Skillsoft Text and Skillsoft Sans replace Apercu and Suisse across all font roles

---

## Themes

LX Studio uses a single Gamut theme — light mode only.

| Theme         | Use case                               | Base font             | Dark mode  |
| ------------- | -------------------------------------- | --------------------- | ---------- |
| **LX Studio** | Skillsoft LX Studio authoring platform | Skillsoft Text / Sans | light only |

The active theme is set at the app root via `<GamutProvider theme={lxStudioTheme}>`.

---

## Semantic Color Aliases

Use these token names when specifying colors. LX Studio is light mode only — there are no dark mode counterparts.

### Text

| Token            | Resolves to | Use for                     |
| ---------------- | ----------- | --------------------------- |
| `text`           | `navy-800`  | Default body and UI text    |
| `text-accent`    | `navy-900`  | Stronger emphasis text      |
| `text-secondary` | `navy-600`  | Supporting / secondary copy |
| `text-disabled`  | `navy-500`  | Disabled state labels       |

### Background

| Token                 | Resolves to         | Use for                           |
| --------------------- | ------------------- | --------------------------------- |
| `background`          | `white`             | Default page/component background |
| `background-primary`  | `lxStudioBgPrimary` | Slightly elevated surfaces        |
| `background-contrast` | `white`             | Maximum contrast surface          |
| `background-selected` | `navy-100`          | Selected row / item               |
| `background-hover`    | `navy-200`          | Hover state overlay               |
| `background-disabled` | `navy-200`          | Disabled surface                  |
| `background-success`  | `green-0`           | Success state container           |
| `background-warning`  | `yellow-0`          | Warning state container           |
| `background-error`    | `red-0`             | Error state container             |

### Interactive

| Token             | Resolves to  | Use for                              |
| ----------------- | ------------ | ------------------------------------ |
| `primary`         | `sapphire`   | Primary CTA, links, focus rings      |
| `primary-hover`   | `navy-800`   | Hover state of primary interactive   |
| `primary-inverse` | `yellow-500` | Primary on a colored background      |
| `secondary`       | `navy-800`   | Secondary CTA, ghost buttons         |
| `secondary-hover` | `navy-700`   | Hover state of secondary interactive |
| `danger`          | `red-500`    | Destructive actions, error states    |
| `danger-hover`    | `red-600`    | Hover on danger interactive          |

### Border

| Token              | Resolves to | Use for                         |
| ------------------ | ----------- | ------------------------------- |
| `border-primary`   | `navy-400`  | Standard input and card borders |
| `border-secondary` | `navy-600`  | Medium-weight borders           |
| `border-tertiary`  | `navy-800`  | Strong structural borders       |
| `border-disabled`  | `navy-300`  | Disabled input borders          |

LX Studio's `border-primary` is mid-gray (navy-400) rather than Core's near-black navy-800 — borders are softer and less prominent.

### Feedback

| Token              | Resolves to       | Use for                          |
| ------------------ | ----------------- | -------------------------------- |
| `feedback-error`   | `red-600`         | Error messages, validation       |
| `feedback-success` | `lxStudioSuccess` | Success messages, confirmations  |
| `feedback-warning` | `yellow-500`      | Warning messages, caution states |

### Shadow

| Token              | Resolves to |
| ------------------ | ----------- |
| `shadow-primary`   | `navy-200`  |
| `shadow-secondary` | `navy-600`  |

LX Studio shadows are soft — use `shadow-primary` for standard elevated surfaces. This matches Percipio's shadow weight, not Core's hard navy-800 shadow.

---

## LX Studio Color Palette

LX Studio adds named colors to the core palette. Use semantic aliases in code, not these raw names.

| Palette token       | Semantic alias(es)   |
| ------------------- | -------------------- |
| `sapphire`          | `primary`            |
| `lxStudioSuccess`   | `feedback-success`   |
| `lxStudioBgPrimary` | `background-primary` |

The full core swatch palette (navy, hyper, blue, green, yellow, red, etc.) is also available. Raw swatches should only be used for fixed colors that must not adapt (illustrations, data viz, etc.).

---

## Typography

### Typefaces

LX Studio uses **Skillsoft Text** for body and headlines and **Skillsoft Sans** for accent UI. There is no Apercu and no Suisse.

| Token       | Font                                                  | Use for                                   |
| ----------- | ----------------------------------------------------- | ----------------------------------------- |
| `base`      | `"Skillsoft Text"`, sans-serif fallback               | All default UI text, headlines, body copy |
| `accent`    | `"Skillsoft Sans"`, sans-serif fallback               | Labels, captions, accent UI               |
| `monospace` | Monaco, Menlo, Ubuntu Mono, Droid Sans Mono, Consolas | Code editor contexts                      |
| `system`    | System UI fonts                                       | Performance-critical surfaces             |

Skillsoft fonts are loaded via Gamut's asset provider (same stack as Percipio).

### Rules

- **Skillsoft Text Medium (500)** for headlines, sub-headlines, CTAs, and buttons — use `fontWeight="title"`, not literal `700`.
- **Skillsoft Text Regular (400)** for body text, UI labels, and menu items.
- Text is **left-aligned** by default. Center-align only for short marketing headlines. Never right-align.
- Do not adjust letter-spacing.
- Skillsoft Sans is the accent face; Skillsoft Text is used for `base` and title styles.

### Font weight scale

| Token   | Value   | Use                                                  |
| ------- | ------- | ---------------------------------------------------- |
| `base`  | 400     | Body text, UI labels                                 |
| `title` | **500** | Headlines, CTAs, buttons _(differs from Core's 700)_ |

### Font size scale

Shared with Core — all sizes are identical.

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

Shared with Core.

| Token         | Value | Use                             |
| ------------- | ----- | ------------------------------- |
| `base`        | 1.5   | Body text                       |
| `spacedTitle` | 1.3   | Sub-headlines and medium titles |
| `title`       | 1.2   | Large headlines                 |

### Line length

Target 45–85 characters per line; 66 characters is ideal. Max 50 for multi-column layouts.

---

## Spacing Scale

Identical to Core. All spacing is multiples of 4px on an 8px grid.

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

LX Studio uses larger border radii than Core — everything is one step softer.

| Token  | LX Studio | Core  | Use                                        |
| ------ | --------- | ----- | ------------------------------------------ |
| `none` | 0px       | 0px   | Square / non-interactive elements          |
| `sm`   | **4px**   | 2px   | Subtle rounding, tags, checkboxes          |
| `md`   | **8px**   | 4px   | Default buttons, inputs, interactive cards |
| `lg`   | **12px**  | 8px   | Cards, panels                              |
| `xl`   | 16px      | 16px  | Large cards, modals                        |
| `full` | 999px     | 999px | Pills, avatars, circular elements          |

---

## Responsive Behavior

Identical to Core. Mobile-first, apply styles from the named breakpoint up.

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

Same component library as Codecademy — all atoms, molecules, and organisms apply. Token values resolve differently per theme automatically.

Key LX Studio-specific visual differences:

- `FillButton` uses `primary` (`sapphire`) instead of Core `hyper-500`
- `FillButton` hover uses `primary-hover` (`navy-800`) — darker on hover
- `Checkbox` / `Toggle` use palette `hyper-500` (not `primary`)
- All interactive elements have `borderRadius: md` (8px) instead of Core's 4px
- `Card` shadows use navy-200 (soft) rather than navy-800 (hard)
- No `Card-beige` variant — LX Studio `background-primary` is off-white, not beige

---

## Do's and Don'ts

### Colors

- **Do** use semantic color aliases (`primary`, `text`, `background`, etc.) — never hardcode hex values.
- **Do** use `primary` (resolves to palette `sapphire`) for buttons and links.
- **Don't** attempt dark mode — LX Studio is light only.
- **Don't** use the Percipio or Codecademy primary blue/hyper colors directly; go through semantic aliases.

### Typography

- **Do** use `fontWeight="title"` (500) for headlines, CTAs, and buttons.
- **Do** keep body text at 150–175% line height for readability.
- **Don't** use Apercu, Suisse, or Hanken Grotesk — LX Studio uses Skillsoft Text and Skillsoft Sans.
- **Don't** right-align or center-align body paragraphs.
- **Don't** adjust letter-spacing.

### Layout & Spacing

- **Do** use multiples of 8px for block-element spacing (4px only for inline / typographic relationships).
- **Do** begin design work at 1440px (XL), then adapt down.
- **Do** align elements to the 12-column grid.
- **Do** apply the larger `md` border radius (8px) to buttons and inputs — it defines the LX Studio feel.

---

## Agent Prompt Guide

Quick color/token reference for generating or specifying LX Studio UI:

| Scenario         | Tokens                                                                                             |
| ---------------- | -------------------------------------------------------------------------------------------------- |
| Primary button   | `bg: primary`, `color: white`, `hover: primary-hover`, `borderRadius: md`                          |
| Body text        | `color: text`, `font: base`, `size: 16`, `weight: 400`, `lineHeight: base`                         |
| Headline         | `color: text-accent`, `font: base`, `size: 34–64`, `weight: title`, `lineHeight: title`            |
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
FillButton      → bg: primary,     color: white,    hover: primary-hover, borderRadius: md
StrokeButton    → bg: transparent, borderColor: secondary
Checkbox/Toggle → palette hyper-500, hover hyper-400, borderRadius: sm
Card            → bg: background,  shadow: shadow-primary (navy-200, soft),                  radius: none
Alert (error)   → uses feedback-error + background-error
Alert (success) → uses feedback-success + background-success
Alert (warning) → uses feedback-warning + background-warning
```
