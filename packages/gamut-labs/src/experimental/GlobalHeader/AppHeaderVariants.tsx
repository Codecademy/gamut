import { ReactElement } from 'react';

import { AppHeaderItemsProp } from '../AppHeader';
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

export const anonHeaderItems = (
  renderSearch?: () => ReactElement
): AppHeaderItemsProp => {
  const leftItems: AppHeaderItem[] = [
    logoItem,
    courseCatalog,
    resourcesDropdown,
    communityDropdown,
    plansPricingDropdown,
  ];
  renderSearch && leftItems.push(search(renderSearch));

  return {
    left: leftItems,
    right: [login, signUp],
  };
};

export const freeHeaderItems = (
  renderSearch?: () => ReactElement,
  renderNotifications?: () => ReactElement,
  renderProfile?: () => ReactElement
): AppHeaderItemsProp => {
  const leftItems: AppHeaderItem[] = [
    logoItem,
    myHome,
    courseCatalog,
    resourcesDropdown,
    communityDropdown,
    plansPricingDropdown,
  ];
  renderSearch && leftItems.push(search(renderSearch));
  renderNotifications && leftItems.push(notifications(renderNotifications));
  renderProfile && leftItems.push(profile(renderProfile));

  return {
    left: leftItems,
    right: [upgradeToPro],
  };
};

export const proHeaderItems = (
  renderSearch?: () => ReactElement,
  renderNotifications?: () => ReactElement,
  renderProfile?: () => ReactElement
): AppHeaderItemsProp => {
  const leftItems: AppHeaderItem[] = [
    proLogoItem,
    myHome,
    courseCatalog,
    resourcesDropdown,
    communityDropdown,
  ];
  renderSearch && leftItems.push(search(renderSearch));
  renderNotifications && leftItems.push(notifications(renderNotifications));
  renderProfile && leftItems.push(profile(renderProfile));

  return {
    left: leftItems,
    right: [],
  };
};
