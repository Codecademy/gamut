import { Box } from '@codecademy/gamut';
import cx from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';

import { useBreakpointAtOrAbove } from '../../../lib/breakpointHooks';
import { GlobalHeaderProps } from '..';
import {
  BasicGlobalHeader,
  desktopHeight,
  mobileHeight,
} from '../BasicGlobalHeader';
import styles from './styles.module.scss';

const defaultScrollingState = {
  isAtTopOfPage: true,
  isInsideHeaderRegion: true,
  isScrollingDown: true,
  isScrollingDownFromHeaderRegion: true,
  prevScrollPosition: typeof window === 'undefined' ? 0 : window?.pageYOffset,
};

export const AnimatedGlobalHeader: React.FC<GlobalHeaderProps> = (props) => {
  const isDesktop = useBreakpointAtOrAbove('md');

  const [scrollingState, setScrollingState] = useState(defaultScrollingState);

  const {
    isScrollingDownFromHeaderRegion,
    isAtTopOfPage,
    isInsideHeaderRegion,
    isScrollingDown,
    prevScrollPosition,
  } = scrollingState;

  const handleScrolling = useCallback(() => {
    const currentScrollPosition =
      typeof window === 'undefined' ? 0 : window?.pageYOffset;

    // handle down/up scrolling
    if (currentScrollPosition > prevScrollPosition) {
      setScrollingState((prevState) => {
        return {
          ...prevState,
          isScrollingDown: true,
          prevScrollPosition: currentScrollPosition,
        };
      });
    } else {
      setScrollingState((prevState) => {
        return {
          ...prevState,
          isScrollingDown: false,
          prevScrollPosition: currentScrollPosition,
        };
      });
    }

    // handle static header region
    if (currentScrollPosition === 0) {
      setScrollingState((prevState) => ({
        ...prevState,
        isAtTopOfPage: true,
        isInsideHeaderRegion: true,
        isScrollingDownFromHeaderRegion: true,
      }));
    } else if (
      currentScrollPosition < (isDesktop ? desktopHeight : mobileHeight)
    ) {
      setScrollingState((prevState) => ({
        ...prevState,
        isInsideHeaderRegion: true,
      }));
    } else {
      setScrollingState((prevState) => ({
        ...prevState,
        isAtTopOfPage: false,
        isInsideHeaderRegion: false,
        isScrollingDownFromHeaderRegion:
          prevState.isScrollingDown &&
          prevState.isScrollingDownFromHeaderRegion,
      }));
    }
  }, [prevScrollPosition, isDesktop]);

  useEffect(() => {
    window?.addEventListener('scroll', handleScrolling, {
      passive: true,
    });

    // returned function will be called on component unmount
    return () => {
      window?.removeEventListener('scroll', handleScrolling);
    };
  }, [handleScrolling]);

  return (
    <Box height={{ base: `${mobileHeight}`, md: `${desktopHeight}` }}>
      <BasicGlobalHeader
        className={cx(
          isInsideHeaderRegion && isScrollingDownFromHeaderRegion
            ? styles.staticHeader
            : styles.stickyHeader,
          !isScrollingDown && styles.transitionSlideDown,
          !isInsideHeaderRegion &&
            isScrollingDownFromHeaderRegion &&
            styles.slideUp,
          isScrollingDown &&
            !isScrollingDownFromHeaderRegion &&
            styles.transitionSlideUp,
          isAtTopOfPage && styles.transitionFadeOut
        )}
        {...props}
      />
    </Box>
  );
};
