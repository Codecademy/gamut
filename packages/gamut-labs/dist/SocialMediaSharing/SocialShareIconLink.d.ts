import { GamutIconProps } from '@codecademy/gamut-icons';
import React from 'react';
export declare type BaseSocialShareProps = {
    sectionId?: string;
    size?: 'small' | 'normal';
};
export declare type SocialShareIconLinkProps = BaseSocialShareProps & {
    icon: React.ComponentType<GamutIconProps>;
    id: string;
    href: string;
    onClick?: (e: React.MouseEvent) => void;
};
export declare const SocialShareIconLink: React.FC<SocialShareIconLinkProps>;
