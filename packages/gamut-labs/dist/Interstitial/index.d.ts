import React from 'react';
export declare type InterstitialProps = {
    /** If provided, these buttons will render below the title and children in a column. */
    buttons?: React.ReactNode[];
    className?: string;
    /** An optional image, emoji, or component that will render above the title. */
    decoration?: React.ReactNode;
    /** If enabled, focus will be pulled onto the title of the component upon render. Should be enabled if Interstitial is not the child of a component with focus managment, such as ModalDeprecated. */
    focus?: boolean;
    /** h1 title for the interstitial */
    title: string;
};
export declare const Interstitial: React.FC<InterstitialProps>;
