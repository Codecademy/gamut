# Getting Started

Variance is a styled-system inspired utility toolkit that focuses on making your design system typesafe.

Variance is built on top of emotion and relies on the global emotion `Theme` object to infer its typings.

```sh
yarn add @codecademy/variance @emotion/core @emotion/styled
```

There is not base configuration required to use variance:

```tsx
import styled from '@emotion/styled';
import { variance } from '@codecademy/variance';

export const Box = styled.div(
  variance.create({
    width: { property: 'width' },
    height: { property: 'height' },
  })
);
```

```tsx
<Box width={['100%', '50%']} height="100%" />
```
