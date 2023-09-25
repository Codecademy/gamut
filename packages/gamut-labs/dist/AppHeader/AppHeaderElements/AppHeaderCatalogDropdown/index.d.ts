import * as React from 'react';
import { AppHeaderCatalogDropdownItem, AppHeaderClickHandler } from '../types';
export declare type AppHeaderCatalogDropdownProps = {
    action: AppHeaderClickHandler;
    item: AppHeaderCatalogDropdownItem;
    isAnon: boolean;
};
export declare const KEY_CODES: {
    readonly UP: "ArrowUp";
    readonly DOWN: "ArrowDown";
    readonly LEFT: "ArrowLeft";
    readonly RIGHT: "ArrowRight";
    readonly END: "End";
    readonly ENTER: "Enter";
    readonly ESC: "Escape";
    readonly HOME: "Home";
    readonly SPACE: " ";
    readonly TAB: "Tab";
};
export declare const AppHeaderCatalogDropdown: React.FC<AppHeaderCatalogDropdownProps>;
