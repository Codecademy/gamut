import { FunctionComponent, ReactNode } from 'react';
export declare type TabListProps = {
    activeTabIndex?: number;
    center?: boolean;
    children: ReactNode;
    className?: string;
    createBaseId?: (index: number) => string;
    maxWidth?: string;
    onChange?: () => void;
};
declare const TabList: FunctionComponent<TabListProps>;
export default TabList;
