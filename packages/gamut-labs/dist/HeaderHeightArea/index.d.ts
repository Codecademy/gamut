import { WithChildrenProp } from '@codecademy/gamut';
import { ResponsiveProp } from '@codecademy/variance';
import * as React from 'react';
export interface HeaderHeightAreaProps extends WithChildrenProp {
    as?: React.ElementType<any>;
    display: ResponsiveProp<'none' | 'block'>;
    title?: string;
}
export declare const HeaderHeightArea: React.FC<HeaderHeightAreaProps>;
