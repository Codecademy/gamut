import React, { ReactElement } from 'react';

import { AppHeader } from '../AppHeader';
import {
  anonHeaderItems,
  freeHeaderItems,
  proHeaderItems,
} from './AppHeaderVariants';
import styles from './styles.scss';

export type GlobalHeaderProps = {
  variant: AnonHeader | FreeHeader | ProHeader;
  onClick: (event: React.MouseEvent, target: string) => void;
};

type LoggedOutHeader = {
  renderSearch?: () => ReactElement;
};

type LoggedInHeader = LoggedOutHeader & {
  renderNotifications?: () => ReactElement;
  renderProfile?: () => ReactElement;
};

type AnonHeader = LoggedOutHeader & {
  type: 'anon';
};

type FreeHeader = LoggedInHeader & {
  type: 'free';
};

type ProHeader = LoggedInHeader & {
  type: 'pro';
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
