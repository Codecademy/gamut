import {
  CommunityIcon,
  GearIcon,
  HouseEntranceIcon,
  PersonIcon,
} from '@codecademy/gamut-icons';
import {
  AppHeaderLinkItem,
  AppHeaderProfileDropdownItem,
  AppHeaderSimpleDropdownItem,
} from '@codecademy/gamut-labs';

export const MOCK_LINK: AppHeaderLinkItem = {
  id: 'home',
  href: 'https://codecademy.com/',
  icon: HouseEntranceIcon,
  text: 'Home',
  trackingTarget: 'nav-link',
  type: 'link',
};

export const MOCK_DROPDOWN_1: AppHeaderSimpleDropdownItem = {
  id: 'dropdown',
  text: 'Dropdown Target',
  icon: CommunityIcon,
  popover: [
    {
      id: 'sublink-1',
      href: 'http://codecademy.com',
      trackingTarget: 'tracking-target',
      text: 'Link 1',
      type: 'link',
    },
    {
      id: 'sublink-2',
      href: 'http://codecademy.com',
      trackingTarget: 'tracking-target',
      text: 'Link 2',
      type: 'link',
    },
  ],
  trackingTarget: 'tracking-target',
  type: 'dropdown',
};

export const MOCK_DROPDOWN_2: AppHeaderSimpleDropdownItem = {
  id: 'dropdown-target-2',
  text: 'Resources Target',
  icon: HouseEntranceIcon,
  popover: [
    {
      id: 'sublink-1',
      text: 'Cheatsheets',
      href: 'http://codecademy.com',
      trackingTarget: '',
      type: 'link',
    },
    {
      id: 'sublink-2',
      text: 'Blog',
      href: 'http://codecademy.com',
      trackingTarget: '',
      type: 'link',
    },
  ],
  trackingTarget: '',
  type: 'dropdown',
};

export const MOCK_PROFILE_DROPDOWN: AppHeaderProfileDropdownItem = {
  avatar:
    'https://www.gravatar.com/avatar/1c959a9a1e2f9f9f1ac06b05cccc1d60?s=150&d=retro',
  userDisplayName: 'Codey',
  id: 'profile',
  text: 'Profile',
  popover: [
    [
      {
        id: 'sublink-1',
        icon: PersonIcon,
        text: 'A Link With Icon',
        href: 'http://codecademy.com',
        trackingTarget: '',
        type: 'link',
      },
      {
        id: 'sublink-2',
        icon: GearIcon,
        text: 'Another Link With Icon',
        href: 'http://codecademy.com',
        trackingTarget: '',
        type: 'link',
      },
    ],
    [
      {
        id: 'sublink-3',
        text: 'A Link In Another Section',
        href: 'http://codecademy.com',
        trackingTarget: '',
        type: 'link',
      },
      {
        id: 'sublink-4',
        text: 'Another Link',
        href: 'http://codecademy.com',
        trackingTarget: '',
        type: 'link',
      },
    ],
    [
      {
        id: 'sublink-5',
        text: 'One More Link',
        href: 'http://codecademy.com',
        trackingTarget: '',
        type: 'link',
      },
    ],
  ],
  trackingTarget: 'profile',
  type: 'profile-dropdown',
};
