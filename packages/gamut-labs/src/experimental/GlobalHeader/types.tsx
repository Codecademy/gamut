import { ReactNode } from 'react';

import { AppHeaderClickHandler } from '../AppHeader/AppHeaderElements/types';

type BaseHeader = {
  baseZIndex?: number;
  action: AppHeaderClickHandler;
  renderSearch?: () => ReactNode;
};

export type User = {
  avatar: string;
  displayName: string;
  isAdmin?: boolean;
  isCustomerSupport?: boolean;
};

type LoggedInHeader = BaseHeader & {
  renderNotifications?: () => ReactNode;
  renderProfile?: () => ReactNode;
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
