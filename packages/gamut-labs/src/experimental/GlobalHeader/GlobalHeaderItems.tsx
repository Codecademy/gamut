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
  SupportIcon,
} from '@codecademy/gamut-icons';
import { ReactNode } from 'react';

import {
  AppHeaderFillButtonItem,
  AppHeaderLinkItem,
  AppHeaderLogoItem,
  AppHeaderProfileDropdownItem,
  AppHeaderRenderElementItem,
  AppHeaderSimpleDropdownItem,
  AppHeaderTextButtonItem,
} from '../AppHeader/AppHeaderElements/types';
import { User } from './types';

export const logo: AppHeaderLogoItem = {
  dataTestId: 'header-logo',
  id: 'logo',
  href: '/',
  pro: false,
  trackingTarget: 'topnav_logo',
  type: 'logo',
};

export const proLogo: AppHeaderLogoItem = {
  dataTestId: 'header-pro-logo',
  href: '/',
  id: 'pro-logo',
  pro: true,
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
  text: 'Course Catalog',
  href: '/catalog',
  trackingTarget: 'topnav_catalog',
  type: 'link',
};

export const resourcesDropdown: AppHeaderSimpleDropdownItem = {
  icon: NotebookIcon,
  id: 'resources',
  text: 'Resources',
  popover: [
    {
      id: 'cheatsheets',
      href: '/resources/cheatsheets/all',
      trackingTarget: 'topnav_resources_cheatsheets',
      text: 'Cheatsheets',
      type: 'link',
    },
    {
      id: 'articles',
      href: '/articles',
      trackingTarget: 'topnav_resources_articles',
      text: 'Articles',
      type: 'link',
    },
    {
      id: 'blog',
      href: 'https://news.codecademy.com/',
      trackingTarget: 'topnav_resources_blog',
      text: 'Blog',
      type: 'link',
    },
  ],
  trackingTarget: 'topnav_resources',
  type: 'dropdown',
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
      text: 'Forums',
      type: 'link',
    },
    {
      id: 'chat',
      href: 'https://discord.com/invite/codecademy',
      newTab: true,
      trackingTarget: 'topnav_chat',
      text: 'Chat',
      type: 'link',
    },
    {
      id: 'chapters',
      href: 'https://community.codecademy.com/',
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
  ],
  trackingTarget: 'topnav_community',
  type: 'dropdown',
};

export const pricingDropdown: AppHeaderSimpleDropdownItem = {
  icon: AccountingCoinsIcon,
  id: 'pricing',
  text: 'Pro Pricing',
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
  ],
  trackingTarget: 'topnav_pricing',
  type: 'dropdown',
};

export const forBusiness: AppHeaderLinkItem = {
  icon: BriefcaseIcon,
  id: 'for-business',
  trackingTarget: 'topnav_business',
  text: 'For Business',
  href: '/business',
  type: 'link',
};

export const search = (
  renderSearch: () => ReactNode
): AppHeaderRenderElementItem => {
  return {
    id: 'search',
    renderElement: renderSearch,
    type: 'render-element',
  };
};

export const notifications = (
  renderNotifications: () => ReactNode
): AppHeaderRenderElementItem => {
  return {
    id: 'notifications',
    renderElement: renderNotifications,
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

const profileBusiness: AppHeaderLinkItem = {
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

export const freeProfile = (user: User): AppHeaderProfileDropdownItem => {
  return {
    avatar: user.avatar,
    displayName: user.displayName,
    id: 'profile',
    text: 'Profile',
    popover: [
      [profileMyProfile, profileAccount, profileMyHome, profileHelpCenter],
      [profileLogOut],
    ],
    trackingTarget: 'topnav_profile',
    type: 'profile-dropdown',
  };
};

export const proProfile = (user: User): AppHeaderProfileDropdownItem => {
  const popover = [];
  popover.push([
    profileMyProfile,
    profileAccount,
    profileMyHome,
    profileBusiness,
    profileHelpCenter,
  ]);

  const adminSection = [];
  user.isAdmin && adminSection.push(profileAdmin);
  user.isCustomerSupport && adminSection.push(profileCustomerSupport);
  user.isAdmin && adminSection.push(profileReportBug);
  popover.push(adminSection);

  popover.push([profileLogOut]);
  return {
    avatar: user.avatar,
    displayName: user.displayName,
    id: 'profile',
    text: 'Profile',
    popover,
    trackingTarget: 'topnav_profile',
    type: 'profile-dropdown',
  };
};

export const upgradeToPro: AppHeaderFillButtonItem = {
  id: 'upgrade-to-pro',
  text: 'Try Pro For Free',
  href: '/pro/membership',
  trackingTarget: 'topnav_pro_trial',
  type: 'fill-button',
};

export const login: AppHeaderTextButtonItem = {
  dataTestId: 'header-sign-in',
  id: 'login',
  text: 'Log In',
  href: '/login',
  trackingTarget: 'topnav_login',
  type: 'text-button',
};

export const signUp: AppHeaderFillButtonItem = {
  dataTestId: 'header-sign-up',
  id: 'signup',
  text: 'Sign Up',
  href: '/register',
  trackingTarget: 'topnav_signup',
  type: 'fill-button',
};
