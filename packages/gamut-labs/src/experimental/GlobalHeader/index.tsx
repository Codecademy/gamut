import React, { useState } from 'react';

import { useBreakpointAtOrAbove } from '../../lib/breakpointHooks';
import { AppHeader } from '../AppHeader';
import { AppHeaderItem } from '../AppHeader/AppHeaderElements/types';
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
  FormattedAppHeaderItems,
  FormattedMobileAppHeaderItems,
  freeHeaderItems,
  freeMobileHeaderItems,
  loadingHeaderItems,
  loadingMobileHeaderItems,
  proHeaderItems,
  proMobileHeaderItems,
} from './GlobalHeaderVariants';
import styles from './styles.module.scss';
import { AnonHeader, FreeHeader, LoadingHeader, ProHeader } from './types';

const HEADER_HEIGHT = 81;

export type HeaderClickHandler = (
  event: React.MouseEvent,
  item: AppHeaderItem
) => void;

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
          return anonLoginHeaderItems(props.renderSearch);
        case 'signup':
          return anonSignupHeaderItems(props.renderSearch);
        default:
          return anonDefaultHeaderItems(props.renderSearch);
      }
    case 'free':
      return freeHeaderItems(
        props.user,
        props.renderSearch,
        props.renderNotifications
      );
    case 'pro':
      return proHeaderItems(
        props.user,
        props.renderSearch,
        props.renderNotifications
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
      return freeMobileHeaderItems(props.user, props.renderNotifications);
    case 'pro':
      return proMobileHeaderItems(props.user, props.renderNotifications);
    case 'loading':
      return loadingMobileHeaderItems;
  }
};

export const GlobalHeader: React.FC<GlobalHeaderProps> = (props) => {
  const desktop = useBreakpointAtOrAbove('md');

  const defaultScrollingState = {
    isSearchVisible: false,
    isScrollingDown: true,
    isInHeaderRegion: true,
    isScrollingFromHeaderRegion: true,
    prevScrollPosition: 0,
  };
  const [scrollingState, setScrollingState] = useState(defaultScrollingState);

  const handleScrolling = () => {
    const currentScrollPosition = window.pageYOffset;

    if (currentScrollPosition <= HEADER_HEIGHT) {
      setScrollingState((prevState) => ({
        ...prevState,
        isInHeaderRegion: true,
        isScrollingFromHeaderRegion: true,
      }));
    } else {
      setScrollingState((prevState) => ({
        ...prevState,
        isInHeaderRegion: false,
      }));
    }

    let isScrollingFromHeaderRegion = false;

    if (currentScrollPosition > scrollingState.prevScrollPosition) {
      setScrollingState((prevState) => {
        if (
          prevState.isScrollingDown &&
          prevState.isScrollingFromHeaderRegion
        ) {
          isScrollingFromHeaderRegion = true;
        }
        return {
          ...prevState,
          isScrollingDown: true,
          prevScrollPosition: currentScrollPosition,
          isScrollingFromHeaderRegion,
        };
      });
    } else {
      setScrollingState((prevState) => ({
        ...prevState,
        isScrollingDown: false,
        prevScrollPosition: currentScrollPosition,
        isScrollingFromHeaderRegion,
      }));
    }
  };

  return (
    <>
      {desktop ? (
        <AppHeader
          action={props.action}
          className={styles.globalHeader}
          items={getAppHeaderItems(props)}
        />
      ) : (
        <AppHeaderMobile
          action={props.action}
          className={styles.globalHeader}
          items={getMobileAppHeaderItems(props)}
        />
      )}
    </>
  );
};
