import React from 'react';
import { AppHeaderCatalogDropdownItem, AppHeaderDropdownItem, AppHeaderResourcesDropdownItem } from '../../AppHeader/AppHeaderElements/types';
export declare type AppHeaderSubMenuTargetProps = {
    item: AppHeaderDropdownItem | AppHeaderCatalogDropdownItem | AppHeaderResourcesDropdownItem;
    openSubMenu: (event: React.MouseEvent, item: AppHeaderDropdownItem | AppHeaderCatalogDropdownItem | AppHeaderResourcesDropdownItem) => void;
};
export declare const AppHeaderSubMenuTarget: React.FC<AppHeaderSubMenuTargetProps>;
