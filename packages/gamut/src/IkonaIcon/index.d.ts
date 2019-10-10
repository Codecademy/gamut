import { PureComponent, ReactNode, HTMLAttributes } from 'react';
export interface IkonaIconProps extends HTMLAttributes<HTMLElement> {
    children?: ReactNode | ReactNode[];
    className?: string;
    name: string;
    size?: number;
    style?: {};
}
declare class IkonaIcon extends PureComponent<IkonaIconProps> {
    render(): JSX.Element;
}
export default IkonaIcon;
