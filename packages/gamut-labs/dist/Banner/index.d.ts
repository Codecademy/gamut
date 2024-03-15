import { BackgroundProps } from '@codecademy/gamut-styles';
import React from 'react';
export declare type BannerVariant = typeof bannerVariants[number];
declare const bannerVariants: readonly ["navy", "yellow"];
export interface BannerProps extends Omit<BackgroundProps, 'bg'> {
    children: string;
    /** Visual variation for banners, defaults to navy */
    variant?: BannerVariant | null;
    /**  Callback called when the user closes the banner. */
    onClose: () => void;
    /** Call to action click callback */
    onCtaClick?: () => void;
}
export declare const Banner: React.FC<BannerProps>;
export {};
