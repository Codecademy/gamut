import {
  ArrowChevronDownIcon,
  CloseIcon,
  MiniChevronDownIcon,
  MiniDeleteIcon,
  SearchIcon,
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
  smallSearchable: {
    size: iconSize.small,
    icon: SearchIcon,
  },
  mediumSearchable: {
    size: iconSize.medium,
    icon: SearchIcon,
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
