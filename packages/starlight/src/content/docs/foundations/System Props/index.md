---
title: System props
description: The full list of system prop groups and the CSS properties each one covers.
sidebar:
  label: Overview
---

Gamut ships a set of style functions, out of the box, through `@codecademy/gamut-styles`, standardized across every component. These props are strongly typed, and can be added to any styled component.

Every system prop:

- Can represent more than one CSS property at once.
- May be restricted to a specific token scale, but always keeps access to global CSS values like `initial` and `none`.
- May transform the value you pass it into a standardized one — for example, `width={0.5}` becomes `width: 50%`.

```tsx
import { variance } from '@codecademy/variance';
import { system } from '@codecademy/gamut-styles';

const ExampleContainer = styled.div(
  variance.compose(system.layout, system.positioning)
);

<ExampleContainer position="absolute" width="50px" height="50px" />;
```

- [Prop groups](/foundations/system-props/prop-groups/) — what each group (`layout`, `space`, `typography`, and the rest) covers.
- [Compose and variants](/foundations/system-props/compose-and-variants/) — combining system props into one function, and building variant- or state-driven styles.
- [Responsive properties](/foundations/system-props/responsive-properties/) — the array/object syntax for breakpoint- and container-query-driven values.
