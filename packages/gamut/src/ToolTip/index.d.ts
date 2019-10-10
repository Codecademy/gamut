import { ReactNode, Component } from 'react';
declare type ToolTipProps = {
    target?: ReactNode;
    children?: ReactNode;
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    tipClassName?: string;
    id: string;
};
declare class ToolTip extends Component<ToolTipProps> {
    static defaultProps: {
        position: string;
    };
    render(): JSX.Element;
}
export default ToolTip;
