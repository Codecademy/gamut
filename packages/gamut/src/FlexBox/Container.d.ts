import React, { ReactNode, HTMLAttributes } from 'react';
declare type ContainerPosition = 'start' | 'end' | 'center' | 'baseline' | 'stretch' | 'spaceAround' | 'spaceBetween';
export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
    align?: ContainerPosition;
    alignSelf?: ContainerPosition;
    center?: boolean;
    children?: ReactNode | ReactNode[];
    className?: string;
    column?: boolean;
    fit?: boolean;
    flex?: boolean;
    grow?: number;
    inline?: boolean;
    justify?: ContainerPosition;
    nowrap?: boolean;
    reverse?: boolean;
    row?: boolean;
    shrink?: number;
    wrap?: boolean;
}
declare class Container extends React.Component<ContainerProps> {
    static displayName: string;
    static defaultProps: {
        flex: boolean;
        inline: boolean;
    };
    render(): JSX.Element;
}
export default Container;
