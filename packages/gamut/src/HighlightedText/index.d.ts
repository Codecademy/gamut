import React, { HTMLAttributes } from 'react';
export declare type HighlightedTextProps = {
    children?: string;
    wordProps?: HTMLAttributes<HTMLSpanElement>;
    textProps?: HTMLAttributes<HTMLElement>;
};
export declare const HighlightedText: React.FC<HighlightedTextProps>;
export default HighlightedText;
