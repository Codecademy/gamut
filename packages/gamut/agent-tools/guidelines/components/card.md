# Card

`Card` accepts specific `variant` values that map to internal color tokens via `polished`'s parser. Invalid variants (e.g. `"navy-on-white"` instead of `"white"`) cause a runtime crash in `parseToHsl()`.

**Storybook:** [Atoms / Card](https://gamut.codecademy.com/?path=/docs-atoms-card--docs)

## Valid `Card` variants

`"default"`, `"white"`, `"yellow"`, `"hyper"`, `"navy"`

Never guess or invent compound variant names. Inspect TypeScript definitions in `@codecademy/gamut` if unsure.

## Defaults and props

1. **Default `shadow` to `"none"`** unless the design explicitly calls for elevation.
2. **Pass `isInteractive`** when the card is wrapped in `<Anchor>` or acts as a clickable surface — enables hover shadow and `borderRadius: md`.
3. **Default `borderRadius` is `none`** — override with the `borderRadius` prop when the design specifies rounding.

Confirm semantic surface colors against root **`DESIGN.md`** and the active theme Storybook page — variants are palette-backed, not arbitrary hex.
