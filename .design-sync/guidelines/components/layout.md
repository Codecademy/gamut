# Layout — breakpoints, grid, and container queries

Token values referenced here live in `design-tokens/spacing.md` and `design-tokens/border-radius.md`. This file covers _how_ to apply them responsively.

## Two different "grids"

- **Design / page grid** (12 columns, margins/gutters) — product layout; implement with `LayoutGrid` and responsive `columnGap`/`rowGap`.
- **CSS Grid system props** — `system.grid` on styled components or `GridBox` for local regions; not the same as full-page `LayoutGrid`. `LayoutGrid` is for flexible full-page sections; use `FlexBox`/`GridBox`/`Box` for smaller areas.

## Breakpoints (mobile-first)

Styles apply from the named breakpoint and up.

| Token    | Min-width | Max content width |
| -------- | --------- | ----------------- |
| _(base)_ | 0         | 288px             |
| `xs`     | 480px     | 448px             |
| `sm`     | 768px     | 704px             |
| `md`     | 1024px    | 896px             |
| `lg`     | 1200px    | 1072px            |
| `xl`     | 1440px    | 1248px            |

## Container query breakpoints

Container keys (`c_*`) use the same min-width numbers as viewport breakpoints, but apply to the width of a CSS containment context (usually a parent), not the browser viewport.

| Key      | Min container width |
| -------- | ------------------- |
| `c_base` | 1px                 |
| `c_xs`   | 480px               |
| `c_sm`   | 768px               |
| `c_md`   | 1024px              |
| `c_lg`   | 1200px              |
| `c_xl`   | 1440px              |

Requirements:

- A descendant of an element that establishes a container — e.g. parent `FlexBox` with `containerType="inline-size"`. Without that, `c_*` rules never match.
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

Minimum touch target on mobile: 44×44px — see `overview-accessibility.md`.

## Responsive rules

- Begin design work at 1440px (XL), then adapt down.
- Multi-column layouts collapse to fewer columns — do not stretch or squish.
- Catalog cards and non-lockup elements should align on one axis (usually left), not fill column widths.
- Avoid dense or small components at the base (mobile) breakpoint.

## Designer vs. code names

Figma/design docs often label artboards XL, LG, MD, SM, XS, Base. In code, viewport breakpoints are `xl`, `lg`, `md`, `sm`, `xs` (min-widths above); `_` is the base (no min-width query).
