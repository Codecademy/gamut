import { states, variant } from '@codecademy/gamut-styles';

import { toolTipBodyCss } from '../../Tip/shared/styles/styles';

export const borderStyles = { border: 1 } as const;
export const popoverPrimaryBgColor = `background`;

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
