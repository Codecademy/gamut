import { ReactElement } from 'react';

export type AppHeaderItem =
  | AppHeaderLogoItem
  | AppHeaderLinkItem
  | AppHeaderTextButtonItem
  | AppHeaderFillButtonItem
  | AppHeaderPopoverItem
  | AppHeaderRenderPopoverItem;

type AppHeaderBaseItem = {
  dataTestId?: string;
  id: string;
  image?: string;
  icon?: string;
  text?: string;
};

export type AppHeaderLogoItem = AppHeaderBaseItem & {
  href: string;
  pro: boolean;
  trackingTarget: string;
  type: 'logo';
};

export type AppHeaderLinkItem = AppHeaderBaseItem & {
  href: string;
  trackingTarget: string;
  type: 'link';
};

export type AppHeaderTextButtonItem = AppHeaderBaseItem & {
  href: string;
  trackingTarget: string;
  type: 'text-button';
};

export type AppHeaderFillButtonItem = AppHeaderBaseItem & {
  href: string;
  trackingTarget: string;
  type: 'fill-button';
};

export type AppHeaderPopoverItem = AppHeaderBaseItem & {
  popover: AppHeaderLinkItem[];
  trackingTarget: string;
  type: 'popover';
};

export type AppHeaderRenderPopoverItem = AppHeaderBaseItem & {
  popover: () => ReactElement;
  type: 'render-popover';
};
