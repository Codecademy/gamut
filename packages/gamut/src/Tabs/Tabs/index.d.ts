import { ReactElement, Component } from 'react';
export interface TabsProps {
    activeTabIndex?: number;
    children: ReactElement<any, any>[];
    className?: string;
    defaultActiveTabIndex?: number;
    onChange?: (activeTabIndex: number) => void;
    renderAllPanels?: boolean;
}
export interface TabsState {
    activeTabIndex: number;
}
declare class Tabs extends Component<TabsProps> {
    state: TabsState;
    componentDidUpdate(prevProps: TabsProps, prevState: TabsState): void;
    idPrefix: string;
    createBaseId: (index: number) => string;
    isControlled: () => boolean;
    updateTabIndexState: (index: number) => void;
    render(): JSX.Element;
}
export default Tabs;
