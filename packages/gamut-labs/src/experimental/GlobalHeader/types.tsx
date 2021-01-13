import { ReactElement } from 'react';

type LoggedOutHeader = {
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
