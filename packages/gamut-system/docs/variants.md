# Variants

There may be cases where you want to change many props at the same time to achieve a different effect. Coordinating these different prop variations can be a bit frustrating to do manually, in both typescript and plain javascript. To make this easier we have `variant`, a function that is meant to make creating these combinations easy and scalable.

```tsx
import styled from '@emotion/styled';
import { system, HandlerProps } from '@codecademy/gamut-system';

export const { variants } = system();

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

There may be cases where you want to use a special key for your variants instead of the default `variant`. You may pass an arbitrary key for your prop to customize the prop type.

```tsx
const colorVariant = variants({
  key: 'colorVariant',
  variants: {
    primary: { color: 'blue' },
  },
});

const Text = styled.p`
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
