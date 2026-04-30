# Buttons

## Variants

| Component | Use for | Background | Text |
|---|---|---|---|
| `FillButton` | Primary CTA, high-emphasis actions | `primary` | `white` |
| `StrokeButton` | Secondary actions, outlined style | transparent | `secondary` |
| `CTAButton` | High-visibility marketing promotions | `primary` | `white` |
| `CTAButton` (inverse) | CTA on a colored surface | `primary-inverse` | `secondary` |
| `TextButton` | Low-emphasis, inline text actions | transparent | `primary` |
| `IconButton` | Compact icon-only actions | — | — |

## Sizes

`small` | `normal` (default) | `large`

## Key props

| Prop | Type | Effect |
|---|---|---|
| `size` | `"small" \| "normal" \| "large"` | Controls padding and font size |
| `icon` | Icon component | Leading or trailing icon |
| `iconPosition` | `"left" \| "right"` | Defaults to left |
| `disabled` | boolean | Disabled state styling |
| `href` | string | Renders as `<a>` tag |

## States

`default` → `hover` (`primary-hover` / `secondary-hover`) → `active` → `disabled` (`text-disabled` + `background-disabled`)

## Token cheatsheet

```
FillButton   → bg: primary (#3A10E5 light / #FFD300 dark),  color: white,     hover: primary-hover
StrokeButton → bg: transparent, border: secondary (#10162F / #fff), hover: secondary-hover
TextButton   → bg: transparent, color: primary, hover: primary-hover
```

## Rules

- Use `FillButton` for primary actions and `StrokeButton` for secondary — do not use both at equal weight.
- Reserve `CTAButton` for marketing / high-visibility promotions; do not use it for standard UI actions.
- Every interactive `Card` wrapped in `<Anchor>` should have `isInteractive` — not a button inside.
