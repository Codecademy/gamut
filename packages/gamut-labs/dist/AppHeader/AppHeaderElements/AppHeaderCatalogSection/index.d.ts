import * as React from 'react';
import { AppHeaderCatalogDropdownItem, AppHeaderClickHandler } from '../types';
export declare type AppHeaderCatalogSectionProps = {
    action: AppHeaderClickHandler;
    item: AppHeaderCatalogDropdownItem;
    ref?: React.RefObject<HTMLUListElement>;
    role?: string;
    id?: string;
    keyDownEvents?: (event: React.KeyboardEvent) => void;
    isOpen?: boolean;
    handleClose?: () => void;
};
export declare const AppHeaderCatalogSection: React.ForwardRefExoticComponent<Pick<AppHeaderCatalogSectionProps, "id" | "role" | "action" | "isOpen" | "item" | "keyDownEvents" | "handleClose"> & React.RefAttributes<HTMLDivElement>>;
