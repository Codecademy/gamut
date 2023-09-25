import { WithChildrenProp } from '@codecademy/gamut';
import { AriaAttributes, ReactNode } from 'react';
import * as React from 'react';
declare type TextButtonMinimumProps = AriaAttributes & {
    text: string;
    href?: string;
    onClick?: () => void;
};
export declare type SectionButton = TextButtonMinimumProps | ReactNode;
export interface PageSectionProps extends WithChildrenProp {
    title: string;
    headerButton?: SectionButton;
    headerSecondaryButton?: SectionButton;
    footerButton?: SectionButton;
}
export declare const PageSection: React.FC<PageSectionProps>;
export {};
