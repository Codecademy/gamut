import { ReactNode } from 'react';

import { AppHeaderClickHandler } from '../AppHeader/AppHeaderElements/types';

type RenderNotifications = {
  desktop: () => ReactNode;
  mobile: () => ReactNode;
};
type RenderProfile = { desktop: () => ReactNode; mobile: () => ReactNode };
type RenderSearch = { desktop: () => ReactNode; mobile: () => ReactNode };

type BaseHeader = {
  action: AppHeaderClickHandler;
  animated?: boolean;
  className?: string;
  renderSearch?: RenderSearch;
};

export type User = {
  avatar: string;
  displayName: string;
  isAdmin?: boolean;
  isCustomerSupport?: boolean;
};

type LoggedInHeader = BaseHeader & {
  renderNotifications?: RenderNotifications;
  renderProfile?: RenderProfile;
  user: User;
};

export type AnonHeader = BaseHeader & {
  type: 'anon';
  variant?: 'landing' | 'login' | 'signup';
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
