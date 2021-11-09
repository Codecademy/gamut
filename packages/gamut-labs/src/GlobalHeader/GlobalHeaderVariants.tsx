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
  renderGiftCardLink,
  hidePricing,
}: AnonHeaderItemsParams): FormattedAppHeaderItems => {
  const pricingItems = hidePricing
    ? []
    : [getPricingDropdown(renderGiftCardLink)];
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
  renderGiftCardLink,
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
    : [getPricingDropdown(renderGiftCardLink)];

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
  renderGiftCardLink?: boolean
): FormattedAppHeaderItems => {
  return anonHeaderItems({
    renderLogin: true,
    renderSignUp: true,
    renderGiftCardLink,
    hidePricing,
  });
};

export const anonDefaultMobileHeaderItems = (
  hidePricing?: boolean,
  renderGiftCardLink?: boolean
): FormattedMobileAppHeaderItems => {
  return anonMobileHeaderItems({
    renderLogin: true,
    renderSignUp: true,
    renderGiftCardLink,
    hidePricing,
  });
};

export const anonLandingHeaderItems = (
  hidePricing?: boolean
): FormattedAppHeaderItems => {
  return anonHeaderItems({
    renderLogin: true,
    renderSignUp: false,
    hidePricing,
  });
};

export const anonLandingMobileHeaderItems = (
  hidePricing?: boolean
): FormattedMobileAppHeaderItems => {
  return anonMobileHeaderItems({
    renderLogin: true,
    renderSignUp: false,
    hidePricing,
  });
};

export const anonLoginHeaderItems = (
  hidePricing?: boolean
): FormattedAppHeaderItems => {
  return anonHeaderItems({
    renderLogin: false,
    renderSignUp: true,
    hidePricing,
  });
};

export const anonLoginMobileHeaderItems = (
  hidePricing?: boolean
): FormattedMobileAppHeaderItems => {
  return anonMobileHeaderItems({
    renderLogin: false,
    renderSignUp: true,
    hidePricing,
  });
};

export const anonSignupHeaderItems = (
  hidePricing?: boolean
): FormattedAppHeaderItems => {
  return anonHeaderItems({
    renderLogin: true,
    renderSignUp: false,
    hidePricing,
  });
};

export const anonSignupMobileHeaderItems = (
  hidePricing?: boolean
): FormattedMobileAppHeaderItems => {
  return anonMobileHeaderItems({
    renderLogin: true,
    renderSignUp: false,
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
