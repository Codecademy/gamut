# Card

`Card` accepts a specific set of `variant` values that map to internal color tokens processed by `polished`'s color parser at runtime. Passing an invalid variant string (e.g., `"navy-on-white"` instead of `"white"`) causes a runtime crash in `parseToHsl()`.

## Valid `Card` variants

`"default"`, `"white"`, `"yellow"`, `"hyper"`, `"navy"`

Never guess or invent compound variant names. Check the component's TypeScript definition in `@codecademy/gamut/dist/` if unsure.

## Card ↔ ColorMode

**For a surface that should follow the active `ColorMode`, use `variant="default"`** — it's token-based and adapts automatically. `white`/`beige`/`yellow` and `navy`/`hyper` are for **fixed** regions that intentionally ignore the active mode (e.g. a marketing card that's always dark regardless of the page's light/dark state). Don't reach for a fixed-palette variant just because it happens to match the current mode — that breaks when the mode switches.

## Defaults

1. **Default `Card` shadow to `"none"`.** Unless the design explicitly calls for a shadow, always pass `shadow="none"` on `Card` to avoid unexpected elevation.
2. **Default `Card` to `isInteractive`.** Always pass `isInteractive` on `Card` unless the user explicitly specifies that the card should not be interactive.

## Variant examples

```jsx
const { Card } = window.CodecademyGamut;

<Card variant="default" isInteractive shadow="none">Follows active ColorMode</Card>

// Fixed light-region variants — ignore ColorMode intentionally
<Card variant="white">White variant</Card>
<Card variant="yellow">Yellow variant</Card>

// Fixed dark-region variants — ignore ColorMode intentionally
<Card variant="navy">Navy variant</Card>
<Card variant="hyper">Hyper variant</Card>
```

## Shadow examples

```jsx
<Card shadow="none">No shadow (default)</Card>
<Card shadow="outline">Outline shadow</Card>
<Card shadow="patternLeft">Decorative pattern, left</Card>
<Card shadow="patternRight">Decorative pattern, right</Card>
```
