import React from 'react';
import { AppHeaderClickHandler } from '../AppHeader/AppHeaderElements/types';
import { FormattedMobileAppHeaderItems } from '../AppHeader/types';
import { CrossDeviceBookmarkParts } from '../Bookmarks/types';
import { CrossDeviceStateProps } from '../GlobalHeader/types';
import { AppHeaderNotificationSettings } from '../Notifications/types';
export declare type AppHeaderMobileProps = {
    action: AppHeaderClickHandler;
    items: FormattedMobileAppHeaderItems;
    notifications?: AppHeaderNotificationSettings;
    redirectParam?: string;
    onSearch: (query: string) => void;
    isAnon: boolean;
    crossDeviceBookmarkParts?: CrossDeviceBookmarkParts;
} & CrossDeviceStateProps;
export declare const AppHeaderMobile: React.FC<AppHeaderMobileProps>;
