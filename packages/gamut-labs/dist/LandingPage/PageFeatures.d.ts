import React from 'react';
import { BaseProps } from './types';
export declare type PageFeaturesProps = BaseProps & {
    maxCols?: 1 | 2 | 3 | 4;
    featuresMedia?: 'image' | 'icon' | 'stat';
    features: {
        title?: string;
        desc?: string;
        imgSrc?: string;
        imgAlt?: string;
        statText?: string;
        testId?: string;
    }[];
};
export declare const PageFeatures: React.FC<PageFeaturesProps>;
