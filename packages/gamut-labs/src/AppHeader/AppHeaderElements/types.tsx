import { GamutIconProps } from '@codecademy/gamut-icons';
import { ReactNode } from 'react';

export type AppHeaderItem =
  | AppHeaderItemWithHref
  | AppHeaderSimpleDropdownItem
  | AppHeaderProfileDropdownItem
  | AppHeaderRenderElementItem;

type AppHeaderItemWithHref =
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

type AppHeaderBaseHrefItem<T extends string> = AppHeaderBaseItem<T> & {
  href: string;
  trackingTarget: string;
};

export type AppHeaderLogoItem = AppHeaderBaseHrefItem<'logo'> & {
  pro: boolean;
};

export type AppHeaderLinkItem = AppHeaderBaseHrefItem<'link'> & {
  icon?: React.ComponentType<GamutIconProps>;
  newTab?: boolean;
  text: string;
  topSeparator?: boolean;
};

export type AppHeaderTextButtonItem = AppHeaderBaseHrefItem<'text-button'> & {
  text: string;
};

export type AppHeaderFillButtonItem = AppHeaderBaseHrefItem<'fill-button'> & {
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

export const isAppHeaderItemWithHref = (
  item: AppHeaderItem
): item is AppHeaderItemWithHref => !!(item as AppHeaderItemWithHref).href;
