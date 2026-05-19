# Spacing, Border Radius & Layout

Token values match [`packages/gamut-styles/src/variables`](https://github.com/Codecademy/gamut/tree/main/packages/gamut-styles/src/variables) (`spacing.ts`, `borderRadii.ts`, `responsive.ts`). Breakpoints and max-content widths align with Storybook [Foundations / Layout](https://gamut.codecademy.com/?path=/docs-foundations-layout--docs).

In code — use system props for spacing: Gamut layout primitives (`Box`, `FlexBox`, `GridBox`, …) expose margin, padding, and gap props backed by `system.space` from `@codecademy/gamut-styles`. Pass spacing scale numbers (`4`, `8`, `16`, …), not raw pixel strings. For custom `styled` components, compose `system.space` (see [`gamut-system-props` skill](../../skills/gamut-system-props/SKILL.md)). [Meta / Best practices](https://gamut.codecademy.com/?path=/docs-meta-best-practices--page) shows responsive `Box` examples.

Responsive behavior: All those props accept mobile-first object (`{ _: 8, md: 24 }`) or array syntax per [Responsive properties](https://gamut.codecademy.com/?path=/docs-foundations-system-responsive-properties--page). Container queries use keys `c_base`, `c_xs`, … `c_xl`; the parent must set a container (e.g. `containerType="inline-size"` on `FlexBox`). Prefer a media-query fallback when mixing `c_*` with viewport breakpoints.

Two different “grids”:

- Design / page grid (this doc’s “Grid” section, 12 columns, margins/gutters) — product layout guidelines; implement with [`LayoutGrid`](https://gamut.codecademy.com/?path=/docs-layouts-layoutgrid-layoutgrid--docs) and responsive `columnGap` / `rowGap` where appropriate.
- CSS Grid system props — `system.grid` on styled components or `GridBox` for local regions; not the same as full-page `LayoutGrid`. See [System props / Grid](https://gamut.codecademy.com/?path=/docs-foundations-system-props-grid--page). `LayoutGrid` is for flexible full-page sections; use `FlexBox` / `GridBox` / `Box` for smaller areas ([LayoutGrid usage](https://gamut.codecademy.com/?path=/docs-layouts-layoutgrid-layoutgrid--docs)).

Designer vs code names: Figma / Layout docs often label artboards XL, LG, MD, SM, XS, Base. In code, viewport breakpoints are `xl`, `lg`, `md`, `sm`, `xs` (min-widths below); `_` is the base (no min-width query). The “Max content width” column maps to those design sizes, not the `xs` token name alone.

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

The grid table below collapses xl+lg, md, sm+xs, and base to four implementation tiers; max-content widths still follow the six design sizes in Layout.

## Container query breakpoints

Container keys (`c_*`) use the same min-width numbers as viewport breakpoints, but they apply to the width of a CSS containment context (usually a parent), not the browser viewport. Use them when a component must adapt inside sidebars, split layouts, or embeds. Full detail: [Responsive properties — Container Queries](https://gamut.codecademy.com/?path=/docs-foundations-system-responsive-properties--page).

| Key      | Min container width | Typical use                                                             |
| -------- | ------------------- | ----------------------------------------------------------------------- |
| `c_base` | 1px                 | Always matches once a container exists; base style inside the container |
| `c_xs`   | 480px               | Matches viewport `xs` threshold, but on container width                 |
| `c_sm`   | 768px               |                                                                         |
| `c_md`   | 1024px              |                                                                         |
| `c_lg`   | 1200px              |                                                                         |
| `c_xl`   | 1440px              |                                                                         |

Requirements

- A descendant of an element that establishes a container — e.g. parent `<FlexBox containerType="inline-size">` (or other `container-type`). Without that, `c_*` rules never match.
- Prefer a viewport fallback alongside `c_*` (e.g. `display={{ _: 'block', sm: 'flex', c_md: 'grid' }}`) for browsers or trees without container support.

Object vs array

- Object: `p={{ _: 8, c_md: 24 }}` — readable for a few container-only overrides.
- Array: after the six viewport slots (`_` through `xl`), indices 6–11 are `c_base`, `c_xs`, `c_sm`, `c_md`, `c_lg`, `c_xl` respectively. Use when you need the full ordered chain.

When to use which

- Viewport keys (`_`, `xs`, … `xl`) — page-level layout, full-bleed sections, global nav.
- Container keys (`c_base`, … `c_xl`) — reusable widgets whose width is driven by layout, not the device alone.

## Page layout grid (12 columns)

12-column grid at all breakpoints. Tier columns group breakpoints with identical margin/gutter/row-gap numbers from [Layout](https://gamut.codecademy.com/?path=/docs-foundations-layout--docs).

| Property           | xl/lg | md   | sm/xs | base |
| ------------------ | ----- | ---- | ----- | ---- |
| Horizontal margins | 64px  | 48px | 32px  | 16px |
| Column gutters     | 32px  | 24px | 16px  | 8px  |
| Row gaps           | 32px  | 24px | 16px  | 8px  |

Minimum touch target on mobile: 44×44px — see `gamut-accessibility` skill for hit-target guidance.

## Responsive rules

- Begin design work at 1440px (XL), then adapt down.
- Multi-column layouts collapse to fewer columns — do not stretch or squish.
- Catalog cards and non-lockup elements should align on one axis (usually left), not fill column widths.
- Avoid dense or small components at the base (mobile) breakpoint.
