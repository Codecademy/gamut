import React from 'react';
import { BaseProps } from './types';
export declare type FeaturedImageProps = {
    src: string;
    alt: string;
};
export declare const FeaturedImage: React.FC<FeaturedImageProps>;
export declare type FeaturedIconProps = {
    src: string;
    alt: string;
};
export declare const FeaturedIcon: React.FC<FeaturedIconProps>;
export declare const FeaturedStat: React.FC;
export declare type FeaturedTitleProps = {
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
};
export declare const FeaturedTitle: React.FC<FeaturedTitleProps>;
export declare type FeaturedDescriptionProps = Pick<BaseProps, 'desc' | 'onAnchorClick'>;
export declare const FeaturedDescription: React.FC<FeaturedDescriptionProps>;
export declare type FeatureProps = {
    testId?: string;
};
export declare const Feature: React.FC<FeatureProps>;
