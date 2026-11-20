# Spacing & Sizing Tokens

Use only these values for padding, margin, gap, width, and height — all multiples of 4px on an 8px grid:

`4 · 8 · 12 · 16 · 24 · 32 · 40 · 48 · 64 · 96`

- **No arbitrary spacing values.** If a design requires a dimension not on the scale, snap to the nearest token.
- **Use multiples of 8px for block-element spacing.** Use `4` only for inline or typographic relationships.
- **Document exceptions** with a comment explaining why a custom value was necessary.

See `overview-styling.md` for the shorthand prop names (`p`, `mb`, `px`, …) these values are passed to.
