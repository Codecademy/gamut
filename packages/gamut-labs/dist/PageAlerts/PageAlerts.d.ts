import React from 'react';
import { PageAlert } from './types';
export declare type PageAlertsProps = {
    extra?: PageAlert[];
};
export declare const AlertArea: import("@emotion/styled").StyledComponent<{
    theme?: import("@emotion/react").Theme | undefined;
    as?: React.ElementType<any> | undefined;
}, React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;
export declare const PageAlerts: React.FC<PageAlertsProps>;
