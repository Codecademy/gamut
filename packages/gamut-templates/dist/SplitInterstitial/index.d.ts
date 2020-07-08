import React, { ReactNode } from 'react';
declare type SplitInterstitialSide = {
    children?: ReactNode;
    className?: string;
};
export declare type SplitInterstitialProps = {
    className?: string;
    left?: SplitInterstitialSide;
    right?: SplitInterstitialSide;
    topLeftImage?: {
        src?: string;
        className?: string;
    };
    bottomRightImage?: {
        src?: string;
        className?: string;
    };
};
export declare const SplitInterstitial: React.FC<SplitInterstitialProps>;
export default SplitInterstitial;
