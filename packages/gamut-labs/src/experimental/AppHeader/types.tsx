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
  href: string;
  pro: boolean;
  trackingTarget: string;
  type: 'logo';
};

export type AppHeaderLink = AppHeaderBase & {
  href: string;
  trackingTarget: string;
  type: 'link';
};

export type AppHeaderTextButton = AppHeaderBase & {
  href: string;
  trackingTarget: string;
  type: 'text-button';
};

export type AppHeaderFillButton = AppHeaderBase & {
  href: string;
  trackingTarget: string;
  type: 'fill-button';
};

export type AppHeaderPopover = AppHeaderBase & {
  popover: AppHeaderLink[];
  trackingTarget: string;
  type: 'popover';
};

export type AppHeaderRenderPopover = AppHeaderBase & {
  popover: () => ReactElement;
  type: 'render-popover';
};
