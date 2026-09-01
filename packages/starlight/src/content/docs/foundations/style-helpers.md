---
title: Style helpers
description: Gamut's helper functions for style utilities — unit conversion, shadows, font smoothing, and more.
---

## Converting units

### Pixels to rem

Gamut prefers `rem` units for most sizing, but a specific rem value isn't always expressive — `1.875rem` for what's really "30px." Use `pxRem` to convert a pixel value (or plain number) to its `rem` equivalent:

```tsx
import { pxRem } from '@codecademy/gamut-styles';

pxRem(16); // => '1rem'
pxRem('30px'); // => '1.875rem'
```

## Style helpers

### Box shadow

Five depths of box shadow are available, each returning a CSS shadow value:

```tsx
import { boxShadow } from '@codecademy/gamut-styles';

const Example = `
  ${boxShadow(3)}
`;
```

### Font smoothing

Enable font smoothing to make typography more readable:

```tsx
import { fontSmoothing } from '@codecademy/gamut-styles';

// As a template literal partial
const Smooth = `
  ${fontSmoothing}
`;

// With an explicit value
const Smooth = `
  ${fontSmoothing({ fontSmoothing: 'subpixel' })}
`;
```

### No selection

Prevent a reader from selecting an image or block of text:

```tsx
import { noSelect } from '@codecademy/gamut-styles';

const Unselectable = styled.div`
  ${noSelect}
`;
```

### Screen reader only

Hide content visually while keeping it available to screen readers — `screenReaderOnly` keeps it out of the tab order entirely, `screenReaderOnlyFocusable` lets it receive focus:

```tsx
import {
  screenReaderOnly,
  screenReaderOnlyFocusable,
} from '@codecademy/gamut-styles';

const HiddenLabel = `
  ${screenReaderOnly}
`;

const HiddenLabelWithFocus = `
  ${screenReaderOnlyFocusable}
`;
```
