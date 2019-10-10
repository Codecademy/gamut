import { PureComponent } from 'react';
import { ManyOverrideSettings } from './libs/overrides';
export declare const preprocessingInstructions: {
    shouldPreprocessNode: (node: import("./libs/overrides").HTMLToReactNode) => boolean;
    preprocessNode: (node: import("./libs/overrides").HTMLToReactNode) => void;
}[];
export interface MarkdownProps {
    className?: string;
    inline?: boolean;
    overrides?: ManyOverrideSettings;
    spacing?: 'loose' | 'tight' | 'none';
    text?: string;
}
declare class Markdown extends PureComponent<MarkdownProps> {
    render(): JSX.Element;
}
export default Markdown;
