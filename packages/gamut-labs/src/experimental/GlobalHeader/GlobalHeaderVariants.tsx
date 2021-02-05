import { ReactNode } from 'react';

import { AppHeaderItem } from '../AppHeader/AppHeaderElements/types';
import {
  communityDropdown,
  courseCatalog,
  forEnterprise,
  freeProfile,
  login,
  logo,
  myHome,
  notifications,
  plansPricingDropdown,
  proLogo,
  proProfile,
  resourcesDropdown,
  search,
  signUp,
  upgradeToPro,
} from './GlobalHeaderItems';
import { User } from './types';

export type FormattedAppHeaderItems = {
  left: AppHeaderItem[];
  right: AppHeaderItem[];
};

export type FormattedAppHeaderMobileItems = FormattedAppHeaderItems & {
  mainMenu: AppHeaderItem[];
};

const anonHeaderItems = (
  renderLogin: boolean,
  renderSignUp: boolean,
  renderSearch?: () => ReactNode
): FormattedAppHeaderItems => {
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
): FormattedAppHeaderItems => {
  return anonHeaderItems(true, true, renderSearch);
};

export const anonLandingHeaderItems = (): FormattedAppHeaderItems => {
  return anonHeaderItems(true, false);
};

export const anonLoginHeaderItems = (
  renderSearch?: () => ReactNode
): FormattedAppHeaderItems => {
  return anonHeaderItems(false, true, renderSearch);
};

export const anonSignupHeaderItems = (
  renderSearch?: () => ReactNode
): FormattedAppHeaderItems => {
  return anonHeaderItems(true, false, renderSearch);
};

export const freeHeaderItems = (
  user: User,
  renderSearch?: () => ReactNode,
  renderNotifications?: () => ReactNode
): FormattedAppHeaderItems => {
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
  rightItems.push(freeProfile(user));
  rightItems.push(upgradeToPro);

  return {
    left: leftItems,
    right: rightItems,
  };
};

export const proHeaderItems = (
  user: User,
  renderSearch?: () => ReactNode,
  renderNotifications?: () => ReactNode
): FormattedAppHeaderItems => {
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
  rightItems.push(proProfile(user));

  return {
    left: leftItems,
    right: rightItems,
  };
};
