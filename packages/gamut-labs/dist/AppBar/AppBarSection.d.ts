import { WithChildrenProp } from '@codecademy/gamut';
import * as React from 'react';
export interface AppBarSectionProps extends WithChildrenProp {
    /**
     * Position of the the section within the AppBar.
     */
    position?: 'left' | 'center' | 'right';
    className?: string;
}
export declare const AppBarSection: React.FC<AppBarSectionProps>;
