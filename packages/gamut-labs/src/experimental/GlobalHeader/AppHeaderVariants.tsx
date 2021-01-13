import { ReactElement } from 'react';

import { AppHeaderItemsProp } from '../AppHeader';
import { AppHeaderItem } from '../AppHeader/types';
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
} from './AppHeaderItems';

export const anonHeaderItems = (
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
  rightItems.push(login);
  rightItems.push(signUp);

  return {
    left: leftItems,
    right: rightItems,
  };
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
