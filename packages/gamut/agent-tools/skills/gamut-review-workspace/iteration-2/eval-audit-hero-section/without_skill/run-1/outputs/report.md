# Design System Compliance Review: HeroSection.tsx

**File reviewed:** `HeroSection.tsx` (+ sibling `HeroSection.scss`)

```tsx
import { Box } from '@codecademy/gamut';

import './HeroSection.scss';

export const HeroSection = () => (
  <Box className="hero-wrapper" style={{ color: '#10162F' }}>
    <h1>Welcome to the platform</h1>
  </Box>
);
```

```scss
.hero-wrapper {
  padding: 32px;
}
```

This is a small file, but it violates several core conventions of the Gamut design system. Findings are ordered by severity.

## 1. Hardcoded hex color duplicates an existing design token (High)

`style={{ color: '#10162F' }}` sets text color via an inline style with a raw hex value. `#10162F` is not arbitrary — it is exactly `navy-800` in `@codecademy/gamut-styles`'s core color palette (`coreSwatches.navy['800']` in `packages/gamut-styles/src/variables/colors.ts`), and in the light color mode that value is precisely what the semantic `text` token resolves to (`text._: 'navy-800'` in `packages/gamut-styles/src/themes/core.ts`).

This should be expressed as a Gamut color prop, e.g. `<Box color="text">` (or simply omitted, since `text` is the default). Two compounding problems:

- **Inline `style` bypasses the theme entirely.** Color props (`color`, `bg`, `textColor`, `borderColor`) resolve through the active color mode. A hardcoded hex string won't respond to dark mode — `text._` resolves to `white` in dark mode, so this hero heading would render near-black text even in a dark context, a real contrast/legibility bug.
- **`style` fights `Box`'s own API.** `Box` already exposes typed, token-backed `color`/`textColor` props (`packages/gamut-styles/src/variance/config.ts`, `color` prop group, `scale: 'colors'`). Real usages throughout `packages/gamut/src/**` (e.g. `Card/index.tsx`, `Form/SelectDropdown/elements/*`, `Disclosure/DisclosureButton/index.tsx`) consistently use `color="text"`, `color="text-secondary"`, `color="text-disabled"` — never the native `style` attribute.

## 2. Raw `<h1>` bypasses the Gamut typography scale (High)

The heading is a bare `<h1>Welcome to the platform</h1>` with no Gamut typography applied. Gamut ships a `Text` component (`packages/gamut/src/Typography/Text.tsx`) for exactly this: `as="h1"` maps through `typographyElementVariants` (`packages/gamut/src/Typography/variants.ts`) to the `title-xxl` variant (`fontSize: 64`, token-based `fontWeight: 'title'`, `lineHeight: 'title'`).

By rendering a plain `<h1>`, the component gets whatever the browser/UA (or an unrelated global stylesheet) applies to `h1` — not the design system's title scale, font weight, line-height, or font-family tokens — and won't participate in any type-scale consistency the rest of the app relies on. This should be `<Text as="h1">Welcome to the platform</Text>` (imported from `@codecademy/gamut`).

## 3. Spacing hardcoded as a raw px value instead of the token-based `p` prop (Medium)

`padding: 32px;` in `HeroSection.scss` hardcodes a pixel value. Gamut's spacing scale (`packages/gamut-styles/src/variables/spacing.ts`) already defines `32` as a named scale step (`32: pxRem(32)` → `2rem`), and `Box` already exposes a token-backed `p` prop (`property: 'padding', scale: 'spacing'` in `packages/gamut-styles/src/variance/config.ts`) that consumes exactly that scale.

The hardcoded `32px` happens to match a real spacing token value, which underscores the point: this should be authored as `<Box p={32}>`, not a magic number in a separate stylesheet. As written, if the spacing scale is ever adjusted, this component's spacing silently drifts out of sync with the rest of the system since it isn't wired to any token.

## 4. Mixing a plain global-scope SCSS file with a Gamut styled component (Medium)

The component imports a plain `.scss` file and applies styling via a bare, unscoped class name (`className="hero-wrapper"`) on a `Box`. This is not how Gamut-based UI is built:

- Across the entire `packages/gamut/src` tree there is exactly one `.scss` file in the whole package, and it exists only to theme a third-party vendor widget (`Video/styles/vds_base_theme.scss`) — an exception for code Gamut doesn't own, not a pattern to imitate for first-party components.
- `Box` is `styled('div', ...)` on Emotion + the `variance` prop system specifically so layout/spacing/color are expressed as typed, token-constrained props (`system.space`, `system.color`, `system.layout`, etc. — `packages/gamut/src/Box/props.ts`). Reaching past that API to a global class name + separate stylesheet loses type safety, loses theme/token resolution, and risks a class-name collision in the consuming app's global CSS scope (nothing about `.hero-wrapper` is namespaced or scoped).
- It also duplicates responsibility for the same concern (spacing) across two different mechanisms — prop-driven styling everywhere else, hand-written global CSS here — which is exactly the inconsistency a token/prop-based system is meant to prevent.

**Recommendation:** delete `HeroSection.scss` and express `padding: 32px` as `p={32}` on `Box`.

## 5. Net effect

Taken together, none of this component's visual styling (color, spacing) is actually theme-aware — it's all applied through mechanisms that sit outside Gamut's theming system (inline `style`, a global SCSS class, a magic-number px value) despite being built on `Box`, which exists precisely to make that unnecessary.

### Suggested rewrite

```tsx
import { Box, Text } from '@codecademy/gamut';

export const HeroSection = () => (
  <Box p={32}>
    <Text as="h1">Welcome to the platform</Text>
  </Box>
);
```

This drops the SCSS file and inline `style` entirely, uses the `32` spacing token via `p`, lets the default `text` color drive text color so it responds correctly to color-mode changes, and renders the heading through the `title-xxl` typography variant instead of an unstyled native `<h1>`.
