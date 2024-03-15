import { system } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import React from 'react';
import { SectionItem } from './AccordionMenu';
export declare type LayoutMenuSectionStyles = StyleProps<typeof system.space>;
export declare type LayoutMenuSectionProps = LayoutMenuSectionStyles & {
    items: SectionItem[];
    selectedItem?: string;
    onItemClick: () => void;
};
export declare const LayoutMenuSection: React.FC<LayoutMenuSectionProps>;
