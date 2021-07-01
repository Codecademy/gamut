import { ReactNode } from 'react';

import {
  AppHeaderClickHandler,
  AppHeaderItemWithHref,
} from '../AppHeader/AppHeaderElements/types';
import { AppHeaderSearch } from '../AppHeader/Search/useHeaderSearch';

type RenderNotifications = {
  desktop: () => ReactNode;
  mobile: () => ReactNode;
};
type RenderProfile = { desktop: () => ReactNode; mobile: () => ReactNode };

type BaseHeader = {
  /** A method to be called on click/activating a header item */
  action: AppHeaderClickHandler;
  /** A method to be called only on click/activating a *link* header item */
  onLinkAction?: AppHeaderClickHandler<AppHeaderItemWithHref>;
  className?: string;
  search: AppHeaderSearch;
};

export type User = {
  avatar: string;
  displayName: string;
  isAdmin?: boolean;
  isCustomerSupport?: boolean;
  isAccountManager?: boolean;
  isPaused?: boolean;
  proCheckoutUrl?: string;
  showProUpgrade?: boolean;
  showReferrals?: boolean;
};

type LoggedInHeader = BaseHeader & {
  renderNotifications?: RenderNotifications;
  renderProfile?: RenderProfile;
  user: User;
};

export type AnonHeaderVariant = 'landing' | 'login' | 'signup';

export type AnonHeader = BaseHeader & {
  redirectParam?: string;
  type: 'anon';
  variant?: AnonHeaderVariant;
};

export type FreeHeader = LoggedInHeader & {
  type: 'free';
};

export type ProHeader = LoggedInHeader & {
  type: 'pro';
};

export type LoadingHeader = BaseHeader & {
  type: 'loading';
};
