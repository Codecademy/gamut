import {
  CSSObject,
  percentageOrAbsolute as percent,
} from '@codecademy/variance';

import { PopoverPositionConfig, TargetRef } from './types';

export const isInView = ({ top, left, bottom, right }: DOMRect) => {
  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;

  return (
    top >= 0 && left >= 0 && bottom <= windowHeight && right <= windowWidth
  );
};

export const ALIGN = {
  top: 'bottom',
  right: 'left',
  bottom: 'top',
  left: 'right',
} as const;

const AXIS = {
  x: {
    top: 0,
    right: -1,
    bottom: 0,
    left: 1,
  },
  y: {
    top: 1,
    right: 0,
    bottom: -1,
    left: 0,
  },
  none: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
};

export const getPosition = ({
  alignment,
  container,
  offset = 0,
  x = 0,
  y = 0,
  insideAxis,
}: PopoverPositionConfig) => {
  const { top, left, bottom, right, height, width } = container;
  const xOffset = width + offset + x;
  const yOffset = height + offset + y;

  const styles = {} as CSSObject;

  const alignments = alignment.split('-') as
    | ['top' | 'bottom' | 'left' | 'right']
    | ['top' | 'bottom', 'left' | 'right'];

  if (alignments.length === 1) {
    switch (alignments[0]) {
      case 'left':
      case 'right':
        styles.transform = 'translate(0, -50%)';
        styles.top = top + height / 2;
        break;
      case 'top':
      case 'bottom':
        styles.transform = 'translate(-50%, 0)';
        styles.left = left + width / 2;
    }
  } else {
    const coef = AXIS[insideAxis ?? 'none'];
    const [y, x] = alignments;
    styles.transform = `translate(${percent(coef[x])}, ${percent(coef[y])})`;
  }

  alignments.forEach((alignment) => {
    if (alignment === 'left') styles.right = right + xOffset;
    if (alignment === 'right') styles.left = left + xOffset;
    if (alignment === 'top') styles.bottom = bottom + yOffset;
    if (alignment === 'bottom') styles.top = top + yOffset;
  });
  return styles;
};

export const getContainers = (
  target: TargetRef,
  inline = false,
  scroll: { x: number; y: number }
) => {
  const boundingClient = target.getBoundingClientRect();

  if (!inline) {
    const { width, top, height, left } = boundingClient;
    return {
      viewport: boundingClient,
      parent: {
        width,
        height,
        top: top + scroll.y,
        left,
        right: document.body.offsetWidth - width - left,
        bottom: -1 * (top + height + scroll.y),
      },
    };
  }

  const {
    offsetHeight: height,
    offsetWidth: width,
    offsetLeft: left,
    offsetTop: top,
  } = target;

  const offsetParent = target?.offsetParent as HTMLElement;

  return {
    parent: {
      width,
      height,
      left,
      right: offsetParent?.offsetWidth - left - width,
      top,
      bottom: offsetParent?.offsetHeight - top - height,
    } as DOMRect,
    viewport: boundingClient,
  };
};
