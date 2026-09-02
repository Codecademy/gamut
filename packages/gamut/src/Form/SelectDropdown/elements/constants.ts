import {
  ArrowChevronDownIcon,
  CloseIcon,
  MiniChevronDownIcon,
  MiniDeleteIcon,
} from '@codecademy/gamut-icons';

export const iconSize = { small: 12, base: 16 };
export const selectedIconSize = { small: 16, base: 24 };

export const indicatorIcons = {
  smallChevron: {
    size: iconSize.small,
    icon: MiniChevronDownIcon,
  },
  baseChevron: {
    size: iconSize.base,
    icon: ArrowChevronDownIcon,
  },
  smallRemove: {
    size: iconSize.small,
    icon: MiniDeleteIcon,
  },
  baseRemove: {
    size: iconSize.base,
    icon: CloseIcon,
  },
};
