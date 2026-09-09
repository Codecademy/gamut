---
name: gamut-system-props
description: 'Use this skill when composing system prop groups (`system.*`) on styled components, selecting which group covers a CSS property, or building responsive props with `variance.compose()` — not for `css()`, `variant()`, or `states()` (see gamut-style-utilities).'
---

# Gamut System Props

Source: `@codecademy/gamut-styles` — `packages/gamut-styles/src/variance/config.ts` (definitions) and `packages/gamut-styles/src/variance/props.ts` (`variance.create` groups). `Box`, `FlexBox`, and `GridBox` compose the same groups in `packages/gamut/src/Box/props.ts`.

See also: [`gamut-style-utilities`](../gamut-style-utilities/SKILL.md) (`css`, `variant`, `states`, `StyleProps`). [`gamut-color-mode`](../gamut-color-mode/SKILL.md) — **read this before picking a value for `color`/`bg`/`borderColor`**; this skill only tells you the prop exists, not which token belongs in it. [Styleguide — Best practices](https://gamut.codecademy.com/?path=/docs-meta-best-practices--page) (semantic colors, responsive examples) and Storybook [Responsive properties](https://gamut.codecademy.com/storybook/?path=/docs-foundations-system-responsive-properties--page).

## Overview

System props are strongly-typed, theme-connected CSS prop groups from `@codecademy/gamut-styles`. They give styled components a consistent, responsive API. All props are built on top of `@codecademy/variance`.

Each prop group has:

- `properties`: The CSS properties it controls
- `scale`: Token scale it's restricted to (theme colors, spacing values, etc.)
- `transform`: Optional transform applied before output (e.g. `width={0.5}` → `width: 50%`)

## Basic usage

```tsx
import styled from '@emotion/styled';
import { system } from '@codecademy/gamut-styles';

// Apply a single group
const Box = styled.div(system.layout);

// Compose multiple groups
import { variance } from '@codecademy/variance';

const FlexBox = styled.div(
  variance.compose(system.layout, system.flex, system.space)
);

<FlexBox display="flex" p={16} gap={8} width="100%" />;
```

## Prop groups

### `system.layout`

Controls dimensions, display, overflow, and container behavior. This group also carries flex/grid item props used when laying out children: `flexGrow`, `flexShrink`, `flexBasis`, `order`, `gridColumn`, `gridRow`, `gridColumnStart`, `gridRowStart`, `gridColumnEnd`, `gridRowEnd`, `alignSelf`, `justifySelf`, `gridArea`.

```tsx
const Box = styled.div(system.layout);

<Box display="flex" width="50%" height="300px" verticalAlign="middle" />;
```

Key props: `containerType`, `display`, `direction`, `dimensions`, `width`, `height`, `minWidth`, `maxWidth`, `minHeight`, `maxHeight`, `overflow`, `overflowX`, `overflowY`, `verticalAlign`, plus the item props above (see `config.ts` for the full map).

### `system.space`

Margin and padding using the theme's spacing scale. Supports logical properties (switches based on `useLogicalProperties` in `<GamutProvider>`).

```tsx
const Box = styled.div(system.space);

// Single value
<Box p={8} m={16} />;

// Responsive (array / object — see Responsive values)
<Box my={[16, 24, 32]} px={[8, 16]} />;
```

Key props: `p`, `pt`, `pr`, `pb`, `pl`, `px`, `py`, `m`, `mt`, `mr`, `mb`, `ml`, `mx`, `my`

### `system.color`

Foreground, background, and border colors restricted to the theme's color palette.

```tsx
const Box = styled.div(system.color);

<Box bg="navy" color="gray-900" textColor="gray-100" borderColor="blue" />;
```

Key props: `color`, `textColor` (both set CSS `color`), `bg`, `borderColor`, plus directional `borderColor*` variants — see `config.ts` for the full set.

### `system.typography`

Text styling connected to theme typography scales.

```tsx
const Text = styled.p(system.typography);

<Text
  fontSize={16}
  fontFamily="accent"
  fontStyle="italic"
  textTransform="uppercase"
  lineHeight="base"
/>;
```

Key props: `fontFamily`, `fontSize`, `fontWeight`, `fontStyle`, `lineHeight`, `textAlign`, `textTransform`, `textDecoration`, `letterSpacing`, `whiteSpace` — prefer `lineHeight` scale keys (`base`, `title`, `spacedTitle`) from the theme over raw numbers when possible.

### `system.border`

Border width, style, radius, and color. Many logical shorthands exist (`borderX`, `borderColorY`, `borderRadiusTop`, …); see `config.ts` for the full map.

Key props (non-exhaustive): `border`, `borderTop`, `borderRight`, `borderBottom`, `borderLeft`, `borderRadius`, `borderWidth`, `borderStyle`

### `system.background`

Background image, size, position, and repeat (for images/patterns — use `system.color` for solid background colors).

```tsx
import myBg from './myBg.png';

const Box = styled.div(system.background);

<Box
  background={`url(${myBg})`}
  backgroundSize="cover"
  backgroundPosition="center"
/>;
```

Key props: `background`, `backgroundImage`, `backgroundSize`, `backgroundPosition`, `backgroundRepeat`

### `system.flex`

Flexbox child and container properties.

Key props (non-exhaustive): `flex`, `flexDirection`, `flexWrap`, `flexGrow`, `flexShrink`, `flexBasis`, `alignItems`, `alignContent`, `alignSelf`, `justifyContent`, `justifyItems`, `justifySelf`, `gap`, `rowGap`, `columnGap`

### `system.grid`

CSS Grid container and child properties.

Key props (non-exhaustive): `gridTemplateColumns`, `gridTemplateRows`, `gridTemplateAreas`, `gridColumn`, `gridRow`, `gridArea`, `gridAutoFlow`, `gridAutoColumns`, `gridAutoRows`, `gap`, `rowGap`, `columnGap`

### `system.positioning`

Position and offset properties. Inset shorthands use `transformSize`; physical vs logical edges follow `useLogicalProperties`.

```tsx
const Overlay = styled.div(variance.compose(system.layout, system.positioning));

<Overlay position="absolute" top={0} left={0} width="100%" height="100%" />;
```

Key props: `position`, `inset`, `top`, `right`, `bottom`, `left`, `zIndex`, `opacity`. For choosing a `zIndex` value, see [`gamut-z-index`](../gamut-z-index/SKILL.md) (the semantic `zIndexes` scale and the `gamut/no-raw-z-index` lint rule).

### `system.shadow`

Box and text shadow.

Key props: `boxShadow`, `textShadow`

### `system.list`

List marker styling (`listStyle`, `listStyleType`, `listStylePosition`, `listStyleImage`). Included on `Box` alongside the other composed groups.

## Responsive values

All system props accept responsive values mobile-first (min-width queries). Two shapes are supported:

### Object syntax

Keys are breakpoints; `_` is the base (no breakpoint). Includes `xs`, `sm`, `md`, `lg`, `xl`, and container keys `c_xs` … `c_xl`.

```tsx
<Box width={{ _: '100%', sm: '50%', md: '33%' }} px={{ _: 8, md: 16 }} />
```

### Array syntax

Slots map in order to: base, `xs`, `sm`, `md`, `lg`, `xl`, then `c_xs` … `c_xl`. Leave a slot empty (or use `undefined`) to skip a breakpoint.

```tsx
<Box width={['100%', , '50%']} p={[8, 16, , 24]} />
```

Full typings and behavior: [Responsive properties (Storybook)](https://gamut.codecademy.com/storybook/?path=/docs-foundations-system-responsive-properties--page).

## Don't wrap a Gamut component in `styled()` to hand-write CSS

`Box`, `FlexBox`, `GridBox`, `Text`, and the rest of `@codecademy/gamut` already compose the prop groups above. Writing ` styled(Box)`` display: flex; padding: 16px; `` (a tagged template) or  `styled(Box)({ display: 'flex', padding: 16 })`(a plain object, not`css()`) throws that API away — the wrapper's raw CSS gets none of the token scaling, responsive-object/array syntax, or ColorMode resolution the same properties would get as props, and it duplicates an API the component already exposes directly. This is the same bypass as `className`or an inline`style` prop on a Gamut component (see [`gamut-review`](../gamut-review/SKILL.md) Check 3b) — it's just wearing a `styled()` costume.

```tsx
// wrong — Box already has all of these as props
const HeroContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 16px;
  margin-top: 24px;
  color: white;
`;

// correct — two separate fixes, don't do just one:
// (1) delete the wrapper — display:flex → use FlexBox, not Box + display="flex"
// (2) color changed from the raw palette name "white" to the semantic token
//     "text" — see the callout below, this is not a typo
<FlexBox flexDirection="column" p={16} mt={24} color="text">
```

Check every property in the block against the prop groups above (`system.layout`, `system.space`, `system.color`, `system.flex`, `system.positioning`, …) before reaching for `styled()` at all. If everything in the block has a direct prop equivalent, there should be no `styled()` wrapper — the values belong inline on the JSX element.

**Fixing the wrapper is not the whole job when the property is a color.** A request phrased as a literal color name ("white text", "navy background") describes what the design should _look like_, not necessarily which token to pass — read [`gamut-color-mode`](../gamut-color-mode/SKILL.md) to decide between:

- **Most cases**: the color should adapt to light/dark — map the described appearance to the semantic alias that currently resolves to it (e.g. "white text" on a component that should read normally in both modes is usually `text` — which resolves to `white` in dark mode already — not a literal `color="white"` that stays white even in light mode).
- **Fixed-color cases**: the color must **not** adapt (illustrations, brand marks, a permanently-dark hero surface) — here a raw palette name like `white` or `navy-800` is the _correct_, deliberate choice, same exception `gamut-review` Check 4 uses for hex literals. Don't "fix" this by forcing a semantic token onto something that was never supposed to adapt.

Either way, decide which case you're in — don't default to typing the literal color name from the request just because it's the fastest way to satisfy the sentence.

**Check the `system.background` prop before assuming a gradient needs `styled()`.** `background` (unlike `bg`) has no token scale — it passes straight through to the CSS `background` property, so a full gradient string (`background="radial-gradient(...)"` or `linear-gradient(...)`) is already valid as a plain prop, no wrapper needed. A gradient is not, on its own, a reason to reach for `styled()`.

**If something genuinely isn't expressible as a prop** (`background-clip: text`, `background-blend-mode`, a variant that should branch on a prop rather than live as a boolean pile, pseudo-selectors like `&:hover`) — keep wrapping the component, but wrap the style value in `css()`, `variant()`, or `states()` from `@codecademy/gamut-styles` instead of a raw template literal or plain object. That keeps every _other_ property in the same block token-typed and theme-aware, and is the only form of `styled(GamutComponent)` this rule doesn't flag. See [`gamut-style-utilities`](../gamut-style-utilities/SKILL.md) for `css()`/`variant()`/`states()`. Don't let one non-expressible property drag otherwise-plain properties (`padding`, `display`) into the same raw-CSS escape hatch — move those back out to props.

## Using `css()` for styled definitions

For static styles in styled components, use `css()` from `@codecademy/gamut-styles` (same implementation as `system.css` on the `system` namespace).

```tsx
import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

// Static color using raw token
const Box = styled.div(css({ bg: 'navy-400', p: 4 }));

// Semantic color (adapts to color mode)
const Text = styled.div(css({ color: 'primary', p: 4 }));
```
