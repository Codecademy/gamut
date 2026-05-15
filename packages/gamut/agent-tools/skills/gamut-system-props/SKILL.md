---
name: gamut-system-props
description: Use this skill when building or refactoring styled Gamut components that need layout, spacing, color, border, background, typography, positioning, grid, flex, shadow, list styles, or responsive values from @codecademy/gamut-styles — including composing system prop groups with variance.
---

# Gamut System Props

Source: `@codecademy/gamut-styles` — [`variance/config.ts`](https://github.com/Codecademy/gamut/blob/main/packages/gamut-styles/src/variance/config.ts) (definitions) and [`variance/props.ts`](https://github.com/Codecademy/gamut/blob/main/packages/gamut-styles/src/variance/props.ts) (`variance.create` groups). **`Box`**, **`FlexBox`**, and **`GridBox`** compose the same groups in [`packages/gamut/src/Box/props.ts`](https://github.com/Codecademy/gamut/blob/main/packages/gamut/src/Box/props.ts).

**See also:** [Styleguide — Best practices](../../../../styleguide/src/lib/Meta/Best%20practices.mdx) (semantic colors, `variant` / `states`, `StyleProps`, responsive examples) and Storybook [Responsive properties](https://gamut.codecademy.com/storybook/?path=/docs-foundations-system-responsive-properties--page).

## Overview

System props are strongly-typed, theme-connected CSS prop groups from `@codecademy/gamut-styles`. They give styled components a consistent, responsive API. All props are built on top of `@codecademy/variance`.

Each prop group has:

- **`properties`**: The CSS properties it controls
- **`scale`**: Token scale it's restricted to (theme colors, spacing values, etc.)
- **`transform`**: Optional transform applied before output (e.g. `width={0.5}` → `width: 50%`)

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

Controls dimensions, display, overflow, and container behavior. This group also carries **flex/grid item** props used when laying out children: `flexGrow`, `flexShrink`, `flexBasis`, `order`, `gridColumn`, `gridRow`, `gridColumnStart`, `gridRowStart`, `gridColumnEnd`, `gridRowEnd`, `alignSelf`, `justifySelf`, `gridArea`.

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

Key props: `fontFamily`, `fontSize`, `fontWeight`, `fontStyle`, `lineHeight`, `textAlign`, `textTransform`, `textDecoration`, `letterSpacing`, `whiteSpace` — prefer **`lineHeight`** scale keys (`base`, `title`, `spacedTitle`) from the theme over raw numbers when possible.

### `system.border`

Border width, style, radius, and color. Many **logical shorthands** exist (`borderX`, `borderColorY`, `borderRadiusTop`, …); see `config.ts` for the full map.

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

Position and offset properties. Inset shorthands use **`transformSize`**; physical vs logical edges follow **`useLogicalProperties`**.

```tsx
const Overlay = styled.div(variance.compose(system.layout, system.positioning));

<Overlay position="absolute" top={0} left={0} width="100%" height="100%" />;
```

Key props: `position`, `inset`, `top`, `right`, `bottom`, `left`, `zIndex`, `opacity`

### `system.shadow`

Box and text shadow.

Key props: `boxShadow`, `textShadow`

### `system.list`

List marker styling (`listStyle`, `listStyleType`, `listStylePosition`, `listStyleImage`). Included on **`Box`** alongside the other composed groups.

## Responsive values

All system props accept responsive values **mobile-first** (min-width queries). Two shapes are supported:

### Object syntax

Keys are breakpoints; **`_`** is the base (no breakpoint). Includes `xs`, `sm`, `md`, `lg`, `xl`, and container keys `c_xs` … `c_xl`.

```tsx
<Box width={{ _: '100%', sm: '50%', md: '33%' }} px={{ _: 8, md: 16 }} />
```

### Array syntax

Slots map in order to: base, `xs`, `sm`, `md`, `lg`, `xl`, then `c_xs` … `c_xl`. Leave a slot **empty** (or use `undefined`) to skip a breakpoint.

```tsx
<Box width={['100%', , '50%']} p={[8, 16, , 24]} />
```

Full typings and behavior: [Responsive properties (Storybook)](https://gamut.codecademy.com/storybook/?path=/docs-foundations-system-responsive-properties--page).

## Using `css()` for styled definitions

For static styles in styled components, use **`css()`** from `@codecademy/gamut-styles` (same implementation as **`system.css`** on the `system` namespace).

```tsx
import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

// Static color using raw token
const Box = styled.div(css({ bg: 'navy-400', p: 4 }));

// Semantic color (adapts to color mode)
const Text = styled.div(css({ color: 'primary', p: 4 }));
```

## Key principles

- Compose `system.*` groups via `variance.compose()` — don't apply multiple groups by chaining `styled.div(system.a)(system.b)`.
- Prefer **semantic color names** on `system.color` (e.g. `bg="background"`, `textColor="text"`) so values track **ColorMode**; use raw palette keys only when the design should stay fixed across modes.
- Use **`bg`** with semantic tokens for most mode-aware surfaces; use **`<Background>`** from `@codecademy/gamut-styles` when you need its **contrast- and mode-aware** behavior, not for every tinted panel.
- Use `system.space` values on the **spacing scale** rather than arbitrary pixel strings to keep rhythm consistent.
- For background images/patterns use `system.background`; for solid fills use `system.color` / semantic **`bg`** (or **`Background`** when that component’s behavior is required).
- For reusable **variants** or **boolean states** on styled primitives, use **`variant`** / **`states`** from `@codecademy/gamut-styles` and expose props with **`StyleProps<typeof …>`** from `@codecademy/variance` — see [Best practices](../../../../styleguide/src/lib/Meta/Best%20practices.mdx).
