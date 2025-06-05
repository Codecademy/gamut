import { PopoverProps } from './types';

export const findScrollingParent = ({
  parentElement,
}: HTMLElement): HTMLElement | null => {
  if (parentElement) {
    const { overflow, overflowY, overflowX } = getComputedStyle(parentElement);
    if (
      [overflow, overflowY, overflowX].some((val) =>
        ['scroll', 'auto'].includes(val)
      )
    ) {
      return parentElement;
    }
    return findScrollingParent(parentElement); // parent of this parent is used via prop destructure
  }
  return null;
};

export const findResizingParent = ({
  parentElement,
}: HTMLElement): HTMLElement | null => {
  if (parentElement) {
    const { overflow, overflowY, overflowX } = getComputedStyle(parentElement);
    if ([overflow, overflowY, overflowX].some((val) => val === 'clip')) {
      return parentElement;
    }
    return findResizingParent(parentElement); // parent of this parent is used via prop destructure
  }
  return null;
};

const offsets = {
  primary: 20,
  secondary: 15,
};

export const getDefaultOffset = ({
  axis,
  position,
  variant = 'primary',
}: Pick<PopoverProps, 'position' | 'variant'> & {
  axis: 'horizontal' | 'vertical';
}) => {
  const newPosition = 0;
  if (position === 'center' && axis === 'horizontal') {
    position = offsets[variant];
  } else if (position !== 'center' && axis === 'vertical') {
    position = offsets[variant];
  }
  return newPosition;
};
