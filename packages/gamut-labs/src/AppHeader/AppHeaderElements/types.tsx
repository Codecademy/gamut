import { GamutIconProps } from '@codecademy/gamut-icons';
import { ReactNode } from 'react';

export type AppHeaderItem =
  | AppHeaderItemWithLink
  | AppHeaderSimpleDropdownItem
  | AppHeaderProfileDropdownItem
  | AppHeaderRenderElementItem;

type AppHeaderItemWithLink =
  | AppHeaderLogoItem
  | AppHeaderLinkItem
  | AppHeaderTextButtonItem
  | AppHeaderFillButtonItem;

type AppHeaderBaseItem<T extends string> = {
  dataTestId?: string;
  id: string;
  redirect?: boolean;
  type: T;
};

type AppHeaderBaseLinkItem<T extends string> = AppHeaderBaseItem<T> & {
  href: string;
  trackingTarget: string;
};

export type AppHeaderLogoItem = AppHeaderBaseLinkItem<'logo'> & {
  pro: boolean;
};

export type AppHeaderLinkItem = AppHeaderBaseLinkItem<'link'> & {
  icon?: React.ComponentType<GamutIconProps>;
  newTab?: boolean;
  text: string;
  topSeparator?: boolean;
};

export type AppHeaderTextButtonItem = AppHeaderBaseLinkItem<'text-button'> & {
  text: string;
};

export type AppHeaderFillButtonItem = AppHeaderBaseLinkItem<'fill-button'> & {
  text: string;
};

export type AppHeaderDropdownItem =
  | AppHeaderSimpleDropdownItem
  | AppHeaderProfileDropdownItem;

export type AppHeaderSimpleDropdownItem = AppHeaderBaseItem<'dropdown'> & {
  icon?: React.ComponentType<GamutIconProps>;
  popover: AppHeaderLinkItem[];
  text: string;
  trackingTarget: string;
};

export type AppHeaderProfileDropdownItem = AppHeaderBaseItem<'profile-dropdown'> & {
  avatar: string;
  userDisplayName: string;
  popover: AppHeaderLinkItem[][];
  text: string;
  trackingTarget: string;
};

export type AppHeaderRenderElementItem = AppHeaderBaseItem<'render-element'> & {
  renderElement: () => ReactNode;
};

export type AppHeaderClickHandler = (
  event: React.MouseEvent,
  item: AppHeaderItem
) => void;

export const appHeaderItemIsLink = (
  item: AppHeaderItem
): item is AppHeaderItemWithLink => !!(item as AppHeaderItemWithLink).href;
