import { transitionConcat } from '@codecademy/gamut-styles/dist/styles/transitionConcat';

import { css, states, variant } from '../gamut/engine';

/* INTERNAL GAMUT AUTHORING — DELIBERATELY UNCHANGED.
 *
 * A faithful reproduction of packages/gamut/src/Button/shared/{styles,variants}.ts
 * (reproduced rather than imported, because importing the real module pulls
 * Emotion in through the gamut-styles root export). Every construct that defeats a
 * parse-based codemod is present on purpose:
 *
 *   - `templateVariants()`      — builds the variant config PROGRAMMATICALLY
 *   - `[ButtonSelectors.HOVER]` — computed keys from an enum
 *   - `transitionConcat(...)`   — a function CALL producing a value
 *   - `variant === 'interface' ? …` — a ternary inside the template
 *
 * Panda's static extractor cannot evaluate any of these. The precompute step in
 * generate.ts doesn't try to: it EXECUTES this file and reads the results. */

// mirrors packages/gamut/src/ButtonBase/ButtonBase.tsx
export enum ButtonSelectors {
  HOVER = '&:hover',
  ACTIVE = '&:active',
  DISABLED = "[disabled], &:disabled, &[aria-disabled='true']",
  FOCUS_VISIBLE = '&:focus-visible',
  OUTLINE = '&:before',
  OUTLINE_FOCUS_VISIBLE = '&:focus-visible:before',
}

export const buttonVariants = [
  'primary',
  'secondary',
  'danger',
  'interface',
] as const;

/** Verbatim from the real `shared/styles.ts`. */
export const templateVariants = <Variant extends string, Styles>(
  variants: readonly Variant[],
  template: (colors: Variant) => Styles
) => {
  const variantConfig = {} as Record<Variant, ReturnType<typeof template>>;
  variants.forEach((key: Variant) => {
    variantConfig[key] = template(key);
  });
  return variant({
    defaultVariant: variants[0],
    variants: variantConfig,
  } as never);
};

const hoverBackgroundTransition = transitionConcat(
  ['background-color', 'box-shadow'],
  'fast',
  'ease-in'
);

export const buttonStyles = css({
  position: 'relative',
  whiteSpace: 'nowrap',
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: 2,
  borderRadius: 'md',
  borderColor: 'transparent',
  transition: transitionConcat(
    ['border-color', 'color', 'background-color', 'box-shadow'],
    'fast',
    'ease-in'
  ),
  [ButtonSelectors.DISABLED]: { cursor: 'not-allowed', userSelect: 'none' },
  [ButtonSelectors.OUTLINE]: {
    content: '""',
    position: 'absolute',
    borderRadius: 'lg',
    border: 2,
    inset: -5,
    opacity: 0,
    zIndex: 0,
  },
  [ButtonSelectors.OUTLINE_FOCUS_VISIBLE]: { opacity: 1 },
} as never);

export const fillButtonVariants = templateVariants(
  buttonVariants,
  (buttonVariant) => ({
    bg: buttonVariant,
    color: 'background',
    [ButtonSelectors.OUTLINE]: { borderColor: buttonVariant },
    [ButtonSelectors.HOVER]: {
      bg: `${buttonVariant}-hover`,
      color: 'background',
      transition: hoverBackgroundTransition,
    },
    [ButtonSelectors.ACTIVE]: {
      borderColor: 'border-primary',
      bg: buttonVariant,
      color: 'background',
    },
    [ButtonSelectors.DISABLED]: {
      color: 'text-disabled',
      bg: 'background-disabled',
    },
  })
);

export const textButtonVariants = templateVariants(
  buttonVariants,
  (buttonVariant) => ({
    borderColor: 'transparent',
    // the ternary a static extractor can't fold
    color: buttonVariant === 'interface' ? 'text' : buttonVariant,
    [ButtonSelectors.HOVER]: {
      color: buttonVariant,
      bg: 'background-hover',
      transition: hoverBackgroundTransition,
    },
    [ButtonSelectors.FOCUS_VISIBLE]: { color: buttonVariant },
    [ButtonSelectors.DISABLED]: { color: 'text-disabled', bg: 'transparent' },
  })
);

export const sizeVariants = variant({
  prop: 'size',
  defaultVariant: 'normal',
  variants: {
    small: { fontSize: 14, minHeight: 32, py: 4, px: 8 },
    normal: { fontSize: 16, minHeight: 40, py: 4, px: 16 },
    large: { fontSize: 18, minHeight: 56, py: 4, px: 16 },
  },
} as never);

export const buttonStates = states({
  fullWidth: { width: '100%' },
} as never);
