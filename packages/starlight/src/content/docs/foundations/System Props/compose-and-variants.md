---
title: Compose and variants
description: Combining system props into one function, and building variant- or state-driven styles.
---

## Compose

Combine several system prop functions into one with `variance.compose` — it merges them left to right (the last argument wins on conflicts) into a single function.

```tsx
import { system } from '@codecademy/gamut-styles';
import { variance } from '@codecademy/variance';
import styled from '@emotion/styled';

const Grid = styled.div(variance.compose(system.layout, system.grid));

<Grid width="100%" gridTemplateColumns="1fr 1fr" />;
```

Composing has two real advantages over passing multiple functions to `styled` directly:

- **Predictable CSS** — Emotion doesn't merge styles from separate functions, so uncomposed props can emit unordered, overlapping media queries, or lose to property ordering (`border` set after `borderColor` always wins, for example). Composed functions combine into one ordered set of styles instead.
- **Simpler types** — Emotion can't infer the combined prop types of two separate functions passed to `styled`, so you'd otherwise have to write that intersection type by hand. `variance.compose` infers it for you.

## Variant

`variant` builds on `css` — a lower-level, theme-aware function that turns a system-prop object into styles — to let a component switch between mutually exclusive styles via a single prop:

```tsx
import { variant } from '@codecademy/gamut-styles';

const Anchor = styled.a(
  variant({
    defaultVariant: 'interface',
    variants: {
      interface: { color: 'text' },
      inline: { color: 'primary' },
    },
  })
);
```

## States

`states` is `variant`'s counterpart for non-mutually-exclusive styles — each key is its own boolean prop, and any combination can be active together:

```tsx
import { states } from '@codecademy/gamut-styles';

const FlexBox = styled.div(
  states({
    fit: { width: 1, height: 1 },
    center: { alignItems: 'center', justifyContent: 'center' },
  })
);

<FlexBox fit center />;
```

## Beyond system props

Both `variant` and `states` also accept any valid CSS property (typed to its normal CSS value, without responsive syntax) and nested selectors, so a variant can style a pseudo-class or include a property with no system-prop equivalent:

```tsx
const Anchor = styled.a(
  variant({
    variants: {
      interface: {
        color: 'navy',
        '&:hover': { textDecoration: 'none', border: '2px solid currentColor' },
      },
    },
  })
);
```

Don't mix a system prop and its underlying raw CSS property in the same call — for example, `mx` and `margin` together. Property ordering between them isn't guaranteed, so pick one.
