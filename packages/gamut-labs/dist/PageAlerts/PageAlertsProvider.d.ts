import { WithChildrenProp } from '@codecademy/gamut';
import * as React from 'react';
import { PageAlert } from './types';
export declare const usePageAlertsContext: () => PageAlertsContextValue;
export declare type PageAlertsContextValue = {
    alerts: PageAlert[];
    addAlert: (alert: PageAlert) => void;
    closeAlert: (alertMessage: string) => void;
};
export declare const PageAlertsContext: React.Context<PageAlertsContextValue>;
export declare const PageAlertsProvider: React.FC<WithChildrenProp>;
