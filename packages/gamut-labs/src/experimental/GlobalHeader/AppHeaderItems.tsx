import { ReactNode } from 'react';
import {
  AppHeaderFillButton,
  AppHeaderLink,
  AppHeaderLogo,
  AppHeaderPopover,
  AppHeaderProLogo,
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
      type: 'popover-item',
    },
    {
      id: 'articles',
      href: '/articles',
      text: 'Articles',
      type: 'popover-item',
    },
    {
      id: 'blog',
      href: 'https://news.codecademy.com/',
      text: 'Blog',
      type: 'popover-item',
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
      type: 'popover-item',
    },
    {
      id: 'chapters',
      href: 'https://community.codecademy.com/',
      text: 'Chapters',
      type: 'popover-item',
    },
    {
      id: 'events',
      href: '/events',
      text: 'Events',
      type: 'popover-item',
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
      type: 'popover-item',
    },
    {
      id: 'for-business',
      href: '/business',
      text: 'For Business',
      type: 'popover-item',
    },
    {
      id: 'for-students',
      href: '/student-center',
      text: 'For Students',
      type: 'popover-item',
    },
  ],
  type: 'popover',
};

export const search = (renderSearch: () => ReactNode): AppHeaderPopover => {
  return {
    id: 'search',
    icon: '',
    popover: renderSearch,
    type: 'popover',
  };
};

export const notifications = (
  renderNotifications: () => ReactNode
): AppHeaderPopover => {
  return {
    id: 'notifications',
    icon: '',
    popover: renderNotifications,
    type: 'popover',
  };
};

export const profile = (renderProfile: () => ReactNode): AppHeaderPopover => {
  return {
    id: 'profile',
    image: '',
    popover: renderProfile,
    type: 'popover',
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
