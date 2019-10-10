import { Component } from 'react';
export declare type ToggleProps = {
    checked?: boolean;
    onChange?: (...args: any[]) => any;
    label?: string;
    disabled?: boolean;
};
declare class Toggle extends Component<ToggleProps, {}> {
    render(): JSX.Element;
}
export default Toggle;
