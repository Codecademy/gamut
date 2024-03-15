import { VisualTheme } from '@codecademy/gamut';
import React from 'react';
export declare type TestimonialDeprecatedProps = {
    firstName: string;
    lastName: string;
    occupation: string;
    quote: string;
    mode: VisualTheme;
    /**
     * Associated workplace or institution
     */
    company?: string;
    /**
     * An avatar portrait
     */
    imageUrl?: string;
    /**
     * A long quote to replace the text with at SM viewports and higher.
     */
    longQuote?: string;
    href?: string;
    onClick?: () => void;
};
/**
 * @deprecated  This component is deprecated and will be updated soon.
 *
 * Please check the gamut board for updates on the new version of Testimonial
 */
export declare const TestimonialDeprecated: React.FC<TestimonialDeprecatedProps>;
