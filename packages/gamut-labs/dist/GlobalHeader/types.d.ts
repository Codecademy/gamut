import { WithChildrenProp } from '@codecademy/gamut';
import { ReactNode } from 'react';
import { AppHeaderClickHandler, AppHeaderItemWithHref } from '../AppHeader/AppHeaderElements/types';
import { AppHeaderSearch } from '../AppHeader/Search/useHeaderSearch';
import { AppHeaderNotificationSettings } from '../Notifications/types';
declare type RenderProfile = {
    desktop: () => ReactNode;
    mobile: () => ReactNode;
};
interface BaseHeader extends WithChildrenProp {
    /** A method to be called on click/activating a header item */
    action: AppHeaderClickHandler;
    /** A method to be called only on click/activating a *link* header item */
    onLinkAction?: AppHeaderClickHandler<AppHeaderItemWithHref>;
    className?: string;
    hidePricing?: boolean;
    search: AppHeaderSearch;
}
export declare type User = {
    avatar: string;
    displayName: string;
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
    hideBusinessAccount?: boolean;
};
declare type LoggedInHeader = BaseHeader & {
    notifications: AppHeaderNotificationSettings;
    renderProfile?: RenderProfile;
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
    UNSET = ""
}
export declare type CrossDeviceStateProps = {
    openCrossDeviceItemId: CrossDeviceItemId;
    setOpenCrossDeviceItemId: React.Dispatch<React.SetStateAction<string>>;
};
export {};
