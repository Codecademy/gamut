/// <reference types="react" />
export declare type BaseProps = {
    title?: string;
    /**
     * Body text as markdown
     */
    desc?: string;
    /**
     * Callback when a markdown anchor tag is clicked
     */
    onAnchorClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
    /**
     * text: button text
     *
     * href: url to navigate to when clicking the button
     *
     * onClick: callback when the button is clicked
     *
     * buttonType: whether to show a CTA button or a regular fill button, defaults to CTA button
     */
    cta?: {
        text: string;
        href: string;
        onClick?: React.MouseEventHandler;
        buttonType?: 'cta' | 'fill';
    };
    testId?: string;
};
