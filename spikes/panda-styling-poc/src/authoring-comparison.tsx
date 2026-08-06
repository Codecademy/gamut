/* API-SHAPE COMPARISON — today's gamut authoring idioms (from Meta/Best
 * practices.mdx) mapped onto Panda. Today's code is in comments; the Panda
 * equivalent is below it. Everything here type-checks and extracts to static
 * CSS. Takeaway: authoring stays object-based with semantic tokens + typed
 * variant/state props; you do NOT sprinkle `className`. The one real change is
 * `styled.tag(css(...))` (calling the factory with a style fn) → `styled('tag',
 * { base, variants })` (a recipe config) or the `css` prop. */
import { styled } from 'styled-system/jsx';
import type { StyledVariantProps } from 'styled-system/types/jsx';

import { Box } from './gamut/Box';

// ── 1. css() single / multi value ──────────────────────────────────────────
// TODAY:  const Box = styled.div(css({ p: 4 }));
//         const Other = styled.div(css({ color: 'primary', p: 4 }));
export const Padded = styled('div', { base: { p: '4' } });
export const Branded = styled('div', { base: { color: 'primary', p: '4' } });
// inline one-off (closest to a bare css()): <Box p="4" color="primary" />
//                              or css prop:  <styled.div css={{ p: '4' }} />

// ── 2. variant() ────────────────────────────────────────────────────────────
// TODAY:  const Anchor = styled.a(variant({
//           base: { p: 4 }, defaultVariant: 'interface',
//           variants: { interface: { color: 'text', '&:hover': { color: 'primary' } } },
//         }));
export const Anchor = styled('a', {
  base: { p: '4' },
  variants: {
    tone: {
      interface: { color: 'text', _hover: { color: 'primary' } },
      danger: { color: 'danger' },
    },
  },
  defaultVariants: { tone: 'interface' },
});
// call site is identical in shape:  <Anchor tone="danger" />

// ── 3. states() (boolean props) ─────────────────────────────────────────────
// TODAY:  const Wrapper = styled.div(states({
//           disabled: { bg: 'background-disabled', color: 'text-disabled' },
//           center: { display: 'flex', justifyContent: 'center' },
//         }));
export const Wrapper = styled('div', {
  variants: {
    disabled: { true: { bg: 'background-disabled', color: 'text-disabled' } },
    center: { true: { display: 'flex', justifyContent: 'center' } },
  },
});
// call site is identical in shape:  <Wrapper disabled center />

// ── 4. prop typing: StyleProps<typeof x> ────────────────────────────────────
// TODAY:  interface Props extends StyleProps<typeof someStates> {}
export type WrapperProps = StyledVariantProps<typeof Wrapper>;

// ── 5. system props on a component (the MOST common gamut pattern) ───────────
// TODAY:  <Box padding={4} bg="primary" />
// PANDA:  same shape (token keys are strings under strictTokens):
export const SystemPropsExample = () => (
  <Box padding="4" bg="primary" color="text" borderRadius="md" />
);
