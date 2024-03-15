import React from 'react';
import { TagColor } from '../BottomTag/index';
export declare type FooterProps = {
    beta?: boolean;
    progressState?: 'completed' | 'inProgress';
    tag?: string;
    tagColor?: TagColor;
    footerTextVariant?: 'enrolled' | 'inProgress';
};
export declare const Footer: React.FC<FooterProps>;
