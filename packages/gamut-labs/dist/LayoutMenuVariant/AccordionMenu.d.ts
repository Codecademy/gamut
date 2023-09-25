import React from 'react';
export declare type SectionItem = {
    title: string;
    slug: string;
    href: string;
    onClick: (event: React.MouseEvent) => void;
};
export declare type Section = {
    title: string;
    slug: string;
    items: SectionItem[];
};
export declare type AccordionMenuProps = {
    section: Section;
    onSectionToggle: (sectionSlug: string) => void;
    onItemClick: () => void;
};
export declare const AccordionMenu: React.FC<AccordionMenuProps>;
