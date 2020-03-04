import React from 'react';
import { VisualTheme } from '@codecademy/gamut';
declare type AvatarImageProps = {
    alt: string;
    'aria-labelledby'?: never;
} | {
    alt?: never;
    'aria-labelledby': string;
};
declare type AvatarBaseProps = {
    src: string;
    size?: 'regular' | 'large';
    theme?: VisualTheme;
};
declare type AvatarProps = AvatarBaseProps & AvatarImageProps;
export declare const Avatar: React.FC<AvatarProps>;
export default Avatar;
