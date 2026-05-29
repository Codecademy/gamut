---
version: alpha
name: Codecademy Design System
description: Design tokens for codecademy.com
colors:
  # palette — raw swatches; set once on :root and then always reference by token name, never use hex values directly in code
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
  yellow-400: '#CCA900'
  yellow-0: '#FFFAE5'
  yellow-900: '#211B00'
  green-700: '#008A27'
  green-400: '#AEE938'
  green-0: '#F5FFE3'
  green-900: '#151C07'
  red-600: '#BE1809'
  red-500: '#E91C11'
  red-400: '#DC5879'
  red-300: '#E85D7F'
  red-0: '#FBF1F0'
  red-900: '#280503'
  beige: '#FFF0E5'
  white: '#ffffff'
  black: '#000000'
  # semantic aliases (light mode) — use these in code, not palette swatches or hex values
  text: '{colors.navy-800}'
  text-accent: '{colors.navy-900}'
  text-secondary: '{colors.navy-600}'
  text-disabled: '{colors.navy-500}'
  background: '{colors.white}'
  background-primary: '{colors.beige}'
  background-contrast: '{colors.white}'
  background-selected: '{colors.navy-100}'
  background-hover: '{colors.navy-200}'
  background-disabled: '{colors.navy-200}'
  background-success: '{colors.green-0}'
  background-warning: '{colors.yellow-0}'
  background-error: '{colors.red-0}'
  primary: '{colors.hyper-500}'
  primary-hover: '{colors.hyper-400}'
  primary-inverse: '{colors.yellow-500}'
  secondary: '{colors.navy-800}'
  secondary-hover: '{colors.navy-700}'
  danger: '{colors.red-500}'
  danger-hover: '{colors.red-600}'
  feedback-error: '{colors.red-600}'
  feedback-success: '{colors.green-700}'
  feedback-warning: '{colors.yellow-500}'
  border-primary: '{colors.navy-800}'
  border-secondary: '{colors.navy-600}'
  border-tertiary: '{colors.navy-300}'
  border-disabled: '{colors.navy-500}'
  shadow-primary: '{colors.navy-800}'
  shadow-secondary: '{colors.navy-600}'
typography:
  base:
    fontFamily: '"Apercu", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif'
    fontSize: '1rem'
    fontWeight: '400'
    lineHeight: '1.5'
  accent:
    fontFamily: '"Suisse", "Apercu", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif'
    fontSize: '0.875rem'
    fontWeight: '400'
    lineHeight: '1.5'
  title:
    fontFamily: '"Apercu", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif'
    fontSize: '2.125rem'
    fontWeight: '700'
    lineHeight: '1.2'
  monospace:
    fontFamily: 'Monaco, Menlo, "Ubuntu Mono", "Droid Sans Mono", Consolas, monospace'
rounded:
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
  CTAButton:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.white}'
    rounded: '{rounded.md}'
  CTAButton-inverse:
    backgroundColor: '{colors.primary-inverse}'
    textColor: '{colors.secondary}'
    rounded: '{rounded.md}'
  TextButton:
    backgroundColor: 'transparent'
    textColor: '{colors.primary}'
  TextButton-hover:
    textColor: '{colors.primary-hover}'
  Card:
    backgroundColor: '{colors.background}'
    rounded: '{rounded.none}'
  Card-interactive:
    rounded: '{rounded.md}'
  Card-elevated:
    backgroundColor: '{colors.background-primary}'
    rounded: '{rounded.lg}'
  Card-beige:
    backgroundColor: '{colors.beige}'
    rounded: '{rounded.lg}'
  Input:
    backgroundColor: '{colors.background}'
    textColor: '{colors.text}'
    rounded: '{rounded.md}'
  Checkbox:
    backgroundColor: '{colors.primary}'
    rounded: '{rounded.sm}'
  Checkbox-hover:
    backgroundColor: '{colors.primary-hover}'
  Headline:
    textColor: '{colors.text-accent}'
    typography: '{typography.title}'
  Tag-success:
    backgroundColor: '{colors.feedback-success}'
    textColor: '{colors.white}'
    rounded: '{rounded.sm}'
  Tag-warning:
    backgroundColor: '{colors.feedback-warning}'
    textColor: '{colors.text}'
    rounded: '{rounded.sm}'
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

# Codecademy

This file defines the visual design tokens for codecademy.com, implemented using the Gamut design system (`@codecademy/gamut`, `@codecademy/gamut-styles`). Gamut ships 52 components with Figma ↔ code mappings via Figma Code Connect.

**Figma file**: https://www.figma.com/design/ReGfRNillGABAj5SlITalN/📐-Gamut
**Storybook**: https://gamut.codecademy.com

> **Other Gamut themes:** This document covers **Codecademy** (Core, Admin, Platform) only. For Percipio or LX Studio, install that product's `DESIGN.md` instead: `gamut plugin install cursor --theme percipio` or `--theme lxstudio` (see `DESIGN.Percipio.md` / `DESIGN.LXStudio.md` in agent-tools).

---

## Visual Theme & Atmosphere

Codecademy communicates **logic with personality** — structured and trustworthy enough for a learning platform, with creative moments that feel engaging and human. The design voice is: _"we are ruled by logic, but are creative and a bit unexpected as well."_

**Density**: Medium. Information-dense layouts use careful whitespace and strong typographic hierarchy to stay readable. Avoid cramped or overly airy layouts.

**Design philosophy**:

- Components are color mode–aware by default — never hardcode hex values for adaptive UI
- Every component works across Core, Admin, and Platform without modification
- Mobile-first responsive design built on a 12-column grid
- Accessibility is guaranteed by design: semantic color tokens meet contrast requirements per mode automatically

---

## Themes

Codecademy products use **Core**, **Admin**, or **Platform** — the same visual identity with theme-specific palette additions on Platform. Token aliases resolve per theme automatically; components require no modification.

| Theme        | Use case                        | Base font | Dark mode      |
| ------------ | ------------------------------- | --------- | -------------- |
| **Core**     | Codecademy (default)            | Apercu    | ✓ light + dark |
| **Admin**    | Codecademy admin tools          | Apercu    | ✓ light + dark |
| **Platform** | Codecademy learning environment | Apercu    | ✓ light + dark |

Set the active theme at the app root via `<GamutProvider theme={coreTheme | adminTheme | platformTheme}>`.

**Font licensing:** Apercu is licensed for codecademy.com only.

---

## Semantic Color Aliases

Use these token names when specifying colors in designs. They resolve to the correct raw value for the active theme and color mode automatically. **Never hardcode hex values** for anything that needs to adapt across modes.

### Text

| Token            | Light           | Dark         | Use for                     |
| ---------------- | --------------- | ------------ | --------------------------- |
| `text`           | `navy-800`      | `white`      | Default body and UI text    |
| `text-accent`    | `navy-900`      | `beige`      | Stronger emphasis text      |
| `text-secondary` | navy-800 at 75% | white at 65% | Supporting / secondary copy |
| `text-disabled`  | navy-800 at 63% | white at 50% | Disabled state labels       |

### Background

| Token                 | Light           | Dark         | Use for                           |
| --------------------- | --------------- | ------------ | --------------------------------- |
| `background`          | `white`         | `navy-800`   | Default page/component background |
| `background-primary`  | `beige`         | `navy-900`   | Slightly elevated surfaces        |
| `background-contrast` | `white`         | `black`      | Maximum contrast surface          |
| `background-selected` | navy-800 at 4%  | white at 4%  | Selected row / item               |
| `background-hover`    | navy-800 at 12% | white at 9%  | Hover state overlay               |
| `background-disabled` | navy-800 at 12% | white at 9%  | Disabled surface                  |
| `background-success`  | `green-0`       | `green-900`  | Success state container           |
| `background-warning`  | `yellow-0`      | `yellow-900` | Warning state container           |
| `background-error`    | `red-0`         | `red-900`    | Error state container             |

### Interactive

| Token             | Light           | Dark         | Use for                              |
| ----------------- | --------------- | ------------ | ------------------------------------ |
| `primary`         | `hyper-500`     | `yellow-500` | Primary CTA, links, focus rings      |
| `primary-hover`   | `hyper-400`     | `yellow-400` | Hover state of primary interactive   |
| `primary-inverse` | `yellow-500`    | `hyper-500`  | Primary on a colored background      |
| `secondary`       | `navy-800`      | `white`      | Secondary CTA, ghost buttons         |
| `secondary-hover` | navy-800 at 86% | white at 80% | Hover state of secondary interactive |
| `danger`          | `red-500`       | `red-300`    | Destructive actions, error states    |
| `danger-hover`    | `red-600`       | `red-400`    | Hover on danger interactive          |

### Border

| Token              | Light           | Dark         | Use for                    |
| ------------------ | --------------- | ------------ | -------------------------- |
| `border-primary`   | `navy-800`      | `white`      | Strong borders, dividers   |
| `border-secondary` | navy-800 at 75% | white at 65% | Medium-weight borders      |
| `border-tertiary`  | navy-800 at 28% | white at 20% | Subtle borders, separators |
| `border-disabled`  | navy-800 at 63% | white at 50% | Disabled input borders     |

### Feedback

| Token              | Light       | Dark        | Use for                          |
| ------------------ | ----------- | ----------- | -------------------------------- |
| `feedback-error`   | `red-600`   | `red-300`   | Error messages, validation       |
| `feedback-success` | `green-700` | `green-400` | Success messages, confirmations  |
| `feedback-warning` | `yellow`    | `yellow-0`  | Warning messages, caution states |

### Shadow

| Token              | Light           | Dark         |
| ------------------ | --------------- | ------------ |
| `shadow-primary`   | navy-800        | white        |
| `shadow-secondary` | navy-800 at 75% | white at 65% |

---

## Raw Color Palette

All colors available as static tokens regardless of color mode. Use these only when a color should be **fixed** and not adapt to dark mode.

### Core Palette

| Name            | Weights available            | Notes                                                                      |
| --------------- | ---------------------------- | -------------------------------------------------------------------------- |
| `navy`          | 100–900                      | 100–700 are rgba transparencies of `navy-800`; 800 and 900 are solid       |
| `white`         | 100–700                      | rgba transparencies of `white` (no solid white weight — use `white` token) |
| `blue`          | 0, 100, 300, 400, 500, 800   | named alias `blue` maps to `blue-500`                                      |
| `hyper`         | 400, 500                     | named alias `hyper` maps to `hyper-500`                                    |
| `green`         | 0, 100, 400, 700, 900        | named alias `green` maps to `green-700`                                    |
| `yellow`        | 0, 400, 500, 900             | named alias `yellow` maps to `yellow-500`                                  |
| `red`           | 0, 300, 400, 500, 600, 900   | named alias `red` maps to `red-500`                                        |
| `gray`          | 100, 200, 300, 600, 800, 900 |                                                                            |
| `pink`          | 0, 400                       | named alias `pink` maps to `pink-400`                                      |
| `orange`        | 100, 500                     | named alias `orange` maps to `orange-500`                                  |
| `beige`         | 100 (alias: `beige`)         | solid `beige` token                                                        |
| `black`         | —                            | `black` token                                                              |
| `white` (solid) | —                            | `white` token                                                              |

**Named aliases** (shorthand for common weights):
`beige`, `blue`, `green`, `hyper`, `lightBlue`, `lightGreen`, `navy`, `orange`, `paleBlue`, `paleGreen`, `palePink`, `paleRed`, `paleYellow`, `pink`, `red`, `yellow`, `black`, `white`

### Platform-only additions

`lightBeige`, `gold`, `teal`, `purple` (Platform theme palette)

---

## Typography

### Typefaces

| Token       | Font stack                                               | Use for                                          |
| ----------- | -------------------------------------------------------- | ------------------------------------------------ |
| `base`      | Apercu Pro (CSS: `Apercu`)                               | All default UI text, headlines, body copy        |
| `accent`    | Suisse Intl Mono (CSS: `Suisse`); falls back to `Apercu` | Code, captions, labels, lists, technical context |
| `monospace` | Monaco, Menlo, Ubuntu Mono, Droid Sans Mono, Consolas    | Code editor contexts                             |
| `system`    | System UI fonts                                          | Performance-critical surfaces                    |

**Apercu is licensed for codecademy.com only.**

### Rules

- **Apercu Bold** for headlines, sub-headlines, CTAs, and buttons.
- **Apercu Regular** for body text, UI labels, and menu items.
- **Apercu Italic** to emphasize text within a Regular paragraph — not Bold.
- **Suisse** sparingly: code snippets, enumerated items, quotations, captions. Reads 10–15% large for its point size — size down relative to Apercu (14px Suisse ≈ 16px Apercu visually).
- Text is **left-aligned** by default. Center-align only for short marketing headlines. Never right-align.
- Do not adjust letter-spacing.

### Font size scale

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

### Font weight scale

| Token   | Value | Use                      |
| ------- | ----- | ------------------------ |
| `base`  | 400   | Body text, UI labels     |
| `title` | 700   | Headlines, CTAs, buttons |

### Line height scale

| Token         | Value | Use                                              |
| ------------- | ----- | ------------------------------------------------ |
| `base`        | 1.5   | Body text (150% — aim for 150–175% of font size) |
| `spacedTitle` | 1.3   | Sub-headlines and medium titles                  |
| `title`       | 1.2   | Large headlines (aim for 100–110% of font size)  |

### Line length

Target 45–85 characters per line; 66 characters is ideal for web body text. Max 50 characters for multi-column layouts.

---

## Spacing Scale

All spacing is multiples of 4px, placed on an 8px grid.

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

## Depth & Elevation

Gamut uses border-based and shadow-based depth cues rather than a rigid z-elevation tier system.

### Shadow tokens

Shadow props accept standard CSS `box-shadow` syntax. Always use `shadow-primary` / `shadow-secondary` color tokens so shadows remain visible in both light and dark modes.

```
box-shadow: 0 4px 0 <shadow-primary>   → Card "outline" shadow
box-shadow: 0 0 4px rgba(0,0,0,.15)    → Subtle ambient shadow
```

### Card shadow variants

| Variant          | Effect                                                 | Use for                        |
| ---------------- | ------------------------------------------------------ | ------------------------------ |
| `none` (default) | No shadow                                              | Static / non-interactive cards |
| `outline`        | Solid shadow on bottom + left/right using border color | Standard clickable cards       |
| `patternLeft`    | Decorative checker pattern on bottom + left            | Stylized content cards         |
| `patternRight`   | Decorative checker pattern on bottom + right           | Stylized content cards         |

Interactive cards (`isInteractive` prop) gain a shadow on hover and `borderRadius: md`. Cards with a pattern drop the pattern on hover.

### Z-index

| Token     | Value | Use                |
| --------- | ----- | ------------------ |
| `headerZ` | 15    | Global page header |

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

---

## Responsive Behavior

Mobile-first. Apply styles from the named breakpoint and up.

### Breakpoints & screen sizes

| Token    | Min-width | Screen dimensions | Max content | Fold height |
| -------- | --------- | ----------------- | ----------- | ----------- |
| _(base)_ | 0         | 320×480           | 288px       | 440px       |
| `xs`     | 480px     | 480×900           | 448px       | 440px       |
| `sm`     | 768px     | 768×1024          | 704px       | 680px       |
| `md`     | 1024px    | 1024×768          | 896px       | 680px       |
| `lg`     | 1200px    | 1200×900          | 1072px      | 680px       |
| `xl`     | 1440px    | 1440×900          | 1248px      | 680px       |

Container query variants (`c_xs` through `c_xl`) mirror these values but trigger on component container size, not viewport.

### Grid

12-column grid at all breakpoints. The designer specifies how many columns a section spans per breakpoint.

| Usage                 | Recommended values                               |
| --------------------- | ------------------------------------------------ |
| Horizontal margins    | 64px (lg+), 48px (md), 32px (sm/xs), 16px (base) |
| Column gaps (gutters) | 32px (lg+), 24px (md), 16px (sm/xs), 8px (base)  |
| Row gaps              | 32px (lg+), 24px (md), 16px (sm/xs), 8px (base)  |

### Touch targets

Minimum interactive touch target: **44×44px** on mobile breakpoints.

### Collapsing strategies

- Begin design work at 1440px (XL), then adapt to smaller sizes.
- Wider multi-column layouts collapse to fewer columns — do not simply stretch or squish.
- Elements not in an explicit lockup (e.g., catalog cards) should align on one axis (usually left) rather than fill column widths.
- Avoid dense or small components in the base (mobile) breakpoint.

---

## Component Library

Components are organized into three tiers:

### Atoms — foundational, single-purpose

Badge, Button (FillButton, StrokeButton, CTAButton, TextButton, IconButton), ButtonBase, Card, Checkbox, CodeBlock, ColorMode, Drawer, FlexBox, FormGroup, GridBox, Icon, Input, Label, Loader, Radio, Select, Spinner, Tag, TextArea, Toggle, Tooltip

### Molecules — composed of atoms, handle a discrete task

Alert, Anchor, Breadcrumbs, Coachmark, Disclosure, GridForm, Markdown, Menu, Modal, Pagination, Popover, ProgressBar, Table, Tabs, Toast, Toaster, Video

### Organisms — page-level compositions

ContentContainer, GridContainer, Layout, LayoutGrid

### Key component patterns

#### Buttons

| Variant           | Component      | Use for                             |
| ----------------- | -------------- | ----------------------------------- |
| Primary action    | `FillButton`   | Solid fill, high-emphasis CTA       |
| Secondary action  | `StrokeButton` | Outlined, secondary CTA             |
| Marketing CTA     | `CTAButton`    | High-visibility promotional actions |
| Tertiary / inline | `TextButton`   | Low-emphasis, inline text actions   |
| Icon-only         | `IconButton`   | Compact actions with icon only      |

All button variants support sizes: `small`, `normal` (default), `large`. They accept an `icon` prop (leading or trailing) and a `disabled` prop. Passing `href` renders the button as an `<a>` tag.

**States**: default → hover (`primary-hover` / `secondary-hover`) → active → disabled (`text-disabled` + `background-disabled`).

#### Cards

Cards support:

- **Background variants**: `default` (ColorMode-responsive), `white`, `yellow`, `beige` (light contexts), `navy`, `hyper` (dark contexts)
- **Shadow variants**: `none` (default), `outline`, `patternLeft`, `patternRight`
- **Interaction**: wrap in `<Anchor>` and add `isInteractive` for hover shadow + `borderRadius: md`
- **Border radius**: defaults to `none` (non-interactive); override with the `borderRadius` prop as needed

#### Color-aware components

- **`<ColorMode mode="light|dark|system">`** — wraps a subtree in an explicit color mode.
- **`<Background bg="<color>">`** — applies a background color and automatically switches the color mode inside to maintain accessible contrast. Prefer this over setting a raw `bg` prop on any content-bearing surface.

---

## Global Elements

| Token          | Value                                  | Use                             |
| -------------- | -------------------------------------- | ------------------------------- |
| `headerHeight` | 4rem (64px) base, 5rem (80px) at `md`+ | Global page header height       |
| `headerZ`      | 15                                     | Z-index for global page headers |

---

## Do's and Don'ts

### Colors

- **Do** use semantic color aliases (`primary`, `text`, `background`, etc.) for any UI that must adapt to color mode or theme.
- **Do** use `<Background bg="...">` when setting a section background — it adjusts the inner color mode for contrast automatically.
- **Don't** hardcode hex values for anything adaptive.
- **Don't** use navy or white semi-transparent swatches where they may overlap unpredictably.

### Typography

- **Do** use `title` weight (700) for headlines, CTAs, and buttons.
- **Do** keep body text at 150–175% line height for readability.
- **Do** use Suisse sparingly — as an accent for code, captions, and lists only.
- **Don't** use Apercu Bold to emphasize text _within_ a paragraph — use Italic instead.
- **Don't** adjust letter-spacing.
- **Don't** right-align text in normal circumstances.
- **Don't** center-align body paragraphs with long line lengths.

### Layout & Spacing

- **Do** use multiples of 8px for block-element spacing (4px only for inline / typographic relationships).
- **Do** begin design work at 1440px (XL), then adapt down to each breakpoint.
- **Do** align elements to the 12-column grid.
- **Don't** stretch elements to fill wider space — maintain proper line lengths and component widths.

### Components

- **Do** use `FillButton` for primary actions and `StrokeButton` for secondary actions.
- **Do** add `isInteractive` to any `Card` that is wrapped in an `<Anchor>`.
- **Don't** use `CTAButton` for standard UI actions — reserve it for marketing/high-visibility promotions.
- **Don't** use `<Background>` without an actual color value — it's not a neutral wrapper.

---

## Agent Prompt Guide

Quick color/token reference for generating or specifying UI:

| Scenario               | Tokens                                                                                                |
| ---------------------- | ----------------------------------------------------------------------------------------------------- |
| Primary button (light) | `bg: primary`, `color: white`, `hover: primary-hover`                                                 |
| Primary button (dark)  | `bg: primary`, `color: text`, `hover: primary-hover`                                                  |
| Body text              | `color: text`, `font: base (Apercu Pro)`, `size: 16px`, `weight: 400`, `lineHeight: base (1.5)`       |
| Headline               | `color: text-accent`, `font: base`, `size: 34–64px`, `weight: title (700)`, `lineHeight: title (1.2)` |
| Caption / label        | `color: text-secondary`, `font: accent (Suisse Int'l Mono)`, `size: 14px`                             |
| Card default           | `bg: background`, `borderRadius: none` — add `isInteractive` for hover shadow + `borderRadius: md`    |
| Error state            | `color: feedback-error`, `bg: background-error`, `border: danger`                                     |
| Success state          | `color: feedback-success`, `bg: background-success`                                                   |
| Disabled state         | `color: text-disabled`, `bg: background-disabled`, `border: border-disabled`                          |

### Component token cheatsheet

```
FillButton      → bg: primary,      color: white,        hover: primary-hover
StrokeButton    → bg: transparent,  border: secondary,   hover: secondary-hover
CTAButton       → high-visibility; use primary-inverse on colored surfaces
Card (light)    → variant: "default" | "white" | "yellow" | "beige"
Card (dark)     → variant: "navy" | "hyper"
Alert (error)   → uses feedback-error + background-error
Alert (success) → uses feedback-success + background-success
Alert (warning) → uses feedback-warning + background-warning
ColorMode       → <ColorMode mode="light|dark|system">
Background      → <Background bg="hyper"> — auto-flips color mode for contrast
```

---

## Figma ↔ Code Mapping

52 components have Code Connect entries in `packages/code-connect/`. These appear as live code snippets in Figma's inspect panel when you select a component.

Figma layer names use emojis as visual shorthand (e.g. `✏️ label`, `👁 leading icon`, `↳ trailing icon`). These map to named props in the React components.

To publish updated code snippets after changing a component:

```
npx figma connect publish --token <your-figma-token>
```
