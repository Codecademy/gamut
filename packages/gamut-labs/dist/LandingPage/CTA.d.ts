import React from 'react';
export declare type CTAProps = {
    href: string;
    onClick?: React.MouseEventHandler;
    buttonType?: 'cta' | 'fill';
};
export declare const CTA: React.FC<CTAProps>;
