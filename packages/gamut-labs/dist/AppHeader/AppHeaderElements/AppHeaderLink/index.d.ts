import { AnchorProps } from '@codecademy/gamut';
import * as React from 'react';
import { AppHeaderClickHandler, AppHeaderLinkItem } from '../types';
export declare type AppHeaderLinkProps = {
    action: AppHeaderClickHandler;
    item: AppHeaderLinkItem;
    showIcon?: boolean;
    tabIndex?: string;
    onKeyDown?: (event: React.KeyboardEvent) => void;
} & AnchorProps;
export declare const AppHeaderLink: React.FC<AppHeaderLinkProps>;
