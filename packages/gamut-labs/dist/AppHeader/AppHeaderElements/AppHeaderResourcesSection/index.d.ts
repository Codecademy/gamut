import React from 'react';
import { AppHeaderClickHandler } from '../types';
export declare type AppHeaderResourcesSectionProps = {
    action: AppHeaderClickHandler;
    ref?: React.RefObject<HTMLUListElement>;
    role?: string;
    id?: string;
    keyDownEvents?: (event: React.KeyboardEvent) => void;
    isOpen?: boolean;
    handleClose?: () => void;
};
export declare const AppHeaderResourcesSection: React.ForwardRefExoticComponent<Pick<AppHeaderResourcesSectionProps, "id" | "role" | "action" | "isOpen" | "keyDownEvents" | "handleClose"> & React.RefAttributes<HTMLDivElement>>;
