import { ButtonProps } from '@codecademy/gamut';
import { IllustrationProps } from '@codecademy/gamut-illustrations';
import React from 'react';
import { DropdownButtonProps } from '..';
export declare type EmptySectionProps = {
    /**
     * Paragraph text that displays beneath the heading text
     */
    bodyText: string;
    /**
     * Button or dropdown button with an action for the user to take
     */
    children: React.ReactElement<ButtonProps | DropdownButtonProps>;
    /**
     * The larger heading text that appears over the body text
     */
    headingText: string;
    illustration: React.ComponentType<IllustrationProps>;
    /**
     * Whether the illustration appears to the left or right of the rest of the section's content
     */
    illustrationPosition?: 'left' | 'right';
    /**
     * Whether the pattern background stretches to the end of the left or right of the viewport
     */
    stretchDirection: 'left' | 'right';
};
export declare const EmptySection: React.FC<EmptySectionProps>;
