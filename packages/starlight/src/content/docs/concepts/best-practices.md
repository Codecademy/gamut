---
title: Best practices
description: General design and engineering best practices that apply across components.
---

For best practices specific to one component — like alerts, errors, or confirmation dialogs — see that component's own page.

## Prefer semantic tokens over raw values

Access colors through Gamut's semantic aliases (`text`, `background`, `primary`, `secondary`) rather than raw color values — see [Color modes](/concepts/color-modes/) for why. Aliases guarantee you get the right color for the right theme and color mode, with the right types and states.

```tsx
import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

// A single value
const Box = styled.div(css({ p: 4 }));

// A semantic color, not a raw one
const OtherCoolThing = styled.div(css({ color: 'primary', p: 4 }));
```

`variant` and `states` extend the same idea to whole sets of styles — see [Compose and variants](/reference/system-props/compose-and-variants/) for the full API.

## Reach for system props first

[System props](/reference/system-props/) exist so writing custom, one-off styles is rarely necessary. They come with type-safe access to the right token scale for the context you're in, and a [responsive syntax](/reference/system-props/responsive-properties/) shared across every prop:

```tsx
import { Box } from '@codecademy/gamut';

const MyContainer = ({ children }) => (
  <Box px={[16, 32, 64, , 96]}>{children}</Box>
);
```

`eslint-plugin-gamut`'s [`no-inline-style`](/reference/eslint-rules/#gamutno-inline-style) and [`no-css-standalone`](/reference/eslint-rules/#gamutno-css-standalone) rules enforce this in CI — an inline `style` prop or a standalone stylesheet is almost always a sign a system prop or a `variant`/`states` call should have been used instead.

## Avoid nested selectors

Nested selectors — tag selectors like `div`/`p`/`span`, or component selectors like `${Box}` — can produce side effects that are hard to predict and even harder to keep consistent through later updates. Reach for system props, `gamut-styles` utility functions, or a layout component like `FlexBox`/`GridBox` instead:

```tsx
// Avoid
const App = styled.main`
  display: flex;
  ${Box} {
    align-self: start;
  }
`;

// Prefer
const App = ({ children }) => (
  <FlexBox as="main">
    <Box alignSelf="start">{children}</Box>
  </FlexBox>
);
```
