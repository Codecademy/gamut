import React from 'react';
import { AppHeaderCatalogDropdownProps } from '../../AppHeader/AppHeaderElements/AppHeaderCatalogDropdown';
import { AppHeaderDropdownProps } from '../../AppHeader/AppHeaderElements/AppHeaderDropdown';
import { AppHeaderResourceDropdownProps } from '../../AppHeader/AppHeaderElements/AppHeaderResourcesDropdown';
export declare type AppHeaderSubMenuMobileProps = (AppHeaderDropdownProps | AppHeaderCatalogDropdownProps | AppHeaderResourceDropdownProps) & {
    handleCloseSubMenu: () => void;
    handleCloseMainMenu: () => void;
};
export declare const AppHeaderSubMenuMobile: React.FC<AppHeaderSubMenuMobileProps>;
