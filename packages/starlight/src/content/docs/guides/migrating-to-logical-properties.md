---
title: Migrating to logical properties
description: Move from physical to logical CSS properties in an existing app.
---

## Physical vs. logical properties

Physical properties reference the physical dimensions of the viewport — `margin-left`, `margin-right`, `padding-top`, `padding-bottom`, and the like. They work fine for left-to-right languages, but need manual overrides for right-to-left languages like Arabic or Hebrew.

Logical properties reference the flow of content instead:

- **Inline axis** (text direction) — `margin-inline-start`, `margin-inline-end`
- **Block axis** (reading direction) — `margin-block-start`, `margin-block-end`

See [MDN: CSS logical properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values) for the full model.

## Turning it on

Gamut supports both modes through the `useLogicalProperties` prop on `GamutProvider`. It defaults to `false`, so system props map to physical CSS (`margin-left`, `width`, and so on). Set it to `true` to map the same props to logical CSS instead (`margin-inline-start`, `inline-size`, and so on):

```tsx
<GamutProvider useLogicalProperties>
  <App />
</GamutProvider>
```

This affects both base properties (`marginLeft`, `width`) and shorthand props (`mx`, `py`) — a few examples, not the full list:

| Prop         | Physical CSS                     | Logical CSS                                 |
| ------------ | -------------------------------- | ------------------------------------------- |
| `marginLeft` | `margin-left`                    | `margin-inline-start`                       |
| `mx`         | `margin-left` / `margin-right`   | `margin-inline-start` / `margin-inline-end` |
| `paddingTop` | `padding-top`                    | `padding-block-start`                       |
| `py`         | `padding-top` / `padding-bottom` | `padding-block-start` / `padding-block-end` |
| `width`      | `width`                          | `inline-size`                               |
| `height`     | `height`                         | `block-size`                                |

:::note
Props that set all four sides at once, like `m` and `p`, aren't affected by this setting — the CSS `margin`/`padding` shorthands work identically in both modes.
:::

## Previewing before you migrate

Toggle Storybook's **LogicalProps** toolbar button to preview logical CSS output without changing any application code. Storybook matches `GamutProvider`'s default (physical) until you turn it on.

## Reading the flag in custom components

If a custom component needs conditional styles or layout logic that has to mirror Gamut's physical-vs-logical output, read the same flag Gamut's own styled components use:

```ts
import { useLogicalProperties } from '@codecademy/gamut-styles';
```

This returns `theme.useLogicalProperties`, which `GamutProvider` merges into the theme object. If you mount a plain `ThemeProvider` without `GamutProvider`, the hook may return `undefined` unless you set that field on your theme yourself.

## Reading text direction

`useElementDir` resolves the effective text direction (`'rtl'` or `'ltr'`) for a DOM subtree:

```ts
import { useElementDir } from '@codecademy/gamut-styles';
```

Pass a ref to the element whose direction matters; if you omit it, the hook falls back to `document.documentElement`. It resolves direction from the element's `dir` attribute, then its computed `direction`, then the root element's `dir` — the last fallback helps in test environments where computed style can come back empty. The returned value updates automatically when `dir` changes anywhere under the document root. During SSR, or when `document` isn't available, it returns `'ltr'`.

For non-React code, the same resolution logic is available as the imperative `elementDir(el)` export.
