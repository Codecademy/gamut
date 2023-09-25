import { WithChildrenProp } from '@codecademy/gamut';
import * as React from 'react';
export interface TitleProps extends WithChildrenProp {
    isPageHeading?: boolean;
}
export declare const Title: React.FC<TitleProps>;
