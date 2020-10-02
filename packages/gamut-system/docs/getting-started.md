# Getting Started

Gamut system is a styled-system inpsired utility toolkit that focuses on making your design system
typesafe.

To use gamut-system, install gamut-system and your CSS in JS library of choice:

```sh
yarn add @codecademy/gamut-system @emotion/core @emotion/styled
```

## Initialize your system

The first thing you need to use `gamut-system` is to initialize your utility functions. This is necessary to generate
the correct types for your properties.

```tsx
import { system } from '@codecademy/gamut-system';

export const {
  propertyGroups: {
    typography,
    layout,
    spacing,
    border
    background
    color,
    flexbox,
    grid,
  },
  variants
} = system();
```

## Create a component

Use your style props in your components:

```tsx
import styled from '@emotion/styled';
import { HandlerProps } from '@codecademy/gamut-system';
import { layout, spacing } from './system';

type BoxProps = HandlerProps<typeof layout> & HandlerProps<typeof spacing>;

export const Box = styled.div<BoxProps>`
  ${spacing}
  ${layout}
`;
```

Now you can use both `spacing` and `layout` props on your `<Box/>` with all of the typesafety that entails.

```tsx
<Box padding="1rem" display="flex" />
```
