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

### Props

```tsx
// Regular
<Box margin="1rem" />

<Box fontSize="2rem" />

<Box width={1 / 5} />

// Responsive
<Box width={[50, 100, 200]} />

<Box margin={{ xs: 16, sm: 24, md: 32 }} />
```


## Docs

- [Getting Started](docs/src/docs/getting-started.mdx)
- [Properties](docs/src/docs/properties.mdx)
- [Responsive Properties](docs/src/docs/responsive.mdx)
- [Variants](docs/src/docs/variants.mdx)
- [Customization](docs/src/docs/customization.mdx)
- [Compose](docs/src/docs/compose.mdx)
