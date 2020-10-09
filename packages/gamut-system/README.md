# Gamut System

Style props for building robustly typed design systems in react.

## Features

- Completely customizable style props (with theme agnostic implementation);
- Flexible props that are both responsive and composable.
- Strict design system aware types with no manual fuss.
- Works with `emotion` and `styled-components` in preferred syntax.

## Usage

Create your new system locally to your app:

```tsx
import { system, HandlerProps } from '@codecademy/gamut-system';

export const {
  propGroups: { typography, spacing, layout },
} = system({});

export type TypographyProps = HandlerProps<typeof typography>;
export type SpacingProps = HandlerProps<typeof spacing>;
export type LayoutProps = HandlerProps<typeof layout>;
```

In your components:

```tsx
import styled from '@emotion/styled';
import {
  typography,
  spacing,
  layout,
  TypographyProps,
  SpacingProps,
  LayoutProps,
} from '../system';

export type BoxProps = TypographyProps & SpacingProps & LayoutProps;

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

## Docs

- [Getting Started](docs/getting-started.md)
- [Properties](docs/properties.md)
- [Responsive Properties](docs/responsive.md)
- [Variants](docs/variants.md)
- [Customization](docs/customization.md)
- [Compose](docs/compose.md)
