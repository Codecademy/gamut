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
    borderRadius: 'sm',
    columnGap: { _: 4, xs: 8, sm: 12 },
    display: 'grid',
    maxWidth: `calc(${breakpoints.md} - 4rem)`,
    pl: 4,
    width: 1,
  },
  variants: {
    inline: {
      border: 'none',
      py: 8,
    },
    floating: {
      borderColor: 'navy',
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

export const getAlertRightPadding = (onClose: boolean) => {
  return onClose ? 4 : ({ _: 4, xs: 12, sm: 16 } as const);
};
