import React from 'react';
import { ReactNode } from 'react';

import { AppHeader } from '../AppHeader';
import { AppHeaderItem } from '../AppHeader/types';
import {
  communityDropdown,
  courseCatalog,
  login,
  logoItem,
  myHome,
  notifications,
  plansPricingDropdown,
  profile,
  proLogoItem,
  resourcesDropdown,
  search,
  signUp,
  upgradeToPro,
} from './AppHeaderItems';
import styles from './styles.scss';

export type GlobalHeaderProps = {
  user?: User;
  renderSearch?: () => ReactNode;
  renderNotifications?: () => ReactNode;
  renderProfileDropdown?: () => ReactNode;
};

type User = {
  avatar: string;
  roles: UserRoles;
  displayName: string;
};

type UserRoles = {
  isAdmin: boolean;
  isCustomerService: boolean;
  isPro: boolean;
};

export const GlobalHeader: React.FC<GlobalHeaderProps> = ({
  user,
  renderSearch,
  renderNotifications,
  renderProfileDropdown,
}) => {
  const isLoggedIn = user !== undefined;
  const codecademyLogo = user?.roles.isPro ? proLogoItem : logoItem;

  const leftItems: AppHeaderItem[] = [];
  const rightItems: AppHeaderItem[] = [];

  leftItems.push(codecademyLogo);
  isLoggedIn && leftItems.push(myHome);
  leftItems.push(courseCatalog, resourcesDropdown, communityDropdown);
  !user?.roles.isPro && leftItems.push(plansPricingDropdown);

  renderSearch && rightItems.push(search(renderSearch));
  isLoggedIn &&
    renderNotifications &&
    rightItems.push(notifications(renderNotifications));
  isLoggedIn &&
    renderProfileDropdown &&
    rightItems.push(profile(renderProfileDropdown));
  isLoggedIn && !user?.roles.isPro && rightItems.push(upgradeToPro);
  !isLoggedIn && rightItems.push(login, signUp);

  return (
    <AppHeader
      className={styles.globalHeader}
      items={{ left: leftItems, right: rightItems }}
    />
  );
};
