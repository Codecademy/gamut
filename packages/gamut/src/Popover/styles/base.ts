import { states, variant } from '@codecademy/gamut-styles';

import { toolTipBodyCss } from '../../Tip/shared/styles/styles';

export const borderStyles = { border: 1 } as const;
export const popoverPrimaryBgColor = `background`;

/**
 * For the Popover + Tooltip style files:
 *
 * 'above' + 'below' map to position, 'top' + 'bottom' map to beak alignment
 *  variants for both follow this formula: `position`-`beakPosition`
 *  Popovers additionally will have `-sml` added to the end of this string if they are the `secondary` variant
 *
 */

export const transformValues = {
  right: 'translateX(-100%)',
  left: 'translateX(0%)',
  above: 'translateY(-100%)',
  below: 'translateY(0%)',
  center: '',
};

export const popoverStates = states({
  widthRestricted: {
    minWidth: '4rem',
    maxWidth: '16rem',
  },
});

export const raisedDivVariants = variant({
  base: {
    zIndex: 1,
  },
  defaultVariant: 'primary',
  variants: {
    primary: {
      bg: popoverPrimaryBgColor,
      borderRadius: 'sm',
    },
    secondary: { ...toolTipBodyCss },
  },
});
