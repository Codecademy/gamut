# Variants

Using the variant API to group and share specific configurations.

```tsx
import styled from '@emotion/styled';
import { system, HandlerProps } from '@codecademy/gamut-system';

export const { createVariant } = system();

const buttonVariants = createVariant({
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
});

export type ButtonProps = HandlerProps<typeof ButtonVariants>;

export const Button = styled.button<ButtonProps>`
  ${buttonVariants}
`;
```
