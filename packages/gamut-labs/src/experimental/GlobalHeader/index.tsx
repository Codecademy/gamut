import { Box } from '@codecademy/gamut';
import cx from 'classnames';
import { throttle } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';

import { AppHeader } from '../AppHeader';
import {
  FormattedAppHeaderItems,
  FormattedMobileAppHeaderItems,
} from '../AppHeader/types';
import { AppHeaderMobile } from '../AppHeaderMobile';
import {
  anonDefaultHeaderItems,
  anonDefaultMobileHeaderItems,
  anonLandingHeaderItems,
  anonLandingMobileHeaderItems,
  anonLoginHeaderItems,
  anonLoginMobileHeaderItems,
  anonSignupHeaderItems,
  anonSignupMobileHeaderItems,
  freeHeaderItems,
  freeMobileHeaderItems,
  loadingHeaderItems,
  loadingMobileHeaderItems,
  proHeaderItems,
  proMobileHeaderItems,
} from './GlobalHeaderVariants';
import styles from './styles.module.scss';
import { AnonHeader, FreeHeader, LoadingHeader, ProHeader } from './types';

export type GlobalHeaderProps =
  | AnonHeader
  | FreeHeader
  | ProHeader
  | LoadingHeader;

const getAppHeaderItems = (
  props: GlobalHeaderProps
): FormattedAppHeaderItems => {
  switch (props.type) {
    case 'anon':
      switch (props.variant) {
        case 'landing':
          return anonLandingHeaderItems();
        case 'login':
          return anonLoginHeaderItems(props.renderSearch?.desktop);
        case 'signup':
          return anonSignupHeaderItems(props.renderSearch?.desktop);
        default:
          return anonDefaultHeaderItems(props.renderSearch?.desktop);
      }
    case 'free':
      return freeHeaderItems(
        props.user,
        props.renderSearch?.desktop,
        props.renderNotifications?.desktop
      );
    case 'pro':
      return proHeaderItems(
        props.user,
        props.renderSearch?.desktop,
        props.renderNotifications?.desktop
      );
    case 'loading':
      return loadingHeaderItems;
  }
};

const getMobileAppHeaderItems = (
  props: GlobalHeaderProps
): FormattedMobileAppHeaderItems => {
  switch (props.type) {
    case 'anon':
      switch (props.variant) {
        case 'landing':
          return anonLandingMobileHeaderItems();
        case 'login':
          return anonLoginMobileHeaderItems();
        case 'signup':
          return anonSignupMobileHeaderItems();
        default:
          return anonDefaultMobileHeaderItems();
      }
    case 'free':
      return freeMobileHeaderItems(
        props.user,
        props.renderNotifications?.mobile
      );
    case 'pro':
      return proMobileHeaderItems(
        props.user,
        props.renderNotifications?.mobile
      );
    case 'loading':
      return loadingMobileHeaderItems;
  }
};

const defaultScrollingState = {
  isInHeaderRegion: true,
  isScrollingDown: true,
  isScrollingDownFromHeaderRegion: true,
  prevScrollPosition: 0,
};

export const GlobalHeader: React.FC<GlobalHeaderProps> = (props) => {
  const [scrollingState, setScrollingState] = useState(defaultScrollingState);

  const {
    isScrollingDownFromHeaderRegion,
    isInHeaderRegion,
    isScrollingDown,
    prevScrollPosition,
  } = scrollingState;

  const handleScrolling = () => {
    const currentScrollPosition = window.pageYOffset;

    if (currentScrollPosition <= 80) {
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

    if (
      currentScrollPosition > prevScrollPosition ||
      currentScrollPosition === 0
    ) {
      setScrollingState((prevState) => {
        return {
          ...prevState,
          isScrollingDown: true,
          prevScrollPosition: currentScrollPosition,
          isScrollingDownFromHeaderRegion:
            prevState.isScrollingDown &&
            prevState.isScrollingDownFromHeaderRegion,
        };
      });
    } else {
      setScrollingState((prevState) => ({
        ...prevState,
        isScrollingDown: false,
        prevScrollPosition: currentScrollPosition,
        isScrollingDownFromHeaderRegion: false,
      }));
    }
  };

  const throttledHandleScroll = throttle(handleScrolling, 200);

  useEffect(() => {
    window.addEventListener('scroll', throttledHandleScroll);

    // returned function will be called on component unmount
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [throttledHandleScroll, isScrollingDown]);

  return (
    <>
      <Box
        display={{ base: 'none', md: 'block' }}
        height="80"
        className={cx(
          isInHeaderRegion && [styles.staticHeader, styles.fadeTransition],
          {
            [styles.stickyHeader]:
              !isInHeaderRegion || (isInHeaderRegion && !isScrollingDown),
            [styles.fadeTransition]: isScrollingDownFromHeaderRegion,
            [styles.slideTransition]:
              !isInHeaderRegion && !isScrollingDownFromHeaderRegion,
            [styles.showHeader]: !isScrollingDown,
            [styles.hideHeader]:
              isScrollingDown &&
              !isInHeaderRegion &&
              !isScrollingDownFromHeaderRegion,
          }
        )}
      >
        <AppHeader action={props.action} items={getAppHeaderItems(props)} />
      </Box>
      <Box
        display={{ base: 'block', md: 'none' }}
        height="64"
        position="relative"
        zIndex={0}
      >
        <AppHeaderMobile
          action={props.action}
          items={getMobileAppHeaderItems(props)}
          renderSearch={props.renderSearch?.mobile}
        />
      </Box>
    </>
  );
};
