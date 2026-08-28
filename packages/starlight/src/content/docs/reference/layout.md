---
title: Layout
description: Target screen sizes, the grid system, and spacing scale for page layout.
---

## Screen sizes

Six target viewports drive Gamut's design work. These aren't the same as the `breakpoints` token — see [Responsive properties](/reference/system-props/responsive-properties/) — they're the actual sizes designs are built for; breakpoints are the implementation detail that gets you there.

| Alias | Dimensions | Max content width | Fold height |
| ----- | ---------- | ----------------- | ----------- |
| XL    | 1440×900   | 1248px            | 680px       |
| LG    | 1200×900   | 1072px            | 680px       |
| MD    | 1024×768   | 896px             | 680px       |
| SM    | 768×1024   | 704px             | 680px       |
| XS    | 480×900    | 448px             | 440px       |
| Base  | 320×480    | 288px             | 440px       |

## Grid

Gamut uses a 12-column grid, so every layout divides cleanly into sections of 2 or 3. Set a minimum column span per breakpoint with `size` on a `Column`:

```tsx
// Object syntax
<Column size={{ _: 6, xs: 4 }}>Content</Column>

// Array syntax
<Column size={[6, 4]} />
```

The example above spans 6 columns at the smallest screen size, and 4 columns from the next breakpoint up.

**Best practices:**

- Start most design work at 1440px width, using the XL column grid.
- Adjust every design for each viewport's own screen height (the "fold"), not just its width.
- On wider layouts, rearrange content to use the extra space well — don't just stretch existing elements to fill it.
- An element without an explicit lockup (like a catalog card) doesn't need to fill a whole column width; aligning to a gridline on one axis, usually the left, is often enough.

## Spacing

Layout spacing is a practical subset of the full `spacing` scale — see [Design tokens](/reference/design-tokens/) for the complete scale.

| Use                   | Sizes (px)     |
| --------------------- | -------------- |
| Horizontal spacing    | 64, 48, 32, 16 |
| Column gaps (gutters) | 32, 24, 16, 8  |
| Row gaps              | 32, 24, 16, 8  |

**Best practices:**

- The smallest unit of space for block elements is 8px.
- Place type with more precision — headlines, or text relative to other lines of type — on the 4px baseline grid instead.
- Default margins and padding are 16px; use other multiples of 8px for anything else.
- Use extra spacing intentionally, to group or separate elements and establish rhythm — keep objects aligned both vertically and horizontally wherever possible.
