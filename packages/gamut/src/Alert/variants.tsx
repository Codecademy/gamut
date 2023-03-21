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
    // for some reason, background-disabled, abckground-hoiver isn't applying here
    // ask cass? :)
    bg: 'background-hover',
    icon: MiniInfoCircleIcon,
  },
} as const;

export const placementVariants = variant({
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
