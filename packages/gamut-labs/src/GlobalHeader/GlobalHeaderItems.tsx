import {
  AccountingCoinsIcon,
  BookFlipPageIcon,
  BriefcaseIcon,
  CommunityIcon,
  GearIcon,
  HouseEntranceIcon,
  NotebookIcon,
  PersonIcon,
  PieLineGraphIcon,
  RatingStarGiveIcon,
  SupportIcon,
} from '@codecademy/gamut-icons';
import { ReactNode } from 'react';

import {
  AppHeaderCatalogDropdownItem,
  AppHeaderFillButtonItem,
  AppHeaderLinkItem,
  AppHeaderLogoItem,
  AppHeaderProfileDropdownItem,
  AppHeaderRenderElementItem,
  AppHeaderResourcesDropdownItem,
  AppHeaderSimpleDropdownItem,
  AppHeaderTextButtonItem,
} from '../AppHeader/AppHeaderElements/types';
import { headerResourcesList } from '../lib/resourcesList';
import { User } from './types';

export const logo: AppHeaderLogoItem = {
  dataTestId: 'header-logo',
  id: 'logo',
  href: '/',
  pro: false,
  trackingTarget: 'topnav_logo',
  type: 'logo',
};

export const myHome: AppHeaderLinkItem = {
  dataTestId: 'header-home',
  icon: HouseEntranceIcon,
  id: 'my-home',
  text: 'My Home',
  href: '/learn',
  trackingTarget: 'topnav_home',
  type: 'link',
};

export const courseCatalog: AppHeaderLinkItem = {
  dataTestId: 'header-catalog',
  icon: BookFlipPageIcon,
  id: 'course-catalog',
  text: 'Catalog',
  href: '/catalog',
  trackingTarget: 'topnav_catalog',
  type: 'link',
};

export const catalogDropdown = (
  hideCareerPaths?: boolean
): AppHeaderCatalogDropdownItem => ({
  dataTestId: 'header-catalog',
  icon: BookFlipPageIcon,
  id: 'catalog-dropdown',
  text: 'Catalog',
  trackingTarget: 'topnav_catalog',
  type: 'catalog-dropdown',
  hideCareerPaths,
});

export const resourcesDropdown: AppHeaderSimpleDropdownItem = {
  icon: NotebookIcon,
  id: 'resources',
  text: 'Resources',
  popover: headerResourcesList,
  trackingTarget: 'topnav_resources',
  type: 'dropdown',
};

export const refreshedResourcesDropdown: AppHeaderResourcesDropdownItem = {
  dataTestId: 'header-resources',
  icon: NotebookIcon,
  id: 'experimental-resources-dropdown',
  text: 'Resources',
  trackingTarget: 'topnav_resources',
  type: 'experimental-resources-dropdown',
};

export const communityDropdown: AppHeaderSimpleDropdownItem = {
  icon: CommunityIcon,
  id: 'community',
  text: 'Community',
  popover: [
    {
      id: 'forums',
      href: 'https://discuss.codecademy.com/',
      trackingTarget: 'topnav_community_forums',
      newTab: true,
      text: 'Forums',
      type: 'link',
    },
    {
      id: 'chat',
      href: 'https://discord.com/invite/codecademy',
      newTab: true,
      trackingTarget: 'topnav_chat',
      text: 'Discord',
      type: 'link',
    },
    {
      id: 'chapters',
      href: 'https://community.codecademy.com/',
      newTab: true,
      trackingTarget: 'topnav_community_chapters',
      text: 'Chapters',
      type: 'link',
    },
    {
      id: 'events',
      href: '/events',
      trackingTarget: 'topnav_community_events',
      text: 'Events',
      type: 'link',
    },
    {
      id: 'learner-stories',
      href: '/learner-stories',
      trackingTarget: 'topnav_learner_stories_hub',
      text: 'Learner Stories',
      type: 'link',
    },
  ],
  trackingTarget: 'topnav_community',
  type: 'dropdown',
};

export const pricingLink: AppHeaderLinkItem = {
  icon: AccountingCoinsIcon,
  id: 'pricing',
  href: '/pricing',
  text: 'Pricing',
  trackingTarget: 'topnav_pricing',
  type: 'link',
};

export const pricingDropdown: AppHeaderSimpleDropdownItem = {
  icon: AccountingCoinsIcon,
  id: 'pricing',
  text: 'Pricing',
  popover: [
    {
      id: 'pro-membership',
      href: '/pricing',
      trackingTarget: 'topnav_pro_membership',
      text: 'For Individuals',
      type: 'link',
    },
    {
      id: 'for-students',
      href: '/student-center',
      trackingTarget: 'topnav_pricing_students',
      text: 'For Students',
      type: 'link',
    },
    {
      id: 'for-teams',
      href: '/business#section-pricing-table',
      trackingTarget: 'topnav_pricing_business',
      text: 'For Teams',
      type: 'link',
    },
  ],
  trackingTarget: 'topnav_pricing',
  type: 'dropdown',
};

export const businessSolutions: AppHeaderLinkItem = {
  icon: BriefcaseIcon,
  id: 'business-solutions',
  trackingTarget: 'topnav_business',
  text: 'Business Solutions',
  href: '/business',
  type: 'link',
};

/**
 * Note: this is currently experimental!
 * This will be cleaned up as part of EGG-1644.
 */
export const favorites = (
  renderFavorites: () => ReactNode
): AppHeaderRenderElementItem => {
  return {
    id: 'favorites',
    renderElement: renderFavorites,
    type: 'render-element',
  };
};

const profileMyProfile: AppHeaderLinkItem = {
  id: 'my-profile',
  icon: PersonIcon,
  href: '/profiles/me',
  trackingTarget: 'avatar_my_profile',
  text: 'Profile',
  type: 'link',
};

const profileAccount: AppHeaderLinkItem = {
  id: 'account',
  icon: GearIcon,
  href: '/account',
  trackingTarget: 'avatar_settings',
  text: 'Account + Billing',
  type: 'link',
};

const profileMyHome: AppHeaderLinkItem = {
  id: 'my-home',
  icon: HouseEntranceIcon,
  href: '/learn',
  trackingTarget: 'avatar_dashboard',
  text: 'My Home',
  type: 'link',
};

const profileBusinessAccount: AppHeaderLinkItem = {
  id: 'business',
  icon: PieLineGraphIcon,
  href: '/business/plans',
  trackingTarget: 'avatar_business',
  text: 'Business Account Management',
  type: 'link',
};

const profileHelpCenter: AppHeaderLinkItem = {
  id: 'help-center',
  icon: SupportIcon,
  href: '/help',
  newTab: true,
  trackingTarget: 'avatar_help',
  text: 'Help Center',
  type: 'link',
};

const profileAdmin: AppHeaderLinkItem = {
  id: 'admin',
  dataTestId: 'admin-link',
  href: '/admin',
  trackingTarget: 'avatar_admin',
  text: 'Admin',
  type: 'link',
};

const profileCustomerSupport: AppHeaderLinkItem = {
  id: 'customer-support',
  href: '/admin/concessions',
  trackingTarget: 'avatar_customer_support',
  text: 'Customer Support',
  type: 'link',
};

const profileReportBug: AppHeaderLinkItem = {
  id: 'report-bug',
  href: 'https://codecademy.atlassian.net/servicedesk/customer/portal/9',
  newTab: true,
  trackingTarget: 'avatar_report_bug',
  text: 'Report a Bug [ADMIN]',
  type: 'link',
};

const profileLogOut: AppHeaderLinkItem = {
  id: 'log-out',
  href: '/sign_out',
  trackingTarget: 'avatar_log_out',
  text: 'Log Out',
  type: 'link',
};

export const freeProfile = (
  user: User,
  isMobile?: boolean
): AppHeaderProfileDropdownItem => {
  const topSection = [profileMyProfile];

  if (
    !user.hideBusinessAccount ||
    user.isBusinessAdmin ||
    !user.isBusinessSsoUser
  ) {
    topSection.push(profileBusinessAccount);
  }

  topSection.push(profileMyHome);

  if (!isMobile && user.isAccountManager) {
    topSection.push(profileBusinessAccount);
  }
  topSection.push(profileHelpCenter);

  const bottomSection = [profileLogOut];

  const popover = [topSection, bottomSection];

  return {
    avatar: user.avatar,
    userDisplayName: user.displayName,
    id: 'profile',
    text: 'Profile',
    popover,
    trackingTarget: 'topnav_profile',
    type: 'profile-dropdown',
  };
};

export const proProfile = (user: User): AppHeaderProfileDropdownItem => {
  const topSection = [profileMyProfile];

  if (user.isBusinessAdmin || !user.isBusinessSsoUser) {
    topSection.push(profileAccount);
  }

  topSection.push(profileMyHome);

  if (
    !user.hideBusinessAccount ||
    user.isBusinessAdmin ||
    !user.isBusinessSsoUser
  ) {
    topSection.push(profileBusinessAccount);
  }
  if (user.showReferrals) {
    topSection.push(referrals);
  }

  topSection.push(profileHelpCenter);

  const middleSection = [];
  if (user.isAdmin) {
    middleSection.push(profileAdmin);
  }
  if (user.isCustomerSupport) {
    middleSection.push(profileCustomerSupport);
  }
  if (user.isAdmin) {
    middleSection.push(profileReportBug);
  }

  const bottomSection = [profileLogOut];

  const popover = [topSection, middleSection, bottomSection];

  return {
    avatar: user.avatar,
    userDisplayName: user.displayName,
    id: 'profile',
    text: 'Profile',
    popover,
    trackingTarget: 'topnav_profile',
    type: 'profile-dropdown',
  };
};

export const tryProForFree = (
  checkoutUrl?: string
): AppHeaderFillButtonItem => ({
  dataTestId: 'upgrade-link',
  id: 'try-pro',
  text: 'Try Pro For Free',
  href: checkoutUrl || '/pages/pro',
  trackingTarget: 'topnav_pro_trial',
  type: 'fill-button',
});

export const upgradeToPro = (
  checkoutUrl?: string
): AppHeaderFillButtonItem => ({
  dataTestId: 'upgrade-link',
  id: 'upgrade-to-pro',
  text: 'Upgrade to Pro',
  href: checkoutUrl || '/pages/pro',
  trackingTarget: 'topnav_pro_upgrade',
  type: 'fill-button',
});

export const unpausePro: AppHeaderFillButtonItem = {
  dataTestId: 'unpause-link',
  id: 'unpause-pro',
  text: 'Unpause Now',
  href: '/account/billing',
  trackingTarget: 'topnav_pro_unpause',
  type: 'fill-button',
};

export const login: AppHeaderTextButtonItem = {
  dataTestId: 'header-sign-in',
  id: 'login',
  text: 'Log In',
  href: '/login',
  trackingTarget: 'topnav_login',
  type: 'text-button',
  redirect: true,
};

export const signUp: AppHeaderFillButtonItem = {
  dataTestId: 'header-sign-up',
  id: 'signup',
  text: 'Sign Up',
  href: '/register',
  trackingTarget: 'topnav_signup',
  type: 'fill-button',
  redirect: true,
};

export const referrals: AppHeaderLinkItem = {
  dataTestId: 'header-referrals',
  id: 'referrals',
  text: 'Give Pro, Get Pro',
  href: '/referrals',
  type: 'link',
  icon: RatingStarGiveIcon,
  trackingTarget: 'avatar_referrals',
};
