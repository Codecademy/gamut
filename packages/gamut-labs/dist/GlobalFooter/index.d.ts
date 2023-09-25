import * as React from 'react';
import { GlobalFooterClickHandler } from './types';
export declare type GlobalFooterProps = {
    className?: string;
    /**
     * Hide pricing details, such as for rendering in an app store app.
     */
    hidePricing?: boolean;
    /**
     * Called whenever a link is clicked.
     */
    onClick: GlobalFooterClickHandler;
    /**
     * Called when the text in the MadeIn component is clicked
     */
    onMadeInClick?: (text: string) => void;
};
export declare const GlobalFooter: React.FC<GlobalFooterProps>;
