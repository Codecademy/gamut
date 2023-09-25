import { WithChildrenProp } from '@codecademy/gamut';
import * as React from 'react';
import { DropdownItem } from './DropdownList';
export interface DropdownButtonProps extends WithChildrenProp {
    buttonType?: 'fill' | 'stroke' | 'kebab' | 'horizontalKebab';
    dropdownItems: DropdownItem[];
    align?: 'left' | 'right';
    onClick?: (event: React.MouseEvent) => void;
    verticalOffset?: number;
    horizontalOffset?: number;
}
export declare const DropdownButton: React.FC<DropdownButtonProps>;
