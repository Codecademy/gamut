import React from 'react';
import { ContainerProps } from './Container';
declare class Item extends React.Component<ContainerProps> {
    static displayName: string;
    static defaultProps: {
        flex: boolean;
    };
    render(): JSX.Element;
}
export default Item;
