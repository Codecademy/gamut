import React from 'react';
import { AppHeaderClickHandler, AppHeaderResourcesDropdownItem } from '../types';
export declare type AppHeaderResourceDropdownProps = {
    action: AppHeaderClickHandler;
    item: AppHeaderResourcesDropdownItem;
    isAnon: Boolean;
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
export declare const AppHeaderResourcesDropdown: React.FC<AppHeaderResourceDropdownProps>;
