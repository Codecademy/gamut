import { CSSObject } from '@emotion/core';
import { StyleTemplate, AbstractProps, AbstractTheme } from '../../types/system';
export declare type ResponsivePropertyArguments<T extends AbstractProps> = {
    propNames: (keyof T)[];
    templateFns: Partial<Record<keyof T, StyleTemplate<T>>>;
};
export declare const DEFAULT_MEDIA_QUERIES: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
};
export declare function responsiveProperty<Props extends {
    theme?: AbstractTheme;
}>({ propNames, templateFns, }: ResponsivePropertyArguments<Props>): (props: Props) => CSSObject;
