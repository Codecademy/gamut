import * as React from 'react';
export declare type GamutIconProps = {
    /**
     * A suffix added to the end of the unique generated ID for the icon. This is useful if you have multiple of the same icon on the page and need to pass accessibility guidelines.
     */
    titleId?: string;
    size?: number | string;
    title?: string;
    color?: string;
    ref?: React.Ref<SVGSVGElement>;
} & React.SVGProps<SVGSVGElement>;
