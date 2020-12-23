import { ReactNode } from 'react';
import {
  AppHeaderFillButton,
  AppHeaderLink,
  AppHeaderLogo,
  AppHeaderPopover,
  AppHeaderProLogo,
  AppHeaderRenderPopover,
  AppHeaderTextButton,
} from '../AppHeader/types';

export const logoItem: AppHeaderLogo = {
  id: 'logo',
  type: 'logo',
};

export const proLogoItem: AppHeaderProLogo = {
  id: 'pro-logo',
  type: 'pro-logo',
};

export const myHome: AppHeaderLink = {
  id: 'my-home',
  text: 'My Home',
  href: '/learn',
  type: 'link',
};

export const courseCatalog: AppHeaderLink = {
  id: 'course-catalog',
  text: 'Course Catalog',
  href: '/catalog',
  type: 'link',
};

export const resourcesDropdown: AppHeaderPopover = {
  id: 'resources',
  text: 'Resources',
  popover: [
    {
      id: 'cheatsheets',
      href: '/resources/cheatsheets/all',
      text: 'Cheatsheets',
      type: 'link',
    },
    {
      id: 'articles',
      href: '/articles',
      text: 'Articles',
      type: 'link',
    },
    {
      id: 'blog',
      href: 'https://news.codecademy.com/',
      text: 'Blog',
      type: 'link',
    },
  ],
  type: 'popover',
};

export const communityDropdown: AppHeaderPopover = {
  id: 'community',
  text: 'Community',
  popover: [
    {
      id: 'forums',
      href: 'https://discuss.codecademy.com/',
      text: 'Forums',
      type: 'link',
    },
    {
      id: 'chapters',
      href: 'https://community.codecademy.com/',
      text: 'Chapters',
      type: 'link',
    },
    {
      id: 'events',
      href: '/events',
      text: 'Events',
      type: 'link',
    },
  ],
  type: 'popover',
};

export const plansPricingDropdown: AppHeaderPopover = {
  id: 'plans-pricing',
  text: 'Plans + Pricing',
  popover: [
    {
      id: 'pro-membership',
      href: '/pricing',
      text: 'Pro Membership',
      type: 'link',
    },
    {
      id: 'for-business',
      href: '/business',
      text: 'For Business',
      type: 'link',
    },
    {
      id: 'for-students',
      href: '/student-center',
      text: 'For Students',
      type: 'link',
    },
  ],
  type: 'popover',
};

export const search = (
  renderSearch: () => ReactNode
): AppHeaderRenderPopover => {
  return {
    id: 'search',
    icon: '',
    popover: renderSearch,
    type: 'render-popover',
  };
};

export const notifications = (
  renderNotifications: () => ReactNode
): AppHeaderRenderPopover => {
  return {
    id: 'notifications',
    icon: '',
    popover: renderNotifications,
    type: 'render-popover',
  };
};

export const profile = (
  renderProfile: () => ReactNode
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
  type: 'fill-button',
};

export const login: AppHeaderTextButton = {
  id: 'login',
  text: 'Log In',
  href: '/login',
  type: 'text-button',
};

export const signUp: AppHeaderFillButton = {
  id: 'signup',
  text: 'Sign Up',
  href: '/register',
  type: 'fill-button',
};
