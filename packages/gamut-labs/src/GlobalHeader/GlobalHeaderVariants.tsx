import { ReactNode } from 'react';

import {
  AppHeaderExtraLinks,
  AppHeaderItem,
} from '../AppHeader/AppHeaderElements/types';
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
  getPricingDropdown,
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
import { AnonHeaderItemsParams, User } from './types';

const anonHeaderItems = ({
  renderLogin,
  renderSignUp,
  extraLinks = {},
  hidePricing,
}: AnonHeaderItemsParams): FormattedAppHeaderItems => {
  const pricingItems = hidePricing
    ? []
    : [getPricingDropdown(extraLinks.pricing)];
  const leftItems: AppHeaderItem[] = [
    logo,
    courseCatalog,
    resourcesDropdown,
    communityDropdown,
    ...pricingItems,
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

const anonMobileHeaderItems = ({
  renderLogin,
  renderSignUp,
  extraLinks = {},
  hidePricing,
}: AnonHeaderItemsParams): FormattedMobileAppHeaderItems => {
  const leftItems: AppHeaderItem[] = [logo];

  const rightItems: AppHeaderItem[] = [];
  if (renderLogin) {
    rightItems.push(login);
  }
  if (renderSignUp) {
    rightItems.push(signUp);
  }

  const pricingItems = hidePricing
    ? []
    : [getPricingDropdown(extraLinks.pricing)];

  const mainMenuItems: AppHeaderItem[] = [
    courseCatalog,
    resourcesDropdown,
    communityDropdown,
    ...pricingItems,
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
  extraLinks?: AppHeaderExtraLinks
): FormattedAppHeaderItems => {
  return anonHeaderItems({
    renderLogin: true,
    renderSignUp: true,
    extraLinks,
    hidePricing,
  });
};

export const anonDefaultMobileHeaderItems = (
  hidePricing?: boolean,
  extraLinks?: AppHeaderExtraLinks
): FormattedMobileAppHeaderItems => {
  return anonMobileHeaderItems({
    renderLogin: true,
    renderSignUp: true,
    extraLinks,
    hidePricing,
  });
};

export const anonLandingHeaderItems = (
  hidePricing?: boolean,
  extraLinks?: AppHeaderExtraLinks
): FormattedAppHeaderItems => {
  return anonHeaderItems({
    renderLogin: true,
    renderSignUp: false,
    extraLinks,
    hidePricing,
  });
};

export const anonLandingMobileHeaderItems = (
  hidePricing?: boolean,
  extraLinks?: AppHeaderExtraLinks
): FormattedMobileAppHeaderItems => {
  return anonMobileHeaderItems({
    renderLogin: true,
    renderSignUp: false,
    extraLinks,
    hidePricing,
  });
};

export const anonLoginHeaderItems = (
  hidePricing?: boolean,
  extraLinks?: AppHeaderExtraLinks
): FormattedAppHeaderItems => {
  return anonHeaderItems({
    renderLogin: false,
    renderSignUp: true,
    extraLinks,
    hidePricing,
  });
};

export const anonLoginMobileHeaderItems = (
  hidePricing?: boolean,
  extraLinks?: AppHeaderExtraLinks
): FormattedMobileAppHeaderItems => {
  return anonMobileHeaderItems({
    renderLogin: false,
    renderSignUp: true,
    extraLinks,
    hidePricing,
  });
};

export const anonSignupHeaderItems = (
  hidePricing?: boolean,
  extraLinks?: AppHeaderExtraLinks
): FormattedAppHeaderItems => {
  return anonHeaderItems({
    renderLogin: true,
    renderSignUp: false,
    extraLinks,
    hidePricing,
  });
};

export const anonSignupMobileHeaderItems = (
  hidePricing?: boolean,
  extraLinks?: AppHeaderExtraLinks
): FormattedMobileAppHeaderItems => {
  return anonMobileHeaderItems({
    renderLogin: true,
    renderSignUp: false,
    extraLinks,
    hidePricing,
  });
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
    proProfile(user, true),
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
