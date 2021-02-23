import { Box } from '@codecademy/gamut';
import { mediaQueries } from '@codecademy/gamut-styles';
import { css, Global } from '@emotion/react';
import React from 'react';

import { AppHeader } from '../AppHeader';
import {
  FormattedAppHeaderItems,
  FormattedMobileAppHeaderItems,
} from '../AppHeader/types';
import { AppHeaderMobile } from '../AppHeaderMobile';
import { headerHeightVarName } from './consts';
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
} from './GlobalHeaderVariants';
import { AnonHeader, FreeHeader, LoadingHeader, ProHeader } from './types';

export type GlobalHeaderProps =
  | AnonHeader
  | FreeHeader
  | ProHeader
  | LoadingHeader;

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

const breakpoint = 'md';
const desktopHeight = 80;
const mobileHeight = 64;

const globalStyles = css`
  :root {
    ${headerHeightVarName}: ${mobileHeight};

    ${mediaQueries.md} {
      ${headerHeightVarName}: ${desktopHeight};
    }
  }
`;

// For performance reasons, this component renders the mobile and desktop versions
// of itself simultaneously and switches between them using css (instead of using
// any of the useBreakpoint hooks, which rely on js for the same behavior).
export const GlobalHeader: React.FC<GlobalHeaderProps> = (props) => (
  <>
    <Global styles={globalStyles} />
    <Box
      display={{ base: 'none', [breakpoint]: 'block' }}
      height={desktopHeight.toString()}
    >
      <AppHeader action={props.action} items={getAppHeaderItems(props)} />
    </Box>
    <Box
      display={{ base: 'block', [breakpoint]: 'none' }}
      height={mobileHeight.toString()}
      position="relative"
      zIndex={0}
    >
      <AppHeaderMobile
        action={props.action}
        items={getMobileAppHeaderItems(props)}
        renderSearch={props.renderSearch?.mobile}
      />
    </Box>
  </>
);
