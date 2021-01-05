import { ReactElement } from 'react';

import { AppHeaderItemsProp } from '../AppHeader';
import { AppHeaderItem } from '../AppHeader/types';
import {
  communityDropdown,
  courseCatalog,
  forEnterprise,
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
    forEnterprise,
  ];

  const rightItems: AppHeaderItem[] = [];
  renderSearch && rightItems.push(search(renderSearch));
  rightItems.concat([login, signUp]);

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
    logoItem,
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
  rightItems.concat([upgradeToPro]);

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
    proLogoItem,
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
