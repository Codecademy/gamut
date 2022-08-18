import { ReactNode } from 'react';

import { AppHeaderItem } from '../AppHeader/AppHeaderElements/types';
import {
  FormattedAppHeaderItems,
  FormattedMobileAppHeaderItems,
} from '../AppHeader/types';
import {
  bookmarks,
  businessSolutions,
  catalogDropdown,
  communityDropdown,
  courseCatalog,
  favorites,
  freeProfile,
  login,
  logo,
  myHome,
  pricingDropdown,
  pricingLink,
  proProfile,
  refreshedResourcesDropdown,
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

const resourcesComponent = (user?: User) =>
  user?.useNewCatalogDropdown ? refreshedResourcesDropdown : resourcesDropdown;

// Simplify pricing dropdown to a normal link for users in India
const pricingComponent = (user?: User) =>
  user?.geo === 'IN' ? pricingLink : pricingDropdown;

const anonHeaderItems = (
  renderLogin: boolean,
  renderSignUp: boolean,
  hidePricing?: boolean,
  user?: User,
  renderBookmarks?: () => ReactNode
): FormattedAppHeaderItems => {
  const leftItems: AppHeaderItem[] = [
    logo,
    catalogComponent(user),
    resourcesComponent(user),
    communityDropdown,
    ...(hidePricing ? [] : [pricingComponent(user)]),
    businessSolutions,
  ];

  const rightItems: AppHeaderItem[] = [];
  if (renderBookmarks) {
    rightItems.push(bookmarks(renderBookmarks));
  }
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
  user?: User,
  renderBookmarks?: () => ReactNode
): FormattedMobileAppHeaderItems => {
  const leftItems: AppHeaderItem[] = [logo];

  const rightItems: AppHeaderItem[] = [];
  if (renderBookmarks) {
    rightItems.push(bookmarks(renderBookmarks));
  }
  if (renderLogin) {
    rightItems.push(login);
  }
  if (renderSignUp) {
    rightItems.push(signUp);
  }

  const mainMenuItems: AppHeaderItem[] = [
    catalogComponent(user),
    resourcesComponent(user),
    communityDropdown,
    ...(hidePricing ? [] : [pricingComponent(user)]),
    businessSolutions,
  ];

  return {
    left: leftItems,
    right: rightItems,
    mainMenu: mainMenuItems,
  };
};

export const anonDefaultHeaderItems = (
  hidePricing?: boolean,
  user?: User,
  renderBookmarks?: () => ReactNode
): FormattedAppHeaderItems => {
  return anonHeaderItems(true, true, hidePricing, user, renderBookmarks);
};

export const anonDefaultMobileHeaderItems = (
  hidePricing?: boolean,
  user?: User,
  renderBookmarks?: () => ReactNode
): FormattedMobileAppHeaderItems => {
  return anonMobileHeaderItems(true, true, hidePricing, user, renderBookmarks);
};

export const anonLandingHeaderItems = (
  hidePricing?: boolean,
  user?: User,
  renderBookmarks?: () => ReactNode
): FormattedAppHeaderItems => {
  return anonHeaderItems(true, false, hidePricing, user, renderBookmarks);
};

export const anonLandingMobileHeaderItems = (
  hidePricing?: boolean,
  user?: User,
  renderBookmarks?: () => ReactNode
): FormattedMobileAppHeaderItems => {
  return anonMobileHeaderItems(true, false, hidePricing, user, renderBookmarks);
};

export const anonLoginHeaderItems = (
  hidePricing?: boolean,
  user?: User,
  renderBookmarks?: () => ReactNode
): FormattedAppHeaderItems => {
  return anonHeaderItems(false, true, hidePricing, user, renderBookmarks);
};

export const anonLoginMobileHeaderItems = (
  hidePricing?: boolean,
  user?: User,
  renderBookmarks?: () => ReactNode
): FormattedMobileAppHeaderItems => {
  return anonMobileHeaderItems(false, true, hidePricing, user, renderBookmarks);
};

export const anonSignupHeaderItems = (
  hidePricing?: boolean,
  user?: User,
  renderBookmarks?: () => ReactNode
): FormattedAppHeaderItems => {
  return anonHeaderItems(true, false, hidePricing, user, renderBookmarks);
};

export const anonSignupMobileHeaderItems = (
  hidePricing?: boolean,
  user?: User,
  renderBookmarks?: () => ReactNode
): FormattedMobileAppHeaderItems => {
  return anonMobileHeaderItems(true, false, hidePricing, user, renderBookmarks);
};

export const freeHeaderItems = (
  user: User,
  hidePricing?: boolean,
  renderFavorites?: () => ReactNode,
  renderBookmarks?: () => ReactNode
): FormattedAppHeaderItems => {
  const specialLogo = { ...logo, checkMini: true };

  const leftItems: AppHeaderItem[] = [
    specialLogo,
    myHome,
    catalogComponent(user),
    resourcesComponent(user),
    communityDropdown,
    ...(hidePricing ? [] : [pricingComponent(user)]),
    businessSolutions,
  ];

  const rightItems: AppHeaderItem[] = [];
  if (renderFavorites) {
    rightItems.push(favorites(renderFavorites));
  } else if (renderBookmarks) {
    // only allow bookmarks render if user wasn't also part of favs
    rightItems.push(bookmarks(renderBookmarks));
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
  hidePricing?: boolean,
  renderBookmarks?: () => ReactNode
): FormattedMobileAppHeaderItems => {
  const specialLogo = { ...logo, checkMini: true };
  const leftItems: AppHeaderItem[] = [specialLogo];
  const rightItems: AppHeaderItem[] = [];
  const mainMenuItems: AppHeaderItem[] = [
    myHome,
    catalogComponent(user),
    resourcesComponent(user),
    communityDropdown,
    ...(hidePricing ? [] : [pricingComponent(user)]),
    businessSolutions,
    freeProfile(user, true),
    user.showProUpgrade
      ? upgradeToPro(user.proCheckoutUrl)
      : tryProForFree(user.proCheckoutUrl),
  ];

  if (renderBookmarks) {
    rightItems.push(bookmarks(renderBookmarks));
  }

  return {
    left: leftItems,
    right: rightItems,
    mainMenu: mainMenuItems,
  };
};

export const proHeaderItems = (
  user: User,
  renderFavorites?: () => ReactNode,
  renderBookmarks?: () => ReactNode
): FormattedAppHeaderItems => {
  const leftItems: AppHeaderItem[] = [
    logo,
    myHome,
    catalogComponent(user),
    resourcesComponent(user),
    communityDropdown,
    businessSolutions,
  ];

  const rightItems: AppHeaderItem[] = [];
  if (renderFavorites) {
    rightItems.push(favorites(renderFavorites));
  } else if (renderBookmarks) {
    // only allow bookmarks render if user wasn't also part of favs
    rightItems.push(bookmarks(renderBookmarks));
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
  user: User,
  renderBookmarks?: () => ReactNode
): FormattedMobileAppHeaderItems => {
  const leftItems: AppHeaderItem[] = [logo];
  const rightItems: AppHeaderItem[] = [];

  const mainMenuItems: AppHeaderItem[] = [
    myHome,
    catalogComponent(user),
    resourcesComponent(user),
    communityDropdown,
    businessSolutions,
    proProfile(user),
  ];

  if (user.isPaused) {
    mainMenuItems.push(unpausePro);
  }

  if (renderBookmarks) {
    rightItems.push(bookmarks(renderBookmarks));
  }

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
