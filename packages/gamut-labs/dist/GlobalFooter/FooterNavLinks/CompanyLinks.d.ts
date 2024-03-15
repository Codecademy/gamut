import React from 'react';
import { GlobalFooterClickHandler } from '../types';
export declare type CompanyLinksProps = {
    hidePricing?: boolean;
    onClick: GlobalFooterClickHandler;
    userGeo: string;
};
export declare const CompanyLinks: React.FC<CompanyLinksProps>;
