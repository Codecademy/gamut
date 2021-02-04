import React from 'react';

import { AppHeader, AppHeaderItemsProp } from '../AppHeader';
import { AppHeaderItem } from '../AppHeader/AppHeaderElements/types';
import {
  anonDefaultHeaderItems,
  anonLandingHeaderItems,
  anonLoginHeaderItems,
  anonSignupHeaderItems,
  freeHeaderItems,
  loadingHeaderItems,
  proHeaderItems,
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

const getAppHeaderItems = (props: GlobalHeaderProps): AppHeaderItemsProp => {
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

export const GlobalHeader: React.FC<GlobalHeaderProps> = (props) => {
  return (
    <AppHeader
      action={props.action}
      className={styles.globalHeader}
      items={getAppHeaderItems(props)}
    />
  );
};
