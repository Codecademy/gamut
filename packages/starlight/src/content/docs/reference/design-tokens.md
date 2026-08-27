---
title: Design tokens
description: Color, spacing, radius, and other token values, and the keys used to access them.
---

Every theme exposes the same token categories, each accessible on the Emotion theme object via its own key. Exact values differ per theme — see [Themes](/reference/themes/) for the available theme palettes, or open Storybook's Theme Switcher (paintbrush icon in the toolbar) to browse live values for any theme/color-mode combination.

## Color — `colors`

- Standard colors — the color atoms Codecademy designs should draw from.
- Solid swatches — accessed as `colors['<color>-<weight>']`.
- Navy/white swatches — semi-transparent except for a few fixed weights (`100`, `navy-800`, `navy-900`); the white weights only show in dark mode, and the navy weights only in light mode.

See [Color modes](/concepts/color-modes/) for the semantic aliases (`text`, `background`, `primary`, `secondary`) built on top of these raw values.

## Typography

- Font family — `fontFamily`
- Font size — `fontSize`
- Font weight — `fontWeight`
- Line height — `lineHeight`

## Space

- Spacing scale — `spacing`

## Layout

- Breakpoints — `breakpoints`. See [Responsive properties](/reference/system-props/responsive-properties/) for how these map to the prop syntax.

## Border radius

- `borderRadii`

## Elevation

- `elevation` — how a surface like Card renders shadow and lift. Three states — `rest`, `hover`, `hoverMirrored` — each with a `shadow` and a `transform` token, accessed as `elevation['<state>-<property>']`. `hoverMirrored` is for a surface that casts its shadow to the right instead of the left. Shadow colors reference the `shadow-primary` alias, so they follow color mode automatically; a theme can supply its own elevation scale — Percipio, for example, swaps the hard offset shadow for a soft, blurred one with no lift.

## Accessing tokens directly

Reach for a token directly only when a [system prop](/reference/system-props/) can't express what you need — most components should consume tokens through system props instead.

```tsx
// on the theme prop of any styled component
const styles = styled.div`
  color: ${({ theme }) => theme.colors.blue};
`;

// or imported directly
import { theme } from '@codecademy/gamut-styles';
const myStyles = css`
  font-size: ${theme.fontSize[14]};
`;
```
