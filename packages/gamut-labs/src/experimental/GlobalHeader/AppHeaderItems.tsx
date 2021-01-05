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
  pro: false,
  target: 'topnav_logo',
  type: 'logo',
};

export const proLogoItem: AppHeaderLogo = {
  dataTestId: 'header-logo',
  id: 'pro-logo',
  pro: true,
  target: 'topnav_logo',
  type: 'logo',
};

export const myHome: AppHeaderLink = {
  dataTestId: 'header-home',
  id: 'my-home',
  text: 'My Home',
  href: '/learn',
  target: 'topnav_home',
  type: 'link',
};

export const courseCatalog: AppHeaderLink = {
  dataTestId: 'header-catalog',
  id: 'course-catalog',
  text: 'Course Catalog',
  href: '/catalog',
  target: 'topnav_catalog',
  type: 'link',
};

export const resourcesDropdown: AppHeaderPopover = {
  id: 'resources',
  text: 'Resources',
  popover: [
    {
      id: 'cheatsheets',
      href: '/resources/cheatsheets/all',
      target: 'topnav_resources_cheatsheets',
      text: 'Cheatsheets',
      type: 'link',
    },
    {
      id: 'articles',
      href: '/articles',
      target: 'topnav_resources_articles',
      text: 'Articles',
      type: 'link',
    },
    {
      id: 'blog',
      href: 'https://news.codecademy.com/',
      target: 'topnav_resources_blog',
      text: 'Blog',
      type: 'link',
    },
  ],
  target: 'topnav_resources',
  type: 'popover',
};

export const communityDropdown: AppHeaderPopover = {
  id: 'community',
  text: 'Community',
  popover: [
    {
      id: 'forums',
      href: 'https://discuss.codecademy.com/',
      target: 'topnav_community_forums',
      text: 'Forums',
      type: 'link',
    },
    {
      id: 'chapters',
      href: 'https://community.codecademy.com/',
      target: 'topnav_community_forums',
      text: 'Chapters',
      type: 'link',
    },
    {
      id: 'events',
      href: '/events',
      target: 'topnav_community_events',
      text: 'Events',
      type: 'link',
    },
  ],
  target: 'topnav_community',
  type: 'popover',
};

export const plansPricingDropdown: AppHeaderPopover = {
  id: 'plans-pricing',
  text: 'Plans + Pricing',
  popover: [
    {
      id: 'pro-membership',
      href: '/pricing',
      target: 'topnav_pro_membership',
      text: 'Pro Membership',
      type: 'link',
    },
    {
      id: 'for-business',
      href: '/business',
      target: 'topnav_pricing_business',
      text: 'For Business',
      type: 'link',
    },
    {
      id: 'for-students',
      href: '/student-center',
      target: 'topnav_pricing_business',
      text: 'For Students',
      type: 'link',
    },
  ],
  target: 'topnav_pricing',
  type: 'popover',
};

export const forEnterprise: AppHeaderLink = {
  id: 'for-enterprise',
  target: 'topnav_business',
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
  text: 'Upgrade to Pro',
  href: '/pro/membership',
  target: 'TODO', // TODO
  type: 'fill-button',
};

export const login: AppHeaderTextButton = {
  dataTestId: 'header-sign-in',
  id: 'login',
  text: 'Log In',
  href: '/login',
  target: 'topnav_login',
  type: 'text-button',
};

export const signUp: AppHeaderFillButton = {
  dataTestId: 'header-sign-up',
  id: 'signup',
  text: 'Sign Up',
  href: '/register',
  target: 'topnav_signup',
  type: 'fill-button',
};
