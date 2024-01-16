import {
  MiniCheckCircleIcon,
  MiniInfoCircleIcon,
  MiniRemoveCircleIcon,
  MiniStarIcon,
  MiniWarningTriangleIcon,
} from '@codecademy/gamut-icons';
import { breakpoints, variant } from '@codecademy/gamut-styles';

export const alertVariants = {
  general: {
    order: 4,
    bg: 'blue',
    icon: MiniInfoCircleIcon,
  },
  success: {
    order: 2,
    bg: 'green',
    icon: MiniCheckCircleIcon,
  },
  error: {
    order: 1,
    bg: 'red-600',
    icon: MiniRemoveCircleIcon,
  },
  notice: {
    order: 3,
    bg: 'orange',
    icon: MiniWarningTriangleIcon,
  },
  feature: {
    order: 5,
    bg: 'blue-300',
    icon: MiniStarIcon,
  },
  subtle: {
    bg: 'background-hover',
    icon: MiniInfoCircleIcon,
  },
} as const;

export const placementVariants = variant({
  prop: 'placement',
  base: {
    alignItems: 'start',
    borderRadius: '3px',
    columnGap: [4, 8, , 12],
    display: 'grid',
    maxWidth: `calc(${breakpoints.md} - 4rem)`,
    px: 4,
    py: 8,
    width: 1,
    gridTemplateColumns: 'max-content minmax(0, 1fr) repeat(3, max-content)',
  },
  variants: {
    inline: {
      border: 'none',
    },
    floating: { border: 2, borderColor: 'navy' },
  },
});
