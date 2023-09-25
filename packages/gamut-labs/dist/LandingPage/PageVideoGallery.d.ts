import * as React from 'react';
import { BaseProps } from './types';
export declare type PageVideo = {
    url: string;
    title: string;
    placeholderImage?: string;
};
export declare type PageVideoGalleryProps = BaseProps & {
    videos: PageVideo[];
};
export declare const PageVideoGallery: React.FC<PageVideoGalleryProps>;
