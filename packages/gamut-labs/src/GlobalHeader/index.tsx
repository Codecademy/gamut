import { Box } from '@codecademy/gamut';
import { system, transitionConcat } from '@codecademy/gamut-styles';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useCallback, useEffect, useState } from 'react';

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
          return anonLandingHeaderItems(props.hidePricing);
        case 'login':
          return anonLoginHeaderItems(props.hidePricing);
        case 'signup':
          return anonSignupHeaderItems(props.hidePricing);
        default:
          return anonDefaultHeaderItems(props.hidePricing);
      }
    case 'free':
      return freeHeaderItems(
        props.user,
        props.hidePricing,
        props.renderNotifications?.desktop,
        props.renderFavorites?.desktop
      );
    case 'pro':
      return proHeaderItems(
        props.user,
        props.renderNotifications?.desktop,
        props.renderFavorites?.desktop
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
          return anonLandingMobileHeaderItems(props.hidePricing);
        case 'login':
          return anonLoginMobileHeaderItems(props.hidePricing);
        case 'signup':
          return anonSignupMobileHeaderItems(props.hidePricing);
        default:
          return anonDefaultMobileHeaderItems(props.hidePricing);
      }
    case 'free':
      return freeMobileHeaderItems(
        props.user,
        props.hidePricing,
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

const HeaderContainer = styled(Box)(
  system.css({
    borderBottom: 1,
    bg: 'background',
    top: 0,
    zIndex: 2,
    width: 1,
    transition: transitionConcat(
      ['background-color', 'border-bottom-color'],
      'fast',
      'ease-in-out'
    ),
  }),
  system.states({
    faded: {
      bg: 'background-current',
      borderColor: 'background-current',
    },
  })
);

export const GlobalHeader: React.FC<GlobalHeaderProps> = (props) => {
  const { action, onLinkAction } = props;

  const [isInHeaderRegion, setIsInHeaderRegion] = useState(true);

  // it is not recommended to replicate this logic in other components unless absolutely necessary, as it is
  // a workaround for style rehydration issues when using react-use/useWindowScroll. The reasoning behind this
  // workaround is discussed here: https://github.com/Codecademy/client-modules/pull/1822#discussion_r650125406
  useEffect(() => {
    const checkScroll = () => setIsInHeaderRegion(window?.pageYOffset === 0);
    checkScroll();
    document.addEventListener('scroll', checkScroll);
    return () => document.removeEventListener('scroll', checkScroll);
  }, []);

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
      <HeaderContainer
        display={{ _: 'none', md: 'block' }}
        height={theme.elements.headerHeight}
        faded={isInHeaderRegion}
      >
        <AppHeader
          action={combinedAction}
          items={getAppHeaderItems(props)}
          search={props.search}
          redirectParam={
            props.type === 'anon' ? props.redirectParam : undefined
          }
        />
      </HeaderContainer>
      <HeaderContainer
        display={{ _: 'block', md: 'none' }}
        height={theme.elements.headerHeight}
        faded={isInHeaderRegion}
      >
        <AppHeaderMobile
          action={combinedAction}
          items={getMobileAppHeaderItems(props)}
          onSearch={props.search.onSearch}
          redirectParam={
            props.type === 'anon' ? props.redirectParam : undefined
          }
        />
      </HeaderContainer>
      {props.children}
    </Box>
  );
};
