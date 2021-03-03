import { Box } from '@codecademy/gamut';
import cx from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';

import { GlobalHeaderProps } from '..';
import {
  BasicGlobalHeader,
  desktopHeight,
  mobileHeight,
} from '../BasicGlobalHeader';
import styles from './styles.module.scss';

const defaultScrollingState = {
  isInHeaderRegion: true,
  isScrollingDown: true,
  isScrollingDownFromHeaderRegion: true,
  prevScrollPosition: typeof window === 'undefined' ? 0 : window?.pageYOffset,
};

export const AnimatedGlobalHeader: React.FC<GlobalHeaderProps> = (props) => {
  const [scrollingState, setScrollingState] = useState(defaultScrollingState);

  const {
    isScrollingDownFromHeaderRegion,
    isInHeaderRegion,
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
        isInHeaderRegion: true,
        isScrollingDownFromHeaderRegion: true,
      }));
    } else {
      setScrollingState((prevState) => ({
        ...prevState,
        isInHeaderRegion: false,
        isScrollingDownFromHeaderRegion:
          prevState.isScrollingDown &&
          prevState.isScrollingDownFromHeaderRegion,
      }));
    }
  }, [prevScrollPosition]);

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
    <Box height={{ base: mobileHeight, md: desktopHeight }}>
      <BasicGlobalHeader
        className={cx(
          isScrollingDownFromHeaderRegion
            ? styles.staticHeader
            : styles.stickyHeader,
          !isScrollingDown && styles.transitionSlideDown,
          isScrollingDown &&
            !isScrollingDownFromHeaderRegion &&
            styles.transitionSlideUp,
          isInHeaderRegion && styles.transitionFadeOut
        )}
        {...props}
      />
    </Box>
  );
};
