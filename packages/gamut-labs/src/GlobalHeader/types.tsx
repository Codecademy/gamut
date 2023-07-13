import { WithChildrenProp } from '@codecademy/gamut';
import { ReactNode } from 'react';

import {
  AppHeaderClickHandler,
  AppHeaderItemWithHref,
} from '../AppHeader/AppHeaderElements/types';
import { AppHeaderSearch } from '../AppHeader/Search/useHeaderSearch';
import { AppHeaderNotificationSettings } from '../Notifications/types';

type RenderProfile = { desktop: () => ReactNode; mobile: () => ReactNode };

interface BaseHeader extends WithChildrenProp {
  /** A method to be called on click/activating a header item */
  action: AppHeaderClickHandler;
  /** A method to be called only on click/activating a *link* header item */
  onLinkAction?: AppHeaderClickHandler<AppHeaderItemWithHref>;
  className?: string;
  hidePricing?: boolean;
  search: AppHeaderSearch;
}

export type User = {
  avatar: string;
  displayName: string;
  enterpriseUrl?: string;
  isAdmin?: boolean;
  isBusinessAdmin?: boolean;
  isBusinessSsoUser?: boolean;
  isCustomerSupport?: boolean;
  isAccountManager?: boolean;
  isPaused?: boolean;
  isPlusUser?: boolean;
  proCheckoutUrl?: string;
  showProUpgrade?: boolean;
  hideCareerPaths?: boolean;
  hideBusinessAccount?: boolean;
};

type LoggedInHeader = BaseHeader & {
  notifications: AppHeaderNotificationSettings;
  renderProfile?: RenderProfile;
  user: User;
};

export type AnonHeaderVariant = 'landing' | 'login' | 'signup';

export type AnonHeader = BaseHeader & {
  redirectParam?: string;
  type: 'anon';
  variant?: AnonHeaderVariant;
  // TODO: DISC-547 - remove after feature flag test for catalog is complete
  user?: User;
};

export type FreeHeader = LoggedInHeader & {
  type: 'free';
};

export type ProHeader = LoggedInHeader & {
  type: 'pro';
};

export type EnterpriseHeader = BaseHeader & {
  type: 'enterprise';
  user: User;
};

export type LoadingHeader = BaseHeader & {
  type: 'loading';
};

export enum CrossDeviceItemId {
  NOTIFICATIONS = 'notifications',
  UNSET = '',
}

export type CrossDeviceStateProps = {
  openCrossDeviceItemId: CrossDeviceItemId;
  setOpenCrossDeviceItemId: React.Dispatch<React.SetStateAction<string>>;
};
