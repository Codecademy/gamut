import { ReactElement } from 'react';

import { AppHeaderClickHandler } from '../AppHeader/AppHeaderElements/types';

type LoggedOutHeader = {
  onClick: AppHeaderClickHandler;
  renderSearch?: () => ReactElement;
};

type LoggedInHeader = LoggedOutHeader & {
  renderNotifications?: () => ReactElement;
  renderProfile?: () => ReactElement;
};

export type AnonHeader = LoggedOutHeader & {
  type: 'anon';
};

export type FreeHeader = LoggedInHeader & {
  type: 'free';
};

export type ProHeader = LoggedInHeader & {
  type: 'pro';
};
