import { ReactNode } from 'react';

import { AppHeaderItem } from '../AppHeader/AppHeaderElements/types';
import {
  FormattedAppHeaderItems,
  FormattedMobileAppHeaderItems,
} from '../AppHeader/types';
import {
  catalogDropdown,
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

const catalogComponent = (user?: User) =>
  user?.useNewCatalogDropdown
    ? catalogDropdown(user?.hideCareerPaths)
    : courseCatalog;

const anonHeaderItems = (
  renderLogin: boolean,
  renderSignUp: boolean,
  hidePricing?: boolean,
  user?: User
): FormattedAppHeaderItems => {
  const leftItems: AppHeaderItem[] = [
    logo,
    catalogComponent(user),
    resourcesDropdown(user?.useNewCatalogDropdown),
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
  hidePricing?: boolean,
  user?: User
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
    catalogComponent(user),
    resourcesDropdown(user?.useNewCatalogDropdown),
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
  hidePricing?: boolean,
  user?: User
): FormattedAppHeaderItems => {
  return anonHeaderItems(true, true, hidePricing, user);
};

export const anonDefaultMobileHeaderItems = (
  hidePricing?: boolean,
  user?: User
): FormattedMobileAppHeaderItems => {
  return anonMobileHeaderItems(true, true, hidePricing, user);
};

export const anonLandingHeaderItems = (
  hidePricing?: boolean,
  user?: User
): FormattedAppHeaderItems => {
  return anonHeaderItems(true, false, hidePricing, user);
};

export const anonLandingMobileHeaderItems = (
  hidePricing?: boolean,
  user?: User
): FormattedMobileAppHeaderItems => {
  return anonMobileHeaderItems(true, false, hidePricing, user);
};

export const anonLoginHeaderItems = (
  hidePricing?: boolean,
  user?: User
): FormattedAppHeaderItems => {
  return anonHeaderItems(false, true, hidePricing, user);
};

export const anonLoginMobileHeaderItems = (
  hidePricing?: boolean,
  user?: User
): FormattedMobileAppHeaderItems => {
  return anonMobileHeaderItems(false, true, hidePricing, user);
};

export const anonSignupHeaderItems = (
  hidePricing?: boolean,
  user?: User
): FormattedAppHeaderItems => {
  return anonHeaderItems(true, false, hidePricing, user);
};

export const anonSignupMobileHeaderItems = (
  hidePricing?: boolean,
  user?: User
): FormattedMobileAppHeaderItems => {
  return anonMobileHeaderItems(true, false, hidePricing, user);
};

export const freeHeaderItems = (
  user: User,
  hidePricing?: boolean,
  renderFavorites?: () => ReactNode
): FormattedAppHeaderItems => {
  const leftItems: AppHeaderItem[] = [
    logo,
    myHome,
    catalogComponent(user),
    resourcesDropdown(user.useNewCatalogDropdown),
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
    catalogComponent(user),
    resourcesDropdown(user.useNewCatalogDropdown),
    communityDropdown,
    ...(hidePricing ? [] : [pricingDropdown]),
    forBusiness,
    freeProfile(user, true),
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
    catalogComponent(user),
    resourcesDropdown(user.useNewCatalogDropdown),
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
    catalogComponent(user),
    resourcesDropdown(user.useNewCatalogDropdown),
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
