import { HTMLAttributes, FunctionComponent } from 'react';
export interface IframeProps extends HTMLAttributes<HTMLIFrameElement> {
    src?: string;
    title?: string;
    width?: number;
    height?: number;
}
declare const Iframe: FunctionComponent<IframeProps>;
export default Iframe;
