import * as React from 'react';
import type { BaseSocialShareProps } from './SocialShareIconLink';
export declare type SocialMediaShare = {
    url: string;
    message?: string;
    hashtags?: string[];
    mention?: string;
};
export declare const createShareLink: (formatter: (payload: SocialMediaShare) => Record<string, string>, baseUri: string, payload: SocialMediaShare) => string;
export declare const SOCIAL_SHARING_PLATFORMS: ({
    id: string;
    displayName: string;
    icon: React.ForwardRefExoticComponent<import("@codecademy/gamut-icons").GamutIconProps & React.RefAttributes<SVGSVGElement>>;
    baseUrl: string;
    formatShare: ({ url, message }: SocialMediaShare) => {
        hashtag: string;
        quote?: string | undefined;
        href?: string | undefined;
    };
} | {
    id: string;
    displayName: string;
    icon: React.ForwardRefExoticComponent<import("@codecademy/gamut-icons").GamutIconProps & React.RefAttributes<SVGSVGElement>>;
    baseUrl: string;
    formatShare: ({ url, message, hashtags, mention }: SocialMediaShare) => {
        via?: string | undefined;
        hashtags?: string | undefined;
        text?: string | undefined;
        url?: string | undefined;
    };
} | {
    id: string;
    displayName: string;
    icon: React.ForwardRefExoticComponent<import("@codecademy/gamut-icons").GamutIconProps & React.RefAttributes<SVGSVGElement>>;
    baseUrl: string;
    formatShare: ({ url }: SocialMediaShare) => {
        url: string;
    };
})[];
export declare type SocialMediaSharingProps = BaseSocialShareProps & {
    url: string;
    message?: string;
    hashtags?: string[];
    mention?: string;
    action?: (e: React.MouseEvent, target: string) => void;
    label?: string;
    iconStyles?: string;
};
export declare const SocialMediaSharing: React.FC<SocialMediaSharingProps>;
