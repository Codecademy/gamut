# Design System Compliance Review

**File reviewed:** `/Users/kenny.lin/Documents/eng/codecademy-eng/gamut/packages/gamut/agent-tools/skills/gamut-review-workspace/iteration-1/eval-audit-styled-wrapper/fixture/CardShells.tsx`

## Summary

Both exported components reimplement in raw CSS what `Box`/`FlexBox` already expose as first-class, theme-aware system props, and in doing so silently drop out of the token system (spacing scale/rem units, color tokens, dark-mode color-mode switching). The file's own comments concede this ("every property here has a direct system-prop equivalent") but neither component acts on it.

## Findings

**1. `CardShell` reinvents `FlexBox` instead of using it** (lines 7-11)

```tsx
export const CardShell = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 16px;
`;
```

`packages/gamut/src/Box/FlexBox.tsx` already defaults to `display: flex` and exposes a `column` state (`flexDirection: 'column'`, defined via `flexStates` in `packages/gamut/src/Box/props.ts`). The idiomatic version of this entire file is `<FlexBox column p={16} />` — no wrapper needed. Hand-rolling this on top of `Box` with a plain Emotion tagged template:

- Loses the responsive array/object syntax all system props get for free through `variance`'s parser (e.g. `p={[8, 16, 24]}`).
- Creates a prop-shadowing hazard: because `CardShell` has no narrowed prop type, it still accepts `Box`'s own `p`/`display`/`flexDirection` props, but those will conflict with the hardcoded template CSS in ways that depend on Emotion's style-injection order — a real footgun for a consumer who expects `<CardShell p={32}>` to just work.

**2. `padding: 16px` bypasses the spacing scale (and rem conversion)**
`packages/gamut-styles/src/variables/spacing.ts` defines discrete steps (`16: pxRem(16)`, `24: pxRem(24)`, …), where `pxRem` (`packages/gamut-styles/src/styles/pxRem.ts`) converts px to `rem` so spacing scales with root font size. `Box`'s `p` prop already routes through this. `CardShell`'s `padding: 16px` (and `GlowShell`'s `padding: 24`, see #3) hardcode literal pixel values that happen to match scale steps 16 and 24 exactly — but never pass through `pxRem`, silently opting out of the rem-based spacing convention.

**3. `GlowShell`'s `css({ padding: 24 })` doesn't actually use the spacing scale — an easy-to-miss trap** (lines 15-20)
`css()` is `variance.createCss` (`packages/variance/src/core.ts`), which only scale-resolves keys that are registered shorthand props — `p`, `px`, `py`, `pt`, `pb`, `pr`, `pl` (see `PROPERTIES.padding` in `packages/gamut-styles/src/variance/config.ts`). The raw property name `padding` is not registered, so `createCss`'s static-CSS passthrough (`getStaticCss`) emits it untouched as `padding: 24px`. This _looks_ like it's going through the design system because it's wrapped in `css()`, but it isn't — `css({ padding: 24 })` behaves identically to a plain object literal here. The fix is `css({ p: 24, ... })`.

**4. Hardcoded hex duplicates an existing token and will not respond to dark mode**

```tsx
background: 'radial-gradient(circle, #3A10E5 0%, transparent 100%)',
```

`#3A10E5` is exactly `coreSwatches.hyper['500']` in `packages/gamut-styles/src/variables/colors.ts`, and per `packages/gamut-styles/src/themes/core.ts`, light mode's `primary._`/`interface._` resolve to `hyper-500`. Two consequences:

- **Token drift risk** — if the `hyper` swatch is retuned, this glow silently goes out of sync with every other "primary"-colored element.
- **Breaks dark mode** — Gamut's theme builder (`packages/variance/src/createTheme/createTheme.ts`) compiles colors to CSS custom properties and implements color-mode switching by swapping which token a semantic alias resolves to at the CSS-variable layer. In dark mode, `primary._`/`interface._` resolve to `yellow-500`, not `hyper-500` (see `themes/core.ts`). A literal hex string can never participate in that swap, so this glow stays purple in dark mode while the rest of the UI's accent switches to yellow — a real visual-consistency regression for any consumer using Gamut's color modes.
- Note that the `background` system prop itself wouldn't fully solve this either — its config entry has no `scale`, so a token name wouldn't auto-resolve inside a gradient string. The correct pattern (used elsewhere in this repo, e.g. `packages/gamut/src/Toggle/elements.tsx`'s `` outline: `3px solid ${theme.colors.primary}` ``) is to import `theme` from `@codecademy/gamut-styles` and interpolate `theme.colors.primary` (or the specific token) into the string, preserving the CSS-variable reference.

**5. The file's own comments concede the gap** — lines 5-6 and 13-14 state the properties/padding are prop-expressible, yet none of them use that path. This looks like the deliberate crux the fixture is testing.

**What's not a problem:** exporting a `styled(Box)(css({...}))` result directly as a plain component (no `forwardRef`/narrowed props) matches real internal usage (e.g. `Circle` in `Toggle/elements.tsx`, `CollapsibleContent`/`CleanFillButton` in `Alert/elements.tsx`) — that shape is idiomatic; the issue is specifically the property names/values chosen, not the composition mechanism.

**Suggested fix:**

```tsx
import { FlexBox } from '@codecademy/gamut';
import { css, theme } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

export const CardShell = styled(FlexBox)``; // or just use <FlexBox column p={16} /> directly

export const GlowShell = styled(Box)(
  css({
    background: `radial-gradient(circle, ${theme.colors.primary} 0%, transparent 100%)`,
    p: 24,
  })
);
```
