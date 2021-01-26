import { GamutIconProps } from '@codecademy/gamut-icons';
import { ReactNode } from 'react';

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
};

export type AppHeaderLogoItem = AppHeaderBaseItem & {
  href: string;
  pro: boolean;
  trackingTarget: string;
  type: 'logo';
};

export type AppHeaderLinkItem = AppHeaderBaseItem & {
  href: string;
  icon?: React.ComponentType<GamutIconProps>;
  newTab?: boolean;
  text: string;
  trackingTarget: string;
  type: 'link';
};

export type AppHeaderTextButtonItem = AppHeaderBaseItem & {
  href: string;
  text: string;
  trackingTarget: string;
  type: 'text-button';
};

export type AppHeaderFillButtonItem = AppHeaderBaseItem & {
  href: string;
  text: string;
  trackingTarget: string;
  type: 'fill-button';
};

export type AppHeaderDropdownItem = AppHeaderBaseItem & {
  icon?: React.ComponentType<GamutIconProps>;
  popover: AppHeaderLinkItem[];
  text: string;
  trackingTarget: string;
  type: 'dropdown';
};

export type AppHeaderRenderElementItem = AppHeaderBaseItem & {
  renderElement: () => ReactNode;
  type: 'render-element';
};

export type AppHeaderClickHandler = (
  event: React.MouseEvent,
  item: AppHeaderItem
) => void;
