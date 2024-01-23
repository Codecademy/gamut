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
    columnGap: [4, 8, , 12],
    display: 'grid',
    maxWidth: `calc(${breakpoints.md} - 4rem)`,
    px: 4,
    width: 1,
  },
  variants: {
    inline: {
      border: 'none',
      borderRadius: '2px',
      py: 8,
    },
    floating: {
      borderColor: 'navy',
      borderRadius: '5px',
      borderStyle: 'solid',
      borderWidth: '2px',
      py: 4,
    },
  },
});

export interface buttonExistenceObject {
  cta?: boolean;
  onClose?: boolean;
  truncated?: boolean;
}

export const getGridTemplateColumns = (
  buttonExistenceObject: buttonExistenceObject
) => {
  const numOfButtons = Object.values(buttonExistenceObject).filter(
    (item) => item === true
  ).length;
  const repeatCount = numOfButtons <= 0 ? 1 : numOfButtons;
  return `max-content minmax(0, 1fr) repeat(${repeatCount}, max-content)`;
};
