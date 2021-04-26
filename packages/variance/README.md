# `@codecademy/variance`

This is an experimental package for creating dynamic and typesafe style props.

## Usage

Configure your props with a simple configuration object. The keys of your object become your prop names and their values describe their responsibilities and valid types.

```tsx
import styled from '@emotion/styled';
import { createProps } from '@codecademy/variance';

const Container = styled.div(
  createProps({
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
import { compose, createProps } from '@codecademy/variance';

const spacing = createProps({
  m: { property: 'padding', scale: 'margin' },
  p: { property: 'padding', scale: 'spacing' },
});

const dimensions = createProps({
  w: { property: 'width' },
  h: { property: 'height' },
});

const combinedProps = compose(spacing, dimensions);

const Box = styled.div(combinedProps);
```

## Static CSS

```tsx
import styled from '@emotion/styled';
import { createCss, createVariants } from '@codecademy/variance';

const css = createCss({
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

const variant = createVariants({
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
