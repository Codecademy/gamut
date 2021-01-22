import { ReactNode } from 'react';

import { AppHeaderClickHandler } from '../AppHeader/AppHeaderElements/types';

type BaseHeader = {
  onClick: AppHeaderClickHandler;
  renderSearch?: () => ReactNode;
};

type LoggedInHeader = BaseHeader & {
  renderNotifications?: () => ReactNode;
  renderProfile?: () => ReactNode;
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
