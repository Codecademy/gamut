import React from 'react';
import { GlobalFooterClickHandler } from '../types';
export declare type FooterLegalProps = {
    onClick: GlobalFooterClickHandler;
    onMadeInClick?: (text: string) => void;
};
export declare const FooterLegal: React.FC<FooterLegalProps>;
