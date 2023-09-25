import * as React from 'react';
import { GlobalFooterClickHandler } from '../types';
export declare type CompanyLinksProps = {
    hidePricing?: boolean;
    onClick: GlobalFooterClickHandler;
};
export declare const CompanyLinks: React.FC<CompanyLinksProps>;
