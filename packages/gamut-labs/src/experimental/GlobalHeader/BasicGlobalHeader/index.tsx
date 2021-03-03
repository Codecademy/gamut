import { Box } from '@codecademy/gamut';
import React from 'react';

import { AppHeader } from '../../AppHeader';
import {
  FormattedAppHeaderItems,
  FormattedMobileAppHeaderItems,
} from '../../AppHeader/types';
import { AppHeaderMobile } from '../../AppHeaderMobile';
import {
  anonDefaultHeaderItems,
  anonDefaultMobileHeaderItems,
  anonLandingHeaderItems,
  anonLandingMobileHeaderItems,
  anonLoginHeaderItems,
  anonLoginMobileHeaderItems,
  anonSignupHeaderItems,
  anonSignupMobileHeaderItems,
  freeHeaderItems,
  freeMobileHeaderItems,
  loadingHeaderItems,
  loadingMobileHeaderItems,
  proHeaderItems,
  proMobileHeaderItems,
} from '../GlobalHeaderVariants';
import { AnonHeader, FreeHeader, LoadingHeader, ProHeader } from '../types';

export type GlobalHeaderProps =
  | AnonHeader
  | FreeHeader
  | ProHeader
  | LoadingHeader;

export const desktopHeight = '80';
export const mobileHeight = '64';

const getAppHeaderItems = (
  props: GlobalHeaderProps
): FormattedAppHeaderItems => {
  switch (props.type) {
    case 'anon':
      switch (props.variant) {
        case 'landing':
          return anonLandingHeaderItems();
        case 'login':
          return anonLoginHeaderItems(props.renderSearch?.desktop);
        case 'signup':
          return anonSignupHeaderItems(props.renderSearch?.desktop);
        default:
          return anonDefaultHeaderItems(props.renderSearch?.desktop);
      }
    case 'free':
      return freeHeaderItems(
        props.user,
        props.renderSearch?.desktop,
        props.renderNotifications?.desktop
      );
    case 'pro':
      return proHeaderItems(
        props.user,
        props.renderSearch?.desktop,
        props.renderNotifications?.desktop
      );
    case 'loading':
      return loadingHeaderItems;
  }
};

const getMobileAppHeaderItems = (
  props: GlobalHeaderProps
): FormattedMobileAppHeaderItems => {
  switch (props.type) {
    case 'anon':
      switch (props.variant) {
        case 'landing':
          return anonLandingMobileHeaderItems();
        case 'login':
          return anonLoginMobileHeaderItems();
        case 'signup':
          return anonSignupMobileHeaderItems();
        default:
          return anonDefaultMobileHeaderItems();
      }
    case 'free':
      return freeMobileHeaderItems(
        props.user,
        props.renderNotifications?.mobile
      );
    case 'pro':
      return proMobileHeaderItems(
        props.user,
        props.renderNotifications?.mobile
      );
    case 'loading':
      return loadingMobileHeaderItems;
  }
};

export const BasicGlobalHeader: React.FC<GlobalHeaderProps> = (props) => {
  return (
    <>
      <Box
        display={{ base: 'none', md: 'block' }}
        height={desktopHeight}
        className={props.animated ? props.className : undefined}
      >
        <AppHeader action={props.action} items={getAppHeaderItems(props)} />
      </Box>
      <Box
        display={{ base: 'block', md: 'none' }}
        height={mobileHeight}
        className={props.animated ? props.className : undefined}
      >
        <AppHeaderMobile
          action={props.action}
          items={getMobileAppHeaderItems(props)}
          renderSearch={props.renderSearch?.mobile}
        />
      </Box>
    </>
  );
};
