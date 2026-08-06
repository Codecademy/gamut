import type { StyleProps } from '@codecademy/variance';

import { css, states, styledOptions, systemProps, variant } from './shared';

/* Style definitions shared by BOTH benchmark arms.
 *
 * This is what makes the comparison meaningful: `css`/`variant`/`states` come
 * from the REAL `@codecademy/gamut-styles`, and both arms call the exact same
 * functions with the exact same arguments. The only thing that differs between
 * arms is which `styled` consumes them — Emotion's or the new engine's. So the
 * measurement isolates the injection layer and nothing else. */

export const cardStyles = css({
  p: 24,
  mb: 16,
  bg: 'background',
  borderRadius: 'md',
  border: 1,
  borderColor: 'border-primary',
  '&:hover': { borderColor: 'primary' },
});

export const headingStyles = css({
  fontSize: 22,
  fontWeight: 'title',
  lineHeight: 'title',
  color: 'text',
  mb: 8,
});

export const bodyStyles = css({
  fontSize: 16,
  lineHeight: 'base',
  color: 'text-secondary',
  mb: 16,
});

export const buttonVariants = variant({
  defaultVariant: 'primary',
  variants: {
    primary: {
      bg: 'primary',
      color: 'background',
      '&:hover': { bg: 'primary-hover' },
    },
    secondary: {
      bg: 'transparent',
      color: 'primary',
      borderColor: 'primary',
      '&:hover': { bg: 'background-hover' },
    },
    danger: {
      bg: 'danger',
      color: 'background',
      '&:hover': { bg: 'danger-hover' },
    },
  },
});

export const buttonStates = states({
  fullWidth: { width: '100%' },
  compact: { py: 4, px: 8, fontSize: 14 },
});

export const buttonBase = css({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 2,
  borderColor: 'transparent',
  borderRadius: 'md',
  px: 16,
  py: 8,
  fontSize: 16,
  fontWeight: 'title',
  // exercises the focus-visible polyfill path in both arms
  '&:focus-visible': { borderColor: 'primary' },
});

export const rowStyles = css({
  display: 'flex',
  alignItems: 'center',
  columnGap: 12,
  flexWrap: 'wrap',
});

/* The real Gamut spacing scale. Used to synthesise HIGH-CARDINALITY trees where
 * nearly every node resolves to a distinct style object — the adversarial case
 * for a hashing injector, and the one a low-cardinality tree hides. */
export const SPACINGS = [0, 4, 8, 12, 16, 24, 32, 40, 48, 64, 96] as const;

/* Independent base-11 digits of `index`. Using strides (`index * 3 % 11`) instead
 * would make every value a function of `index % 11`, so all three props would move
 * together and yield only 11 distinct combinations — which is exactly the
 * degenerate case this scenario exists to avoid. Digits give one distinct style
 * per node up to 11^3 nodes. */
export const spacingDigit = (index: number, place: number) =>
  SPACINGS[Math.floor(index / SPACINGS.length ** place) % SPACINGS.length];

/* Prop types derived from the style functions, exactly as real Gamut call sites
 * do it (`StyleProps<typeof StrokeButtonStateStyles>`). Shared by both arms so
 * neither gets a typing advantage. */
export type BoxStyleProps = StyleProps<typeof systemProps>;
export type ButtonStyleProps = StyleProps<typeof buttonVariants> &
  StyleProps<typeof buttonStates>;

export { css, states, styledOptions, systemProps, variant };
