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
  IconButton:
    backgroundColor: 'transparent'
    textColor: '{colors.secondary}'
  IconButton-hover:
    textColor: '{colors.secondary-hover}'
  CTAButton:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.white}'
    borderRadii: '{borderRadii.md}'
  CTAButton-inverse:
    backgroundColor: '{colors.primary-inverse}'
    textColor: '{colors.secondary}'
    borderRadii: '{borderRadii.md}'
  TextButton:
    backgroundColor: 'transparent'
    textColor: '{colors.primary}'
  TextButton-hover:
    textColor: '{colors.primary-hover}'
  Card:
    backgroundColor: '{colors.background}'
    borderRadii: '{borderRadii.none}'
  Card-interactive:
    borderRadii: '{borderRadii.md}'
  Card-elevated:
    backgroundColor: '{colors.background-primary}'
    borderRadii: '{borderRadii.lg}'
  Card-beige:
    backgroundColor: '{colors.beige}'
    borderRadii: '{borderRadii.lg}'
  Input:
    backgroundColor: '{colors.background}'
    textColor: '{colors.text}'
    borderRadii: '{borderRadii.md}'
  Checkbox:
    backgroundColor: '{colors.primary}'
    borderRadii: '{borderRadii.sm}'
  Checkbox-hover:
    backgroundColor: '{colors.primary-hover}'
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

# Codecademy

This file defines the visual design tokens for codecademy.com, implemented using the Gamut design system (`@codecademy/gamut`, `@codecademy/gamut-styles`). Gamut ships 52 components with Figma ↔ code mappings via Figma Code Connect.

**Figma file**: https://www.figma.com/design/ReGfRNillGABAj5SlITalN/📐-Gamut
**Storybook**: https://gamut.codecademy.com

---

## Overview

Codecademy communicates **logic with personality** — structured and trustworthy enough for a learning platform, with creative moments that feel engaging and human. The design voice is: _"we are ruled by logic, but are creative and a bit unexpected as well."_

**Density**: Medium. Information-dense layouts use careful whitespace and strong typographic hierarchy to stay readable. Avoid cramped or overly airy layouts.

**Design philosophy**:

- Components are color mode–aware by default — never hardcode hex values for adaptive UI
- Every component works across all themes without modification
- Mobile-first responsive design built on a 12-column grid
- Use semantic tokens (`background-primary`, not raw `beige`) so colors adapt across themes and modes

### Themes

Codecademy products use three Gamut themes, all sharing the same core visual identity. Token aliases resolve to the right values per theme automatically — components require no modification.

| Theme        | Use case                        | Base font | Dark mode      |
| ------------ | ------------------------------- | --------- | -------------- |
| **Core**     | Codecademy (default)            | Apercu    | ✓ light + dark |
| **Admin**    | Codecademy admin tools          | Apercu    | ✓ light + dark |
| **Platform** | Codecademy learning environment | Apercu    | ✓ light + dark |

Set the active theme at the app root via `<GamutProvider theme={theme}>` (or `adminTheme` / `platformTheme`). Install this file in app repos: `gamut plugin install cursor --theme core` (copies to `./DESIGN.md`).

For other Skillsoft products: `gamut plugin install cursor --theme percipio` or `--theme lxstudio` (see `DESIGN.Percipio.md`, `DESIGN.LXStudio.md`).

---

## Colors

Use semantic token names in code and designs. They resolve to the correct raw value for the active theme and color mode automatically. **Never hardcode hex values** for anything that needs to adapt across modes. **Never hardcode core-theme values** like `beige` — use `background-primary` and other semantic aliases.

For dark/light regions, use `<ColorMode>` or `<Background>` from `@codecademy/gamut-styles` — never swap colors manually with custom CSS.

### Text

| Token            | Light                      | Dark            | Use for                     |
| ---------------- | -------------------------- | --------------- | --------------------------- |
| `text`           | navy-800 `#10162F` at 100% | white `#ffffff` | Default body and UI text    |
| `text-accent`    | navy-900 `#0A0D1C`         | beige `#FFF0E5` | Stronger emphasis text      |
| `text-secondary` | navy-800 at 75%            | white at 65%    | Supporting / secondary copy |
| `text-disabled`  | navy-800 at 63%            | white at 50%    | Disabled state labels       |

### Background

| Token                 | Light              | Dark                 | Use for                           |
| --------------------- | ------------------ | -------------------- | --------------------------------- |
| `background`          | white `#ffffff`    | navy-800 `#10162F`   | Default page/component background |
| `background-primary`  | beige `#FFF0E5`    | navy-900 `#0A0D1C`   | Slightly elevated surfaces        |
| `background-contrast` | white              | black `#000000`      | Maximum contrast surface          |
| `background-selected` | navy-800 at 4%     | white at 4%          | Selected row / item               |
| `background-hover`    | navy-800 at 12%    | white at 9%          | Hover state overlay               |
| `background-disabled` | navy-800 at 12%    | white at 9%          | Disabled surface                  |
| `background-success`  | green-0 `#F5FFE3`  | green-900 `#151C07`  | Success state container           |
| `background-warning`  | yellow-0 `#FFFAE5` | yellow-900 `#211B00` | Warning state container           |
| `background-error`    | red-0 `#FBF1F0`    | red-900 `#280503`    | Error state container             |

### Interactive

| Token             | Light                | Dark                 | Use for                              |
| ----------------- | -------------------- | -------------------- | ------------------------------------ |
| `primary`         | hyper-500 `#3A10E5`  | yellow-500 `#FFD300` | Primary CTA, links, focus rings      |
| `primary-hover`   | hyper-400 `#5533FF`  | yellow-400 `#CCA900` | Hover state of primary interactive   |
| `primary-inverse` | yellow-500 `#FFD300` | hyper-500 `#3A10E5`  | Primary on a colored background      |
| `secondary`       | navy-800 `#10162F`   | white `#ffffff`      | Secondary CTA, ghost buttons         |
| `secondary-hover` | navy-800 at 86%      | white at 80%         | Hover state of secondary interactive |
| `danger`          | red-500 `#E91C11`    | red-300 `#E85D7F`    | Destructive actions, error states    |
| `danger-hover`    | red-600 `#BE1809`    | red-400 `#DC5879`    | Hover on danger interactive          |

### Border

| Token              | Light              | Dark            | Use for                    |
| ------------------ | ------------------ | --------------- | -------------------------- |
| `border-primary`   | navy-800 `#10162F` | white `#ffffff` | Strong borders, dividers   |
| `border-secondary` | navy-800 at 75%    | white at 65%    | Medium-weight borders      |
| `border-tertiary`  | navy-800 at 28%    | white at 20%    | Subtle borders, separators |
| `border-disabled`  | navy-800 at 63%    | white at 50%    | Disabled input borders     |

### Feedback

| Token              | Light               | Dark                | Use for                          |
| ------------------ | ------------------- | ------------------- | -------------------------------- |
| `feedback-error`   | red-600 `#BE1809`   | red-300 `#E85D7F`   | Error messages, validation       |
| `feedback-success` | green-700 `#008A27` | green-400 `#AEE938` | Success messages, confirmations  |
| `feedback-warning` | yellow `#FFD300`    | yellow-0 `#FFFAE5`  | Warning messages, caution states |

### Shadow

| Token              | Light           | Dark         |
| ------------------ | --------------- | ------------ |
| `shadow-primary`   | navy-800        | white        |
| `shadow-secondary` | navy-800 at 75% | white at 65% |

---

### Raw color palette

All colors available as static tokens regardless of color mode. Use these only when a color should be **fixed** and not adapt to dark mode (e.g. `<Background bg="navy">` on Codecademy-branded surfaces).

#### Core palette

| Name            | Weights available            | Notes                                                                             |
| --------------- | ---------------------------- | --------------------------------------------------------------------------------- |
| `navy`          | 100–900                      | 100–700 are rgba transparencies of `#10162F`; 800 = `#10162F`; 900 = `#0A0D1C`    |
| `white`         | 100–700                      | rgba transparencies of `#ffffff` (no solid white weight — use `white` for `#fff`) |
| `blue`          | 0, 100, 300, 400, 500, 800   | 500 = `#1557FF`                                                                   |
| `hyper`         | 400, 500                     | 500 = `#3A10E5` (purple-blue), 400 = `#5533FF`                                    |
| `green`         | 0, 100, 400, 700, 900        | 700 = `#008A27`                                                                   |
| `yellow`        | 0, 400, 500, 900             | 500 = `#FFD300`                                                                   |
| `red`           | 0, 300, 400, 500, 600, 900   | 500 = `#E91C11`                                                                   |
| `gray`          | 100, 200, 300, 600, 800, 900 |                                                                                   |
| `pink`          | 0, 400                       | 400 = `#F966FF`                                                                   |
| `orange`        | 100, 500                     | 500 = `#FF8C00`                                                                   |
| `beige`         | 100 (alias: `beige`)         | `#FFF0E5`                                                                         |
| `black`         | —                            | `#000000`                                                                         |
| `white` (solid) | —                            | `#ffffff`                                                                         |

**Named aliases** (shorthand for common weights):
`beige`, `blue`, `green`, `hyper`, `lightBlue`, `lightGreen`, `navy`, `orange`, `paleBlue`, `paleGreen`, `palePink`, `paleRed`, `paleYellow`, `pink`, `red`, `yellow`, `black`, `white`

#### Platform-only additions

`lightBeige` (`#FFFBF8`), `gold` (`#8A7300`), `teal` (`#006D82`), `purple` (`#B3CCFF`)

---

## Typography

### Typefaces

| Token       | Font                                                     | Use for                                          |
| ----------- | -------------------------------------------------------- | ------------------------------------------------ |
| `base`      | Apercu Pro (CSS: `Apercu`)                               | All default UI text, headlines, body copy        |
| `accent`    | Suisse Intl Mono (CSS: `Suisse`); falls back to `Apercu` | Code, captions, labels, lists, technical context |
| `monospace` | Monaco, Menlo, Ubuntu Mono, Droid Sans Mono, Consolas    | Code editor contexts                             |
| `system`    | System UI fonts                                          | Performance-critical surfaces                    |

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

## Layout

### Spacing scale

All spacing is multiples of 4px, placed on an 8px grid. Use only these values for padding, margin, gap, width, and height — snap to the nearest token if a design specifies an off-scale value.

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

Use multiples of **8px** for block-element spacing; **4px** only for inline or typographic relationships.

### System props

**Never use inline `style` attributes.** Use system props from `@codecademy/gamut-styles` with shorthand names:

| Long form       | Shorthand |
| --------------- | --------- |
| `margin`        | `m`       |
| `marginTop`     | `mt`      |
| `marginBottom`  | `mb`      |
| `marginLeft`    | `ml`      |
| `marginRight`   | `mr`      |
| `marginX`       | `mx`      |
| `marginY`       | `my`      |
| `padding`       | `p`       |
| `paddingTop`    | `pt`      |
| `paddingBottom` | `pb`      |
| `paddingLeft`   | `pl`      |
| `paddingRight`  | `pr`      |
| `paddingX`      | `px`      |
| `paddingY`      | `py`      |

Use `mb={16}`, not `marginBottom={16}`. Color and border props: `bg`, `color` / `textColor`, `borderColor`, `borderRadius` — values must be Gamut tokens, never raw hex.

### Responsive behavior

Mobile-first. Apply styles from the named breakpoint and up.

| Token    | Min-width | Screen dimensions | Max content | Fold height |
| -------- | --------- | ----------------- | ----------- | ----------- |
| _(base)_ | 0         | 320×480           | 288px       | 440px       |
| `xs`     | 480px     | 480×900           | 448px       | 440px       |
| `sm`     | 768px     | 768×1024          | 704px       | 680px       |
| `md`     | 1024px    | 1024×768          | 896px       | 680px       |
| `lg`     | 1200px    | 1200×900          | 1072px      | 680px       |
| `xl`     | 1440px    | 1440×900          | 1248px      | 680px       |

Container query variants (`c_xs` through `c_xl`) mirror these values but trigger on component container size, not viewport.

**Grid:** 12-column grid at all breakpoints.

| Usage                 | Recommended values                               |
| --------------------- | ------------------------------------------------ |
| Horizontal margins    | 64px (lg+), 48px (md), 32px (sm/xs), 16px (base) |
| Column gaps (gutters) | 32px (lg+), 24px (md), 16px (sm/xs), 8px (base)  |
| Row gaps              | 32px (lg+), 24px (md), 16px (sm/xs), 8px (base)  |

Minimum interactive touch target: **44×44px** on mobile breakpoints.

- Begin design work at 1440px (XL), then adapt down.
- Wider multi-column layouts collapse to fewer columns — do not stretch or squish.
- Avoid dense or small components in the base (mobile) breakpoint.

### Global layout tokens

| Token          | Value                                  | Use                             |
| -------------- | -------------------------------------- | ------------------------------- |
| `headerHeight` | 4rem (64px) base, 5rem (80px) at `md`+ | Global page header height       |
| `headerZ`      | 15                                     | Z-index for global page headers |

---

## Elevation & Depth

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

## Shapes

Border radius tokens from `borderRadii` in `@codecademy/gamut-styles`. **No custom radius values.**

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

### Component catalog

Components are organized into three tiers:

### Atoms — foundational, single-purpose

Badge, Button (FillButton, StrokeButton, CTAButton, TextButton, IconButton), ButtonBase, Card, Checkbox, CodeBlock, ColorMode, Drawer, FlexBox, FormGroup, GridBox, HiddenText, Icon, Input, Label, Loader, Radio, Select, Spinner, Tag, TextArea, Toggle, Tooltip

### Molecules — composed of atoms, handle a discrete task

Alert, Anchor, Breadcrumbs, Coachmark, Disclosure, GridForm, Markdown, Menu, Modal, Pagination, Popover, ProgressBar, Table, Tabs, Toast, Toaster, Video

### Organisms — page-level compositions

ContentContainer, GridContainer, Layout, LayoutGrid

### Key component patterns

#### Buttons

**There is no generic `Button` component.** Use the variant that matches intent:

| Variant           | Component      | Use for                             |
| ----------------- | -------------- | ----------------------------------- |
| Primary action    | `FillButton`   | Solid fill, high-emphasis CTA       |
| Secondary action  | `StrokeButton` | Outlined, secondary CTA             |
| Marketing CTA     | `CTAButton`    | High-visibility promotional actions |
| Tertiary / inline | `TextButton`   | Low-emphasis, inline text actions   |
| Icon-only         | `IconButton`   | Compact actions with icon only      |

- **`IconButton` requires `tip`** for screen reader accessibility.
- **Never set `mode` on buttons** — they inherit color context from parent wrappers.
- Sizes: `small`, `normal` (default), `large`. Support `icon`, `disabled`, and `href` (renders as `<a>`).
- **States**: default → hover (`primary-hover` / `secondary-hover`) → active → disabled (`text-disabled` + `background-disabled`).

#### Cards

- **Valid `variant` values:** `default`, `white`, `yellow`, `beige`, `navy`, `hyper` — never invent compound names (invalid values crash `parseToHsl()`).
- **Defaults:** `shadow="none"`, `isInteractive={false}`.
- Set **`isInteractive`** only when the card is a link or has click/hover interaction (e.g. wrapped in `<Anchor>`); interactive cards get hover shadow and `borderRadius: md`.
- **Shadow variants:** `none` (default), `outline`, `patternLeft`, `patternRight`.

#### Color-aware components

- **`<ColorMode mode="light|dark|system">`** — explicit mode when you know which mode a region should use.
- **`<Background bg="<color>">`** — dynamic background; Gamut picks contrast-safe inner mode. Prefer over raw `bg` on content-bearing surfaces.

### Gamut implementation guardrails

#### Component discovery

1. Inspect `@codecademy/gamut` exports before building custom UI for a pattern.
2. Prefer Gamut components (`Menu`, `DataTable`, `Tabs`, `Video`, etc.) over raw HTML.
3. Read component TypeScript definitions before using `variant` / color props.
4. If no Gamut component exists: `{/* No Gamut component available for [pattern] — using custom markup */}`

#### Forms

- **Submit/save flows** (validation, bundled fields, dirty tracking): use `GridForm` or `ConnectedForm`.
- **Live filters / standalone controls** (no submit step): use atoms (`Input`, `Select`, `Checkbox`, `Radio`, `TextArea`, `FormGroup`) directly.
- Always provide `defaultValues`; use `validation="onChange"` when the submit button should stay disabled until valid.
- Set `hideLabel: true` on checkbox, radio, or toggle fields without a meaningful `label`.

#### DataTable / DataList

- `sortable: true` on a column **requires** `query`, `onQueryChange`, and **client-sorted** `rows` — Gamut does not sort data internally.

#### Menu

- **Always set `variant` explicitly:** `fixed` + `as="nav"` for persistent navigation (sidebars, primary nav); `popover` for overflow/action menus.
- Do not let flex-stretching ancestors expand `Menu` to fill vertical space — wrap in intrinsic-height containers.

#### Accessibility

- Meet WCAG contrast and **44×44px** minimum touch targets on mobile.
- Use **`FocusTrap`** inside modals, dialogs, drawers, and other focus-confined regions.

#### Assets

- Icons: `@codecademy/gamut-icons` — verify icons exist; do not trust stale Figma layer names.
- Illustrations: `@codecademy/gamut-illustrations`
- Patterns: `@codecademy/gamut-patterns`

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
- **Do** add `isInteractive` only to `Card` components that are links or otherwise interactive.
- **Don't** import a generic `Button` — it does not exist in Gamut.
- **Don't** use `CTAButton` for standard UI actions — reserve it for marketing/high-visibility promotions.
- **Don't** use `<Background>` without an actual color value — it's not a neutral wrapper.
- **Don't** use bare form atoms for functional forms — use `GridForm` or `ConnectedForm`.

### Pre-ship validation

Before considering UI output final, run **`/gamut-review`** from the app repository root (the directory that contains `DESIGN.md`). Install the plugin first if needed: **Cursor** — `gamut plugin install cursor --theme core`; **Claude Code** — `gamut plugin install claude --theme core` (use `admin` or `platform` for those Codecademy themes).

The command performs automated checks (dependencies, `GamutProvider`, imports, hex colors, tests, component guardrails) and prints a **manual pre-ship checklist** keyed to this product's theme. Fix all errors before shipping. Full procedure: [`commands/gamut-review.md`](commands/gamut-review.md) in `@codecademy/gamut` agent-tools (installed as a slash command with the Gamut plugin).

---

## Agent Prompt Guide

Quick color/token reference for generating or specifying UI:

| Scenario               | Tokens                                                                                                |
| ---------------------- | ----------------------------------------------------------------------------------------------------- |
| Primary button (light) | `bg: primary (#3A10E5)`, `color: white`, `hover: primary-hover (#5533FF)`                             |
| Primary button (dark)  | `bg: primary (#FFD300)`, `color: navy-800`, `hover: primary-hover (#CCA900)`                          |
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
