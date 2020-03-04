import React from 'react';
import { VisualTheme } from '@codecademy/gamut';
declare type QuoteProps = {
    text: string;
    theme?: VisualTheme;
    classNames?: {
        text?: string;
        icon?: string;
    };
};
export declare const Quote: React.FC<QuoteProps>;
export default Quote;
