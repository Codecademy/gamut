import 'katex/dist/katex.css';
import React from 'react';
export declare type MathBlockProps = {
    wrap?: boolean;
    language?: string;
    filename?: string;
    className?: string;
    children: string;
};
export declare const MathBlock: React.FC<MathBlockProps>;
