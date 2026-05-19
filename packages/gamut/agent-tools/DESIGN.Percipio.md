---
version: alpha
name: Percipio Design System
description: Design tokens for the Skillsoft Percipio platform.
colors:
  # palette — raw swatches; set once on :root and then always reference by token name, never use hex values directly in code
  percipioTextPrimary: '#222325'
  percipioTextAccent: '#222325'
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
  text-accent: '{colors.percipioTextAccent}'
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
  system:
    fontFamily: '"Roboto", sans-serif'
  '14':
    fontSize: '0.875rem'
  '16':
    fontSize: '1rem'
  '18':
    fontSize: '1.125rem'
  '20':
    fontSize: '1.25rem'
  '22':
    fontSize: '1.375rem'
  '26':
    fontSize: '1.625rem'
  '34':
    fontSize: '2.125rem'
  '44':
    fontSize: '2.75rem'
  '64':
    fontSize: '4rem'
borderRadii:
  none: '0px'
  sm: '2px'
  md: '4px'
  lg: '8px'
  xl: '16px'
  full: '999px'
spacing:
  '0': '0'
  '4': '0.25rem'
  '8': '0.5rem'
  '12': '0.75rem'
  '16': '1rem'
  '24': '1.5rem'
  '32': '2rem'
  '40': '2.5rem'
  '48': '3rem'
  '64': '4rem'
  '96': '6rem'
components:
  FillButton:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.primary-inverse}'
    borderRadii: '{borderRadii.md}'
  FillButton-hover:
    backgroundColor: '{colors.primary-hover}'
    textColor: '{colors.primary-inverse}'
  FillButton-danger:
    backgroundColor: '{colors.danger}'
    textColor: '{colors.white}'
    borderRadii: '{borderRadii.md}'
  FillButton-danger-hover:
    backgroundColor: '{colors.danger-hover}'
    textColor: '{colors.white}'
  StrokeButton:
    backgroundColor: 'transparent'
    textColor: '{colors.secondary}'
    borderRadii: '{borderRadii.md}'
  StrokeButton-hover:
    textColor: '{colors.secondary-hover}'
  TextButton:
    backgroundColor: 'transparent'
    textColor: '{colors.primary}'
  TextButton-hover:
    textColor: '{colors.primary-hover}'
  IconButton:
    backgroundColor: 'transparent'
    textColor: '{colors.secondary}'
  IconButton-hover:
    textColor: '{colors.secondary-hover}'
  Input:
    backgroundColor: '{colors.background}'
    textColor: '{colors.text}'
    borderRadii: '{borderRadii.md}'
    borderColor: '{colors.border-primary}'
  Checkbox:
    backgroundColor: '{colors.primary}'
    borderRadii: '{borderRadii.sm}'
  Checkbox-hover:
    backgroundColor: '{colors.primary-hover}'
  Card:
    backgroundColor: '{colors.background}'
    borderRadii: '{borderRadii.none}'
  Card-interactive:
    borderRadii: '{borderRadii.md}'
  Card-elevated:
    backgroundColor: '{colors.background-primary}'
    borderRadii: '{borderRadii.lg}'
  Headline:
    textColor: '{colors.text-accent}'
    typography: '{typography.title}'
  Tag-success:
    backgroundColor: '{colors.feedback-success}'
    textColor: '{colors.white}'
    borderRadii: '{borderRadii.sm}'
  Tag-warning:
    backgroundColor: '{colors.feedback-warning}'
    textColor: '{colors.text}'
    borderRadii: '{borderRadii.sm}'
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

## Overview

Percipio communicates **professional clarity** — clean, trustworthy, and enterprise-ready. The design voice is more neutral and corporate than Codecademy: less playful, more functional. Primary blue drives interactive affordances; neutral grays define text and structure.

**Density**: Medium. Consistent with Codecademy layouts but with softer shadows and a lighter overall feel due to the muted neutral palette.

### Themes

Percipio uses a single Gamut theme that extends Core. **Light mode** applies Percipio-specific semantic overrides (sapphire primary, percipio neutrals). **Dark mode** inherits Core dark semantics — use `<ColorMode>` and semantic tokens the same way as Codecademy.

| Theme        | Use case                    | Base font             | Dark mode      |
| ------------ | --------------------------- | --------------------- | -------------- |
| **Percipio** | Skillsoft Percipio platform | Skillsoft Sans / Text | ✓ light + dark |

Set the active theme via `<GamutProvider theme={percipioTheme}>`. Install in app repos: `gamut plugin install cursor --theme percipio` (copies to `./DESIGN.md`).

---

## Colors

Use semantic token names in code and designs. They resolve per color mode automatically. **Never hardcode hex values** for adaptive UI. **Never hardcode core-theme values** like `beige` — use `background-primary` (`#FAFBFC` on Percipio).

For dark/light regions, use `<ColorMode>` or `<Background>` — never swap colors manually with custom CSS.

### Text

| Token            | Light                    | Dark            | Use for                                          |
| ---------------- | ------------------------ | --------------- | ------------------------------------------------ |
| `text`           | `#222325`                | white `#ffffff` | Default body and UI text                         |
| `text-accent`    | `#222325`                | beige `#FFF0E5` | Emphasis text (same as `text` in Percipio light) |
| `text-secondary` | `rgba(34, 35, 37, 0.75)` | white at 65%    | Supporting / secondary copy                      |
| `text-disabled`  | `#AFB6C2`                | white at 50%    | Disabled state labels                            |

### Background

| Token                 | Light                             | Dark                 | Use for                           |
| --------------------- | --------------------------------- | -------------------- | --------------------------------- |
| `background`          | white `#ffffff`                   | navy-800 `#10162F`   | Default page/component background |
| `background-primary`  | `#FAFBFC`                         | navy-900 `#0A0D1C`   | Slightly elevated surfaces        |
| `background-selected` | navy-100 `rgba(16, 22, 47, 0.04)` | white at 4%          | Selected row / item               |
| `background-hover`    | navy-200 `rgba(16, 22, 47, 0.12)` | white at 9%          | Hover state overlay               |
| `background-disabled` | navy-200 `rgba(16, 22, 47, 0.12)` | white at 9%          | Disabled surface                  |
| `background-success`  | `#EEF7F3`                         | green-900 `#151C07`  | Success state container           |
| `background-warning`  | `#FFF7E0`                         | yellow-900 `#211B00` | Warning state container           |
| `background-error`    | `#FFF1F5`                         | red-900 `#280503`    | Error state container             |

### Interactive

| Token             | Light                       | Dark                 | Use for                              |
| ----------------- | --------------------------- | -------------------- | ------------------------------------ |
| `primary`         | sapphire `#1C50BB`          | yellow-500 `#FFD300` | Primary CTA, links, focus rings      |
| `primary-hover`   | `#141C36`                   | yellow-400 `#CCA900` | Hover state of primary interactive   |
| `primary-inverse` | white `#ffffff`             | hyper-500 `#3A10E5`  | Primary on a colored background      |
| `secondary`       | `#6A6E75`                   | white `#ffffff`      | Secondary CTA, ghost buttons         |
| `secondary-hover` | `rgba(106, 110, 117, 0.86)` | white at 80%         | Hover state of secondary interactive |
| `danger`          | `#B83C3C`                   | red-300 `#E85D7F`    | Destructive actions, error states    |
| `danger-hover`    | `#A52020`                   | red-400 `#DC5879`    | Hover on danger interactive          |

### Border

Percipio's border weights use a non-standard order: `primary` is mid-weight, `secondary` is very light, `tertiary` is the strongest (solid navy). Use them for their semantic intent, not their numeric rank.

| Token              | Light                             | Dark            | Use for                             |
| ------------------ | --------------------------------- | --------------- | ----------------------------------- |
| `border-primary`   | navy-400 `rgba(16, 22, 47, 0.47)` | white `#ffffff` | Standard input and card borders     |
| `border-secondary` | navy-200 `rgba(16, 22, 47, 0.12)` | white at 65%    | Subtle dividers, section separators |
| `border-tertiary`  | navy-800 `#10162F`                | white at 20%    | Strong structural borders           |
| `border-disabled`  | navy-300 `rgba(16, 22, 47, 0.28)` | white at 50%    | Disabled input borders              |

### Feedback

| Token              | Light     | Dark                | Use for                          |
| ------------------ | --------- | ------------------- | -------------------------------- |
| `feedback-error`   | `#B83C3C` | red-300 `#E85D7F`   | Error messages, validation       |
| `feedback-success` | `#1B8057` | green-400 `#AEE938` | Success messages, confirmations  |
| `feedback-warning` | `#EF5B0D` | yellow-0 `#FFFAE5`  | Warning messages, caution states |

### Shadow

| Token              | Light                             | Dark         |
| ------------------ | --------------------------------- | ------------ |
| `shadow-primary`   | navy-200 `rgba(16, 22, 47, 0.12)` | white        |
| `shadow-secondary` | navy-400 `rgba(16, 22, 47, 0.47)` | white at 65% |

Percipio shadows are softer than Codecademy's — use `shadow-primary` for standard elevated surfaces.

---

### Percipio color palette

Percipio introduces its own named semantic colors. These are the source values behind the aliases above. Use the semantic aliases in designs, not the raw named colors.

| Named color                    | Value                       | Mapped to                  |
| ------------------------------ | --------------------------- | -------------------------- |
| `percipioTextPrimary`          | `#222325`                   | `text`                     |
| `percipioTextAccent`           | `#222325`                   | `text-accent`              |
| `percipioTextSecondary`        | `rgba(34, 35, 37, 0.75)`    | `text-secondary`           |
| `percipioTextDisabled`         | `#AFB6C2`                   | `text-disabled`            |
| `sapphire`                     | `#1C50BB`                   | `primary`                  |
| `percipioActionPrimaryHover`   | `#141C36`                   | `primary-hover`            |
| `percipioActionSecondary`      | `#6A6E75`                   | `secondary`                |
| `percipioActionSecondaryHover` | `rgba(106, 110, 117, 0.86)` | `secondary-hover`          |
| `percipioActionDangerHover`    | `#A52020`                   | `danger-hover`             |
| `percipioDanger`               | `#B83C3C`                   | `danger`, `feedback-error` |
| `percipioFeedbackSuccess`      | `#1B8057`                   | `feedback-success`         |
| `percipioFeedbackWarning`      | `#EF5B0D`                   | `feedback-warning`         |
| `percipioBgPrimary`            | `#FAFBFC`                   | `background-primary`       |
| `percipioBgSuccess`            | `#EEF7F3`                   | `background-success`       |
| `percipioBgWarning`            | `#FFF7E0`                   | `background-warning`       |
| `percipioBgError`              | `#FFF1F5`                   | `background-error`         |

The full core swatch palette (navy, blue, green, yellow, red, etc.) is also available, but the semantic aliases above are how Percipio maps them. Raw swatches should only be used for fixed colors that must not adapt (illustrations, data viz, etc.).

---

## Typography

### Typefaces

Percipio uses **Skillsoft Text** for body and **Skillsoft Sans** for accent/labels. Roboto is the `system` fallback; Roboto Mono is used for monospace.

| Token       | Font                       | Use for                                   |
| ----------- | -------------------------- | ----------------------------------------- |
| `base`      | `"Skillsoft Text", …`      | All default UI text, headlines, body copy |
| `accent`    | `"Skillsoft Sans", …`      | Labels, captions, technical context       |
| `monospace` | `"Roboto Mono", monospace` | Code editor contexts                      |
| `system`    | `"Roboto", sans-serif`     | Performance-critical surfaces             |

### Rules

- **Skillsoft Medium (500)** for headlines, sub-headlines, CTAs, and buttons — not Bold (700).
- **Skillsoft Regular (400)** for body text, UI labels, and menu items.
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

## Layout

### Spacing scale

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

### System props

**Never use inline `style` attributes.** Use system props shorthand (`m`, `mb`, `p`, `px`, etc.) and Gamut tokens for `bg`, `color`, `borderColor`, `borderRadius`.

### Responsive behavior

Identical to Core. Mobile-first; 12-column grid. Minimum touch target **44×44px** on mobile. Begin at 1440px (XL), then adapt down.

| Token    | Min-width | Max content |
| -------- | --------- | ----------- |
| _(base)_ | 0         | 288px       |
| `xs`     | 480px     | 448px       |
| `sm`     | 768px     | 704px       |
| `md`     | 1024px    | 896px       |
| `lg`     | 1200px    | 1072px      |
| `xl`     | 1440px    | 1248px      |

---

## Elevation & Depth

Percipio shadows are softer than Codecademy's — use `shadow-primary` (navy-200) for standard elevated surfaces. Card outline shadows use theme-resolved border/shadow tokens.

---

## Shapes

Identical to Core (`borderRadii` in YAML). **No custom radius values.**

| Token  | Value | Use                                        |
| ------ | ----- | ------------------------------------------ |
| `none` | 0px   | Square / non-interactive elements          |
| `sm`   | 2px   | Subtle rounding, tags, checkboxes          |
| `md`   | 4px   | Default buttons, inputs, interactive cards |
| `lg`   | 8px   | Cards, panels                              |
| `xl`   | 16px  | Large cards, modals                        |
| `full` | 999px | Pills, avatars, circular elements          |

---

## Components

Same component library as Codecademy — all atoms, molecules, and organisms apply. Token values resolve differently per theme automatically.

### Gamut implementation guardrails

Same rules as Codecademy (`DESIGN.Codecademy.md` Components section), with Percipio-specific notes:

- **Buttons:** no generic `Button`; `IconButton` requires `tip`; never set `mode` on buttons.
- **Forms:** `GridForm` / `ConnectedForm` for submit flows; atoms only for standalone/live controls.
- **Cards:** valid variants `default`, `white`, `yellow`, `beige`, `navy`, `hyper`; defaults `shadow="none"`, `isInteractive={false}`; set `isInteractive` only for link/interactive cards.
- **DataTable / DataList:** `sortable` requires `query`, `onQueryChange`, and client-sorted rows.
- **Menu:** always `variant="fixed"` + `as="nav"` or `variant="popover"`.
- **Color mode:** `<ColorMode>` / `<Background>`; no manual rgba overrides.
- **Accessibility:** WCAG contrast, 44×44px touch targets, `FocusTrap` in modals/drawers.
- **Assets:** `@codecademy/gamut-icons`, `gamut-illustrations`, `gamut-patterns`.

---

## Do's and Don'ts

### Colors

- **Do** use semantic color aliases (`primary`, `text`, `background`, etc.) — never hardcode hex values.
- **Do** use `sapphire` (`#1C50BB`) as the primary interactive color via semantic aliases in light mode.
- **Do** use `<ColorMode>` and `<Background>` for scoped light/dark — dark mode inherits from Core.
- **Don't** use Codecademy's hyper-purple or yellow directly in Percipio contexts — use semantic tokens.

### Typography

- **Do** use title weight (500) for headlines, CTAs, and buttons — not 700.
- **Do** keep body text at 150–175% line height for readability.
- **Don't** use Codecademy fonts (Apercu, Suisse) — Percipio uses Skillsoft Text and Skillsoft Sans.
- **Don't** right-align or center-align body paragraphs.
- **Don't** adjust letter-spacing.

### Layout & Spacing

- **Do** use multiples of 8px for block-element spacing (4px only for inline / typographic relationships).
- **Do** begin design work at 1440px (XL), then adapt down.
- **Do** align elements to the 12-column grid.

### Components

- **Don't** import a generic `Button` or use Codecademy hyper/yellow directly — use semantic tokens.
- **Don't** use bare form atoms for functional forms.

### Pre-ship validation

Before considering UI output final, run **`/gamut-review`** from the app repository root (the directory that contains `DESIGN.md`). Install the plugin first if needed: **Cursor** — `gamut plugin install cursor --theme percipio`; **Claude Code** — `gamut plugin install claude --theme percipio`.

The command performs automated checks (dependencies, `GamutProvider`, imports, hex colors, tests, component guardrails) and prints a **manual pre-ship checklist** keyed to this product's theme. Fix all errors before shipping. Full procedure: [`commands/gamut-review.md`](commands/gamut-review.md) in `@codecademy/gamut` agent-tools (installed as a slash command with the Gamut plugin).

---

## Agent Prompt Guide

Quick color/token reference for generating or specifying Percipio UI:

| Scenario         | Tokens                                                                                                             |
| ---------------- | ------------------------------------------------------------------------------------------------------------------ |
| Primary button   | `bg: primary (#1C50BB)`, `color: white`, `hover: primary-hover (#141C36)`                                          |
| Body text        | `color: text (#222325)`, `font: Skillsoft Text`, `size: 16px`, `weight: 400`, `lineHeight: base (1.5)`             |
| Headline         | `color: text (#222325)`, `font: Skillsoft Text`, `size: 34–64px`, `weight: title (500)`, `lineHeight: title (1.2)` |
| Secondary text   | `color: text-secondary (rgba(34, 35, 37, 0.75))`                                                                   |
| Disabled text    | `color: text-disabled (#AFB6C2)`                                                                                   |
| Elevated surface | `bg: background-primary (#FAFBFC)`                                                                                 |
| Card default     | `bg: background (#ffffff)`, `borderRadius: none` — add `isInteractive` for hover shadow + `borderRadius: md`       |
| Error state      | `color: feedback-error (#B83C3C)`, `bg: background-error (#FFF1F5)`, `border: danger`                              |
| Success state    | `color: feedback-success (#1B8057)`, `bg: background-success (#EEF7F3)`                                            |
| Warning state    | `color: feedback-warning (#EF5B0D)`, `bg: background-warning (#FFF7E0)`                                            |
| Disabled state   | `color: text-disabled (#AFB6C2)`, `bg: background-disabled (navy-200)`, `border: border-disabled`                  |

### Component token cheatsheet

```
FillButton      → bg: primary (#1C50BB),  color: white,    hover: primary-hover (#141C36)
StrokeButton    → bg: transparent,         border: secondary (#6A6E75)
Checkbox/Toggle → primary (theme-resolved), hover: primary-hover
Card            → bg: background,  shadow: shadow-primary (navy-200, soft)
Alert (error)   → uses feedback-error + background-error
Alert (success) → uses feedback-success + background-success
Alert (warning) → uses feedback-warning + background-warning
```
