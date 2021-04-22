import {
  MiniCheckCircleIcon,
  MiniInfoCircleIcon,
  MiniRemoveCircleIcon,
  MiniStarIcon,
  MiniWarningTriangleIcon,
} from '@codecademy/gamut-icons';
import { breakpoints, system } from '@codecademy/gamut-styles';

import { FillButton, StrokeButton } from '../Button';

export const alertVariants = {
  general: {
    order: 4,
    bg: 'blue',
    button: FillButton,
    icon: MiniInfoCircleIcon,
  },
  success: {
    order: 2,
    bg: 'green',
    button: FillButton,
    icon: MiniCheckCircleIcon,
  },
  error: {
    order: 1,
    bg: 'red',
    button: FillButton,
    icon: MiniRemoveCircleIcon,
  },
  notice: {
    order: 3,
    bg: 'orange',
    button: StrokeButton,
    icon: MiniWarningTriangleIcon,
  },
  feature: {
    order: 5,
    bg: 'blue-300',
    button: StrokeButton,
    icon: MiniStarIcon,
  },
} as const;

export const placementVariants = system.variant({
  prop: 'placement',
  base: {
    borderColor: 'navy',
    display: 'grid',
    alignItems: 'start',
    width: 1,
    maxWidth: `calc(${breakpoints.md} - 4rem)`,
    border: 2,
    borderRadius: '3px',
    columnGap: [4, 8, , 12],
    gridTemplateColumns: 'max-content minmax(0, 1fr) repeat(3, max-content)',
  },
  variants: {
    inline: {
      border: 'none',
      p: 4,
      py: 8,
    },
    floating: {
      p: 4,
    },
  },
});
