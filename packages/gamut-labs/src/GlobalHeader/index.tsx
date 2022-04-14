import { Box } from '@codecademy/gamut';
import { useTheme } from '@emotion/react';
import React, { useCallback } from 'react';

import { AppHeader, AppHeaderMobile } from '..';
import {
  AppHeaderItem,
  isAppHeaderItemWithHref,
} from '../AppHeader/AppHeaderElements/types';
import {
  FormattedAppHeaderItems,
  FormattedMobileAppHeaderItems,
} from '../AppHeader/types';
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
          return anonLandingHeaderItems(props.hidePricing, props.user);
        case 'login':
          return anonLoginHeaderItems(props.hidePricing, props.user);
        case 'signup':
          return anonSignupHeaderItems(props.hidePricing, props.user);
        default:
          return anonDefaultHeaderItems(props.hidePricing, props.user);
      }
    case 'free':
      return freeHeaderItems(
        props.user,
        props.hidePricing,
        props.renderFavorites?.desktop
      );
    case 'pro':
      return proHeaderItems(props.user, props.renderFavorites?.desktop);
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
          return anonLandingMobileHeaderItems(props.hidePricing, props.user);
        case 'login':
          return anonLoginMobileHeaderItems(props.hidePricing, props.user);
        case 'signup':
          return anonSignupMobileHeaderItems(props.hidePricing, props.user);
        default:
          return anonDefaultMobileHeaderItems(props.hidePricing, props.user);
      }
    case 'free':
      return freeMobileHeaderItems(props.user, props.hidePricing);
    case 'pro':
      return proMobileHeaderItems(props.user);
    case 'loading':
      return loadingMobileHeaderItems;
  }
};

export const GlobalHeader: React.FC<GlobalHeaderProps> = (props) => {
  const { action, onLinkAction } = props;
  const theme = useTheme();

  const combinedAction = useCallback(
    (event: React.MouseEvent, item: AppHeaderItem) => {
      action(event, item);
      if (isAppHeaderItemWithHref(item)) onLinkAction?.(event, item);
    },
    [action, onLinkAction]
  );

  return (
    <Box as="header" position="sticky" top={0} zIndex={theme.elements.headerZ}>
      <AppHeader
        action={combinedAction}
        items={getAppHeaderItems(props)}
        search={props.search}
        {...(props.type === 'anon'
          ? {
              redirectParam: props.redirectParam,
            }
          : props.type === 'loading'
          ? {}
          : {
              notifications: props.notifications,
            })}
      />
      <AppHeaderMobile
        action={combinedAction}
        items={getMobileAppHeaderItems(props)}
        {...(props.type === 'anon' || props.type === 'loading'
          ? {}
          : {
              notifications: props.notifications,
            })}
        onSearch={props.search.onSearch}
        redirectParam={props.type === 'anon' ? props.redirectParam : undefined}
      />
      {props.children}
    </Box>
  );
};
