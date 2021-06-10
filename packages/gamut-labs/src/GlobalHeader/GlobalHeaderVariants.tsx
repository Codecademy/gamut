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
  signUp,
  tryProForFree,
  unpausePro,
  upgradeToPro,
} from './GlobalHeaderItems';
import { User } from './types';

const anonHeaderItems = (
  renderLogin: boolean,
  renderSignUp: boolean
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
    signUp,
    login,
  ];

  return {
    left: leftItems,
    right: rightItems,
    mainMenu: mainMenuItems,
  };
};

export const anonDefaultHeaderItems = (): FormattedAppHeaderItems => {
  return anonHeaderItems(true, true);
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

export const anonLoginHeaderItems = (): FormattedAppHeaderItems => {
  return anonHeaderItems(false, true);
};

export const anonLoginMobileHeaderItems = (): FormattedMobileAppHeaderItems => {
  return anonMobileHeaderItems(false, true);
};

export const anonSignupHeaderItems = (): FormattedAppHeaderItems => {
  return anonHeaderItems(true, false);
};

export const anonSignupMobileHeaderItems = (): FormattedMobileAppHeaderItems => {
  return anonMobileHeaderItems(true, false);
};

export const freeHeaderItems = (
  user: User,
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
  renderNotifications && rightItems.push(notifications(renderNotifications));
  rightItems.push(freeProfile(user));
  rightItems.push(
    user.showProUpgrade
      ? upgradeToPro(user.proCheckoutUrl)
      : tryProForFree(user.proCheckoutUrl)
  );

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
    freeProfile(user, true),
  ];

  mainMenuItems.push(
    user.showProUpgrade
      ? upgradeToPro(user.proCheckoutUrl)
      : tryProForFree(user.proCheckoutUrl)
  );

  return {
    left: leftItems,
    right: rightItems,
    mainMenu: mainMenuItems,
  };
};

export const proHeaderItems = (
  user: User,
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
  renderNotifications && rightItems.push(notifications(renderNotifications));
  rightItems.push(proProfile(user));
  user.isPaused && rightItems.push(unpausePro);

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
    proProfile(user, true),
  ];

  user.isPaused && mainMenuItems.push(unpausePro);

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
