import * as React from 'react';
import { AppHeaderClickHandler, AppHeaderItem } from '../../AppHeader/AppHeaderElements/types';
export declare type AppHeaderMainMenuMobileProps = {
    action: AppHeaderClickHandler;
    items: AppHeaderItem[];
    onSearch: (query: string) => void;
    getItemType: (type: string | undefined) => void;
    isAnon: boolean;
    handleCloseMainMenu: () => void;
};
export declare const AppHeaderMainMenuMobile: React.FC<AppHeaderMainMenuMobileProps>;
