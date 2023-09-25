import { ButtonProps } from '@codecademy/gamut';
import * as React from 'react';
export interface CTAProps extends Pick<ButtonProps, 'children'> {
    href: string;
    onClick?: React.MouseEventHandler;
    buttonType?: 'cta' | 'fill';
}
export declare const CTA: React.FC<CTAProps>;
