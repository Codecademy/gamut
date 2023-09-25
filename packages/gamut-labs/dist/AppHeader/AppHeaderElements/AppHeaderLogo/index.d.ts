import * as React from 'react';
import { AppHeaderClickHandler, AppHeaderLogoItem } from '../types';
export declare type AppHeaderLogoProps = {
    action: AppHeaderClickHandler;
    item: AppHeaderLogoItem;
};
export declare const AppHeaderLogo: React.FC<AppHeaderLogoProps>;
