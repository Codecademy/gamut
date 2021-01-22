import { ReactElement } from 'react';

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
  renderSearch?: () => ReactElement
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
  renderSearch?: () => ReactElement
): AppHeaderItemsProp => {
  return anonHeaderItems(true, true, renderSearch);
};

export const anonLandingHeaderItems = (): AppHeaderItemsProp => {
  return anonHeaderItems(true, false);
};

export const anonLoginHeaderItems = (
  renderSearch?: () => ReactElement
): AppHeaderItemsProp => {
  return anonHeaderItems(false, true, renderSearch);
};

export const anonSignupHeaderItems = (
  renderSearch?: () => ReactElement
): AppHeaderItemsProp => {
  return anonHeaderItems(true, false, renderSearch);
};

export const freeHeaderItems = (
  renderSearch?: () => ReactElement,
  renderNotifications?: () => ReactElement,
  renderProfile?: () => ReactElement
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
  renderSearch?: () => ReactElement,
  renderNotifications?: () => ReactElement,
  renderProfile?: () => ReactElement
): AppHeaderItemsProp => {
  const leftItems: AppHeaderItem[] = [
    proLogo,
    myHome,
    courseCatalog,
    resourcesDropdown,
    communityDropdown,
  ];

  const rightItems: AppHeaderItem[] = [];
  renderSearch && rightItems.push(search(renderSearch));
  renderNotifications && rightItems.push(notifications(renderNotifications));
  renderProfile && rightItems.push(profile(renderProfile));

  return {
    left: leftItems,
    right: rightItems,
  };
};
