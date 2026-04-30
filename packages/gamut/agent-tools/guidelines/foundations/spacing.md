# Spacing, Border Radius & Layout

## Spacing scale

All spacing is multiples of 4px on an 8px grid.

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

Use multiples of 8px for block-element spacing. Use 4px only for inline or typographic relationships.

## Border radius

| Token | Value | Use |
|---|---|---|
| `none` | 0px | Square / non-interactive elements |
| `sm` | 2px | Subtle rounding, tags |
| `md` | 4px | Buttons, inputs, interactive cards |
| `lg` | 8px | Cards, panels |
| `xl` | 16px | Large cards, modals |
| `full` | 999px | Pills, avatars, circular elements |

## Breakpoints

Mobile-first. Styles apply from the named breakpoint and up.

| Token | Min-width | Max content width |
|---|---|---|
| _(base)_ | 0 | 288px |
| `xs` | 480px | 448px |
| `sm` | 768px | 704px |
| `md` | 1024px | 896px |
| `lg` | 1200px | 1072px |
| `xl` | 1440px | 1248px |

Container query variants (`c_xs`–`c_xl`) mirror these values but trigger on component width.

## Grid

12-column grid at all breakpoints.

| Property | xl/lg | md | sm/xs | base |
|---|---|---|---|---|
| Horizontal margins | 64px | 48px | 32px | 16px |
| Column gutters | 32px | 24px | 16px | 8px |
| Row gaps | 32px | 24px | 16px | 8px |

Minimum touch target on mobile: **44×44px**.

## Responsive rules

- Begin design work at 1440px (XL), then adapt down.
- Multi-column layouts collapse to fewer columns — do not stretch or squish.
- Catalog cards and non-lockup elements should align on one axis (usually left), not fill column widths.
- Avoid dense or small components at the base (mobile) breakpoint.
