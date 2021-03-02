import { Box } from '@codecademy/gamut';
import cx from 'classnames';
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

  useEffect(() => {
    window?.addEventListener('scroll', handleScrolling, {
      passive: true,
    });

    // returned function will be called on component unmount
    return () => {
      window?.removeEventListener('scroll', handleScrolling);
    };
  }, [handleScrolling]);

  const stickyBox = document.getElementById('stickyBox');
  const staticBox = document.getElementById('staticBox');
  const placeholderBox = document.getElementById('headerPlaceholder');

  stickyBox &&
    stickyBox.addEventListener('transitionend', () => {
      if (stickyBox.className.includes('transitionOpacity')) {
        stickyBox.style.display = 'none';
        console.log('sticky header display set to none');
      }
    });
  stickyBox &&
    placeholderBox &&
    staticBox &&
    stickyBox.addEventListener('transitionstart', () => {
      if (stickyBox.className.includes('transitionOpacity')) {
        placeholderBox.style.display = 'none';
        staticBox.style.display = 'block';

        console.log('static header display set to block');
      }
    });

  if (staticBox && stickyBox && placeholderBox && !isScrollingDown) {
    stickyBox.style.display = 'block';
    staticBox.style.display = 'none';
    placeholderBox.style.display = 'block';
  }

  return (
    // padding box would need to be smaller for mobile
    <>
      <Box id="headerPlaceholder" height="80" />
      <Box
        id="staticBox"
        className={cx(
          styles.staticHeader,
          !isScrollingDownFromHeaderRegion && styles.visuallyHide
        )}
      >
        <BasicGlobalHeader {...props} />
      </Box>
      <Box
        id="stickyBox"
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
      >
        <BasicGlobalHeader {...props} />
      </Box>
    </>
  );
};
