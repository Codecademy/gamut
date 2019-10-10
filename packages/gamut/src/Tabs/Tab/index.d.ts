import { ReactNode, FunctionComponent } from 'react';
export declare type TabProps = {
    active?: boolean;
    activeClassName?: string;
    children?: ReactNode;
    className?: string;
    id?: string;
    disabled?: boolean;
    onChange?: (newTabIndex: number) => void;
    tabIndex?: number;
};
declare const Tab: FunctionComponent<TabProps>;
export default Tab;
