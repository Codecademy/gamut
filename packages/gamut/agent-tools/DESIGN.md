# Gamut Design System

Gamut is the Codecademy / Skillsoft design system. It ships a React component library (`@codecademy/gamut`), design tokens (`@codecademy/gamut-styles`), and Figma components with live code previews via Figma Code Connect.

**Figma file**: https://www.figma.com/design/ReGfRNillGABAj5SlITalN/📐-Gamut
**Component library**: 52 components have Figma ↔ code mappings in `packages/code-connect/`.
**Storybook**: https://gamut.codecademy.com

---

## Visual Theme & Atmosphere

Gamut communicates **logic with personality** — structured and trustworthy enough for a learning platform, with creative moments that feel engaging and human. The design voice is: *"we are ruled by logic, but are creative and a bit unexpected as well."*

**Density**: Medium. Information-dense layouts use careful whitespace and strong typographic hierarchy to stay readable. Avoid cramped or overly airy layouts.

**Design philosophy**:
- Components are color mode–aware by default — never hardcode hex values for adaptive UI
- Every component works across all themes without modification
- Mobile-first responsive design built on a 12-column grid
- Accessibility is guaranteed by design: semantic color tokens meet contrast requirements per mode automatically

---

## Themes

Five themes are available. All extend the Core theme. Components work across all themes without modification — token aliases resolve to the right values per theme.

| Theme | Use case | Dark mode |
|---|---|---|
| **Core** | Codecademy (default) | ✓ light + dark |
| **Admin** | Codecademy admin tools | ✓ light + dark |
| **Platform** | Codecademy learning environment | ✓ light + dark |
| **LX Studio** | LX Studio application | light only |
| **Percipio** | Skillsoft Percipio platform | light only |

The active theme is set at the app root via `<GamutProvider>`. When designing, know which theme your screen targets — it affects primary colors, font families, and available color weights.

---

## Semantic Color Aliases

Use these token names when specifying colors in designs. They resolve to the correct raw value for the active theme and color mode automatically. **Never hardcode hex values** for anything that needs to adapt across modes.

### Text

| Token | Light | Dark | Use for |
|---|---|---|---|
| `text` | navy-800 `#10162F` at 100% | white `#ffffff` | Default body and UI text |
| `text-accent` | navy-900 `#0A0D1C` | beige `#FFF0E5` | Stronger emphasis text |
| `text-secondary` | navy-800 at 75% | white at 65% | Supporting / secondary copy |
| `text-disabled` | navy-800 at 63% | white at 50% | Disabled state labels |

### Background

| Token | Light | Dark | Use for |
|---|---|---|---|
| `background` | white `#ffffff` | navy-800 `#10162F` | Default page/component background |
| `background-primary` | beige `#FFF0E5` | navy-900 `#0A0D1C` | Slightly elevated surfaces |
| `background-contrast` | white | black `#000000` | Maximum contrast surface |
| `background-selected` | navy-800 at 4% | white at 4% | Selected row / item |
| `background-hover` | navy-800 at 12% | white at 9% | Hover state overlay |
| `background-disabled` | navy-800 at 12% | white at 9% | Disabled surface |
| `background-success` | green-0 `#F5FFE3` | green-900 `#151C07` | Success state container |
| `background-warning` | yellow-0 `#FFFAE5` | yellow-900 `#211B00` | Warning state container |
| `background-error` | red-0 `#FBF1F0` | red-900 `#280503` | Error state container |

### Interactive

| Token | Light | Dark | Use for |
|---|---|---|---|
| `primary` | hyper-500 `#3A10E5` | yellow-500 `#FFD300` | Primary CTA, links, focus rings |
| `primary-hover` | hyper-400 `#5533FF` | yellow-400 `#CCA900` | Hover state of primary interactive |
| `primary-inverse` | yellow-500 `#FFD300` | hyper-500 `#3A10E5` | Primary on a colored background |
| `secondary` | navy-800 `#10162F` | white `#ffffff` | Secondary CTA, ghost buttons |
| `secondary-hover` | navy-800 at 86% | white at 80% | Hover state of secondary interactive |
| `interface` | hyper-500 `#3A10E5` | yellow-500 `#FFD300` | UI affordances (checkboxes, toggles, sliders) |
| `interface-hover` | hyper-400 `#5533FF` | yellow-400 `#CCA900` | Hover on interface elements |
| `danger` | red-500 `#E91C11` | red-300 `#E85D7F` | Destructive actions, error states |
| `danger-hover` | red-600 `#BE1809` | red-400 `#DC5879` | Hover on danger interactive |

### Border

| Token | Light | Dark | Use for |
|---|---|---|---|
| `border-primary` | navy-800 `#10162F` | white `#ffffff` | Strong borders, dividers |
| `border-secondary` | navy-800 at 75% | white at 65% | Medium-weight borders |
| `border-tertiary` | navy-800 at 28% | white at 20% | Subtle borders, separators |
| `border-disabled` | navy-800 at 63% | white at 50% | Disabled input borders |

### Feedback

| Token | Light | Dark | Use for |
|---|---|---|---|
| `feedback-error` | red-600 `#BE1809` | red-300 `#E85D7F` | Error messages, validation |
| `feedback-success` | green-700 `#008A27` | green-400 `#AEE938` | Success messages, confirmations |
| `feedback-warning` | yellow `#FFD300` | yellow-0 `#FFFAE5` | Warning messages, caution states |

### Shadow

| Token | Light | Dark |
|---|---|---|
| `shadow-primary` | navy-800 | white |
| `shadow-secondary` | navy-800 at 75% | white at 65% |

---

## Raw Color Palette

All colors available as static tokens regardless of color mode. Use these only when a color should be **fixed** and not adapt to dark mode.

### Core Palette

| Name | Weights available | Notes |
|---|---|---|
| `navy` | 100–900 | 100–700 are rgba transparencies of `#10162F`; 800 = `#10162F`; 900 = `#0A0D1C` |
| `white` | 100–700 | rgba transparencies of `#ffffff` (no solid white weight — use `white` for `#fff`) |
| `blue` | 0, 100, 300, 400, 500, 800 | 500 = `#1557FF` |
| `hyper` | 400, 500 | 500 = `#3A10E5` (purple-blue), 400 = `#5533FF` |
| `green` | 0, 100, 400, 700, 900 | 700 = `#008A27` |
| `yellow` | 0, 400, 500, 900 | 500 = `#FFD300` |
| `red` | 0, 300, 400, 500, 600, 900 | 500 = `#E91C11` |
| `gray` | 100, 200, 300, 600, 800, 900 | |
| `pink` | 0, 400 | 400 = `#F966FF` |
| `orange` | 100, 500 | 500 = `#FF8C00` |
| `beige` | 100 (alias: `beige`) | `#FFF0E5` |
| `black` | — | `#000000` |
| `white` (solid) | — | `#ffffff` |

**Named aliases** (shorthand for common weights):
`beige`, `blue`, `green`, `hyper`, `lightBlue`, `lightGreen`, `navy`, `orange`, `paleBlue`, `paleGreen`, `palePink`, `paleRed`, `paleYellow`, `pink`, `red`, `yellow`, `black`, `white`

### Platform-only additions
`lightBeige` (`#FFFBF8`), `gold` (`#8A7300`), `teal` (`#006D82`), `purple` (`#B3CCFF`)

### LX Studio additions
`lxStudioPurple` (`#5628FE`), `lxStudioPurpleHover` (`#7955FC`), `lxStudioSuccess` (`#06844F`)

---

## Typography

### Typefaces

| Token | Font | Use for |
|---|---|---|
| `base` | Aperçu Pro (fallback: system sans-serif) | All default UI text, headlines, body copy |
| `accent` | Suisse Int'l Mono (fallback: system sans-serif) | Code, captions, labels, lists, technical context |
| `monospace` | Monaco / Menlo | Code editor contexts |
| `system` | System UI fonts | Performance-critical surfaces |

**Percipio theme overrides all families to Roboto.**
**LX Studio theme uses Hanken Grotesk for `base`.**

### Rules

- **Aperçu Family** can only be used for codecademy.com. Don't use for any other product.
- **Aperçu Bold** for headlines, sub-headlines, CTAs, and buttons.
- **Aperçu Regular** for body text, UI labels, and menu items.
- **Aperçu Italic** to emphasize text within a Regular paragraph — not Bold.
- **Suisse** sparingly: code snippets, enumerated items, quotations, captions. Reads 10–15% large for its point size — size down relative to Aperçu (14px Suisse ≈ 16px Aperçu visually).
- Text is **left-aligned** by default. Center-align only for short marketing headlines. Never right-align.
- Do not adjust letter-spacing.

### Font size scale

| Token key | Size | Common use |
|---|---|---|
| `64` | 64px | Hero / display |
| `44` | 44px | Page titles |
| `34` | 34px | Section titles |
| `26` | 26px | Sub-section titles |
| `22` | 22px | Card titles, large UI labels |
| `20` | 20px | Secondary titles |
| `18` | 18px | Large body, intro text |
| `16` | 16px | Default body text |
| `14` | 14px | Small body, captions, labels |

### Font weight scale

| Token | Value | Use |
|---|---|---|
| `base` | 400 | Body text, UI labels |
| `title` | 700 | Headlines, CTAs, buttons |

### Line height scale

| Token | Value | Use |
|---|---|---|
| `base` | 1.5 | Body text (150% — aim for 150–175% of font size) |
| `spacedTitle` | 1.3 | Sub-headlines and medium titles |
| `title` | 1.2 | Large headlines (aim for 100–110% of font size) |

### Line length

Target 45–85 characters per line; 66 characters is ideal for web body text. Max 50 characters for multi-column layouts.

---

## Spacing Scale

All spacing is multiples of 4px, placed on an 8px grid.

| Token | Value |
|---|---|
| `0` | 0 |
| `4` | 4px |
| `8` | 8px |
| `12` | 12px |
| `16` | 16px |
| `24` | 24px |
| `32` | 32px |
| `40` | 40px |
| `48` | 48px |
| `64` | 64px |
| `96` | 96px |

---

## Border Radius Scale

| Token | Value | Use |
|---|---|---|
| `none` | 0px | Square / non-interactive elements |
| `sm` | 2px | Subtle rounding, tags |
| `md` | 4px | Default buttons, inputs, interactive cards |
| `lg` | 8px | Cards, panels |
| `xl` | 16px | Large cards, modals |
| `full` | 999px | Pills, avatars, circular elements |

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

| Variant | Effect | Use for |
|---|---|---|
| `none` (default) | No shadow | Static / non-interactive cards |
| `outline` | Solid shadow on bottom + left/right using border color | Standard clickable cards |
| `patternLeft` | Decorative checker pattern on bottom + left | Stylized content cards |
| `patternRight` | Decorative checker pattern on bottom + right | Stylized content cards |

Interactive cards (`isInteractive` prop) gain a shadow on hover and `borderRadius: md`. Cards with a pattern drop the pattern on hover.

### Z-index

| Token | Value | Use |
|---|---|---|
| `headerZ` | 15 | Global page header |

---

## Responsive Behavior

Mobile-first. Apply styles from the named breakpoint and up.

### Breakpoints & screen sizes

| Token | Min-width | Screen dimensions | Max content | Fold height |
|---|---|---|---|---|
| _(base)_ | 0 | 320×480 | 288px | 440px |
| `xs` | 480px | 480×900 | 448px | 440px |
| `sm` | 768px | 768×1024 | 704px | 680px |
| `md` | 1024px | 1024×768 | 896px | 680px |
| `lg` | 1200px | 1200×900 | 1072px | 680px |
| `xl` | 1440px | 1440×900 | 1248px | 680px |

Container query variants (`c_xs` through `c_xl`) mirror these values but trigger on component container size, not viewport.

### Grid

12-column grid at all breakpoints. The designer specifies how many columns a section spans per breakpoint.

| Usage | Recommended values |
|---|---|
| Horizontal margins | 64px (lg+), 48px (md), 32px (sm/xs), 16px (base) |
| Column gaps (gutters) | 32px (lg+), 24px (md), 16px (sm/xs), 8px (base) |
| Row gaps | 32px (lg+), 24px (md), 16px (sm/xs), 8px (base) |

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

Badge, Button (FillButton, StrokeButton, CTAButton, TextButton, IconButton), ButtonBase, Card, Checkbox, CodeBlock, ColorMode, Drawer, FlexBox, FormGroup, GridBox, HiddenText, Icon, Input, Label, Loader, Radio, Select, Spinner, Tag, TextArea, Toggle, Tooltip

### Molecules — composed of atoms, handle a discrete task

Alert, Anchor, Breadcrumbs, Coachmark, Disclosure, GridForm, Markdown, Menu, Modal, Pagination, Popover, ProgressBar, Table, Tabs, Toast, Toaster, Video

### Organisms — page-level compositions

ContentContainer, GridContainer, Layout, LayoutGrid

### Key component patterns

#### Buttons

| Variant | Component | Use for |
|---|---|---|
| Primary action | `FillButton` | Solid fill, high-emphasis CTA |
| Secondary action | `StrokeButton` | Outlined, secondary CTA |
| Marketing CTA | `CTAButton` | High-visibility promotional actions |
| Tertiary / inline | `TextButton` | Low-emphasis, inline text actions |
| Icon-only | `IconButton` | Compact actions with icon only |

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

| Token | Value | Use |
|---|---|---|
| `headerHeight` | 4rem (64px) base, 5rem (80px) at `md`+ | Global page header height |
| `headerZ` | 15 | Z-index for global page headers |

---

## Do's and Don'ts

### Colors

- **Do** use semantic color aliases (`primary`, `text`, `background`, etc.) for any UI that must adapt to color mode or theme.
- **Do** use `<Background bg="...">` when setting a section background — it adjusts the inner color mode for contrast automatically.
- **Don't** hardcode hex values for anything adaptive.
- **Don't** use navy or white semi-transparent swatches where they may overlap unpredictably.
- **Don't** use Aperçu Pro on non-Codecademy products.

### Typography

- **Do** use `title` weight (700) for headlines, CTAs, and buttons.
- **Do** keep body text at 150–175% line height for readability.
- **Do** use Suisse sparingly — as an accent for code, captions, and lists only.
- **Don't** use Aperçu Bold to emphasize text *within* a Regular paragraph — use Italic instead.
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

| Scenario | Tokens |
|---|---|
| Primary button (light) | `bg: primary (#3A10E5)`, `color: white`, `hover: primary-hover (#5533FF)` |
| Primary button (dark) | `bg: primary (#FFD300)`, `color: navy-800`, `hover: primary-hover (#CCA900)` |
| Body text | `color: text`, `font: base (Aperçu Pro)`, `size: 16px`, `weight: 400`, `lineHeight: base (1.5)` |
| Headline | `color: text-accent`, `font: base`, `size: 34–64px`, `weight: title (700)`, `lineHeight: title (1.2)` |
| Caption / label | `color: text-secondary`, `font: accent (Suisse Int'l Mono)`, `size: 14px` |
| Card default | `bg: background`, `borderRadius: none` — add `isInteractive` for hover shadow + `borderRadius: md` |
| Error state | `color: feedback-error`, `bg: background-error`, `border: danger` |
| Success state | `color: feedback-success`, `bg: background-success` |
| Disabled state | `color: text-disabled`, `bg: background-disabled`, `border: border-disabled` |

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
