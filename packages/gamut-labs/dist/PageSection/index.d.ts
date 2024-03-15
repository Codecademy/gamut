import React, { AriaAttributes, ReactNode } from 'react';
declare type TextButtonMinimumProps = AriaAttributes & {
    text: string;
    href?: string;
    onClick?: () => void;
};
export declare type SectionButton = TextButtonMinimumProps | ReactNode;
export declare type PageSectionProps = {
    title: string;
    headerButton?: SectionButton;
    headerSecondaryButton?: SectionButton;
    footerButton?: SectionButton;
};
export declare const PageSection: React.FC<PageSectionProps>;
export {};
