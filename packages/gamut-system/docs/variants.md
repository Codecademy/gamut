# Variants

There may be cases where you want to change many props at the same time to achieve a different effect. Coordinating these different prop variations can be a bit frustrating to do manually, in both typescript and plain javascript. To make this easier we have
- `variant`, a function that is meant to make creating these combinations easy and scalable
- `HandlerProps`, a generic type that can be applied to styled components consuming a variant

```tsx
import styled from '@emotion/styled';
import { system, HandlerProps } from '@codecademy/gamut-system';

export const { variants } = system.create({});

const buttonVariants = variants({
  variants: {
    primary: {
      borderStyle: 'solid',
      borderWidth: '1px',
      color: 'white',
      borderColor: 'darkblue',
      backgroundColor: 'blue',
    },
    secondary: {
      borderStyle: 'solid',
      borderWidth: '1px',
      color: 'white',
      borderColor: 'darkgreen',
      backgroundColor: 'green',
    },
  },
});

export type ButtonProps = HandlerProps<typeof ButtonVariants>;

export const Button = styled.button<ButtonProps>`
  ${buttonVariants}
`;
```

Using your variants:

```tsx
  <Button variant="primary" />

  <Button variant="secondary" />
```

You can define a default variant to apply when no variant prop is passed.

```tsx
const colorVariant = variants({
  default: 'primary',
  variants: {
    primary: { color: 'blue' },
    secondary: { color: 'green' },
  },
});

const Text = styled.p`
  ${colorVariant}
`;

<Text />; // color: blue
```

There may be cases where you want to use a special prop for your variants instead of the default `variant`. You may pass an arbitrary name for your prop to customize the prop type.

```tsx
const colorVariant = variants({
  prop: 'colorVariant',
  variants: {
    primary: { color: 'blue' },
  },
});

export type TextProps = HandlerProps<typeof colorVariant>;

const Text = styled.p<TextProps>`
  ${colorVariant}
`;

<Text colorVariant="primary" />;
```

This also allows you to use multiple variants in the same component to have combinatorial styles.

```tsx
import { HandlerProps } from '@codecademy/gamut-system';

import { boxVariants, colorVariants } from './myVariants';

type CardProps = HandlerProps<typeof boxVariants> &
  HandlerProps<typeof colorVariants>;

const Card = styled.div<CardProps>`
  ${boxVariants}
  ${colorVariants}
`;

<Card variant="primary" colorVariant="primary" />;
```
