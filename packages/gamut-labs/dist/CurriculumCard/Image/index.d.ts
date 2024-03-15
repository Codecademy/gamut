import React from 'react';
declare type ProgressState = 'inProgress' | 'completed';
export declare type ImageProps = {
    image: string;
    progressState?: ProgressState;
    isSmall?: boolean;
};
export declare const Image: React.FC<ImageProps>;
export {};
