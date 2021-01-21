import React from 'react';

import { AppHeader } from '../AppHeader';
import { AppHeaderItem } from '../AppHeader/AppHeaderElements/types';
import {
  anonHeaderItems,
  freeHeaderItems,
  proHeaderItems,
} from './GlobalHeaderVariants';
import styles from './styles.scss';
import { AnonHeader, FreeHeader, ProHeader } from './types';

export type HeaderClickHandler = (
  event: React.MouseEvent,
  item: AppHeaderItem
) => void;

export type GlobalHeaderProps = AnonHeader | FreeHeader | ProHeader;

const getAppHeaderItems = (props: GlobalHeaderProps) => {
  switch (props.type) {
    case 'anon':
      return anonHeaderItems(props.renderSearch);
    case 'free':
      return freeHeaderItems(
        props.renderSearch,
        props.renderNotifications,
        props.renderProfile
      );
    case 'pro':
      return proHeaderItems(
        props.renderSearch,
        props.renderNotifications,
        props.renderProfile
      );
  }
};

export const GlobalHeader: React.FC<GlobalHeaderProps> = (props) => {
  return (
    <AppHeader
      className={styles.globalHeader}
      items={getAppHeaderItems(props)}
      onClick={props.onClick}
    />
  );
};
