import { ReactNode } from 'react';
import {
  AppHeaderButton,
  AppHeaderLink,
  AppHeaderPopover,
  AppHeaderTab,
} from '../AppHeader/types';

export const logoItem: AppHeaderTab = {
  id: 'codecademy-logo',
  type: 'tab',
};

export const proLogoItem: AppHeaderTab = {
  id: 'codecademy-pro-logo',
  type: 'tab',
};

export const myHome: AppHeaderLink = {
  id: 'my-home',
  text: 'My Home',
  href: 'https://www.codecademy.com/learn',
  type: 'link',
};

export const courseCatalog: AppHeaderLink = {
  id: 'course-catalog',
  text: 'Course Catalog',
  href: 'https://www.codecademy.com/catalog',
  type: 'link',
};

export const resourcesDropdown: AppHeaderPopover = {
  id: 'resources',
  text: 'Resources',
  popover: [
    {
      id: 'cheatsheets',
      href: 'https://www.codecademy.com/resources/cheatsheets/all',
      text: 'Cheatsheets',
      type: 'popover-item',
    },
    {
      id: 'articles',
      href: 'https://www.codecademy.com/articles',
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
      href: 'https://www.codecademy.com/events',
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
      href: 'https://www.codecademy.com/pricing',
      text: 'Pro Membership',
      type: 'popover-item',
    },
    {
      id: 'for-business',
      href: 'https://www.codecademy.com/business',
      text: 'For Business',
      type: 'popover-item',
    },
    {
      id: 'for-students',
      href: 'https://www.codecademy.com/student-center',
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

export const upgradeToPro: AppHeaderButton = {
  id: 'upgrade-to-pro',
  text: 'Upgrade to Pro',
  href: 'https://www.codecademy.com/pro/membership',
  type: 'button',
};

export const login: AppHeaderLink = {
  id: 'login',
  text: 'Log In',
  href: 'https://www.codecademy.com/login',
  type: 'link',
};

export const signUp: AppHeaderButton = {
  id: 'signup',
  text: 'Sign Up',
  href: 'https://www.codecademy.com/register',
  type: 'button',
};
