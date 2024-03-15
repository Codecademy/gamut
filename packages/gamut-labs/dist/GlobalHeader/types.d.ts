import { ReactNode } from 'react';
import { AppHeaderClickHandler, AppHeaderItemWithHref } from '../AppHeader/AppHeaderElements/types';
import { AppHeaderSearch } from '../AppHeader/Search/useHeaderSearch';
import { CrossDeviceBookmarkParts } from '../Bookmarks/types';
import { AppHeaderNotificationSettings } from '../Notifications/types';
declare type RenderFavorites = {
    desktop: () => ReactNode;
};
export declare type RenderBookmarks = () => ReactNode;
declare type RenderProfile = {
    desktop: () => ReactNode;
    mobile: () => ReactNode;
};
declare type BaseHeader = {
    /** A method to be called on click/activating a header item */
    action: AppHeaderClickHandler;
    /** A method to be called only on click/activating a *link* header item */
    onLinkAction?: AppHeaderClickHandler<AppHeaderItemWithHref>;
    className?: string;
    hidePricing?: boolean;
    search: AppHeaderSearch;
    renderBookmarks?: RenderBookmarks;
    crossDeviceBookmarkParts?: CrossDeviceBookmarkParts;
};
export declare type User = {
    avatar: string;
    displayName: string;
    geo?: string;
    isAdmin?: boolean;
    isBusinessAdmin?: boolean;
    isBusinessSsoUser?: boolean;
    isCustomerSupport?: boolean;
    isAccountManager?: boolean;
    isPaused?: boolean;
    proCheckoutUrl?: string;
    showProUpgrade?: boolean;
    showReferrals?: boolean;
    hideCareerPaths?: boolean;
    useNewCatalogDropdown?: boolean;
};
declare type LoggedInHeader = BaseHeader & {
    notifications: AppHeaderNotificationSettings;
    renderProfile?: RenderProfile;
    renderFavorites?: RenderFavorites;
    user: User;
};
export declare type AnonHeaderVariant = 'landing' | 'login' | 'signup';
export declare type AnonHeader = BaseHeader & {
    redirectParam?: string;
    type: 'anon';
    variant?: AnonHeaderVariant;
    user?: User;
};
export declare type FreeHeader = LoggedInHeader & {
    type: 'free';
};
export declare type ProHeader = LoggedInHeader & {
    type: 'pro';
};
export declare type LoadingHeader = BaseHeader & {
    type: 'loading';
};
export declare enum CrossDeviceItemId {
    NOTIFICATIONS = "notifications",
    BOOKMARKS = "bookmarks",
    UNSET = ""
}
export declare type CrossDeviceStateProps = {
    openCrossDeviceItemId: CrossDeviceItemId;
    setOpenCrossDeviceItemId: React.Dispatch<React.SetStateAction<string>>;
};
export {};
