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
};

type AnonHeader = {
  type: 'anon';
  renderSearch?: () => ReactElement;
};

type LoggedInHeader = {
  avatar: string;
  displayName: string;
  renderSearch?: () => ReactElement;
  renderNotifications?: () => ReactElement;
  renderProfile?: () => ReactElement;
};

type FreeHeader = LoggedInHeader & {
  type: 'free';
  avatar: string;
  displayName: string;
};

type ProHeader = LoggedInHeader & {
  type: 'pro';
};

export const GlobalHeader: React.FC<GlobalHeaderProps> = ({ variant }) => {
  switch (variant.type) {
    case 'anon':
      return (
        <AppHeader
          className={styles.globalHeader}
          items={anonHeaderItems(variant.renderSearch)}
        />
      );
    case 'free':
      return (
        <AppHeader
          className={styles.globalHeader}
          items={freeHeaderItems(
            variant.renderSearch,
            variant.renderNotifications,
            variant.renderProfile
          )}
        />
      );
    case 'pro':
      return (
        <AppHeader
          className={styles.globalHeader}
          items={proHeaderItems(
            variant.renderSearch,
            variant.renderNotifications,
            variant.renderProfile
          )}
        />
      );
  }
};
