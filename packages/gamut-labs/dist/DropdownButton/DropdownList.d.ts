import { GamutIconProps } from '@codecademy/gamut-icons';
import * as React from 'react';
export declare type DropdownItem = {
    id: string;
    icon?: React.ComponentType<GamutIconProps>;
    text: string;
    clickHandler?: (event: React.MouseEvent) => void;
} & Partial<Pick<HTMLAnchorElement, 'href' | 'target'>>;
export declare type DropdownListProps = {
    dropdownItems: DropdownItem[];
    onClose?: () => void;
};
export declare const DropdownList: React.FC<DropdownListProps>;
