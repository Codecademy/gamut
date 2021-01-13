import { ReactElement } from 'react';

import {
  AppHeaderFillButtonItem,
  AppHeaderLinkItem,
  AppHeaderLogoItem,
  AppHeaderPopoverItem,
  AppHeaderRenderPopoverItem,
  AppHeaderTextButtonItem,
} from '../AppHeader/types';

export const logo: AppHeaderLogoItem = {
  dataTestId: 'header-logo',
  id: 'logo',
  href: '/',
  pro: false,
  trackingTarget: 'topnav_logo',
  type: 'logo',
};

export const proLogo: AppHeaderLogoItem = {
  dataTestId: 'header-logo',
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

export const resourcesDropdown: AppHeaderPopoverItem = {
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
  type: 'popover',
};

export const communityDropdown: AppHeaderPopoverItem = {
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
  type: 'popover',
};

export const plansPricingDropdown: AppHeaderPopoverItem = {
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
  type: 'popover',
};

export const forEnterprise: AppHeaderLinkItem = {
  id: 'for-enterprise',
  trackingTarget: 'topnav_business',
  text: 'For Enterprise',
  href: '/business',
  type: 'link',
};

export const search = (
  renderSearch: () => ReactElement
): AppHeaderRenderPopoverItem => {
  return {
    id: 'search',
    icon: '',
    popover: renderSearch,
    type: 'render-popover',
  };
};

export const notifications = (
  renderNotifications: () => ReactElement
): AppHeaderRenderPopoverItem => {
  return {
    id: 'notifications',
    icon: '',
    popover: renderNotifications,
    type: 'render-popover',
  };
};

export const profile = (
  renderProfile: () => ReactElement
): AppHeaderRenderPopoverItem => {
  return {
    id: 'profile',
    image: '',
    popover: renderProfile,
    type: 'render-popover',
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
