import React from 'react';
import { PageSingleFeatureProps } from './PageSingleFeature';
export declare type PageHeroProps = Omit<PageSingleFeatureProps, 'mediaWidth' | 'hideImageOnMobile' | 'isPageHeading'> & {
    showImageOnMobile?: boolean;
    textLength?: 'short' | 'long';
};
export declare const PageHero: React.FC<PageHeroProps>;
