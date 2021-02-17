import { Box } from '@codecademy/gamut';
import React, {
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { useBreakpointAtOrAbove } from '../../lib/breakpointHooks';
import { AppHeader } from '../AppHeader';
import {
  FormattedAppHeaderItems,
  FormattedMobileAppHeaderItems,
} from '../AppHeader/types';
import { AppHeaderMobile } from '../AppHeaderMobile';
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

export const GlobalHeader: React.FC<GlobalHeaderProps> = forwardRef(
  (props, ref) => {
    const [height, setHeight] = useState<number>(0);
    const boxRef = useRef<HTMLDivElement>(null);
    const isDesktop = useBreakpointAtOrAbove('md');

    useLayoutEffect(() => {
      const onResize = () => {
        setHeight(boxRef.current?.clientHeight || 0);
      };
      onResize();

      window.addEventListener('resize', onResize);
      return () => window.removeEventListener('resize', onResize);
    });

    useImperativeHandle(ref, () => ({ height }), [height]);

    return isDesktop ? (
      <Box height="80" ref={boxRef}>
        <AppHeader action={props.action} items={getAppHeaderItems(props)} />
      </Box>
    ) : (
      <Box height="64" position="relative" zIndex={0} ref={boxRef}>
        <AppHeaderMobile
          action={props.action}
          items={getMobileAppHeaderItems(props)}
          renderSearch={props.renderSearch?.mobile}
        />
      </Box>
    );
  }
);
