import { ReactNode } from 'react';

import { AppHeaderItem } from '../AppHeader/AppHeaderElements/types';
import {
  FormattedAppHeaderItems,
  FormattedMobileAppHeaderItems,
} from '../AppHeader/types';
import {
  communityDropdown,
  courseCatalog,
  favorites,
  forBusiness,
  freeProfile,
  login,
  logo,
  myHome,
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
  renderSignUp: boolean,
  hidePricing?: boolean
): FormattedAppHeaderItems => {
  const leftItems: AppHeaderItem[] = [
    logo,
    courseCatalog,
    resourcesDropdown,
    communityDropdown,
    ...(hidePricing ? [] : [pricingDropdown]),
    forBusiness,
  ];

  const rightItems: AppHeaderItem[] = [];
  if (renderLogin) {
    rightItems.push(login);
  }
  if (renderSignUp) {
    rightItems.push(signUp);
  }

  return {
    left: leftItems,
    right: rightItems,
  };
};

const anonMobileHeaderItems = (
  renderLogin: boolean,
  renderSignUp: boolean,
  hidePricing?: boolean
): FormattedMobileAppHeaderItems => {
  const leftItems: AppHeaderItem[] = [logo];

  const rightItems: AppHeaderItem[] = [];
  if (renderLogin) {
    rightItems.push(login);
  }
  if (renderSignUp) {
    rightItems.push(signUp);
  }

  const mainMenuItems: AppHeaderItem[] = [
    courseCatalog,
    resourcesDropdown,
    communityDropdown,
    ...(hidePricing ? [] : [pricingDropdown]),
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

export const anonDefaultHeaderItems = (
  hidePricing?: boolean
): FormattedAppHeaderItems => {
  return anonHeaderItems(true, true, hidePricing);
};

export const anonDefaultMobileHeaderItems = (
  hidePricing?: boolean
): FormattedMobileAppHeaderItems => {
  return anonMobileHeaderItems(true, true, hidePricing);
};

export const anonLandingHeaderItems = (
  hidePricing?: boolean
): FormattedAppHeaderItems => {
  return anonHeaderItems(true, false, hidePricing);
};

export const anonLandingMobileHeaderItems = (
  hidePricing?: boolean
): FormattedMobileAppHeaderItems => {
  return anonMobileHeaderItems(true, false, hidePricing);
};

export const anonLoginHeaderItems = (
  hidePricing?: boolean
): FormattedAppHeaderItems => {
  return anonHeaderItems(false, true, hidePricing);
};

export const anonLoginMobileHeaderItems = (
  hidePricing?: boolean
): FormattedMobileAppHeaderItems => {
  return anonMobileHeaderItems(false, true, hidePricing);
};

export const anonSignupHeaderItems = (
  hidePricing?: boolean
): FormattedAppHeaderItems => {
  return anonHeaderItems(true, false, hidePricing);
};

export const anonSignupMobileHeaderItems = (
  hidePricing?: boolean
): FormattedMobileAppHeaderItems => {
  return anonMobileHeaderItems(true, false, hidePricing);
};

export const freeHeaderItems = (
  user: User,
  hidePricing?: boolean,
  renderFavorites?: () => ReactNode
): FormattedAppHeaderItems => {
  const leftItems: AppHeaderItem[] = [
    logo,
    myHome,
    courseCatalog,
    resourcesDropdown,
    communityDropdown,
    ...(hidePricing ? [] : [pricingDropdown]),
    forBusiness,
  ];

  const rightItems: AppHeaderItem[] = [];
  if (renderFavorites) {
    rightItems.push(favorites(renderFavorites));
  }

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
  hidePricing?: boolean
): FormattedMobileAppHeaderItems => {
  const leftItems: AppHeaderItem[] = [logo];
  const mainMenuItems: AppHeaderItem[] = [
    myHome,
    courseCatalog,
    resourcesDropdown,
    communityDropdown,
    ...(hidePricing ? [] : [pricingDropdown]),
    forBusiness,
    freeProfile(user),
    user.showProUpgrade
      ? upgradeToPro(user.proCheckoutUrl)
      : tryProForFree(user.proCheckoutUrl),
  ];

  return {
    left: leftItems,
    right: [],
    mainMenu: mainMenuItems,
  };
};

export const proHeaderItems = (
  user: User,
  renderFavorites?: () => ReactNode
): FormattedAppHeaderItems => {
  const leftItems: AppHeaderItem[] = [
    proLogo,
    myHome,
    courseCatalog,
    resourcesDropdown,
    communityDropdown,
  ];

  const rightItems: AppHeaderItem[] = [];
  if (renderFavorites) {
    rightItems.push(favorites(renderFavorites));
  }

  rightItems.push(proProfile(user));
  if (user.isPaused) {
    rightItems.push(unpausePro);
  }

  return {
    left: leftItems,
    right: rightItems,
  };
};

export const proMobileHeaderItems = (
  user: User
): FormattedMobileAppHeaderItems => {
  const leftItems: AppHeaderItem[] = [proLogo];

  const mainMenuItems: AppHeaderItem[] = [
    myHome,
    courseCatalog,
    resourcesDropdown,
    communityDropdown,
    proProfile(user),
  ];

  if (user.isPaused) {
    mainMenuItems.push(unpausePro);
  }

  return {
    left: leftItems,
    right: [],
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
