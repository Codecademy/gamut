import { CardProps, HeadingTags } from '@codecademy/gamut';
import React from 'react';
import { TagColor } from './BottomTag/index';
import { SubtitleProps } from './Subtitle';
export declare type ProgressState = 'inProgress' | 'completed';
export declare type FooterTextVariantType = 'enrolled' | 'inProgress';
export declare type CurriculumCardProps = SubtitleProps & {
    beta?: boolean;
    /**
     * Displays the curriculum type above the title
     */
    text: string;
    title: string;
    headingLevel?: HeadingTags;
    image?: string;
    isFullSize?: boolean;
    isStaticSize?: boolean;
    progressState?: ProgressState;
    showProLogo?: boolean;
    tag?: string;
    tagColor?: TagColor;
    showAltSubtitle?: boolean;
    /**
     * Changes In Progress card footer text from "Enrolled..." to "In Progress..."
     */
    footerTextVariant?: FooterTextVariantType;
    /**
     * optional text to be displayed below card subtitle
     */
    description?: string;
    /**
     * allows description to be shown in card body.
     */
    showDescription?: boolean;
    /**
     * career path cards are displayed with a variant style / decorative element
     */
    showCareerPathVariant?: boolean;
    /**
     * displays inner content with a horizontal orientation
     */
    horizontalOrientation?: boolean;
    /**
     * custom minimum height for curriculum card in pixels
     */
    minHeight?: CardProps['minHeight'];
    /**
     * custom minimum width for curriculum card in pixels
     */
    minWidth?: CardProps['minWidth'];
};
export declare const CurriculumCard: React.FC<CurriculumCardProps>;
