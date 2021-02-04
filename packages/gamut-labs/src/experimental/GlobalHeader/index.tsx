import {
  BookFlipPageIcon,
  CommunityIcon,
  HouseEntranceIcon,
} from '@codecademy/gamut-icons/src';
import React from 'react';

import { useBreakpointAtOrAbove } from '../../lib/breakpointHooks';
import { AppHeader } from '../AppHeader';
import { AppHeaderItem } from '../AppHeader/AppHeaderElements/types';
import { AppHeaderMobile } from '../AppHeaderMobile';
import {
  anonDefaultHeaderItems,
  anonLandingHeaderItems,
  anonLoginHeaderItems,
  anonSignupHeaderItems,
  AppHeaderMobileItemsProps,
  freeHeaderItems,
  proHeaderItems,
} from './GlobalHeaderVariants';
import styles from './styles.module.scss';
import { AnonHeader, FreeHeader, ProHeader } from './types';

export type HeaderClickHandler = (
  event: React.MouseEvent,
  item: AppHeaderItem
) => void;

export type GlobalHeaderProps = AnonHeader | FreeHeader | ProHeader;

const getAppHeaderItems = (props: GlobalHeaderProps) => {
  switch (props.type) {
    case 'anon':
      switch (props.variant) {
        case 'landing': // same for mobile
          return anonLandingHeaderItems();
        case 'login':
          return anonLoginHeaderItems(props.renderSearch);
        case 'signup': // same for mobile
          return anonSignupHeaderItems(props.renderSearch);
        default:
          return anonDefaultHeaderItems(props.renderSearch);
      }
    case 'free':
      return freeHeaderItems(
        props.user,
        props.renderSearch,
        props.renderNotifications
      );
    case 'pro':
      return proHeaderItems(
        props.user,
        props.renderSearch,
        props.renderNotifications
      );
  }
};

const getMobileAppHeaderItems = (): AppHeaderMobileItemsProps => {
  return {
    left: [
      {
        id: 'logo-1',
        href: 'http://codecademy.com',
        pro: false,
        trackingTarget: 'tracking-target',
        type: 'logo',
      },
    ],
    right: [
      {
        id: 'text-button',
        text: 'Log in',
        href: 'http://codecademy.com',
        trackingTarget: 'tracking-target',
        type: 'text-button',
      },
      {
        id: 'fill-button',
        text: 'Sign up',
        href: 'http://codecademy.com',
        trackingTarget: 'tracking-target',
        type: 'fill-button',
      },
    ],
    mainMenu: [
      {
        dataTestId: 'header-catalog',
        icon: BookFlipPageIcon,
        id: 'course-catalog',
        text: 'Course Catalog',
        href: '/catalog',
        trackingTarget: 'topnav_catalog',
        type: 'link',
      },
      {
        dataTestId: 'header-home',
        icon: HouseEntranceIcon,
        id: 'my-home',
        text: 'My Home',
        href: '/learn',
        trackingTarget: 'topnav_home',
        type: 'link',
      },
      {
        id: 'target',
        text: 'Community',
        icon: CommunityIcon,
        popover: [
          {
            id: 'sublink-1',
            text: 'forum',
            href: 'http://codecademy.com',
            trackingTarget: '',
            type: 'link',
          },
          {
            id: 'sublink-2',
            text: 'chapters',
            href: 'http://codecademy.com',
            trackingTarget: '',
            type: 'link',
          },
        ],
        trackingTarget: '',
        type: 'dropdown',
      },
      {
        id: 'dropdown-target-2',
        text: 'Resources',
        icon: HouseEntranceIcon,
        popover: [
          {
            id: 'sublink-1',
            text: 'cheatsheets',
            href: 'http://codecademy.com',
            trackingTarget: '',
            type: 'link',
          },
          {
            id: 'sublink-2',
            text: 'blog',
            href: 'http://codecademy.com',
            trackingTarget: '',
            type: 'link',
          },
        ],
        trackingTarget: '',
        type: 'dropdown',
      },
    ],
  };
};

export const GlobalHeader: React.FC<GlobalHeaderProps> = (props) => {
  const desktop = useBreakpointAtOrAbove('md');
  return (
    <>
      {desktop ? (
        <AppHeader
          action={props.action}
          className={styles.globalHeader}
          items={getAppHeaderItems(props)}
        />
      ) : (
        <AppHeaderMobile
          action={props.action}
          items={getMobileAppHeaderItems()}
        />
      )}
    </>
  );
};
