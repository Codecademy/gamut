import { ReactNode } from 'react';
import { AppHeaderCatalogDropdownItem, AppHeaderFillButtonItem, AppHeaderLinkItem, AppHeaderLogoItem, AppHeaderProfileDropdownItem, AppHeaderRenderElementItem, AppHeaderResourcesDropdownItem, AppHeaderSimpleDropdownItem, AppHeaderTextButtonItem } from '../AppHeader/AppHeaderElements/types';
import { User } from './types';
export declare const logo: AppHeaderLogoItem;
export declare const myHome: AppHeaderLinkItem;
export declare const courseCatalog: AppHeaderLinkItem;
export declare const catalogDropdown: (hideCareerPaths?: boolean | undefined) => AppHeaderCatalogDropdownItem;
export declare const resourcesDropdown: AppHeaderSimpleDropdownItem;
export declare const refreshedResourcesDropdown: AppHeaderResourcesDropdownItem;
export declare const communityDropdown: AppHeaderSimpleDropdownItem;
export declare const pricingLink: AppHeaderLinkItem;
export declare const pricingDropdown: AppHeaderSimpleDropdownItem;
export declare const businessSolutions: AppHeaderLinkItem;
/**
 * Note: this is currently experimental!
 * This will be cleaned up as part of EGG-1644.
 */
export declare const favorites: (renderFavorites: () => ReactNode) => AppHeaderRenderElementItem;
export declare const bookmarks: (renderBookmarks: () => ReactNode) => AppHeaderRenderElementItem;
export declare const freeProfile: (user: User, isMobile?: boolean | undefined) => AppHeaderProfileDropdownItem;
export declare const proProfile: (user: User) => AppHeaderProfileDropdownItem;
export declare const tryProForFree: (checkoutUrl?: string | undefined) => AppHeaderFillButtonItem;
export declare const upgradeToPro: (checkoutUrl?: string | undefined) => AppHeaderFillButtonItem;
export declare const unpausePro: AppHeaderFillButtonItem;
export declare const login: AppHeaderTextButtonItem;
export declare const signUp: AppHeaderFillButtonItem;
export declare const referrals: AppHeaderLinkItem;
