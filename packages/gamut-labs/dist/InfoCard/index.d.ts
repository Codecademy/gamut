import { HeadingTags } from '@codecademy/gamut';
import React from 'react';
export declare type TagColor = 'blue' | 'green' | 'pink';
export interface InfoCardProps {
    href: string;
    onClick?: () => void;
    topText: string;
    title: string;
    subtitle: string;
    body?: string;
    bottomLeftText?: string;
    bottomRightTagText?: string;
    bottomRightTagColor?: TagColor;
    cardHeight?: string | number;
    titleHeadingLevel?: HeadingTags;
}
export declare const InfoCard: React.FC<InfoCardProps>;
