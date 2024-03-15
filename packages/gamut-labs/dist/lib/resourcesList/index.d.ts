/// <reference types="react" />
import { AppHeaderLinkItem, AppHeaderResourcesDataItem } from '../../AppHeader/AppHeaderElements/types';
declare type ResourcesList = Omit<AppHeaderLinkItem, 'trackingTarget' | 'badge'> & {
    headerTrackingTarget: string;
    footerTrackingTarget: string;
    badgeText?: string;
};
declare type FooterResourceList = {
    id: string;
    href: string;
    trackingTarget: string;
    text: string;
    newTab?: boolean;
};
export declare const renderBadge: (text: string) => JSX.Element;
export declare const resourcesList: ResourcesList[];
export declare const headerResourcesList: AppHeaderLinkItem[];
export declare const footerResourcesList: FooterResourceList[];
export declare const newHeaderResourcesList: AppHeaderResourcesDataItem[];
export {};
