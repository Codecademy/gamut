import React from 'react';
export declare type ErrorContentsProps = {
    /**
     * Any debug info to display, such as ["User ID", <user-id>].
     */
    supportInformation?: [string, string][];
};
export declare const ErrorContents: React.FC<ErrorContentsProps>;
