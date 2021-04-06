# `@codecademy/variance`

This is an experimental package for creating dynamic and typesafe style props.

## Usage

Configure your props with a simple configuration object. The keys of your object become your prop names and their values describe their responsibilities and valid types.

```tsx
import styled from '@emotion/styled';
import { variance } from '@codecademy/variance';

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
import { variance } from '@codecademy/variance';

const spacing = variance.create({
  m: { property: 'padding', scale: 'margin' },
  p: { property: 'padding', scale: 'spacing' },
});

const dimensions = variance.create({
  w: { property: 'width' },
  h: { property: 'height' },
});

const combinedProps = variance.compose(spacing, dimensions);

const Box = styled.div(combinedProps);
```

## Static CSS

```tsx
import styled from '@emotion/styled';
import { variance } from '@codecademy/variance';

const css = variance.createCss({
  m: { property: 'padding', scale: 'margin' },
  p: { property: 'padding', scale: 'spacing' },
});

const MyCoolThing = styled.div(
  css({
    width: '100%',
    height: '500px',
    p: [32, , 64],
  })
);

const variant = variance.createVariant({
  m: { property: 'padding', scale: 'margin' },
  p: { property: 'padding', scale: 'spacing' },
});

const MyCoolThing = styled.div(
  variant({
    base: { width: '100%' },
    variants: {
      big: {
        height: '500px',
        p: [32, , 64],
      },
      small: {
        height: '250px',
        p: [16, , 32],
      },
    },
  })
);
```
