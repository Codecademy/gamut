---
name: gamut-system-props
description: Use this skill when building or refactoring styled Gamut components that need layout, spacing, color, border, background, typography, positioning, grid, flex, shadow, or responsive values from @codecademy/gamut-styles — including composing system prop groups with variance.
---

# Gamut System Props

Source: `@codecademy/gamut-styles` — [`variance/config.ts`](https://github.com/Codecademy/gamut/blob/main/packages/gamut-styles/src/variance/config.ts)

## Overview

System props are strongly-typed, theme-connected CSS prop groups from `@codecademy/gamut-styles`. They give styled components a consistent, responsive API. All props are built on top of `@codecademy/variance`. Semantic color props assume the subtree is under the correct **ColorMode** / **Background** context when those surfaces need to adapt — see [`gamut-color-mode`](../gamut-color-mode/SKILL.md).

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

Controls dimensions, display, overflow, and container behavior.

```tsx
const Box = styled.div(system.layout);

<Box display="flex" width="50%" height="300px" verticalAlign="middle" />;
```

Key props: `display`, `width`, `height`, `minWidth`, `maxWidth`, `minHeight`, `maxHeight`, `overflow`, `overflowX`, `overflowY`, `verticalAlign`

### `system.space`

Margin and padding using the theme's spacing scale. Supports logical properties (switches based on `useLogicalProperties` in `<GamutProvider>`).

```tsx
const Box = styled.div(system.space);

// Single value
<Box p={8} m={16} />;

// Responsive array syntax: [mobile, tablet, desktop]
<Box my={[16, 24, 32]} px={[8, 16]} />;
```

Key props: `p`, `pt`, `pr`, `pb`, `pl`, `px`, `py`, `m`, `mt`, `mr`, `mb`, `ml`, `mx`, `my`

### `system.color`

Foreground, background, and border colors restricted to the theme's color palette.

```tsx
const Box = styled.div(system.color);

<Box bg="navy" textColor="gray-100" borderColor="blue" />;
```

Key props: `bg` (background-color shorthand), `textColor`, `borderColor`

### `system.typography`

Text styling connected to theme typography scales.

```tsx
const Text = styled.p(system.typography);

<Text
  fontSize={16}
  fontFamily="accent"
  textTransform="uppercase"
  lineHeight={1.5}
/>;
```

Key props: `fontFamily`, `fontSize`, `fontWeight`, `lineHeight`, `textAlign`, `textTransform`, `textDecoration`, `letterSpacing`, `whiteSpace`

### `system.border`

Border width, style, radius, and color.

Key props: `border`, `borderTop`, `borderRight`, `borderBottom`, `borderLeft`, `borderRadius`, `borderWidth`, `borderStyle`

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

Key props: `flex`, `flexDirection`, `flexWrap`, `flexGrow`, `flexShrink`, `flexBasis`, `alignItems`, `alignSelf`, `justifyContent`, `justifySelf`, `gap`, `rowGap`, `columnGap`

### `system.grid`

CSS Grid container and child properties.

Key props: `gridTemplateColumns`, `gridTemplateRows`, `gridTemplateAreas`, `gridColumn`, `gridRow`, `gridArea`, `gridAutoFlow`

### `system.positioning`

Position and offset properties.

```tsx
const Overlay = styled.div(variance.compose(system.layout, system.positioning));

<Overlay position="absolute" top={0} left={0} width="100%" height="100%" />;
```

Key props: `position`, `top`, `right`, `bottom`, `left`, `zIndex`

### `system.shadow`

Box and text shadow.

Key props: `boxShadow`, `textShadow`

## Responsive values

All system props accept an **array of values** for responsive breakpoints (Gamut uses a mobile-first approach):

```tsx
// [mobile, tablet, desktop]
<Box width={['100%', '50%', '33%']} p={[8, 16, 24]} />
```

## Using `css()` for styled definitions

For static styles in styled components, use `css()` from `@codecademy/gamut-styles`:

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
- Use `system.color` (semantic aliases) for colors that need to adapt to dark/light mode; use raw tokens only for colors that should stay fixed regardless of mode.
- Use `system.space` values that reference the spacing scale rather than arbitrary pixel values to maintain visual rhythm.
- For background images/patterns use `system.background`; for solid background colors that may switch mode use `<Background>` from ColorMode.
