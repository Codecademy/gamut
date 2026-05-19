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
  system:
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif'
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
  sm: '4px'
  md: '8px'
  lg: '12px'
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
    textColor: '{colors.white}'
    borderRadii: '{borderRadii.md}'
  FillButton-hover:
    backgroundColor: '{colors.primary-hover}'
    textColor: '{colors.white}'
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

# LX Studio

This file defines the visual design tokens for the Skillsoft LX Studio authoring platform, implemented using the Gamut design system (`@codecademy/gamut`, `@codecademy/gamut-styles`). LX Studio uses a dedicated Gamut theme that extends Core with its own brand colors, typography, and border radii — all Gamut components work without modification.

**Storybook**: https://gamut.codecademy.com

---

## Overview

LX Studio communicates **modern professional craft** — clean, precise, and tool-like. As an authoring environment for learning content creators, the interface must feel capable and unobtrusive. The design voice prioritizes clarity and control over personality.

**Density**: Medium. Layouts are information-dense but well-spaced; generous border radii and soft shadows reduce visual weight.

**Design philosophy**:

- Larger border radii than Core give the UI a softer, more modern feel
- Sapphire (`#1C50BB`) drives primary CTAs and interactive controls in light mode
- Shadows are soft (navy-200) rather than hard (navy-800 in Core light mode)
- Skillsoft Text and Skillsoft Sans replace Apercu and Suisse across `base` and `accent`
- Use semantic `background-primary` (`#FAFBFC`) — not Core `beige`

### Themes

LX Studio uses a single Gamut theme that extends Core. **Light mode** applies LX-specific semantic overrides (sapphire primary, softer borders, larger radii). **Dark mode** inherits Core dark semantics — use `<ColorMode>` and semantic tokens the same way as Codecademy.

| Theme         | Use case                               | Base font             | Dark mode      |
| ------------- | -------------------------------------- | --------------------- | -------------- |
| **LX Studio** | Skillsoft LX Studio authoring platform | Skillsoft Sans / Text | ✓ light + dark |

Set the active theme via `<GamutProvider theme={lxStudioTheme}>`. For new LX Studio apps, default to `lxStudioTheme` unless another theme is explicitly requested. Install in app repos: `gamut plugin install cursor --theme lxstudio` (copies to `./DESIGN.md`).

---

## Colors

Use semantic token names in code and designs. They resolve per color mode automatically. **Never hardcode hex values** for adaptive UI. **Never hardcode `beige`** — LX maps `background-primary` to `lxStudioBgPrimary` (`#FAFBFC`).

For dark/light regions, use `<ColorMode>` or `<Background>` — never swap colors manually with custom CSS.

### Text

| Token            | Light                             | Dark            | Use for                     |
| ---------------- | --------------------------------- | --------------- | --------------------------- |
| `text`           | navy-800 `#10162F`                | white `#ffffff` | Default body and UI text    |
| `text-accent`    | navy-900 `#0A0D1C`                | beige `#FFF0E5` | Stronger emphasis text      |
| `text-secondary` | navy-600 `rgba(16, 22, 47, 0.75)` | white at 65%    | Supporting / secondary copy |
| `text-disabled`  | navy-500 `rgba(16, 22, 47, 0.63)` | white at 50%    | Disabled state labels       |

### Background

| Token                 | Light                             | Dark                 | Use for                           |
| --------------------- | --------------------------------- | -------------------- | --------------------------------- |
| `background`          | white `#ffffff`                   | navy-800 `#10162F`   | Default page/component background |
| `background-primary`  | `#FAFBFC` (lxStudioBgPrimary)     | navy-900 `#0A0D1C`   | Slightly elevated surfaces        |
| `background-contrast` | white `#ffffff`                   | black `#000000`      | Maximum contrast surface          |
| `background-selected` | navy-100 `rgba(16, 22, 47, 0.04)` | white at 4%          | Selected row / item               |
| `background-hover`    | navy-200 `rgba(16, 22, 47, 0.12)` | white at 9%          | Hover state overlay               |
| `background-disabled` | navy-200 `rgba(16, 22, 47, 0.12)` | white at 9%          | Disabled surface                  |
| `background-success`  | green-0 `#F5FFE3`                 | green-900 `#151C07`  | Success state container           |
| `background-warning`  | yellow-0 `#FFFAE5`                | yellow-900 `#211B00` | Warning state container           |
| `background-error`    | red-0 `#FBF1F0`                   | red-900 `#280503`    | Error state container             |

### Interactive

| Token             | Light                             | Dark                 | Use for                            |
| ----------------- | --------------------------------- | -------------------- | ---------------------------------- |
| `primary`         | sapphire `#1C50BB`                | yellow-500 `#FFD300` | Primary CTA, links, focus rings    |
| `primary-hover`   | navy-800 `#10162F`                | yellow-400 `#CCA900` | Hover state of primary interactive |
| `primary-inverse` | yellow-500 `#FFD300`              | hyper-500 `#3A10E5`  | Primary on a colored background    |
| `secondary`       | navy-800 `#10162F`                | white `#ffffff`      | Secondary CTA, ghost buttons       |
| `secondary-hover` | navy-700 `rgba(16, 22, 47, 0.86)` | white at 80%         | Hover state of secondary           |
| `danger`          | red-500 `#E91C11`                 | red-300 `#E85D7F`    | Destructive actions, error states  |
| `danger-hover`    | red-600 `#BE1809`                 | red-400 `#DC5879`    | Hover on danger interactive        |

### Border

| Token              | Light                             | Dark            | Use for                         |
| ------------------ | --------------------------------- | --------------- | ------------------------------- |
| `border-primary`   | navy-400 `rgba(16, 22, 47, 0.47)` | white `#ffffff` | Standard input and card borders |
| `border-secondary` | navy-600 `rgba(16, 22, 47, 0.75)` | white at 65%    | Medium-weight borders           |
| `border-tertiary`  | navy-800 `#10162F`                | white at 20%    | Strong structural borders       |
| `border-disabled`  | navy-300 `rgba(16, 22, 47, 0.28)` | white at 50%    | Disabled input borders          |

LX Studio's `border-primary` is mid-gray (navy-400) rather than Core's near-black navy-800 — borders are softer and less prominent.

### Feedback

| Token              | Light                       | Dark                | Use for                          |
| ------------------ | --------------------------- | ------------------- | -------------------------------- |
| `feedback-error`   | red-600 `#BE1809`           | red-300 `#E85D7F`   | Error messages, validation       |
| `feedback-success` | `#06844F` (lxStudioSuccess) | green-400 `#AEE938` | Success messages, confirmations  |
| `feedback-warning` | yellow-500 `#FFD300`        | yellow-0 `#FFFAE5`  | Warning messages, caution states |

### Shadow

| Token              | Light                             | Dark         |
| ------------------ | --------------------------------- | ------------ |
| `shadow-primary`   | navy-200 `rgba(16, 22, 47, 0.12)` | white        |
| `shadow-secondary` | navy-600 `rgba(16, 22, 47, 0.75)` | white at 65% |

LX Studio shadows are soft — use `shadow-primary` for standard elevated surfaces. This matches Percipio's shadow weight, not Core's hard navy-800 shadow.

---

### LX Studio color palette

LX Studio adds named colors to the core palette. Use semantic aliases in code, not these raw names.

| Named color         | Value     | Mapped to                        |
| ------------------- | --------- | -------------------------------- |
| `sapphire`          | `#1C50BB` | `primary` (shared with Percipio) |
| `lxStudioSuccess`   | `#06844F` | `feedback-success`               |
| `lxStudioBgPrimary` | `#FAFBFC` | `background-primary`             |

The full core swatch palette (navy, hyper, blue, green, yellow, red, etc.) is also available. Raw swatches should only be used for fixed colors that must not adapt (illustrations, data viz, etc.).

---

## Typography

### Typefaces

LX Studio uses **Skillsoft Text** for `base` and **Skillsoft Sans** for `accent`. There is no Apercu and no Suisse.

| Token       | Font                                                  | Use for                                   |
| ----------- | ----------------------------------------------------- | ----------------------------------------- |
| `base`      | `"Skillsoft Text", …`                                 | All default UI text, headlines, body copy |
| `accent`    | `"Skillsoft Sans", …`                                 | Labels, captions, technical context       |
| `monospace` | Monaco, Menlo, Ubuntu Mono, Droid Sans Mono, Consolas | Code editor contexts                      |
| `system`    | System UI fonts                                       | Performance-critical surfaces             |

Skillsoft fonts are loaded via `GamutProvider` asset configuration (see `@codecademy/gamut-styles` remote font assets).

### Rules

- **Skillsoft Medium (500)** for headlines, sub-headlines, CTAs, and buttons — not Bold (700).
- **Skillsoft Regular (400)** for body text, UI labels, and menu items.
- Text is **left-aligned** by default. Center-align only for short marketing headlines. Never right-align.
- Do not adjust letter-spacing.
- `accent` uses Skillsoft Sans; `base` uses Skillsoft Text — they are intentionally different families.

### Font weight scale

| Token   | Value   | Use                                                           |
| ------- | ------- | ------------------------------------------------------------- |
| `base`  | 400     | Body text, UI labels                                          |
| `title` | **500** | Headlines, CTAs, buttons _(matches Percipio, not Core's 700)_ |

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

**Never use inline `style` attributes.** Use system props shorthand (`m`, `mb`, `p`, etc.) and Gamut tokens for colors and borders.

### Responsive behavior

Identical to Core. Mobile-first; 12-column grid; **44×44px** minimum touch targets on mobile.

---

## Elevation & Depth

LX Studio shadows are soft — use `shadow-primary` (navy-200) for elevated surfaces, not Core's hard navy-800 shadow in light mode.

---

## Shapes

LX Studio uses **larger border radii than Core** — defined in `lxStudioBorderRadii`. **No custom radius values.**

| Token  | LX Studio | Core  | Use                                        |
| ------ | --------- | ----- | ------------------------------------------ |
| `none` | 0px       | 0px   | Square / non-interactive elements          |
| `sm`   | **4px**   | 2px   | Subtle rounding, tags, checkboxes          |
| `md`   | **8px**   | 4px   | Default buttons, inputs, interactive cards |
| `lg`   | **12px**  | 8px   | Cards, panels                              |
| `xl`   | 16px      | 16px  | Large cards, modals                        |
| `full` | 999px     | 999px | Pills, avatars, circular elements          |

---

## Components

Same component library as Codecademy — all atoms, molecules, and organisms apply. Token values resolve differently per theme automatically.

### LX Studio visual differences

- `FillButton` uses sapphire `#1C50BB` in light mode instead of hyper-500
- `FillButton` hover shifts to navy-800 `#10162F` in light mode
- Interactive elements use `borderRadius: md` (**8px**, not Core's 4px)
- `Card` shadows use navy-200 (soft) rather than navy-800 (hard)
- Prefer `background-primary` over beige for elevated surfaces

### Gamut implementation guardrails

Same rules as Codecademy (`DESIGN.Codecademy.md` Components section), with LX-specific notes:

- **Buttons:** no generic `Button`; `IconButton` requires `tip`; never set `mode` on buttons; use `borderRadii.md` (8px) on buttons/inputs.
- **Forms:** `GridForm` / `ConnectedForm` for submit flows.
- **Cards:** valid variants `default`, `white`, `yellow`, `beige`, `navy`, `hyper`; defaults `shadow="none"`, `isInteractive={false}`.
- **DataTable / DataList:** `sortable` requires `query`, `onQueryChange`, and client-sorted rows.
- **Menu:** always explicit `variant` (`fixed` + `as="nav"` or `popover`).
- **Color mode:** `<ColorMode>` / `<Background>` only.
- **Accessibility:** WCAG, `FocusTrap` in modals/drawers.
- **Assets:** `@codecademy/gamut-icons`, `gamut-illustrations`, `gamut-patterns`.

---

## Do's and Don'ts

### Colors

- **Do** use semantic color aliases (`primary`, `text`, `background`, etc.) — never hardcode hex values.
- **Do** use `<ColorMode>` and `<Background>` for scoped light/dark — dark mode inherits from Core.
- **Don't** use the Percipio or Codecademy palette swatches directly; go through semantic aliases.

### Typography

- **Do** use title weight (500) for headlines, CTAs, and buttons — not 700.
- **Do** keep body text at 150–175% line height for readability.
- **Don't** use Apercu or Suisse — LX Studio uses Skillsoft Text and Skillsoft Sans.
- **Don't** right-align or center-align body paragraphs.
- **Don't** adjust letter-spacing.

### Layout & Spacing

- **Do** use multiples of 8px for block-element spacing (4px only for inline / typographic relationships).
- **Do** begin design work at 1440px (XL), then adapt down.
- **Do** align elements to the 12-column grid.
- **Do** apply the larger `md` border radius (8px) to buttons and inputs — it defines the LX Studio feel.

### Components

- **Don't** import a generic `Button` or use Apercu / Suisse.
- **Don't** use bare form atoms for functional forms.

### Pre-ship validation

Before considering UI output final, run **`/gamut-review`** from the app repository root (the directory that contains `DESIGN.md`). Install the plugin first if needed: **Cursor** — `gamut plugin install cursor --theme lxstudio`; **Claude Code** — `gamut plugin install claude --theme lxstudio`.

The command performs automated checks (dependencies, `GamutProvider`, imports, hex colors, tests, component guardrails) and prints a **manual pre-ship checklist** keyed to this product's theme. Fix all errors before shipping. Full procedure: [`commands/gamut-review.md`](commands/gamut-review.md) in `@codecademy/gamut` agent-tools (installed as a slash command with the Gamut plugin).

---

## Agent Prompt Guide

Quick color/token reference for generating or specifying LX Studio UI:

| Scenario          | Tokens                                                                                                                    |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Primary button    | `bg: primary (#1C50BB)`, `color: white`, `hover: primary-hover (#10162F)`, `borderRadius: md (8px)`                       |
| Body text         | `color: text (#10162F)`, `font: Skillsoft Text`, `size: 16px`, `weight: 400`, `lineHeight: base (1.5)`                    |
| Headline          | `color: text-accent (#0A0D1C)`, `font: Skillsoft Text`, `size: 34–64px`, `weight: title (500)`, `lineHeight: title (1.2)` |
| Secondary text    | `color: text-secondary (navy-600)`                                                                                        |
| Disabled text     | `color: text-disabled (navy-500)`                                                                                         |
| Elevated surface  | `bg: background-primary (#FAFBFC)`                                                                                        |
| Card default      | `bg: background (#ffffff)`, `borderRadius: none` — add `isInteractive` for hover shadow + `borderRadius: md (8px)`        |
| Checkbox / toggle | `primary` / `primary-hover` (theme-resolved via Gamut Checkbox)                                                           |
| Error state       | `color: feedback-error (#BE1809)`, `bg: background-error (#FBF1F0)`, `border: danger`                                     |
| Success state     | `color: feedback-success (#06844F)`, `bg: background-success (#F5FFE3)`                                                   |
| Warning state     | `color: feedback-warning (#FFD300)`, `bg: background-warning (#FFFAE5)`                                                   |
| Disabled state    | `color: text-disabled (navy-500)`, `bg: background-disabled (navy-200)`, `border: border-disabled`                        |

### Component token cheatsheet

```
FillButton      → bg: primary (#1C50BB),     color: white,    hover: primary-hover (#10162F), radius: 8px
StrokeButton    → bg: transparent,            border: secondary (#10162F)
Checkbox/Toggle → primary (theme-resolved),   hover: primary-hover,                          radius: 4px
Card            → bg: background,  shadow: shadow-primary (navy-200, soft),                   radius: none
Alert (error)   → uses feedback-error + background-error
Alert (success) → uses feedback-success + background-success
Alert (warning) → uses feedback-warning + background-warning
```
