import React from 'react';
import { BaseProps } from './types';
export declare type DescriptionProps = {
    text: string;
} & Pick<BaseProps, 'onAnchorClick'>;
export declare const Description: React.FC<DescriptionProps>;
