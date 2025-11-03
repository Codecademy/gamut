import {
  CSSObject,
  percentageOrAbsolute as percent,
} from '@codecademy/variance';

import { PopoverPositionConfig, TargetRef } from './types';

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

/*
 * Finds all extra scrolling parents of an element.
 * This is useful for detecting scroll events on parents that may not be the direct parent, which should be managed by react-use's useWindowScroll.
 */
export const findAllAdditionalScrollingParents = (
  element: HTMLElement
): HTMLElement[] => {
  const scrollingParents: HTMLElement[] = [];
  let currentElement = element.parentElement;

  while (currentElement && currentElement !== document.body) {
    const { overflow, overflowY, overflowX } = getComputedStyle(currentElement);
    if (
      [overflow, overflowY, overflowX].some((val) =>
        ['scroll', 'auto'].includes(val)
      )
    ) {
      scrollingParents.push(currentElement);
    }
    currentElement = currentElement.parentElement;
  }

  return scrollingParents;
};

export const isOutOfView = (
  rect: DOMRect,
  target?: HTMLElement | null
): boolean => {
  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;

  const outOfViewport =
    rect.bottom < 0 ||
    rect.top > windowHeight ||
    rect.right < 0 ||
    rect.left > windowWidth;

  if (outOfViewport || !target) {
    return outOfViewport;
  }

  const scrollingParents = findAllAdditionalScrollingParents(target);

  for (const parent of scrollingParents) {
    const parentRect = parent.getBoundingClientRect();

    const intersects =
      rect.top < parentRect.bottom &&
      rect.bottom > parentRect.top &&
      rect.left < parentRect.right &&
      rect.right > parentRect.left;

    // If element doesn't intersect with a scrollable parent's visible area, it's out of view
    if (!intersects) {
      return true;
    }
  }

  return false;
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
  invertAxis,
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
    const coef = AXIS[invertAxis ?? 'none'];
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
