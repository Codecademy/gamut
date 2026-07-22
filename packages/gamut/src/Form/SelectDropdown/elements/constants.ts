import {
  ArrowChevronDownIcon,
  CloseIcon,
  MiniChevronDownIcon,
  MiniDeleteIcon,
} from '@codecademy/gamut-icons';

export const iconSize = { small: 12, medium: 16 };
export const selectedIconSize = { small: 16, medium: 24 };

export const indicatorIcons = {
  smallChevron: {
    size: iconSize.small,
    icon: MiniChevronDownIcon,
  },
  mediumChevron: {
    size: iconSize.medium,
    icon: ArrowChevronDownIcon,
  },
  smallRemove: {
    size: iconSize.small,
    icon: MiniDeleteIcon,
  },
  mediumRemove: {
    size: iconSize.medium,
    icon: CloseIcon,
  },
};
