# Design System Compliance Review: HeroSection.tsx

**File reviewed:** `packages/gamut/agent-tools/skills/gamut-review-workspace/iteration-1/eval-audit-hero-section/fixture/HeroSection.tsx`
**Sibling file:** `HeroSection.scss` (same directory)

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

## Summary

This component bypasses the Gamut design system almost entirely. It uses `Box` only as a generic `<div>`, then re-implements spacing and color with a standalone stylesheet and an inline `style` prop, and renders heading text with a bare `<h1>` instead of the `Text`/typography system. Two of the issues below (inline styles, standalone stylesheets) are enforced by this repo's own ESLint rules (`@codecademy/eslint-plugin-gamut`, `recommended` config, both set to `error`), so this file would fail lint as written.

## Findings

**1. Inline `style` prop — violates `gamut/no-inline-style` (error).** `packages/eslint-plugin-gamut/src/no-inline-style.ts` flags any JSX `style` attribute; it's `error` in the recommended config (`packages/eslint-plugin-gamut/src/recommended.ts`). `Box` already exposes a `color` system prop (`system.color`, resolving against the theme's `colors` scale — `packages/gamut/src/Box/props.ts`), so a raw inline style is unnecessary.

**2. Hardcoded hex color duplicates an existing token.** `#10162F` is the literal value of `navy`/`navy-800` in `packages/gamut-styles/src/variables/colors.ts`, which is also the `text` semantic token in light mode (`packages/gamut-styles/src/themes/core.ts`: `light.text._ = 'navy-800'`). Hardcoding it bypasses color-mode switching entirely — in dark mode `text` resolves to `white`, but this hardcoded literal stays navy, producing unreadable text on a dark background. Should be `<Box color="text">` instead.

**3. Standalone `.scss` file — violates `gamut/no-css-standalone` (error).** `packages/eslint-plugin-gamut/src/no-css-standalone.ts` flags any `.css`/`.scss` import, error level in recommended config, with message: "Do not create anymore stylesheets, please see Gamut's Storybook documentation for current best practices." Gamut's convention is to style via system/variance props or emotion `styled`/`css`, not hand-written stylesheets tied to a `className`.

**4. `padding: 32px` duplicates a system prop the component already supports.** `Box` composes `system.space` (`packages/gamut/src/Box/props.ts`); the `p` shorthand maps to the `spacing` scale, which defines `32: pxRem(32)` (`packages/gamut-styles/src/variables/spacing.ts`, `packages/gamut-styles/src/variance/config.ts`). This should be `<Box p={32}>`, not a parallel CSS class — as written the spacing value is disconnected from the token scale and duplicated via two mechanisms.

**5. Combining `className` + external SCSS with a themed Emotion component fights the styling model.** `Box` is an Emotion `styled` component; mixing in an untracked class makes cascade/specificity and theme-switching behavior unpredictable next to Box's generated styles — exactly what `no-css-standalone` is meant to prevent.

**6. Raw `<h1>` bypasses the typography system.** Gamut provides `Text` for this (`packages/gamut/src/Typography/Text.tsx` + `variants.ts`): `typographyElementVariants.h1` maps to `typographyStyleVariants['title-xxl']` (`fontSize: 64`, themed `fontWeight: 'title'`, themed `lineHeight: 'title'`). A bare `<h1>` gets none of Gamut's font family/weight/size/line-height tokens and won't respond to theme changes (platform vs. admin vs. Percipio font stacks). Should be `<Text as="h1" variant="title-xxl">...</Text>`.

**7. No color-mode/theme awareness anywhere in the component.** Because color is hardcoded and the heading uses no themed component, nothing in this markup will adapt to `light`/`dark` color modes or theme swaps (`platform`, `admin`, `percipio`, `lxStudio` in `packages/gamut-styles/src/themes/`).

## Suggested Rewrite

```tsx
import { Box, Text } from '@codecademy/gamut';

export const HeroSection = () => (
  <Box p={32} color="text">
    <Text as="h1" variant="title-xxl">
      Welcome to the platform
    </Text>
  </Box>
);
```

This removes the `.scss` file and inline style entirely, expresses spacing/color as theme-scale props, and renders the heading through the typography variant system — resolving all findings above and passing `no-inline-style`/`no-css-standalone` lint.

## Rule/Source References

- `packages/eslint-plugin-gamut/src/no-inline-style.ts`, `no-css-standalone.ts`, `recommended.ts`
- `packages/gamut/src/Box/props.ts` (composes `system.space`, `system.color`, ...)
- `packages/gamut-styles/src/variance/config.ts` (`p` → `spacing` scale; `color` → `colors` scale)
- `packages/gamut-styles/src/variables/spacing.ts`, `colors.ts`
- `packages/gamut-styles/src/themes/core.ts` (color-mode token resolution: `text` → `navy-800` = `#10162F` in light mode)
- `packages/gamut/src/Typography/Text.tsx`, `packages/gamut/src/Typography/variants.ts` (`title-xxl` for `h1`)
