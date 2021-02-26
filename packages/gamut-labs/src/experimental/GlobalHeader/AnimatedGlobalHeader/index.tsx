import cx from 'classnames';
import { throttle } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';

import { GlobalHeaderProps } from '..';
import { BasicGlobalHeader } from '../BasicGlobalHeader';
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

  const throttledHandleScroll = throttle(handleScrolling, 200);

  useEffect(() => {
    window?.addEventListener('scroll', throttledHandleScroll, {
      passive: true,
    });

    // returned function will be called on component unmount
    return () => {
      window?.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [throttledHandleScroll, scrollingState]);

  return (
    <>
      <BasicGlobalHeader
        {...props}
        className={cx(
          styles.staticHeader,
          !isScrollingDownFromHeaderRegion && styles.visuallyHide
        )}
      />
      <BasicGlobalHeader
        {...props}
        className={cx(
          styles.stickyHeader,
          // scrolling down from top
          isScrollingDownFromHeaderRegion && [styles.visuallyHide],
          // scrolling down
          isScrollingDown && [styles.translateUp, styles.transitionSlide],
          // scrolling up
          !isScrollingDown &&
            !isInHeaderRegion && [
              styles.translateDown,
              styles.transitionSlide,
              styles.visuallyShow,
            ],
          isInHeaderRegion && [styles.transitionOpacity, styles.visuallyHide]
        )}
      />
    </>
  );
};
