import { WithChildrenProp } from '@codecademy/gamut';
import * as React from 'react';
import { BannerProps } from '../Banner';
import { GlobalFooterProps } from '../GlobalFooter';
import { GlobalHeaderProps } from '../GlobalHeader';
export declare type GlobalPageBackgroundColor = 'beige' | 'background' | 'navy' | 'paleBlue' | 'paleGreen' | 'palePink' | 'paleYellow' | 'white';
export interface GlobalPageProps extends WithChildrenProp {
    backgroundColor?: GlobalPageBackgroundColor;
    /**
     * Props directly passed to the Banner.
     */
    banner?: BannerProps;
    /**
     * Element type to render around the children.
     */
    contentAs?: 'div' | 'main';
    /**
     * Props directly passed to the GlobalFooter.
     */
    footer: GlobalFooterProps;
    /**
     * Props directly passed to the GlobalHeader.
     */
    header: GlobalHeaderProps;
    /**
     * Custom element ID to link to by the SkipToContent control, if not a default one at the beginning of the page.
     */
    skipToContentId?: string;
}
export declare const GlobalPage: React.FC<GlobalPageProps>;
