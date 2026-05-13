---
version: alpha
name: Percipio Design System
description: Design tokens for the Skillsoft Percipio platform.
colors:
  # palette — raw swatches; set once on :root and then always reference by token name, never use hex values directly in code
  percipioTextPrimary: '#222325'
  percipioTextSecondary: '#595A5C'
  percipioTextDisabled: '#AFB6C2'
  percipioActionPrimary: '#0073C4'
  percipioActionPrimaryHover: '#141C36'
  percipioActionSecondary: '#6A6E75'
  percipioActionSecondaryHover: '#7F8288'
  percipioActionDangerHover: '#A52020'
  percipioDanger: '#B83C3C'
  percipioFeedbackSuccess: '#1B8057'
  percipioFeedbackWarning: '#EF5B0D'
  percipioBgPrimary: '#FAFBFC'
  percipioBgSuccess: '#EEF7F3'
  percipioBgWarning: '#FFF7E0'
  percipioBgError: '#FFF1F5'
  navy-800: '#10162F'
  navy-400: '#8F919D'
  navy-300: '#BCBEC5'
  navy-200: '#E2E3E6'
  navy-100: '#F5F6F7'
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
  primary: '{colors.percipioActionPrimary}'
  primary-hover: '{colors.percipioActionPrimaryHover}'
  primary-inverse: '{colors.white}'
  secondary: '{colors.percipioActionSecondary}'
  secondary-hover: '{colors.percipioActionSecondaryHover}'
  interface: '{colors.percipioActionPrimary}'
  interface-hover: '{colors.percipioActionPrimaryHover}'
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
    fontFamily: '"Roboto", sans-serif'
    fontSize: '1rem'
    fontWeight: '400'
    lineHeight: '1.5'
  accent:
    fontFamily: '"Roboto", sans-serif'
    fontSize: '0.875rem'
    fontWeight: '400'
    lineHeight: '1.5'
  title:
    fontFamily: '"Roboto", sans-serif'
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
    backgroundColor: '{colors.interface}'
    rounded: '{rounded.sm}'
  Checkbox-hover:
    backgroundColor: '{colors.interface-hover}'
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

---

## Visual Theme & Atmosphere

Percipio communicates **professional clarity** — clean, trustworthy, and enterprise-ready. The design voice is more neutral and corporate than Codecademy: less playful, more functional. Primary blue drives interactive affordances; neutral grays define text and structure.

**Density**: Medium. Consistent with Codecademy layouts but with softer shadows and a lighter overall feel due to the muted neutral palette.

**Design philosophy**:

- Light mode only — no dark mode support
- Primary blue (`percipioActionPrimary`) replaces Codecademy's `hyper-500` for all interactive elements
- Text is near-black dark gray rather than navy
- Shadows are soft and minimal (navy at low opacity) rather than hard borders
- Title font weight is 500 (medium) rather than 700 (bold) — Percipio headlines are less heavy

---

## Themes

Percipio uses a single Gamut theme — light mode only.

| Theme        | Use case                    | Base font | Dark mode  |
| ------------ | --------------------------- | --------- | ---------- |
| **Percipio** | Skillsoft Percipio platform | Roboto    | light only |

The active theme is set at the app root via `<GamutProvider theme={percipioTheme}>`.

---

## Semantic Color Aliases

Use these token names when specifying colors. Percipio is light mode only — there are no dark mode counterparts.

### Text

| Token            | Value     | Use for                                          |
| ---------------- | --------- | ------------------------------------------------ |
| `text`           | `#222325` | Default body and UI text                         |
| `text-accent`    | `#222325` | Emphasis text (same value as `text` in Percipio) |
| `text-secondary` | `#595A5C` | Supporting / secondary copy                      |
| `text-disabled`  | `#AFB6C2` | Disabled state labels                            |

### Background

| Token                 | Value                | Use for                           |
| --------------------- | -------------------- | --------------------------------- |
| `background`          | `#ffffff`            | Default page/component background |
| `background-primary`  | `#FAFBFC`            | Slightly elevated surfaces        |
| `background-selected` | `#F5F6F7` (navy-100) | Selected row / item               |
| `background-hover`    | `#E2E3E6` (navy-200) | Hover state overlay               |
| `background-disabled` | `#E2E3E6` (navy-200) | Disabled surface                  |
| `background-success`  | `#EEF7F3`            | Success state container           |
| `background-warning`  | `#FFF7E0`            | Warning state container           |
| `background-error`    | `#FFF1F5`            | Error state container             |

### Interactive

| Token             | Value     | Use for                                       |
| ----------------- | --------- | --------------------------------------------- |
| `primary`         | `#0073C4` | Primary CTA, links, focus rings               |
| `primary-hover`   | `#141C36` | Hover state of primary interactive            |
| `primary-inverse` | `#ffffff` | Primary on a colored background               |
| `secondary`       | `#6A6E75` | Secondary CTA, ghost buttons                  |
| `secondary-hover` | `#7F8288` | Hover state of secondary interactive          |
| `interface`       | `#0073C4` | UI affordances (checkboxes, toggles, sliders) |
| `interface-hover` | `#141C36` | Hover on interface elements                   |
| `danger`          | `#B83C3C` | Destructive actions, error states             |
| `danger-hover`    | `#A52020` | Hover on danger interactive                   |

### Border

Percipio's border weights use a non-standard order: `primary` is mid-weight, `secondary` is very light, `tertiary` is the strongest (solid navy). Use them for their semantic intent, not their numeric rank.

| Token              | Value                | Use for                             |
| ------------------ | -------------------- | ----------------------------------- |
| `border-primary`   | `#8F919D` (navy-400) | Standard input and card borders     |
| `border-secondary` | `#E2E3E6` (navy-200) | Subtle dividers, section separators |
| `border-tertiary`  | `#10162F` (navy-800) | Strong structural borders           |
| `border-disabled`  | `#BCBEC5` (navy-300) | Disabled input borders              |

### Feedback

| Token              | Value     | Use for                          |
| ------------------ | --------- | -------------------------------- |
| `feedback-error`   | `#B83C3C` | Error messages, validation       |
| `feedback-success` | `#1B8057` | Success messages, confirmations  |
| `feedback-warning` | `#EF5B0D` | Warning messages, caution states |

### Shadow

| Token              | Value                |
| ------------------ | -------------------- |
| `shadow-primary`   | `#E2E3E6` (navy-200) |
| `shadow-secondary` | `#8F919D` (navy-400) |

Percipio shadows are softer than Codecademy's — use `shadow-primary` for standard elevated surfaces.

---

## Percipio Color Palette

Percipio introduces its own named semantic colors. These are the source values behind the aliases above. Use the semantic aliases in designs, not the raw named colors.

| Named color                    | Value     | Mapped to                          |
| ------------------------------ | --------- | ---------------------------------- |
| `percipioTextPrimary`          | `#222325` | `text`, `text-accent`              |
| `percipioTextSecondary`        | `#595A5C` | `text-secondary`                   |
| `percipioTextDisabled`         | `#AFB6C2` | `text-disabled`                    |
| `percipioActionPrimary`        | `#0073C4` | `primary`, `interface`             |
| `percipioActionPrimaryHover`   | `#141C36` | `primary-hover`, `interface-hover` |
| `percipioActionSecondary`      | `#6A6E75` | `secondary`                        |
| `percipioActionSecondaryHover` | `#7F8288` | `secondary-hover`                  |
| `percipioActionDangerHover`    | `#A52020` | `danger-hover`                     |
| `percipioDanger`               | `#B83C3C` | `danger`, `feedback-error`         |
| `percipioFeedbackSuccess`      | `#1B8057` | `feedback-success`                 |
| `percipioFeedbackWarning`      | `#EF5B0D` | `feedback-warning`                 |
| `percipioBgPrimary`            | `#FAFBFC` | `background-primary`               |
| `percipioBgSuccess`            | `#EEF7F3` | `background-success`               |
| `percipioBgWarning`            | `#FFF7E0` | `background-warning`               |
| `percipioBgError`              | `#FFF1F5` | `background-error`                 |

The full core swatch palette (navy, blue, green, yellow, red, etc.) is also available, but the semantic aliases above are how Percipio maps them. Raw swatches should only be used for fixed colors that must not adapt (illustrations, data viz, etc.).

---

## Typography

### Typefaces

All font families in Percipio use **Roboto**. There is no separate accent or display typeface.

| Token       | Font                       | Use for                                     |
| ----------- | -------------------------- | ------------------------------------------- |
| `base`      | `"Roboto", sans-serif`     | All default UI text, headlines, body copy   |
| `accent`    | `"Roboto", sans-serif`     | Labels, captions (same as base in Percipio) |
| `monospace` | `"Roboto Mono", monospace` | Code editor contexts                        |
| `system`    | `"Roboto", sans-serif`     | Performance-critical surfaces               |

### Rules

- **Roboto Medium (500)** for headlines, sub-headlines, CTAs, and buttons — not Bold (700).
- **Roboto Regular (400)** for body text, UI labels, and menu items.
- Text is **left-aligned** by default. Center-align only for short marketing headlines. Never right-align.
- Do not adjust letter-spacing.

### Font weight scale

Percipio overrides the title weight from Core's 700 to 500 (medium). This gives Percipio a lighter, less heavy headline style.

| Token   | Value   | Use                                                        |
| ------- | ------- | ---------------------------------------------------------- |
| `base`  | 400     | Body text, UI labels                                       |
| `title` | **500** | Headlines, CTAs, buttons _(differs from Codecademy's 700)_ |

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

Identical to Core.

| Token  | Value | Use                                        |
| ------ | ----- | ------------------------------------------ |
| `none` | 0px   | Square / non-interactive elements          |
| `sm`   | 2px   | Subtle rounding, tags                      |
| `md`   | 4px   | Default buttons, inputs, interactive cards |
| `lg`   | 8px   | Cards, panels                              |
| `xl`   | 16px  | Large cards, modals                        |
| `full` | 999px | Pills, avatars, circular elements          |

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

Key Percipio-specific visual differences:

- `FillButton` uses `#0073C4` (blue) instead of hyper-purple
- `FillButton` hover shifts to near-black `#141C36` rather than a lighter purple
- `Checkbox` / `Toggle` use the same blue `#0073C4`
- `Card` has softer shadows (navy-200 vs navy-800 in Codecademy light mode)
- Card shadow patterns (`patternLeft`, `patternRight`) are available but rarely used in Percipio UIs

---

## Do's and Don'ts

### Colors

- **Do** use semantic color aliases (`primary`, `text`, `background`, etc.) — never hardcode hex values.
- **Do** use `#0073C4` blue as the only primary interactive color.
- **Don't** use Codecademy's hyper-purple or yellow in Percipio contexts.
- **Don't** attempt dark mode — Percipio is light only.

### Typography

- **Do** use title weight (500) for headlines, CTAs, and buttons — not 700.
- **Do** keep body text at 150–175% line height for readability.
- **Don't** use a separate accent typeface — Roboto is used uniformly for base and accent.
- **Don't** right-align or center-align body paragraphs.
- **Don't** adjust letter-spacing.

### Layout & Spacing

- **Do** use multiples of 8px for block-element spacing (4px only for inline / typographic relationships).
- **Do** begin design work at 1440px (XL), then adapt down.
- **Do** align elements to the 12-column grid.

---

## Agent Prompt Guide

Quick color/token reference for generating or specifying Percipio UI:

| Scenario         | Tokens                                                                                                       |
| ---------------- | ------------------------------------------------------------------------------------------------------------ |
| Primary button   | `bg: primary (#0073C4)`, `color: white`, `hover: primary-hover (#141C36)`                                    |
| Body text        | `color: text (#222325)`, `font: Roboto`, `size: 16px`, `weight: 400`, `lineHeight: base (1.5)`               |
| Headline         | `color: text (#222325)`, `font: Roboto`, `size: 34–64px`, `weight: title (500)`, `lineHeight: title (1.2)`   |
| Secondary text   | `color: text-secondary (#595A5C)`                                                                            |
| Disabled text    | `color: text-disabled (#AFB6C2)`                                                                             |
| Elevated surface | `bg: background-primary (#FAFBFC)`                                                                           |
| Card default     | `bg: background (#ffffff)`, `borderRadius: none` — add `isInteractive` for hover shadow + `borderRadius: md` |
| Error state      | `color: feedback-error (#B83C3C)`, `bg: background-error (#FFF1F5)`, `border: danger`                        |
| Success state    | `color: feedback-success (#1B8057)`, `bg: background-success (#EEF7F3)`                                      |
| Warning state    | `color: feedback-warning (#EF5B0D)`, `bg: background-warning (#FFF7E0)`                                      |
| Disabled state   | `color: text-disabled (#AFB6C2)`, `bg: background-disabled (#E2E3E6, navy-200)`, `border: border-disabled`   |

### Component token cheatsheet

```
FillButton      → bg: primary (#0073C4),  color: white,    hover: primary-hover (#141C36)
StrokeButton    → bg: transparent,         border: secondary (#6A6E75)
Checkbox/Toggle → interface (#0073C4),     hover: interface-hover (#141C36)
Card            → bg: background,  shadow: shadow-primary (#E2E3E6, navy-200, soft)
Alert (error)   → uses feedback-error + background-error
Alert (success) → uses feedback-success + background-success
Alert (warning) → uses feedback-warning + background-warning
```
