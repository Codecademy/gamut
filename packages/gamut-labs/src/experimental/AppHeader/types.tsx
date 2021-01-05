import { ReactElement } from 'react';

export type AppHeaderItem =
  | AppHeaderLogo
  | AppHeaderLink
  | AppHeaderTextButton
  | AppHeaderFillButton
  | AppHeaderPopover
  | AppHeaderRenderPopover;

type AppHeaderBase = {
  dataTestId?: string;
  id: string;
  image?: string;
  icon?: string;
  text?: string;
};

export type AppHeaderLogo = AppHeaderBase & {
  pro: boolean;
  target: string;
  type: 'logo';
};

export type AppHeaderLink = AppHeaderBase & {
  href: string;
  target: string;
  type: 'link';
};

export type AppHeaderTextButton = AppHeaderBase & {
  href: string;
  target: string;
  type: 'text-button';
};

export type AppHeaderFillButton = AppHeaderBase & {
  href: string;
  target: string;
  type: 'fill-button';
};

export type AppHeaderPopover = AppHeaderBase & {
  popover: AppHeaderLink[];
  target: string;
  type: 'popover';
};

export type AppHeaderRenderPopover = AppHeaderBase & {
  popover: () => ReactElement;
  type: 'render-popover';
};
