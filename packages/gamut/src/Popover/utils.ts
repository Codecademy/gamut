import { PopoverProps } from './types';

export const findScrollingParent = (element: HTMLElement): HTMLElement => {
  let currentElement = element.parentElement;

  while (currentElement && currentElement !== document.documentElement) {
    const { overflow, overflowY, overflowX } = getComputedStyle(currentElement);
    if (
      [overflow, overflowY, overflowX].some((val) =>
        ['scroll', 'auto'].includes(val)
      )
    ) {
      return currentElement;
    }
    currentElement = currentElement.parentElement;
  }

  // Fallback to document.documentElement if no scrolling parent is found
  return document.documentElement;
};

export const findResizingParent = (element: HTMLElement): HTMLElement => {
  let currentElement = element.parentElement;

  while (currentElement && currentElement !== document.documentElement) {
    const { overflow, overflowY, overflowX } = getComputedStyle(currentElement);
    if ([overflow, overflowY, overflowX].some((val) => val === 'clip')) {
      return currentElement;
    }
    currentElement = currentElement.parentElement;
  }

  // Fallback to document.documentElement if no resizing parent is found
  return document.documentElement;
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
  let newPosition = 0;
  if (position === 'center' && axis === 'horizontal' && variant) {
    newPosition = offsets[variant];
  } else if (position !== 'center' && axis === 'vertical' && variant) {
    newPosition = offsets[variant];
  }
  return newPosition;
};
