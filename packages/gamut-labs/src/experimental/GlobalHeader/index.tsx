import { FlexBox } from '@codecademy/gamut';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';
import { useWindowScroll } from 'react-use';

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

const StickyHeader = styled.div<{ faded: boolean }>(
  ({ theme, faded }) => css`
    height: ${theme.elements.headerHeight};
    border-bottom: 1px solid ${theme.colors.navy};
    background-color: ${theme.colors.white};
    top: 0;
    z-index: 2;
    width: 100%;
    transition: background 0.15s ease-in-out,
      border-bottom-color 0.15s ease-in-out;

    ${faded &&
    css`
      background: transparent;
      border-bottom: 1px solid transparent;
      transition: background 0.5s ease-in-out,
        border-bottom-color 0.5s ease-in-out;
    `}
  `
);

export const GlobalHeader: React.FC<GlobalHeaderProps> = (props) => {
  const { y } = useWindowScroll();
  const isInHeaderRegion = y === 0;

  return (
    <StickyHeader faded={isInHeaderRegion}>
      <FlexBox height="100%" display={{ base: 'none', md: 'block' }}>
        <AppHeader
          action={props.action}
          items={getAppHeaderItems(props)}
          redirectParam={
            props.type === 'anon' ? props.redirectParam : undefined
          }
        />
      </FlexBox>
      <FlexBox height="100%" display={{ base: 'block', md: 'none' }}>
        <AppHeaderMobile
          action={props.action}
          items={getMobileAppHeaderItems(props)}
          renderSearch={props.renderSearch?.mobile}
          redirectParam={
            props.type === 'anon' ? props.redirectParam : undefined
          }
        />
      </FlexBox>
    </StickyHeader>
  );
};
