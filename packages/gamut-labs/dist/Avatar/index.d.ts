import { VisualTheme } from '@codecademy/gamut';
import { ResponsiveProp } from '@codecademy/variance';
import * as React from 'react';
export declare type AvatarImageProps = {
    alt: string;
    'aria-labelledby'?: never;
} | {
    alt?: never;
    'aria-labelledby': string;
};
export declare type AvatarBaseProps = {
    /**
     * path to image asset
     */
    src: string;
    /**
     * Disables the drop shadow entirely.
     */
    disableDropshadow?: boolean;
    /**
     * Size of the Avatar.
     */
    size?: ResponsiveProp<24 | 32 | 40 | 48 | 64 | 118>;
    /**
     * Overrides styles on the Avatar container.
     */
    className?: string;
    /**
     * @deprecated
     * This will be determined automatically by the theme moving forward.
     * Supplying it will determine the color of drop shadow.
     */
    mode?: VisualTheme;
};
export declare type AvatarProps = AvatarBaseProps & AvatarImageProps;
export declare const Avatar: React.FC<AvatarProps>;
