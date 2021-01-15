import { ReactElement } from 'react';

export type AppHeaderItem =
  | AppHeaderLogoItem
  | AppHeaderLinkItem
  | AppHeaderTextButtonItem
  | AppHeaderFillButtonItem
  | AppHeaderDropdownItem
  | AppHeaderRenderElementItem;

type AppHeaderBaseItem = {
  dataTestId?: string;
  id: string;
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

export type AppHeaderDropdownItem = AppHeaderBaseItem & {
  popover: AppHeaderLinkItem[];
  trackingTarget: string;
  type: 'dropdown';
};

export type AppHeaderRenderElementItem = AppHeaderBaseItem & {
  renderElement: () => ReactElement;
  type: 'render-element';
};

export type AppHeaderClickHandler = (
  event: React.MouseEvent,
  item: AppHeaderItem
) => void;
