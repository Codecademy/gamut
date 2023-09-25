import * as React from 'react';
import { AppHeaderClickHandler, AppHeaderDropdownItem } from '../types';
export declare type AppHeaderLinkSectionsProps = {
    action: AppHeaderClickHandler;
    item: AppHeaderDropdownItem;
    ref?: React.RefObject<HTMLUListElement>;
    role?: string;
    id?: string;
    style?: {};
    showIcon?: boolean;
    onKeyDown?: (event: React.KeyboardEvent) => void;
    onFocus?: () => void;
    onBlur?: () => void;
    mobile?: boolean;
};
export declare const AppHeaderLinkSections: React.ForwardRefExoticComponent<Pick<AppHeaderLinkSectionsProps, "style" | "id" | "role" | "onFocus" | "onBlur" | "onKeyDown" | "action" | "item" | "showIcon" | "mobile"> & React.RefAttributes<HTMLUListElement>>;
