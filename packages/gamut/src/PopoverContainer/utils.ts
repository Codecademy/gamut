import {
  CSSObject,
  percentageOrAbsolute as percent,
} from '@codecademy/variance';

import { PopoverPositionConfig, TargetRef } from './types';

const getWindowDimensions = () => ({
  height: window.innerHeight || document.documentElement.clientHeight,
  width: window.innerWidth || document.documentElement.clientWidth,
});

const isRectOutOfBounds = (
  rect: DOMRect,
  container: { top: number; bottom: number; left: number; right: number }
): boolean => {
  const { top, bottom, left, right } = rect;
  const {
    top: containerTop,
    bottom: containerBottom,
    left: containerLeft,
    right: containerRight,
  } = container;

  return (
    bottom <= containerTop ||
    top >= containerBottom ||
    right <= containerLeft ||
    left >= containerRight
  );
};

export const findResizingParent = (
  element: HTMLElement
): HTMLElement | null => {
  let currentElement = element.parentElement;

  while (currentElement && currentElement !== document.body) {
    const { overflow, overflowY, overflowX } = getComputedStyle(currentElement);
    if ([overflow, overflowY, overflowX].some((val) => val === 'clip')) {
      return currentElement;
    }
    currentElement = currentElement.parentElement;
  }

  return null;
};

/**
 * Finds all scrolling parents of an element.
 * This is useful for detecting scroll events on parents that may not be the direct parent.
 * Window scroll is handled separately by react-use's useWindowScroll.
 */
export const findAllAdditionalScrollingParents = (
  element: HTMLElement
): HTMLElement[] => {
  const scrollingParents: HTMLElement[] = [];
  let currentElement = element.parentElement;

  while (currentElement && currentElement !== document.body) {
    const { overflow, overflowY, overflowX } = getComputedStyle(currentElement);
    const isScrollable = [overflow, overflowY, overflowX].some((val) =>
      ['scroll', 'auto'].includes(val)
    );

    const hasScrollableContent =
      currentElement.scrollHeight > currentElement.clientHeight ||
      currentElement.scrollWidth > currentElement.clientWidth;

    if (isScrollable || hasScrollableContent) {
      scrollingParents.push(currentElement);
    }
    currentElement = currentElement.parentElement;
  }

  return scrollingParents;
};

/**
 * Determines if an element is out of view, checking both the window viewport
 * and all scrollable parent containers. Returns true if the element is completely
 * outside the visible area of any containing scrollable parent or the window viewport.
 * Used by closeOnViewportExit to detect when the target element has scrolled out of view.
 */
export const isOutOfView = (
  rect: DOMRect,
  target?: HTMLElement | null
): boolean => {
  if (!target) {
    // If no target, check window viewport only
    const { height, width } = getWindowDimensions();
    const windowRect = {
      top: 0,
      left: 0,
      bottom: height,
      right: width,
    };
    return isRectOutOfBounds(rect, windowRect);
  }

  // Prioritize checking scrollable parents first (more specific to element context)
  // This handles iframe contexts where the window viewport might not match the actual scrollable container
  const scrollingParents = findAllAdditionalScrollingParents(target);

  // Also check if document.documentElement is scrollable (common in iframe contexts)
  const { documentElement } = document;
  const isDocumentScrollable =
    documentElement.scrollHeight > documentElement.clientHeight ||
    documentElement.scrollWidth > documentElement.clientWidth;

  // Check all scrollable parents (including document.documentElement if scrollable)
  const allScrollableContainers = isDocumentScrollable
    ? [documentElement, ...scrollingParents]
    : scrollingParents;

  for (const parent of allScrollableContainers) {
    // Early exit if parent doesn't contain target (performance optimization)
    if (!parent.contains(target)) {
      continue;
    }

    const parentRect = parent.getBoundingClientRect();
    if (isRectOutOfBounds(rect, parentRect)) {
      return true;
    }
  }

  // If no scrollable parents found or element is visible in all parents, check window viewport
  // This handles cases where the element is not in a scrollable container
  const { height, width } = getWindowDimensions();
  const windowRect = {
    top: 0,
    left: 0,
    bottom: height,
    right: width,
  };
  return isRectOutOfBounds(rect, windowRect);
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

  const alignments = alignment.split('-') as
    | ['top' | 'bottom' | 'left' | 'right']
    | ['top' | 'bottom', 'left' | 'right'];

  const styles: CSSObject = {};

  if (alignments.length === 1) {
    const [direction] = alignments;
    const isVertical = direction === 'top' || direction === 'bottom';
    styles.transform = isVertical ? 'translate(-50%, 0)' : 'translate(0, -50%)';
    styles[isVertical ? 'left' : 'top'] = isVertical
      ? left + width / 2
      : top + height / 2;
  } else {
    const coef = AXIS[invertAxis ?? 'none'];
    const [yAxis, xAxis] = alignments;
    styles.transform = `translate(${percent(coef[xAxis])}, ${percent(
      coef[yAxis]
    )})`;
  }

  const alignmentOffsets: Record<
    'left' | 'right' | 'top' | 'bottom',
    { position: keyof CSSObject; value: number }
  > = {
    left: { position: 'right', value: right + xOffset },
    right: { position: 'left', value: left + xOffset },
    top: { position: 'bottom', value: bottom + yOffset },
    bottom: { position: 'top', value: top + yOffset },
  };

  alignments.forEach((alignment) => {
    const { position, value } = alignmentOffsets[alignment];
    styles[position] = value;
  });

  return styles;
};

export const getContainers = (
  target: TargetRef,
  inline = false,
  scroll: { x: number; y: number }
) => {
  const viewport = target.getBoundingClientRect();

  if (!inline) {
    const { width, top, height, left } = viewport;
    return {
      viewport,
      parent: {
        width,
        height,
        top: top + scroll.y,
        left,
        right: document.body.offsetWidth - width - left,
        bottom: -(top + height + scroll.y),
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
      right: (offsetParent?.offsetWidth ?? 0) - left - width,
      top,
      bottom: (offsetParent?.offsetHeight ?? 0) - top - height,
    } as DOMRect,
    viewport,
  };
};
