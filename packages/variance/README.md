# `@codecademy/variance`

This is an experimental package for creating dynamic and typesafe style props.

## Usage

Configure your props with a simple configuration object. The keys of your object become your prop names and their values describe their responsibilities and valid types.

```tsx
import { Theme } from '@emotion/react';
import { styled }  from '@codecademy/gamut-styles';
import { variance } from '@codecademy/variance';

const varianceProps = variance.withTheme<Theme>();

const Container = styled.div(
  variance.create({
    w: { property: 'width' },
    p: { property: 'padding', scale: 'spacing' },
  })
);

<Container w="100%" p={[16, 24]}>
  Contained!
</Container>;
```

## Composition

You can compose props that you've created seperately to create new prop functions.

```tsx
import { varianceProps } from './variance';

const spacing = varianceProps.create({
  m: { property: 'padding', scale: 'margin' },
  p: { property: 'padding', scale: 'spacing' },
});

const dimensions = varianceProps.create({
  w: { property: 'width' },
  h: { property: 'height' },
});

// Uses just spacing
const Spacer = styled.div(spacing);

// Uses both props
const Box = styled.div(varianceProps.compose(spacing, dimensions));
```
