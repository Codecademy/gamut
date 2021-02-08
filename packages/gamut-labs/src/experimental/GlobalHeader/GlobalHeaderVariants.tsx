import { ReactNode } from 'react';

import { AppHeaderItem } from '../AppHeader/AppHeaderElements/types';
import {
  FormattedAppHeaderItems,
  FormattedMobileAppHeaderItems,
} from '../AppHeader/types';
import {
  communityDropdown,
  courseCatalog,
  forBusiness,
  freeProfile,
  login,
  logo,
  myHome,
  notifications,
  pricingDropdown,
  proLogo,
  proProfile,
  resourcesDropdown,
  search,
  signUp,
  upgradeToPro,
} from './GlobalHeaderItems';
import { User } from './types';

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
    pricingDropdown,
    forBusiness,
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

const anonMobileHeaderItems = (
  renderLogin: boolean,
  renderSignUp: boolean
): FormattedMobileAppHeaderItems => {
  const leftItems: AppHeaderItem[] = [logo];

  const rightItems: AppHeaderItem[] = [];
  renderLogin && rightItems.push(login);
  renderSignUp && rightItems.push(signUp);

  const mainMenuItems: AppHeaderItem[] = [
    courseCatalog,
    resourcesDropdown,
    communityDropdown,
    pricingDropdown,
    forBusiness,
  ];

  return {
    left: leftItems,
    right: rightItems,
    mainMenu: mainMenuItems,
  };
};

export const anonDefaultHeaderItems = (
  renderSearch?: () => ReactNode
): FormattedAppHeaderItems => {
  return anonHeaderItems(true, true, renderSearch);
};

export const anonDefaultMobileHeaderItems = (): FormattedMobileAppHeaderItems => {
  return anonMobileHeaderItems(true, true);
};

export const anonLandingHeaderItems = (): FormattedAppHeaderItems => {
  return anonHeaderItems(true, false);
};

export const anonLandingMobileHeaderItems = (): FormattedMobileAppHeaderItems => {
  return anonMobileHeaderItems(true, false);
};

export const anonLoginHeaderItems = (
  renderSearch?: () => ReactNode
): FormattedAppHeaderItems => {
  return anonHeaderItems(false, true, renderSearch);
};

export const anonLoginMobileHeaderItems = (): FormattedMobileAppHeaderItems => {
  return anonMobileHeaderItems(false, true);
};

export const anonSignupHeaderItems = (
  renderSearch?: () => ReactNode
): FormattedAppHeaderItems => {
  return anonHeaderItems(true, false, renderSearch);
};

export const anonSignupMobileHeaderItems = (): FormattedMobileAppHeaderItems => {
  return anonMobileHeaderItems(true, false);
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
    pricingDropdown,
    forBusiness,
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

export const freeMobileHeaderItems = (
  user: User,
  renderNotifications?: () => ReactNode
): FormattedMobileAppHeaderItems => {
  const leftItems: AppHeaderItem[] = [logo];

  const rightItems: AppHeaderItem[] = [];
  renderNotifications && rightItems.push(notifications(renderNotifications));

  const mainMenuItems: AppHeaderItem[] = [
    myHome,
    courseCatalog,
    resourcesDropdown,
    communityDropdown,
    pricingDropdown,
    forBusiness,
    freeProfile(user),
    upgradeToPro,
  ];

  return {
    left: leftItems,
    right: rightItems,
    mainMenu: mainMenuItems,
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

export const proMobileHeaderItems = (
  user: User,
  renderNotifications?: () => ReactNode
): FormattedMobileAppHeaderItems => {
  const leftItems: AppHeaderItem[] = [proLogo];

  const rightItems: AppHeaderItem[] = [];
  renderNotifications && rightItems.push(notifications(renderNotifications));

  const mainMenuItems: AppHeaderItem[] = [
    myHome,
    courseCatalog,
    resourcesDropdown,
    communityDropdown,
    proProfile(user),
  ];

  return {
    left: leftItems,
    right: rightItems,
    mainMenu: mainMenuItems,
  };
};

export const loadingHeaderItems: FormattedAppHeaderItems = {
  left: [logo],
  right: [],
};

export const loadingMobileHeaderItems: FormattedMobileAppHeaderItems = {
  left: [logo],
  right: [],
  mainMenu: [],
};
