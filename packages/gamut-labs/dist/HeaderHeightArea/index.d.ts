import { ResponsiveProp } from '@codecademy/variance';
import React from 'react';
export declare type HeaderHeightAreaProps = {
    as?: React.ElementType<any>;
    display: ResponsiveProp<'none' | 'block'>;
    title?: string;
};
export declare const HeaderHeightArea: React.FC<HeaderHeightAreaProps>;
