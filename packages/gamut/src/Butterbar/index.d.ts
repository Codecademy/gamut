import React, { Component } from 'react';
export declare enum ButterbarStyle {
    BorderBottom = "border-bottom",
    FullWidth = "full-width"
}
export declare type ButterbarProps = {
    classNames?: {
        container?: string;
        content?: string;
    };
    displayStyle?: ButterbarStyle;
    storage?: ButterbarStorage;
    icon?: React.ReactNode;
};
export declare type ButterbarStorage = {
    key: string;
    local: Pick<Storage, 'getItem' | 'setItem'>;
};
declare type ButterbarState = {
    closed: boolean;
    rendered: boolean;
};
declare class Butterbar extends Component<ButterbarProps, ButterbarState> {
    state: {
        closed: boolean;
        rendered: boolean;
    };
    closeButterbar: (event: React.SyntheticEvent<Element, Event>, storage: ButterbarStorage) => void;
    componentDidMount(): void;
    render(): JSX.Element;
}
export default Butterbar;
