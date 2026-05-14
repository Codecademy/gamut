import {
  CSSObject,
  percentageOrAbsolute as percent,
} from '@codecademy/variance';

import { Alignments, PopoverPositionConfig, TargetRef } from './types';

export interface PopoverPositionResult {
  /** Edge insets pinning the popover to the container (`left` / `right` / `top` / `bottom`). */
  styles: CSSObject;
  /**
   * Direction-neutral transforms/coords—semantic mirroring happens first via
   * {@link mirrorAlignment}; merged after `styles`.
   */
  dirNeutralStyles?: CSSObject;
}

/**
 * Mirrors placement on the inline axis when the target is RTL so e.g. `bottom-left`
 * uses the same geometry as `bottom-right` in LTR.
 */
export const mirrorAlignment = (
  alignment: Alignments,
  isRtl: boolean
): Alignments => {
  if (!isRtl) return alignment;
  switch (alignment) {
    case 'top-left':
      return 'top-right';
    case 'top-right':
      return 'top-left';
    case 'bottom-left':
      return 'bottom-right';
    case 'bottom-right':
      return 'bottom-left';
    case 'left':
      return 'right';
    case 'right':
      return 'left';
    default:
      return alignment;
  }
};

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
 * @param rect - The DOMRect of the target element
 * @param target - The target element (optional)
 * @param cachedScrollingParents - Pre-computed list of scrolling parents to avoid expensive DOM traversals (optional)
 */
export const isOutOfView = (
  rect: DOMRect,
  target?: HTMLElement | null,
  cachedScrollingParents?: HTMLElement[]
): boolean => {
  if (!target) {
    const { height, width } = getWindowDimensions();
    const windowRect = {
      top: 0,
      left: 0,
      bottom: height,
      right: width,
    };
    return isRectOutOfBounds(rect, windowRect);
  }

  const scrollingParents =
    cachedScrollingParents ?? findAllAdditionalScrollingParents(target);

  const { documentElement } = document;
  const isDocumentScrollable =
    documentElement.scrollHeight > documentElement.clientHeight ||
    documentElement.scrollWidth > documentElement.clientWidth;

  const allScrollableContainers = isDocumentScrollable
    ? [documentElement, ...scrollingParents]
    : scrollingParents;

  for (const parent of allScrollableContainers) {
    if (!parent.contains(target)) {
      continue;
    }

    const parentRect = parent.getBoundingClientRect();
    if (isRectOutOfBounds(rect, parentRect)) {
      return true;
    }
  }

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

/**
 * Computes the absolute position styles for a popover relative to a target element.
 *
 * When `isRtl` is true, {@link mirrorAlignment} maps the requested placement to the
 * mirrored corner/edge on the inline axis before computing offsets (same viewport math
 * as LTR).
 *
 * Returns two fragments that callers merge into inline `style` (they are not Gamut variance
 * props on the host, so nothing here is swapped to logical properties via `system.positioning`).
 *
 * - `styles`: corner/edge inset lengths (`left` / `right` / `top` / `bottom`).
 * - `dirNeutralStyles`: transforms/coords not further remapped for RTL/logical placement
 *   after {@link mirrorAlignment}; merged after `styles`.
 */
export const getPosition = ({
  alignment,
  container,
  offset = 0,
  x = 0,
  y = 0,
  invertAxis,
  isRtl = false,
}: PopoverPositionConfig & { isRtl?: boolean }): PopoverPositionResult => {
  const layoutAlignment = mirrorAlignment(alignment, isRtl);
  const { top, left, bottom, right, height, width } = container;
  const xOffset = width + offset + x;
  const yOffset = height + offset + y;

  const alignments = layoutAlignment.split('-') as
    | ['top' | 'bottom' | 'left' | 'right']
    | ['top' | 'bottom', 'left' | 'right'];

  const styles: CSSObject = {};
  const dirNeutralStyles: CSSObject = {};

  if (alignments.length === 1) {
    const [direction] = alignments;
    const isVertical = direction === 'top' || direction === 'bottom';

    if (isVertical) {
      // Center x uses viewport/layout coords — stays literal after mirrorAlignment under RTL.
      dirNeutralStyles.left = left + width / 2;
      dirNeutralStyles.transform = 'translate(-50%, 0)';
    } else {
      styles.top = top + height / 2;
      dirNeutralStyles.transform = 'translate(0, -50%)';
    }
  } else {
    const coef = AXIS[invertAxis ?? 'none'];
    const [yAxis, xAxis] = alignments;
    const xCoef = coef[xAxis];
    dirNeutralStyles.transform = `translate(${percent(xCoef)}, ${percent(
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

  alignments.forEach((edge) => {
    const { position, value } = alignmentOffsets[edge];
    styles[position] = value;
  });

  return {
    styles,
    dirNeutralStyles: Object.keys(dirNeutralStyles).length
      ? dirNeutralStyles
      : undefined,
  };
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
