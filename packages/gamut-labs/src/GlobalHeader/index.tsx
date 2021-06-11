import { Box } from '@codecademy/gamut';
import { themed } from '@codecademy/gamut-styles';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import cx from 'classnames';
import React, { useEffect, useState } from 'react';

import { AppHeader, AppHeaderMobile } from '..';
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
import styles from './styles.module.scss';
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

const StyledBox = styled(Box)`
  z-index: ${themed('elements.headerZ')};
`;

export const GlobalHeader: React.FC<GlobalHeaderProps> = (props) => {
  const [isInHeaderRegion, setIsInHeaderRegion] = useState(true);

  useEffect(() => {
    const checkScroll = () => setIsInHeaderRegion(window?.pageYOffset === 0);
    checkScroll();
    document.addEventListener('scroll', checkScroll);
    return () => document.removeEventListener('scroll', checkScroll);
  }, []);

  const theme = useTheme();

  const headerClasses = cx(
    styles.stickyHeader,
    isInHeaderRegion && styles.transitionFadeOut
  );

  return (
    <StyledBox as="header" position="sticky" top={0}>
      <Box
        display={{ _: 'none', md: 'block' }}
        height={theme.elements.headerHeight}
        className={headerClasses}
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
        display={{ _: 'block', md: 'none' }}
        height={theme.elements.headerHeight}
        className={headerClasses}
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
      {props.children}
    </StyledBox>
  );
};
