## Design System Compliance Review — `CardShells.tsx`

**File reviewed:** `/Users/kenny.lin/Documents/eng/codecademy-eng/gamut/packages/gamut/agent-tools/skills/gamut-review-workspace/iteration-1/eval-audit-styled-wrapper/fixture/CardShells.tsx`

```tsx
import { Box } from '@codecademy/gamut';
import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

export const CardShell = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 16px;
`;

export const GlowShell = styled(Box)(
  css({
    background: 'radial-gradient(circle, #3A10E5 0%, transparent 100%)',
    padding: 24,
  })
);
```

### Summary

Both exported components bypass Gamut's system-prop/token layer in ways the codebase never does elsewhere. `CardShell` writes 100%-expressible layout as a raw tagged-template CSS string instead of using `Box`/`FlexBox` system props at all, and `GlowShell` hardcodes a hex value that duplicates an existing brand color token, breaking theme/dark-mode responsiveness. Neither issue is caught by the repo's automated lint rules (`gamut/no-css-standalone`, `gamut/prefer-themed`), which target different patterns — but both are clear conventions violations by comparison with the rest of `packages/gamut/src`.

### 1. `CardShell`: raw tagged-template CSS where system props exist (High)

Every declaration here has a direct `Box`/`FlexBox` system-prop equivalent:

- `display: flex` + `flex-direction: column` → `FlexBox`'s built-in `column` state (`packages/gamut/src/Box/props.ts:35-52`, wired into `packages/gamut/src/Box/FlexBox.tsx:9`) already emits exactly `display:flex; flex-direction:column` as a single named prop.
- `padding: 16px` → `Box`'s `p` prop (`packages/gamut-styles/src/variance/config.ts:491`: `p: { property: 'padding', scale: 'spacing' }`), where scale key `16` resolves to `pxRem(16)` = `1rem` (`packages/gamut-styles/src/variables/spacing.ts`).

A repo-wide search for `styled(Box)`/`styled(FlexBox)` followed by a raw backtick template returns zero matches in `packages/gamut/src` or `packages/gamut-styles/src`. Every real `styled(Box)(...)`/`styled(FlexBox)(...)` call passes object-based `css()`/`variant()`/`states()` functions, never a tagged template string.

**Recommendation:** Drop `CardShell` and use `<FlexBox column p={16}>` directly at call sites.

### 2. `GlowShell`: hardcoded hex color duplicates an existing design token (High)

`#3A10E5` is the exact value of the `hyper`/`hyper-500` core color token (`packages/gamut-styles/src/variables/colors.ts`), used as a semantic color (`primary`, `primary-inverse`, `interface`) in both `themes/core.ts` and `themes/lxStudio.ts`. Hardcoding it instead of referencing the token breaks theming.

**Recommendation:**

```tsx
css(({ theme }) => ({
  background: `radial-gradient(circle, ${theme.colors.hyper} 0%, transparent 100%)`,
  padding: 24,
}));
```

### 3. `GlowShell`: padding baked into the wrapper despite being expressible as a prop (Medium)

The padding is prop-expressible but left inside the wrapper's own `css()` anyway, creating a latent precedence hazard if a consumer also passes `p`.

**Recommendation:** Keep only the gradient in the wrapper's `css()`; let padding be supplied by callers via the inherited `p` prop.

### 4. Minor/contextual — package self-import path

`import { Box } from '@codecademy/gamut';` — the repo's `gamut/import-paths` ESLint rule flags a file physically living inside `packages/gamut/**` that imports from the `@codecademy/gamut` package name instead of a relative path. Lower confidence since this file lives in a fixture/tooling subtree.

### Non-issues (verified compliant)

- `css()` composition style matches the standard pattern.
- `background` as a raw string (including a gradient function) is a legitimate use of the `background` system prop (no scale, intentional pass-through) — the problem is only the hardcoded color inside the string.
- Naming and exports are consistent with Gamut conventions.

### Priority ranking

1. `CardShell` raw CSS template instead of `FlexBox` `column` + `p` (High)
2. `GlowShell` hardcoded `#3A10E5` instead of `hyper` token (High)
3. `GlowShell` baking prop-expressible padding into the wrapper (Medium)
4. Self-import of `@codecademy/gamut` from within the `gamut` package tree (Low/contextual)
