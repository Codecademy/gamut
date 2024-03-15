import { ColumnProps, VideoProps } from '@codecademy/gamut';
import React from 'react';
import { BaseProps } from './types';
declare type ColumnSize = Extract<ColumnProps['size'], number>;
export declare type MediaColumnsSize = Extract<ColumnSize, 3 | 4 | 5 | 6>;
declare type ImageProps = {
    src: string;
    alt: string;
};
declare type MediaProps = ({
    type: 'image';
    linkUrl?: string;
} & ImageProps) | ({
    type: 'video';
} & VideoProps);
declare type Eyebrow = {
    accent?: boolean;
    text: string;
};
export declare type PageSingleFeatureProps = BaseProps & {
    /**
     * Object containing eyebrow text shown above title and optional accent boolean
     */
    eyebrow?: Eyebrow;
    /**
     * Whether the image should be hidden on mobile. Note that videos are always shown on mobile for accessibility
     */
    hideImageOnMobile?: boolean;
    /**
     * If the heading is the page h1 heading or a smaller heading
     */
    isPageHeading?: boolean;
    /**
     * Whether to show an image or a video, with the associated props to do so
     */
    media?: MediaProps;
    /**
     * Number of columns out of 12 that the media should take up, defaults to 6. The remaining columns will be used for the text
     */
    mediaWidth?: MediaColumnsSize;
};
export declare const PageSingleFeature: React.FC<PageSingleFeatureProps>;
export {};
