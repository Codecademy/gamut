import { ReactNode, FunctionComponent } from 'react';
export declare type TabPanelProps = {
    active?: boolean;
    children?: ReactNode;
    className?: string;
    id?: string;
    renderAllPanels?: boolean;
};
declare const TabPanel: FunctionComponent<TabPanelProps>;
export default TabPanel;
