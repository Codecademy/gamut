---
title: Theming your app
description: Choose and wire up a Gamut theme for your application.
---

Every Emotion component in Gamut has typed access to the current theme's tokens, without any extra imports — most directly through the `theme` prop every styled component receives, or through the `theme` object imported straight from `@codecademy/gamut-styles`.

## 1. Choose a theme

See [Themes](/foundations/themes/) for the available palettes (Core, Admin, LX Studio, Percipio, Platform) and what each one is for. Use Storybook's Theme Switcher (paintbrush icon in the toolbar) to preview your components across every theme before committing to one, paired with the Color Mode selector to check both light and dark variants.

## 2. Wire up the theme

`GamutProvider` (covered in [Installation](/getting-started/installation/)) already puts the right theme's values on Emotion's context for you. From there, reach a token in one of three ways:

```tsx
import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

// Preferred: through a system prop
const Box = styled.div(css({ bg: 'navy-400', p: 4 }));

// Preferred: through a ColorMode semantic alias
const OtherCoolThing = styled.div(css({ color: 'primary', p: 4 }));
```

```tsx
// Directly off the theme prop, when you're not using system props
import styled from '@emotion/styled';

const styles = styled.div`
  color: ${({ theme }) => theme.colors.blue};
`;
```

```tsx
// Or imported directly, outside a styled component
import { css } from '@emotion/react';
import { theme } from '@codecademy/gamut-styles';

const myStyles = css`
  font-size: ${theme.fontSize[14]};
`;
```

Prefer the first form — a [system prop](/foundations/system-props/) — whenever one exists for what you're styling; it's type-checked against the active theme's scales, so a typo or an out-of-range value is a compile error instead of a silent fallback.

## 3. Check your work across themes

Re-open the Theme Switcher and step through every theme your app might run under, in both color modes. A component built entirely from semantic aliases and system props should need no extra work to look right everywhere; if something looks off in one theme, that's usually a sign a raw value snuck in somewhere it should have been a token.

See [Design tokens](/foundations/design-tokens/) for the full list of token categories, and [Color modes](/concepts/color-modes/) for how color mode composes with theme choice.
