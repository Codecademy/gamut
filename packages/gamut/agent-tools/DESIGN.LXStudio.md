---
version: alpha
name: LX Studio Design System
description: Design tokens for the Skillsoft LX Studio authoring platform.
colors:
  # LX Studio additions — custom brand tokens
  lxStudioPurple: '#5628FE'
  lxStudioPurpleHover: '#7955FC'
  lxStudioSuccess: '#06844F'
  lxStudioBgPrimary: '#FAFBFC'
  # core palette — referenced by semantic aliases below
  hyper-500: '#3A10E5'
  hyper-400: '#5533FF'
  navy-900: '#0A0D1C'
  navy-800: '#10162F'
  navy-700: '#31374C'
  navy-600: '#4C5063'
  navy-500: '#686C7C'
  navy-400: '#8F919D'
  navy-300: '#BCBEC5'
  navy-200: '#E2E3E6'
  navy-100: '#F5F6F7'
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
  primary: '{colors.lxStudioPurple}'
  primary-hover: '{colors.lxStudioPurpleHover}'
  primary-inverse: '{colors.yellow-500}'
  secondary: '{colors.navy-800}'
  secondary-hover: '{colors.navy-700}'
  interface: '{colors.hyper-500}'
  interface-hover: '{colors.hyper-400}'
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
    fontFamily: '"Hanken Grotesk", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif'
    fontSize: '1rem'
    fontWeight: '400'
    lineHeight: '1.5'
  accent:
    fontFamily: '"Hanken Grotesk", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif'
    fontSize: '0.875rem'
    fontWeight: '400'
    lineHeight: '1.5'
  title:
    fontFamily: '"Hanken Grotesk", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif'
    fontSize: '2.125rem'
    fontWeight: '700'
    lineHeight: '1.2'
  monospace:
    fontFamily: 'Monaco, Menlo, "Ubuntu Mono", "Droid Sans Mono", Consolas, monospace'
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

# LX Studio

This file defines the visual design tokens for the Skillsoft LX Studio authoring platform, implemented using the Gamut design system (`@codecademy/gamut`, `@codecademy/gamut-styles`). LX Studio uses a dedicated Gamut theme that extends Core with its own brand colors, typography, and border radii — all Gamut components work without modification. **Spacing uses the same token scale as Core**; only border radii are larger in this theme (see Border Radius Scale below).

**Storybook**: https://gamut.codecademy.com

---

## Visual Theme & Atmosphere

LX Studio communicates **modern professional craft** — clean, precise, and tool-like. As an authoring environment for learning content creators, the interface must feel capable and unobtrusive. The design voice prioritizes clarity and control over personality.

**Density**: Medium. Layouts are information-dense but well-spaced; generous border radii and soft shadows reduce visual weight.

**Design philosophy**:

- Extends **Core** — light and dark color modes are available; `lxStudioTheme` defines explicit **light** overrides and inherits **Core dark** where not overridden
- Larger border radii than Core give the UI a softer, more modern feel
- Brand purple (`lxStudioPurple`) drives primary CTAs; `hyper-500` drives interface affordances (checkboxes, toggles)
- Shadows are soft (navy-200) rather than hard (navy-800 in Core light mode)
- Hanken Grotesk replaces Apercu and Suisse across all font roles

---

## Themes

LX Studio uses **`lxStudioTheme`**, which spreads **`coreTheme`** and adds explicit **light** semantic overrides (see `packages/gamut-styles/src/themes/lxStudio.ts`). Dark mode resolves through the same Core color-mode system.

| Theme         | Use case                               | Base font      | Dark mode                                               |
| ------------- | -------------------------------------- | -------------- | ------------------------------------------------------- |
| **LX Studio** | Skillsoft LX Studio authoring platform | Hanken Grotesk | yes (inherits Core dark; light overrides in theme file) |

The active theme is set at the app root via `<GamutProvider theme={lxStudioTheme}>`.

---

## Semantic Color Aliases

Use these token names when specifying colors. **`lxStudioTheme`** (`packages/gamut-styles/src/themes/lxStudio.ts`) extends **`coreTheme`**, so **light and dark** color modes behave like Codecademy: the theme file lists explicit **light** overrides, and **dark** uses **Core dark** semantics anywhere LX does not override them (`packages/gamut-styles/src/themes/core.ts`). Hex values in the tables below document **light mode** for designer handoff. The YAML `components:` block at the top of this file is an **illustrative recipe set** for handoff tools—use semantic system props in application code.

### Text

| Token            | Value                | Use for                     |
| ---------------- | -------------------- | --------------------------- |
| `text`           | `#10162F` (navy-800) | Default body and UI text    |
| `text-accent`    | `#0A0D1C` (navy-900) | Stronger emphasis text      |
| `text-secondary` | `#4C5063` (navy-600) | Supporting / secondary copy |
| `text-disabled`  | `#686C7C` (navy-500) | Disabled state labels       |

### Background

| Token                 | Value                         | Use for                           |
| --------------------- | ----------------------------- | --------------------------------- |
| `background`          | `#ffffff`                     | Default page/component background |
| `background-primary`  | `#FAFBFC` (lxStudioBgPrimary) | Slightly elevated surfaces        |
| `background-contrast` | `#ffffff`                     | Maximum contrast surface          |
| `background-selected` | `#F5F6F7` (navy-100)          | Selected row / item               |
| `background-hover`    | `#E2E3E6` (navy-200)          | Hover state overlay               |
| `background-disabled` | `#E2E3E6` (navy-200)          | Disabled surface                  |
| `background-success`  | `#F5FFE3` (green-0)           | Success state container           |
| `background-warning`  | `#FFFAE5` (yellow-0)          | Warning state container           |
| `background-error`    | `#FBF1F0` (red-0)             | Error state container             |

### Interactive

| Token             | Value                           | Use for                                       |
| ----------------- | ------------------------------- | --------------------------------------------- |
| `primary`         | `#5628FE` (lxStudioPurple)      | Primary CTA, links, focus rings               |
| `primary-hover`   | `#7955FC` (lxStudioPurpleHover) | Hover state of primary interactive            |
| `primary-inverse` | `#FFD300` (yellow-500)          | Primary on a colored background               |
| `secondary`       | `#10162F` (navy-800)            | Secondary CTA, ghost buttons                  |
| `secondary-hover` | `#31374C` (navy-700)            | Hover state of secondary interactive          |
| `interface`       | `#3A10E5` (hyper-500)           | UI affordances (checkboxes, toggles, sliders) |
| `interface-hover` | `#5533FF` (hyper-400)           | Hover on interface elements                   |
| `danger`          | `#E91C11` (red-500)             | Destructive actions, error states             |
| `danger-hover`    | `#BE1809` (red-600)             | Hover on danger interactive                   |

**Key distinction**: `primary` (lxStudioPurple `#5628FE`) differs from `interface` (hyper-500 `#3A10E5`). Buttons and links use the lighter LX Studio purple; checkboxes, toggles, and sliders use the deeper hyper purple.

### Border

| Token              | Value                | Use for                         |
| ------------------ | -------------------- | ------------------------------- |
| `border-primary`   | `#8F919D` (navy-400) | Standard input and card borders |
| `border-secondary` | `#4C5063` (navy-600) | Medium-weight borders           |
| `border-tertiary`  | `#10162F` (navy-800) | Strong structural borders       |
| `border-disabled`  | `#BCBEC5` (navy-300) | Disabled input borders          |

LX Studio's `border-primary` is mid-gray (navy-400) rather than Core's near-black navy-800 — borders are softer and less prominent.

### Feedback

| Token              | Value                       | Use for                          |
| ------------------ | --------------------------- | -------------------------------- |
| `feedback-error`   | `#BE1809` (red-600)         | Error messages, validation       |
| `feedback-success` | `#06844F` (lxStudioSuccess) | Success messages, confirmations  |
| `feedback-warning` | `#FFD300` (yellow-500)      | Warning messages, caution states |

### Shadow

| Token              | Value                |
| ------------------ | -------------------- |
| `shadow-primary`   | `#E2E3E6` (navy-200) |
| `shadow-secondary` | `#4C5063` (navy-600) |

LX Studio shadows are soft — use `shadow-primary` for standard elevated surfaces. This matches Percipio's shadow weight, not Core's hard navy-800 shadow.

---

## LX Studio Color Palette

LX Studio adds four named colors to the core palette. Use semantic aliases in code, not these raw names.

| Named color           | Value     | Mapped to            |
| --------------------- | --------- | -------------------- |
| `lxStudioPurple`      | `#5628FE` | `primary`            |
| `lxStudioPurpleHover` | `#7955FC` | `primary-hover`      |
| `lxStudioSuccess`     | `#06844F` | `feedback-success`   |
| `lxStudioBgPrimary`   | `#FAFBFC` | `background-primary` |

The full core swatch palette (navy, hyper, blue, green, yellow, red, etc.) is also available. Raw swatches should only be used for fixed colors that must not adapt (illustrations, data viz, etc.).

---

## Typography

### Typefaces

LX Studio uses **Hanken Grotesk** for all font roles. There is no Apercu and no Suisse.

| Token       | Font                                                  | Use for                                                         |
| ----------- | ----------------------------------------------------- | --------------------------------------------------------------- |
| `base`      | `"Hanken Grotesk"`, sans-serif fallback               | All default UI text, headlines, body copy                       |
| `accent`    | `"Hanken Grotesk"`, sans-serif fallback               | Labels, captions, technical context (same as base in LX Studio) |
| `monospace` | Monaco, Menlo, Ubuntu Mono, Droid Sans Mono, Consolas | Code editor contexts                                            |
| `system`    | System UI fonts                                       | Performance-critical surfaces                                   |

Hanken Grotesk is served from `https://www.codecademy.com/gamut/` in four variants: regular, italic, bold, bold-italic.

### Rules

- **Hanken Grotesk Bold (700)** for headlines, sub-headlines, CTAs, and buttons.
- **Hanken Grotesk Regular (400)** for body text, UI labels, and menu items.
- Text is **left-aligned** by default. Center-align only for short marketing headlines. Never right-align.
- Do not adjust letter-spacing.
- No separate accent typeface — Hanken Grotesk is used uniformly for `base` and `accent`.

### Font weight scale

| Token   | Value | Use                      |
| ------- | ----- | ------------------------ |
| `base`  | 400   | Body text, UI labels     |
| `title` | 700   | Headlines, CTAs, buttons |

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

- `FillButton` uses `#5628FE` (lxStudioPurple) instead of hyper-500
- `FillButton` hover shifts to `#7955FC` (lxStudioPurpleHover) — lighter, not darker, on hover
- `Checkbox` / `Toggle` use `hyper-500` (`#3A10E5`) — not the brand purple
- All interactive elements have `borderRadius: md` (8px) instead of Core's 4px
- `Card` shadows use navy-200 (soft) rather than navy-800 (hard)
- No `Card-beige` variant — LX Studio `background-primary` is off-white, not beige

---

## Do's and Don'ts

### Colors

- **Do** use semantic color aliases (`primary`, `text`, `background`, etc.) — never hardcode hex values.
- **Do** use `lxStudioPurple` (`#5628FE`) via `primary` for buttons and links.
- **Do** use `hyper-500` (`#3A10E5`) via `interface` for checkboxes, toggles, and sliders.
- **Don't** use `primary` and `interface` interchangeably — they are intentionally different purples.
- **Don't** treat the semantic tables as exhaustive for dark mode — they show resolved **light** values; use tokens and `colorMode` in code.
- **Don't** use the Percipio or Codecademy primary blue/hyper colors directly; go through semantic aliases.

### Typography

- **Do** use Hanken Grotesk Bold (700) for headlines, CTAs, and buttons.
- **Do** keep body text at 150–175% line height for readability.
- **Don't** use Apercu or Suisse — those fonts are not available in LX Studio.
- **Don't** right-align or center-align body paragraphs.
- **Don't** adjust letter-spacing.

### Layout & Spacing

- **Do** use the shared Core **spacing** token scale (`4`–`96`) — LX Studio does not define a separate spacing ramp; only **border radii** differ from Core.
- **Do** use multiples of 8px for block-element spacing (4px only for inline / typographic relationships).
- **Do** begin design work at 1440px (XL), then adapt down.
- **Do** align elements to the 12-column grid.
- **Do** apply the larger `md` border radius (8px) to buttons and inputs — it defines the LX Studio feel.

---

## Agent Prompt Guide

Quick color/token reference for generating or specifying LX Studio UI. **Token names are the contract**; parenthetical hex is reference only. Implement with `@codecademy/gamut-styles` theme keys and system props, not raw color strings.

| Scenario          | Tokens                                                                                                             |
| ----------------- | ------------------------------------------------------------------------------------------------------------------ |
| Primary button    | `bg: primary (#5628FE)`, `color: white`, `hover: primary-hover (#7955FC)`, `borderRadius: md (8px)`                |
| Body text         | `color: text (#10162F)`, `font: Hanken Grotesk`, `size: 16px`, `weight: 400`, `lineHeight: base (1.5)`             |
| Headline          | `color: text-accent (#0A0D1C)`, `font: Hanken Grotesk`, `size: 34–64px`, `weight: 700`, `lineHeight: title (1.2)`  |
| Secondary text    | `color: text-secondary (#4C5063)`                                                                                  |
| Disabled text     | `color: text-disabled (#686C7C)`                                                                                   |
| Elevated surface  | `bg: background-primary (#FAFBFC)`                                                                                 |
| Card default      | `bg: background (#ffffff)`, `borderRadius: none` — add `isInteractive` for hover shadow + `borderRadius: md (8px)` |
| Checkbox / toggle | `interface (#3A10E5)`, `hover: interface-hover (#5533FF)`                                                          |
| Error state       | `color: feedback-error (#BE1809)`, `bg: background-error (#FBF1F0)`, `border: danger`                              |
| Success state     | `color: feedback-success (#06844F)`, `bg: background-success (#F5FFE3)`                                            |
| Warning state     | `color: feedback-warning (#FFD300)`, `bg: background-warning (#FFFAE5)`                                            |
| Disabled state    | `color: text-disabled (#686C7C)`, `bg: background-disabled (#E2E3E6, navy-200)`, `border: border-disabled`         |

### Component token cheatsheet

```
FillButton      → bg: primary (#5628FE),     color: white,    hover: primary-hover (#7955FC), radius: 8px
StrokeButton    → bg: transparent,            border: secondary (#10162F)
Checkbox/Toggle → interface (#3A10E5),        hover: interface-hover (#5533FF),              radius: 4px
Card            → bg: background,  shadow: shadow-primary (#E2E3E6, navy-200, soft),         radius: none
Alert (error)   → uses feedback-error + background-error
Alert (success) → uses feedback-success + background-success
Alert (warning) → uses feedback-warning + background-warning
```
