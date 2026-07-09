# Gamut Code Style

How to build with Gamut correctly. This is the build-time counterpart to the
per-component `.prompt.md` references — read this once for the rules that
apply across every component, not just one.

## Setup

- Wrap the app in `GamutProvider` with a `theme` (see the theme table in the
  project README) — without it, tokens are undefined and components render
  unstyled or throw.
- Wrap in `ColorMode` (`mode="light"` or `mode="dark"`) inside `GamutProvider`
  to enable semantic light/dark theming.
- Use `<Background>` for section surfaces that need a semantic fill color,
  rather than setting `bg` directly on a layout box.
- In TypeScript, augment the Emotion `Theme` type with the active theme (e.g.
  `declare module '@emotion/react' { export interface Theme extends
PercipioTheme {} }`) so system-prop values type-check.
- When a component's props extend `states()`/`variant()` from
  `@codecademy/gamut-styles`, type them with `StyleProps<typeof ...>` from
  `@codecademy/variance`.

## Styling — props first, css-in-js second, never inline

Gamut is **props-only**. Reach for system props (`padding`, `color`, `bg`,
`border`, `gap`, etc.) on `Box`, `FlexBox`, `GridBox`, and other Gamut
components first — they're type-checked against the active theme and
automatically respond to `ColorMode`.

When a style can't be expressed as a system prop, use `css()`, `variant()`,
or `states()` from `@codecademy/gamut-styles` together with `styled` from
`@emotion/styled`. This keeps the style in the same token graph as system
props (semantic colors, spacing scale, etc.) instead of opting out of it.

Never do the following — each one bypasses `ColorMode` token propagation and
breaks system-prop composition:

- Inline `style={{ ... }}` on a Gamut component.
- Importing a `.scss`/`.css` module and applying its classes to a Gamut
  component.
- Passing `className` to a Gamut component (`Box`, `FlexBox`, `Text`,
  `FillButton`, etc.) for styling. `className` is acceptable only as an
  integration seam for a third-party library that requires it — never as a
  styling mechanism — and should be called out when used (see Departures).

## Selectors

Avoid nested selectors inside `styled`/Emotion template literals:

- Bare HTML tag selectors (`div { ... }`, `* { ... }`) — style the element
  directly with system props, or render it via `as` on `Box`/`FlexBox`
  (`<Box as="section">`) instead of targeting it from a parent wrapper.
- Child selectors targeting a Gamut component from a parent
  (`${SomeGamutComponent} { ... }`) — pass system props directly to that
  component instead. Where behavior needs to vary dynamically across several
  children, use `css()` with `variant()`/`states()` keyed off a prop or data
  attribute on the parent, not a nested selector.

## Color — semantic tokens, not hex

Always reach for a semantic `ColorMode` token (`text`, `background`,
`primary`, `secondary`, `danger`, `border-primary`, `feedback-*`, …) over a
hex literal or a raw palette name — semantic tokens are what keep light/dark
and theme switches correct. Reserve raw palette tokens (e.g. `navy-800`) for
colors that must stay fixed regardless of mode, and for `bg` on
`<Background>` when a section surface intentionally uses a fixed palette
color.

## Departures

If a build genuinely can't follow one of the rules above — no semantic token
fits a required color, a third-party integration needs `className`, a vendor
widget ships its own stylesheet — don't silently deviate. Say so explicitly
in the response (e.g. "using hex `#...` here because no semantic token
matches this color; flag for design review" or "`className` used here only
to satisfy `<VendorWidget>`'s integration API"). Silent departures make it
look like the output is system-compliant when it isn't.
