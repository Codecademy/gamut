import { ReactNode } from 'react';

import { AppHeaderItemsProp } from '../AppHeader';
import { AppHeaderItem } from '../AppHeader/AppHeaderElements/types';
import {
  communityDropdown,
  courseCatalog,
  forEnterprise,
  login,
  logo,
  myHome,
  notifications,
  plansPricingDropdown,
  profile,
  proLogo,
  resourcesDropdown,
  search,
  signUp,
  upgradeToPro,
} from './GlobalHeaderItems';

const anonHeaderItems = (
  renderLogin: boolean,
  renderSignUp: boolean,
  renderSearch?: () => ReactNode
): AppHeaderItemsProp => {
  const leftItems: AppHeaderItem[] = [
    logo,
    courseCatalog,
    resourcesDropdown,
    communityDropdown,
    plansPricingDropdown,
    forEnterprise,
  ];

  const rightItems: AppHeaderItem[] = [];
  renderSearch && rightItems.push(search(renderSearch));
  renderLogin && rightItems.push(login);
  renderSignUp && rightItems.push(signUp);

  return {
    left: leftItems,
    right: rightItems,
  };
};

export const anonDefaultHeaderItems = (
  renderSearch?: () => ReactNode
): AppHeaderItemsProp => {
  return anonHeaderItems(true, true, renderSearch);
};

export const anonLandingHeaderItems = (): AppHeaderItemsProp => {
  return anonHeaderItems(true, false);
};

export const anonLoginHeaderItems = (
  renderSearch?: () => ReactNode
): AppHeaderItemsProp => {
  return anonHeaderItems(false, true, renderSearch);
};

export const anonSignupHeaderItems = (
  renderSearch?: () => ReactNode
): AppHeaderItemsProp => {
  return anonHeaderItems(true, false, renderSearch);
};

export const freeHeaderItems = (
  renderSearch?: () => ReactNode,
  renderNotifications?: () => ReactNode,
  renderProfile?: () => ReactNode
): AppHeaderItemsProp => {
  const leftItems: AppHeaderItem[] = [
    logo,
    myHome,
    courseCatalog,
    resourcesDropdown,
    communityDropdown,
    plansPricingDropdown,
    forEnterprise,
  ];

  const rightItems: AppHeaderItem[] = [];
  renderSearch && rightItems.push(search(renderSearch));
  renderNotifications && rightItems.push(notifications(renderNotifications));
  renderProfile && rightItems.push(profile(renderProfile));
  rightItems.push(upgradeToPro);

  return {
    left: leftItems,
    right: rightItems,
  };
};

export const proHeaderItems = (
  renderSearch?: () => ReactNode,
  renderNotifications?: () => ReactNode,
  renderProfile?: () => ReactNode
): AppHeaderItemsProp => {
  const leftItems: AppHeaderItem[] = [
    proLogo,
    myHome,
    courseCatalog,
    resourcesDropdown,
    communityDropdown,
  ];

  const rightItems: AppHeaderItem[] = [];
  if (renderSearch) {
    rightItems.push(search(renderSearch));
  }

  if (renderNotifications) {
    rightItems.push(notifications(renderNotifications));
  }

  if (renderProfile) {
    rightItems.push(profile(renderProfile));
  }

  return {
    left: leftItems,
    right: rightItems,
  };
};
