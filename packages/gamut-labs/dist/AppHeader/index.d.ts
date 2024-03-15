import React, { ReactNode } from 'react';
import { CrossDeviceBookmarkParts } from '../Bookmarks/types';
import { CrossDeviceStateProps } from '../GlobalHeader/types';
import { AppHeaderNotificationSettings } from '../Notifications/types';
import { AppHeaderClickHandler, AppHeaderItem } from './AppHeaderElements/types';
import { AppHeaderSearch } from './Search/useHeaderSearch';
import { FormattedAppHeaderItems } from './types';
export declare type AppHeaderProps = {
    action: AppHeaderClickHandler;
    items: FormattedAppHeaderItems;
    notifications?: AppHeaderNotificationSettings;
    redirectParam?: string;
    search: AppHeaderSearch;
    isAnon: boolean;
    crossDeviceBookmarkParts?: CrossDeviceBookmarkParts;
} & CrossDeviceStateProps;
export declare const StyledAppBar: import("@emotion/styled").StyledComponent<import("../AppBar").AppBarProps & {
    children?: React.ReactNode;
} & {
    theme?: import("@emotion/react").Theme | undefined;
}, {}, {}>;
export declare const StyledMenuBar: import("@emotion/styled").StyledComponent<{
    theme?: import("@emotion/react").Theme | undefined;
    as?: React.ElementType<any> | undefined;
} & {
    theme?: import("@emotion/react").Theme | undefined;
}, React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>, {}>;
export declare const mapItemToElement: (action: AppHeaderClickHandler, item: AppHeaderItem, isAnon: boolean, redirectParam?: string | undefined, onKeyDown?: ((event: React.KeyboardEvent) => void) | undefined, mobile?: boolean) => ReactNode;
export declare const AppHeader: React.FC<AppHeaderProps>;
