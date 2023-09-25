import { WithChildrenProp } from '@codecademy/gamut';
import * as React from 'react';
export interface AppBarProps extends WithChildrenProp {
    className?: string;
    /**
     * Whether the container should be larger than the default content size.
     */
    wide?: boolean;
}
export declare const AppBar: React.FC<AppBarProps>;
