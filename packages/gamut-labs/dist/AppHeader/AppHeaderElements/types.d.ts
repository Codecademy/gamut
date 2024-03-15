import { BadgeProps } from '@codecademy/gamut';
import { GamutIconProps } from '@codecademy/gamut-icons';
import { ReactNode } from 'react';
export declare type AppHeaderItem = AppHeaderItemWithHref | AppHeaderSimpleDropdownItem | AppHeaderProfileDropdownItem | AppHeaderRenderElementItem | AppHeaderCatalogDropdownItem | AppHeaderDescriptiveLinkItem | AppHeaderResourcesDropdownItem;
export declare type AppHeaderItemWithHref = AppHeaderLogoItem | AppHeaderLinkItem | AppHeaderTextButtonItem | AppHeaderFillButtonItem;
declare type AppHeaderBaseItem<Type extends string> = {
    dataTestId?: string;
    id: string;
    redirect?: boolean;
    type: Type;
};
declare type AppHeaderBaseHrefItem<Type extends string> = AppHeaderBaseItem<Type> & {
    href: string;
    trackingTarget: string;
};
export declare type AppHeaderLogoItem = AppHeaderBaseHrefItem<'logo'> & {
    pro: boolean;
    checkMini?: boolean;
};
export declare type AppHeaderLinkItem = AppHeaderBaseHrefItem<'link'> & {
    icon?: React.ComponentType<GamutIconProps>;
    newTab?: boolean;
    text: string;
    topSeparator?: boolean;
    badge?: React.ReactElement<BadgeProps>;
};
export declare type AppHeaderTextButtonItem = AppHeaderBaseHrefItem<'text-button'> & {
    text: string;
};
export declare type AppHeaderFillButtonItem = AppHeaderBaseHrefItem<'fill-button'> & {
    text: string;
};
export declare type AppHeaderDropdownItem = AppHeaderSimpleDropdownItem | AppHeaderProfileDropdownItem;
export declare type AppHeaderSimpleDropdownItem = AppHeaderBaseItem<'dropdown'> & {
    icon?: React.ComponentType<GamutIconProps>;
    popover: AppHeaderLinkItem[];
    text: string;
    trackingTarget: string;
};
export declare type AppHeaderProfileDropdownItem = AppHeaderBaseItem<'profile-dropdown'> & {
    avatar: string;
    userDisplayName: string;
    popover: AppHeaderLinkItem[][];
    text: string;
    trackingTarget: string;
};
export declare type AppHeaderRenderElementItem = AppHeaderBaseItem<'render-element'> & {
    renderElement: () => ReactNode;
};
export declare type AppHeaderCatalogDropdownItem = AppHeaderBaseItem<'catalog-dropdown'> & {
    icon?: React.ComponentType<GamutIconProps>;
    text: string;
    trackingTarget: string;
    hideCareerPaths?: boolean;
};
export declare type AppHeaderResourcesDropdownItem = AppHeaderBaseItem<'experimental-resources-dropdown'> & {
    icon?: React.ComponentType<GamutIconProps>;
    text: string;
    trackingTarget: string;
    hideCareerPaths?: boolean;
};
export declare type AppHeaderClickHandler<ItemType = AppHeaderItem> = (event: React.MouseEvent, item: ItemType) => void;
export declare const isAppHeaderItemWithHref: (item: AppHeaderItem) => item is AppHeaderItemWithHref;
export declare type AppHeaderDescriptiveLinkItem = AppHeaderLinkItem & {
    description: string;
};
export declare type AppHeaderResourcesDataItem = {
    title: string;
    description?: string;
    link?: AppHeaderLinkItem;
    data: (AppHeaderLinkItem | AppHeaderDescriptiveLinkItem)[];
};
export {};
