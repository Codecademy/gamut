import { colors } from '@codecademy/gamut-styles';
import React from 'react';
declare type BaseProps = {
    ariaLabel?: string;
    backgroundColor?: keyof typeof colors;
    width?: number;
};
export declare type ProLogoProps = (BaseProps & {
    variant: 'transparent';
}) | (BaseProps & {
    variant: 'cutout';
    cutoutColor?: keyof typeof colors;
});
export declare const ProLogo: React.FC<ProLogoProps>;
export {};
