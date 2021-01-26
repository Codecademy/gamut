import { PersonIcon } from '@codecademy/gamut-icons';
import { ReactNode } from 'react';

import {
  AppHeaderDropdownItem,
  AppHeaderFillButtonItem,
  AppHeaderLinkItem,
  AppHeaderLogoItem,
  AppHeaderProfileDropdownItem,
  AppHeaderRenderElementItem,
  AppHeaderTextButtonItem,
} from '../AppHeader/AppHeaderElements/types';

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
  id: 'my-home',
  text: 'My Home',
  href: '/learn',
  trackingTarget: 'topnav_home',
  type: 'link',
};

export const courseCatalog: AppHeaderLinkItem = {
  dataTestId: 'header-catalog',
  id: 'course-catalog',
  text: 'Course Catalog',
  href: '/catalog',
  trackingTarget: 'topnav_catalog',
  type: 'link',
};

export const resourcesDropdown: AppHeaderDropdownItem = {
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

export const communityDropdown: AppHeaderDropdownItem = {
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
      trackingTarget: 'topnav_community_forums',
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

export const plansPricingDropdown: AppHeaderDropdownItem = {
  id: 'plans-pricing',
  text: 'Plans + Pricing',
  popover: [
    {
      id: 'pro-membership',
      href: '/pricing',
      trackingTarget: 'topnav_pro_membership',
      text: 'Pro Membership',
      type: 'link',
    },
    {
      id: 'for-business',
      href: '/business',
      trackingTarget: 'topnav_pricing_business',
      text: 'For Business',
      type: 'link',
    },
    {
      id: 'for-students',
      href: '/student-center',
      trackingTarget: 'topnav_pricing_business',
      text: 'For Students',
      type: 'link',
    },
  ],
  trackingTarget: 'topnav_pricing',
  type: 'dropdown',
};

export const forEnterprise: AppHeaderLinkItem = {
  id: 'for-enterprise',
  trackingTarget: 'topnav_business',
  text: 'For Enterprise',
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

export const freeProfile = (
  avatar: string,
  displayName: string
): AppHeaderProfileDropdownItem => {
  return {
    avatar,
    displayName,
    id: 'profile',
    text: 'Profile',
    popover: [
      {
        id: 'my-profile',
        href: '/profiles/me',
        trackingTarget: 'avatar_my_profile',
        text: 'Profile',
        type: 'link',
      },
      {
        id: 'account',
        href: '/account',
        trackingTarget: 'avatar_settings',
        text: 'Account + Billing',
        type: 'link',
      },
      {
        id: 'my-home',
        href: '/learn',
        trackingTarget: 'avatar_dashboard',
        text: 'My Home',
        type: 'link',
      },
      {
        id: 'help-center',
        href: '/help',
        trackingTarget: 'avatar_help',
        text: 'Help Center',
        type: 'link',
      },
      {
        id: 'log-out',
        href: '/sign_out',
        trackingTarget: 'avatar_log_out',
        text: 'Log Out',
        type: 'link',
      },
    ],
    trackingTarget: 'topnav_pricing',
    type: 'profile-dropdown',
  };
};

export const proProfile = (
  avatar: string,
  displayName: string
): AppHeaderProfileDropdownItem => {
  return {
    avatar,
    displayName,
    id: 'profile',
    text: 'Profile',
    popover: [
      {
        id: 'my-profile',
        href: '/profiles/me',
        trackingTarget: 'avatar_my_profile',
        text: 'Profile',
        type: 'link',
      },
      {
        id: 'account',
        href: '/account',
        trackingTarget: 'avatar_settings',
        text: 'Account + Billing',
        type: 'link',
      },
      {
        id: 'my-home',
        href: '/learn',
        trackingTarget: 'avatar_dashboard',
        text: 'My Home',
        type: 'link',
      },
      {
        id: 'business',
        href: '/business/plans',
        trackingTarget: 'avatar_business',
        text: 'Business Account Management',
        type: 'link',
      },
      {
        id: 'help-center',
        href: '/help',
        trackingTarget: 'avatar_help',
        text: 'Help Center',
        type: 'link',
      },
      {
        id: 'log-out',
        href: '/sign_out',
        trackingTarget: 'avatar_log_out',
        text: 'Log Out',
        type: 'link',
      },
    ],
    trackingTarget: 'topnav_pricing',
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
