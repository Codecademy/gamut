import React from 'react';
import { DropdownItem } from './DropdownList';
export declare type DropdownButtonProps = {
    buttonType?: 'fill' | 'stroke' | 'kebab' | 'horizontalKebab';
    dropdownItems: DropdownItem[];
    align?: 'left' | 'right';
    onClick?: (event: React.MouseEvent) => void;
    verticalOffset?: number;
    horizontalOffset?: number;
};
export declare const DropdownButton: React.FC<DropdownButtonProps>;
