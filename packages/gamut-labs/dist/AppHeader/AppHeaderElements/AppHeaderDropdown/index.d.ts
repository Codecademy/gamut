import React from 'react';
import { AppHeaderClickHandler, AppHeaderDropdownItem } from '../types';
export declare type AppHeaderDropdownProps = {
    action: AppHeaderClickHandler;
    item: AppHeaderDropdownItem;
    onKeyDown?: (event: React.KeyboardEvent) => void;
};
export declare const AppHeaderDropdown: React.FC<AppHeaderDropdownProps>;
