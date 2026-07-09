# Card

`Card` accepts a specific set of `variant` values that map to internal color tokens processed by `polished`'s color parser at runtime. Passing an invalid variant string (e.g., `"navy-on-white"` instead of `"white"`) causes a runtime crash in `parseToHsl()`.

## Valid `Card` variants

`"default"`, `"white"`, `"yellow"`, `"hyper"`, `"navy"`

Never guess or invent compound variant names. Check the component's TypeScript definition in `@codecademy/gamut/dist/` if unsure.

## Defaults

1. **Default `Card` shadow to `"none"`.** Unless the design explicitly calls for a shadow, always pass `shadow="none"` on `Card` to avoid unexpected elevation.
2. **Default `Card` to `isInteractive`.** Always pass `isInteractive` on `Card` unless the user explicitly specifies that the card should not be interactive.
