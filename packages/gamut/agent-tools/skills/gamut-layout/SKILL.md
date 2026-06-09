---
name: gamut-layout
description: Use this skill when applying Gamut spacing scale, border radii, viewport or container breakpoints, screen sizes, responsive layouts, media queries, or page layout grid (LayoutGrid vs GridBox) — including migrating breakpoint or screen-size logic, responsive prop patterns, useWindowSize / useBreakpoint hooks, and mobile-first design. Complements gamut-system-props for system.space and responsive props.
---

# Gamut Layout

Token values match [`packages/gamut-styles/src/variables`](https://github.com/Codecademy/gamut/tree/main/packages/gamut-styles/src/variables) (`spacing.ts`, `borderRadii.ts`, `responsive.ts`). Breakpoints and max-content widths align with Storybook [Foundations / Layout](https://gamut.codecademy.com/?path=/docs-foundations-layout--docs).

See also: [`gamut-system-props`](../gamut-system-props/SKILL.md) — `system.space`, responsive `Box` / `FlexBox` / `GridBox` props. [Meta / Best practices](https://gamut.codecademy.com/?path=/docs-meta-best-practices--page) — responsive examples.

## System props for spacing

Gamut layout primitives (`Box`, `FlexBox`, `GridBox`, …) expose margin, padding, and gap props backed by `system.space` from `@codecademy/gamut-styles`. Pass spacing scale numbers (`4`, `8`, `16`, …), not raw pixel strings. For custom `styled` components, compose `system.space`.

Responsive behavior: All those props accept mobile-first object (`{ _: 8, md: 24 }`) or array syntax per [Responsive properties](https://gamut.codecademy.com/?path=/docs-foundations-system-responsive-properties--page). Container queries use keys `c_base`, `c_xs`, … `c_xl`; the parent must set a container (e.g. `containerType="inline-size"` on `FlexBox`). Prefer a media-query fallback when mixing `c_*` with viewport breakpoints.

## Two different “grids”

- **Design / page grid** (12 columns, margins/gutters) — product layout; implement with [`LayoutGrid`](https://gamut.codecademy.com/?path=/docs-layouts-layoutgrid-layoutgrid--docs) and responsive `columnGap` / `rowGap` where appropriate.
- **CSS Grid system props** — `system.grid` on styled components or `GridBox` for local regions; not the same as full-page `LayoutGrid`. See [System props / Grid](https://gamut.codecademy.com/?path=/docs-foundations-system-props-grid--page). `LayoutGrid` is for flexible full-page sections; use `FlexBox` / `GridBox` / `Box` for smaller areas.

Designer vs code names: Figma / Layout docs often label artboards XL, LG, MD, SM, XS, Base. In code, viewport breakpoints are `xl`, `lg`, `md`, `sm`, `xs` (min-widths below); `_` is the base (no min-width query).

## Spacing scale

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

Use multiples of 8px for block-element spacing. Use 4px only for inline or typographic relationships.

## Border radius

| Token  | Value | Use                                |
| ------ | ----- | ---------------------------------- |
| `none` | 0px   | Square / non-interactive elements  |
| `sm`   | 2px   | Subtle rounding, tags              |
| `md`   | 4px   | Buttons, inputs, interactive cards |
| `lg`   | 8px   | Cards, panels                      |
| `xl`   | 16px  | Large cards, modals                |
| `full` | 999px | Pills, avatars, circular elements  |

## Breakpoints

Mobile-first. Styles apply from the named breakpoint and up.

| Token    | Min-width | Max content width |
| -------- | --------- | ----------------- |
| _(base)_ | 0         | 288px             |
| `xs`     | 480px     | 448px             |
| `sm`     | 768px     | 704px             |
| `md`     | 1024px    | 896px             |
| `lg`     | 1200px    | 1072px            |
| `xl`     | 1440px    | 1248px            |

## Container query breakpoints

Container keys (`c_*`) use the same min-width numbers as viewport breakpoints, but they apply to the width of a CSS containment context (usually a parent), not the browser viewport.

| Key      | Min container width |
| -------- | ------------------- |
| `c_base` | 1px                 |
| `c_xs`   | 480px               |
| `c_sm`   | 768px               |
| `c_md`   | 1024px              |
| `c_lg`   | 1200px              |
| `c_xl`   | 1440px              |

Requirements:

- A descendant of an element that establishes a container — e.g. parent `<FlexBox containerType="inline-size">`. Without that, `c_*` rules never match.
- Prefer a viewport fallback alongside `c_*` (e.g. `display={{ _: 'block', sm: 'flex', c_md: 'grid' }}`) for browsers or trees without container support.

When to use which:

- Viewport keys (`_`, `xs`, … `xl`) — page-level layout, full-bleed sections, global nav.
- Container keys (`c_base`, … `c_xl`) — reusable widgets whose width is driven by layout, not the device alone.

## Page layout grid (12 columns)

12-column grid at all breakpoints.

| Property           | xl/lg | md   | sm/xs | base |
| ------------------ | ----- | ---- | ----- | ---- |
| Horizontal margins | 64px  | 48px | 32px  | 16px |
| Column gutters     | 32px  | 24px | 16px  | 8px  |
| Row gaps           | 32px  | 24px | 16px  | 8px  |

Minimum touch target on mobile: 44×44px — see [`gamut-accessibility`](../gamut-accessibility/SKILL.md).

## Responsive rules

- Begin design work at 1440px (XL), then adapt down.
- Multi-column layouts collapse to fewer columns — do not stretch or squish.
- Catalog cards and non-lockup elements should align on one axis (usually left), not fill column widths.
- Avoid dense or small components at the base (mobile) breakpoint.
