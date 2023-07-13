import { Box } from '@codecademy/gamut';
import { useTheme } from '@emotion/react';
import { useCallback, useState } from 'react';
import * as React from 'react';

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
  enterpriseHeaderItems,
  enterpriseMobileHeaderItems,
  freeHeaderItems,
  freeMobileHeaderItems,
  loadingHeaderItems,
  loadingMobileHeaderItems,
  proHeaderItems,
  proMobileHeaderItems,
} from './GlobalHeaderVariants';
import {
  AnonHeader,
  CrossDeviceItemId,
  EnterpriseHeader,
  FreeHeader,
  LoadingHeader,
  ProHeader,
} from './types';

export type GlobalHeaderProps =
  | AnonHeader
  | FreeHeader
  | ProHeader
  | EnterpriseHeader
  | LoadingHeader;

// Overloading getAppHeaderItems function to return different types based on mobile parameter
function getAppHeaderItems(
  props: GlobalHeaderProps,
  mobile: false
): FormattedAppHeaderItems;

function getAppHeaderItems(
  props: GlobalHeaderProps,
  mobile: true
): FormattedMobileAppHeaderItems;

function getAppHeaderItems(
  props: GlobalHeaderProps,
  mobile: Boolean
): FormattedAppHeaderItems | FormattedMobileAppHeaderItems {
  const { hidePricing } = props;
  switch (props.type) {
    case 'anon':
      switch (props.variant) {
        case 'landing':
          return mobile
            ? anonLandingMobileHeaderItems(hidePricing, props.user)
            : anonLandingHeaderItems(hidePricing, props.user);
        case 'login':
          return mobile
            ? anonLoginMobileHeaderItems(hidePricing, props.user)
            : anonLoginHeaderItems(hidePricing, props.user);
        case 'signup':
          return mobile
            ? anonSignupMobileHeaderItems(hidePricing, props.user)
            : anonSignupHeaderItems(hidePricing, props.user);
        default:
          return mobile
            ? anonDefaultMobileHeaderItems(hidePricing, props.user)
            : anonDefaultHeaderItems(hidePricing, props.user);
      }
    case 'enterprise':
      return mobile
        ? enterpriseMobileHeaderItems(props.user)
        : enterpriseHeaderItems(props.user);
    case 'free':
      return mobile
        ? freeMobileHeaderItems(props.user, hidePricing)
        : freeHeaderItems(props.user, hidePricing);
    case 'pro':
      return mobile
        ? proMobileHeaderItems(props.user)
        : proHeaderItems(props.user);
    case 'loading':
      return mobile ? loadingMobileHeaderItems : loadingHeaderItems;
  }
}

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

  // manages global toggle state for items (only 1 open at a time)
  const [openCrossDeviceItemId, setOpenCrossDeviceItemId] = useState(
    CrossDeviceItemId.UNSET
  );

  return (
    <Box as="header" position="sticky" top={0} zIndex={theme.elements.headerZ}>
      <AppHeader
        action={combinedAction}
        items={getAppHeaderItems(props, false)}
        search={props.search}
        {...(props.type === 'anon'
          ? {
              redirectParam: props.redirectParam,
            }
          : props.type === 'loading' || props.type === 'enterprise'
          ? {}
          : {
              notifications: props.notifications,
            })}
        isEnterprise={props.type === 'enterprise'}
        isAnon={props.type === 'anon'}
        openCrossDeviceItemId={openCrossDeviceItemId}
        setOpenCrossDeviceItemId={setOpenCrossDeviceItemId}
      />
      <AppHeaderMobile
        action={combinedAction}
        items={getAppHeaderItems(props, true)}
        {...(props.type === 'anon' ||
        props.type === 'loading' ||
        props.type === 'enterprise'
          ? {}
          : {
              notifications: props.notifications,
            })}
        onSearch={props.search.onSearch}
        redirectParam={props.type === 'anon' ? props.redirectParam : undefined}
        isEnterprise={props.type === 'enterprise'}
        isAnon={props.type === 'anon'}
        openCrossDeviceItemId={openCrossDeviceItemId}
        setOpenCrossDeviceItemId={setOpenCrossDeviceItemId}
      />
      {props.children}
    </Box>
  );
};
