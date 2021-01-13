import React from 'react';

import { AppHeader } from '../AppHeader';
import { AppHeaderItem } from '../AppHeader/types';
import {
  anonHeaderItems,
  freeHeaderItems,
  proHeaderItems,
} from './AppHeaderVariants';
import styles from './styles.scss';
import { AnonHeader, FreeHeader, ProHeader } from './types';

export type HeaderClickHandler = (
  event: React.MouseEvent,
  item: AppHeaderItem
) => void;

export type GlobalHeaderProps = {
  variant: AnonHeader | FreeHeader | ProHeader;
  onClick: HeaderClickHandler;
};

const getAppHeaderItems = (variant: AnonHeader | FreeHeader | ProHeader) => {
  switch (variant.type) {
    case 'anon':
      return anonHeaderItems(variant.renderSearch);
    case 'free':
      return freeHeaderItems(
        variant.renderSearch,
        variant.renderNotifications,
        variant.renderProfile
      );
    case 'pro':
      return proHeaderItems(
        variant.renderSearch,
        variant.renderNotifications,
        variant.renderProfile
      );
  }
};

export const GlobalHeader: React.FC<GlobalHeaderProps> = ({
  variant,
  onClick,
}) => {
  return (
    <AppHeader
      className={styles.globalHeader}
      items={getAppHeaderItems(variant)}
      onClick={onClick}
    />
  );
};
