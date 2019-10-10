import { Component, ReactNode } from 'react';
export interface TabsProps {
    config: {
        default?: boolean;
        text: string;
    }[];
    animatedUnderlineStyle?: boolean;
    children: ReactNode[];
    onChange?: (id: string) => void;
    renderAllChildren?: boolean;
}
interface TabsState {
    activeTabId?: string;
}
declare class Tabs extends Component<TabsProps, TabsState> {
    state: TabsState;
    private idPrefix;
    componentWillMount(): void;
    createId(index: number): string;
    renderTabList: (activeTabId: string) => JSX.Element;
    renderTabPanels: (activeTabId: string) => JSX.Element;
    onChange: (id: string) => void;
    render(): JSX.Element;
}
export default Tabs;
