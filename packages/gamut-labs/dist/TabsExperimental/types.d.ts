import { ReactElement } from 'react';
export declare type TabsProps = {
    children: ReactElement<any, any>[];
    className?: string;
};
export declare type TabPanelProps = {
    title: string;
    children: React.ReactNode | React.ReactNode[];
    className?: string;
};
export declare type DerivedPanelProps = Pick<TabPanelProps, 'className' | 'children'> & {
    isActiveTab: boolean;
};
export declare type TabPanelListProps = Pick<TabsProps, 'children'> & {
    activeTabIndex: number;
};
export declare type TabListProps = Pick<TabsProps, 'children'> & {
    activeTabIndex: number;
    setActiveTabIndex: (index: number) => void;
};
export declare type TabProps = Pick<TabPanelProps, 'title'> & {
    isActiveTab: boolean;
    onClick: () => void;
};
