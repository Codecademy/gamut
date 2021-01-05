import { ReactElement } from 'react';

export type AppHeaderItem =
  | AppHeaderLogo
  | AppHeaderLink
  | AppHeaderTextButton
  | AppHeaderFillButton
  | AppHeaderPopover
  | AppHeaderRenderPopover;

type AppHeaderBase = {
  id: string;
  image?: string;
  icon?: string;
  text?: string;
};

export type AppHeaderLogo = AppHeaderBase & {
  pro: boolean;
  type: 'logo';
};

export type AppHeaderLink = AppHeaderBase & {
  href: string;
  type: 'link';
};

export type AppHeaderTextButton = AppHeaderBase & {
  href: string;
  type: 'text-button';
};

export type AppHeaderFillButton = AppHeaderBase & {
  href: string;
  type: 'fill-button';
};

export type AppHeaderPopover = AppHeaderBase & {
  popover: AppHeaderLink[];
  type: 'popover';
};

export type AppHeaderRenderPopover = AppHeaderBase & {
  popover: () => ReactElement;
  type: 'render-popover';
};
