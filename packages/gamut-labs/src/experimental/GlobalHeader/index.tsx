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

// import appHeaderItems from './AppHeaderItemPOJOs.json';

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
  accountType: 'free' | 'trial' | 'pro';
  isAdmin: boolean;
  isCustomerService: boolean;
};

export const GlobalHeader: React.FC<GlobalHeaderProps> = ({
  user,
  renderSearch,
  renderNotifications,
  renderProfileDropdown,
}) => {
  const userHasRole = (role: 'free' | 'trial' | 'pro') =>
    user?.roles.accountType === role;
  const isLoggedIn = user !== undefined;

  const codecademyLogo =
    user?.roles.accountType === 'pro' ? proLogoItem : logoItem;

  const items: AppHeaderItem[] = [];

  items.push(codecademyLogo);
  isLoggedIn && items.push(myHome);
  items.push(courseCatalog, resourcesDropdown, communityDropdown);
  !userHasRole('pro') && items.push(plansPricingDropdown);
  renderSearch && items.push(search(renderSearch));
  isLoggedIn &&
    renderNotifications &&
    items.push(notifications(renderNotifications));
  isLoggedIn &&
    renderProfileDropdown &&
    items.push(profile(renderProfileDropdown));
  userHasRole('free') && items.push(upgradeToPro);
  !isLoggedIn && items.push(login, signUp);

  return <AppHeader items={items} />;
};
