import React from 'react';

import { AppHeader } from '../AppHeader';
import { AppHeaderItem } from '../AppHeader/AppHeaderElements/types';
import {
  anonDefaultHeaderItems,
  anonLandingHeaderItems,
  anonLoginHeaderItems,
  anonSignupHeaderItems,
  freeHeaderItems,
  proHeaderItems,
} from './GlobalHeaderVariants';
import styles from './styles.module.scss';
import { AnonHeader, FreeHeader, ProHeader } from './types';

const DEFAULT_BASE_Z_INDEX = 14;

export type HeaderClickHandler = (
  event: React.MouseEvent,
  item: AppHeaderItem
) => void;

export type GlobalHeaderProps = AnonHeader | FreeHeader | ProHeader;

const getAppHeaderItems = (props: GlobalHeaderProps) => {
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
  }
};

export const GlobalHeader: React.FC<GlobalHeaderProps> = (props) => {
  return (
    <AppHeader
      action={props.action}
      baseZIndex={props.baseZIndex || DEFAULT_BASE_Z_INDEX}
      className={styles.globalHeader}
      items={getAppHeaderItems(props)}
    />
  );
};
