import { BadgeProps } from '@codecademy/gamut';
import { GamutIconProps } from '@codecademy/gamut-icons';
import { ReactNode } from 'react';

export type AppHeaderItem =
  | AppHeaderItemWithHref
  | AppHeaderSimpleDropdownItem
  | AppHeaderProfileDropdownItem
  | AppHeaderRenderElementItem
  | AppHeaderCatalogDropdownItem;

export type AppHeaderItemWithHref =
  | AppHeaderLogoItem
  | AppHeaderLinkItem
  | AppHeaderTextButtonItem
  | AppHeaderFillButtonItem;

type AppHeaderBaseItem<Type extends string> = {
  dataTestId?: string;
  id: string;
  redirect?: boolean;
  type: Type;
};

type AppHeaderBaseHrefItem<Type extends string> = AppHeaderBaseItem<Type> & {
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
  badge?: React.ReactElement<BadgeProps>;
  hideWithNewCatalogDropdown?: boolean;
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

export type AppHeaderCatalogDropdownItem = AppHeaderBaseItem<'catalog-dropdown'> & {
  icon?: React.ComponentType<GamutIconProps>;
  popover: AppHeaderCatalogDataItem[];
  text: string;
  trackingTarget: string;
};

export type AppHeaderCatalogSubheaderItem = AppHeaderBaseItem<'subheader'> & {
  text: string;
};

export type AppHeaderCatalogDataItem = {
  title: string;
  description: string;
  requiresCareerAccess?: boolean;
  data: (AppHeaderLinkItem | AppHeaderCatalogSubheaderItem)[];
};

export type AppHeaderClickHandler<ItemType = AppHeaderItem> = (
  event: React.MouseEvent,
  item: ItemType
) => void;

export const isAppHeaderItemWithHref = (
  item: AppHeaderItem
): item is AppHeaderItemWithHref => !!(item as AppHeaderItemWithHref).href;
