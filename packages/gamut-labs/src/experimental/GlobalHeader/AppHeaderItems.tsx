import { ReactElement } from 'react';

import {
  AppHeaderFillButton,
  AppHeaderLink,
  AppHeaderLogo,
  AppHeaderPopover,
  AppHeaderRenderPopover,
  AppHeaderTextButton,
} from '../AppHeader/types';

export const logoItem: AppHeaderLogo = {
  dataTestId: 'header-logo',
  id: 'logo',
  href: '/',
  pro: false,
  trackingTarget: 'topnav_logo',
  type: 'logo',
};

export const proLogoItem: AppHeaderLogo = {
  dataTestId: 'header-logo',
  href: '/',
  id: 'pro-logo',
  pro: true,
  trackingTarget: 'topnav_logo',
  type: 'logo',
};

export const myHome: AppHeaderLink = {
  dataTestId: 'header-home',
  id: 'my-home',
  text: 'My Home',
  href: '/learn',
  trackingTarget: 'topnav_home',
  type: 'link',
};

export const courseCatalog: AppHeaderLink = {
  dataTestId: 'header-catalog',
  id: 'course-catalog',
  text: 'Course Catalog',
  href: '/catalog',
  trackingTarget: 'topnav_catalog',
  type: 'link',
};

export const resourcesDropdown: AppHeaderPopover = {
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

export const communityDropdown: AppHeaderPopover = {
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

export const plansPricingDropdown: AppHeaderPopover = {
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

export const forEnterprise: AppHeaderLink = {
  id: 'for-enterprise',
  trackingTarget: 'topnav_business',
  text: 'For Enterprise',
  href: '/business',
  type: 'link',
};

export const search = (
  renderSearch: () => ReactElement
): AppHeaderRenderPopover => {
  return {
    id: 'search',
    icon: '',
    popover: renderSearch,
    type: 'render-popover',
  };
};

export const notifications = (
  renderNotifications: () => ReactElement
): AppHeaderRenderPopover => {
  return {
    id: 'notifications',
    icon: '',
    popover: renderNotifications,
    type: 'render-popover',
  };
};

export const profile = (
  renderProfile: () => ReactElement
): AppHeaderRenderPopover => {
  return {
    id: 'profile',
    image: '',
    popover: renderProfile,
    type: 'render-popover',
  };
};

export const upgradeToPro: AppHeaderFillButton = {
  id: 'upgrade-to-pro',
  text: 'Try Pro For Free',
  href: '/pro/membership',
  trackingTarget: 'topnav_pro_trial',
  type: 'fill-button',
};

export const login: AppHeaderTextButton = {
  dataTestId: 'header-sign-in',
  id: 'login',
  text: 'Log In',
  href: '/login',
  trackingTarget: 'topnav_login',
  type: 'text-button',
};

export const signUp: AppHeaderFillButton = {
  dataTestId: 'header-sign-up',
  id: 'signup',
  text: 'Sign Up',
  href: '/register',
  trackingTarget: 'topnav_signup',
  type: 'fill-button',
};
