import { Box } from '@codecademy/gamut';
import { useTheme } from '@emotion/react';
import React from 'react';

import { AppHeader } from '../../AppHeader';
import {
  FormattedAppHeaderItems,
  FormattedMobileAppHeaderItems,
} from '../../AppHeader/types';
import { AppHeaderMobile } from '../../AppHeaderMobile';
import { GlobalHeaderProps } from '..';
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

type BasicGlobalHeaderProps = GlobalHeaderProps & {
  pauseAnimation?: boolean;
};

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

export const BasicGlobalHeader: React.FC<BasicGlobalHeaderProps> = (props) => {
  const theme = useTheme();

  return (
    <>
      <Box
        display={{ base: 'none', md: 'block' }}
        height={theme.elements.headerHeight}
        className={props.pauseAnimation ? undefined : props.className}
      >
        <AppHeader
          action={props.action}
          items={getAppHeaderItems(props)}
          redirectParam={
            props.type === 'anon' ? props.redirectParam : undefined
          }
        />
      </Box>
      <Box
        display={{ base: 'block', md: 'none' }}
        height={theme.elements.headerHeight}
        className={props.pauseAnimation ? undefined : props.className}
      >
        <AppHeaderMobile
          action={props.action}
          items={getMobileAppHeaderItems(props)}
          renderSearch={props.renderSearch?.mobile}
          redirectParam={
            props.type === 'anon' ? props.redirectParam : undefined
          }
        />
      </Box>
    </>
  );
};
