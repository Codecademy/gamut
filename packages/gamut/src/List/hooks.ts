import { useCallback, useEffect, useRef, useState } from 'react';

import type { ListProps } from './List';

const checkIsAtScrollEnd = (wrapper: HTMLDivElement): boolean => {
  const { offsetWidth, scrollLeft, scrollWidth } = wrapper;
  const isAtHorizontalEnd = offsetWidth + Math.ceil(scrollLeft) >= scrollWidth;
  const hasNoHorizontalScroll = scrollWidth <= offsetWidth;

  return hasNoHorizontalScroll || isAtHorizontalEnd;
};

type ScrollabilityCheckParams = Pick<
  ListProps,
  'shadow' | 'scrollable' | 'children' | 'loading'
> & {
  isEmpty: boolean;
};

/**
 * Custom hook to manage scrollability state for shadow indicators.
 * Only runs when shadow and scrollable props are enabled for performance.
 *
 * @param params - Parameters from ListProps needed for scrollability checking
 * @returns Object containing isEnd state and refs for wrapper and table elements
 */
export const useScrollabilityCheck = ({
  shadow = false,
  scrollable = false,
  children,
  loading,
  isEmpty,
}: ScrollabilityCheckParams) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  const needsScrollabilityCheck = shadow && scrollable;

  const [isEnd, setIsEnd] = useState(true);

  const checkScrollability = useCallback(() => {
    if (!needsScrollabilityCheck) {
      return;
    }

    const wrapper = wrapperRef?.current;

    if (!wrapper) {
      setIsEnd(false);
      return;
    }

    setIsEnd(checkIsAtScrollEnd(wrapper));
  }, [needsScrollabilityCheck]);

  // Helper to check scrollability after next frame (for DOM readiness)
  const checkScrollAvailable = useCallback(() => {
    requestAnimationFrame(() => {
      checkScrollability();
    });
  }, [checkScrollability]);

  const setWrapperRef = useCallback(
    (node: HTMLDivElement | null) => {
      (wrapperRef as React.MutableRefObject<HTMLDivElement | null>).current =
        node;
      if (node && needsScrollabilityCheck) {
        checkScrollAvailable();
      }
    },
    [needsScrollabilityCheck, checkScrollAvailable]
  );

  const handleResize = useCallback(() => {
    checkScrollability();
  }, [checkScrollability]);

  const resizeObserverCallback = useCallback(() => {
    checkScrollAvailable();
  }, [checkScrollAvailable]);

  useEffect(() => {
    if (!needsScrollabilityCheck) {
      return;
    }

    checkScrollAvailable();

    window.addEventListener('resize', handleResize, { passive: true });

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(resizeObserverCallback);

      if (wrapperRef.current) {
        resizeObserver.observe(wrapperRef.current);
      }
      if (tableRef.current) {
        resizeObserver.observe(tableRef.current);
      }
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [
    children,
    loading,
    isEmpty,
    needsScrollabilityCheck,
    checkScrollability,
    handleResize,
    resizeObserverCallback,
    checkScrollAvailable,
  ]);

  const handleScroll = useCallback(
    (event: React.UIEvent<HTMLDivElement>) => {
      if (!needsScrollabilityCheck) {
        return;
      }
      const { offsetWidth, scrollLeft, scrollWidth } = event.currentTarget;
      setIsEnd(offsetWidth + Math.ceil(scrollLeft) >= scrollWidth);
    },
    [needsScrollabilityCheck]
  );

  return {
    isEnd,
    tableRef,
    setWrapperRef,
    handleScroll,
  };
};
