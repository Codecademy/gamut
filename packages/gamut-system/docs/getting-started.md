# Getting Started

Gamut system is a styled-system inspired utility toolkit that focuses on making your design system typesafe.

To use gamut-system, install gamut-system and your CSS in JS library of choice:

```sh
yarn add @codecademy/gamut-system @emotion/core @emotion/styled
```

## Initialize your system

The first thing you need to use `gamut-system` is to initialize your utility functions.  Start by importing `system` from the package and passing it an empty configuration.  By default this will return [CSSType](https://github.com/frenic/csstype) types per each css property that is handled (see the full list of properties [here](./properties.md)).  Initializing the system will provide the base types and return an object of 10 top level style functions (one for each of the property groups), a map of each individual properties style function, and a special [`variant` function](./variants.md).

```tsx
import { system } from '@codecademy/gamut-system';

export const {
  typography,
  layout,
  spacing,
  border
  background
  color,
  flexbox,
  grid,
  properties,
  variants
} = system({});
```

## Using in a component

Now that you've created your style functions you can import and use them in your CSS in JS components. For example lets imagine a fictional `<Container />` component that we want to use as a simple wrapper for other components.  We pick out [layout](./properties.md#layout) and [spacing](./properties.md#spacing) as the two property groupings it should be able to configure and add their functions to the body of the template string.

```tsx
import styled from '@emotion/styled';
import { HandlerProps } from '@codecademy/gamut-system';
import { layout, spacing } from './system';

type ContainerProps = HandlerProps<typeof layout> & HandlerProps<typeof spacing>;

export const Container = styled.div<ContainerProps>`
  ${spacing}
  ${layout}
`;
```

Now you can use both `spacing` and `layout` props on your `<Container />`.

```tsx
<Container padding="1rem" display="inline-block" />
```

## Component extension

Now that we have a box component we might want to make a few variations of this that have some extra features. Like [flex](./properties.md#flex) props.  To achieve this we can decorate our original container with more style functions to add new capabilities to the resulting `<FlexContainer />` component.

```tsx
import styled from '@emotion/styled';
import { HandlerProps } from '@codecademy/gamut-system';
import { flex } from './system';

import { Container } from './Container'

type FlexContainerProps = HandlerProps<typeof flex>;

// Decorate our conainer with our additional style functions
export const FlexContainer = styled(Container)<FlexContainerProps>(flex);

// Always use flex by default.
FlexContainer.defaultProps = {
  display: 'flex',
}
```

Now your have a specific component for flex, but with all of the props that are provided on `<Container />`

```tsx
<FlexContainer padding="1rem" order={2} flexDirection="row">
  <div>I feel contained</div>
</FlexContainer>
```
