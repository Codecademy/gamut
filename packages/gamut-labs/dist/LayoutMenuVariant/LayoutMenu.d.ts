import { WithChildrenProp } from '@codecademy/gamut';
import React from 'react';
import { Section, SectionItem } from './AccordionMenu';
export interface LayoutMenuProps extends WithChildrenProp {
    /**
     * Accessibility label for the mobile Flyout's close button.
     */
    closeLabel: string;
    /**
     * An array of sections containing the title, slug, and items, each of which will become an accordion. Each item contains a title, slug, and onClick.
     */
    sections: Section[];
    /**
     * Callback to be run on click of the accordion button
     */
    onSectionToggle: (sectionSlug: string) => void;
    /**
     * Text shown in mobile button that opens flyout on click
     */
    mobileButtonText: string;
    /**
     * Breakpoint above which the menu button displays as a full sidebar
     */
    breakpoint?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    /**
     * An array of section items, each of which become an additional link on top of the accordion section.
     */
    topLinkSections?: SectionItem[];
    /**
     * Set fixed height for menu with overflow
     */
    menuHeight?: 'sm' | 'md' | 'lg';
}
export declare const LayoutMenu: React.FC<LayoutMenuProps>;
