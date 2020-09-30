# Gamut System

Style props for building robustly typed design systems in react.

## Features

- Completely customizable style props (with theme agnostic implementation);
- Flexible props that are both responsive and composable.
- Strict design system aware types with no manual fuss.
- Works with `emotion` and `styled-components` in preferred syntax.

## Usage

Create your new system locally to your app.

`src/system`

````tsx
import { system } from '@codecademy/gamut-system';

export const {
  propGroups: { typography, spacing, layout },
  createVarant,
} = system();

export type TypographyProps = HandlerProps<typeof typography>;
export type SpacingProps = HandlerProps<typeof spacing>;
export type LayoutProps = HandlerProps<typeof layout>;
```

Using basic props / prop groups:

```tsx
import styled from '@emotion/styled';
import { typography, spacing, layout, TypographyProps, SpacingProps, LayoutProps } from '../system';


export type BoxProps = TypographyProps & SpacingProps & LayoutProps

export const Box = styled<BoxProps>`
  ${typography}
  ${spacing}
  ${layout}
`;
```

### Regular Props
```tsx
<Box margin="1rem" />

<Box fontSize="2rem" />

<Box width={1 / 5} />
```

### Responsive Props
```tsx
// Array Syntax
<Box width={[50, 100, 200]} />

// Object syntax
<Box margin={{ xs: 16, sm: 24, md: 32 }} />
```

Using the variant API to group and share specific configurations.

```tsx
import styled from '@emotion/styled';
import { HandlerProps } from '@codecademy/gamut-system';
import { createVariant } from '../system';

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
````
