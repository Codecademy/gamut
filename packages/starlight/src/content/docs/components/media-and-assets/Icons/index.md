---
title: Icons
description: Gamut's icon set, at two sizes.
sidebar:
  label: Overview
---

- [Mini](/components/media-and-assets/icons/mini/) — 36 icons at a 16×16 scale, for buttons and inline text.
- [Regular](/components/media-and-assets/icons/regular/) — 335 icons at a 24×24 scale, categorized into Interface, Learning environment, Vendor, and Skills.

Both sets share one import path and one accessibility contract:

```tsx
import { AlertIcon, MiniStarIcon } from '@codecademy/gamut-icons';
```

Every icon is either `aria-hidden` (the default, since an icon is usually paired with visible text that already conveys its meaning) or explicitly `aria-hidden={false}` with a required `aria-label` — Gamut's types enforce one or the other, never neither.
