import * as React from 'react';
export declare type TagColor = 'blue' | 'green' | 'pink';
export declare type BottomTagProps = {
    text: string;
    color: TagColor;
};
export declare const BottomTag: React.FC<BottomTagProps>;
