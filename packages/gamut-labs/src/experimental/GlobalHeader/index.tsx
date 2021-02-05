import React from 'react';

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
