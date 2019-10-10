import React, { HTMLAttributes } from 'react';
export declare type RadioGroupProps = HTMLAttributes<HTMLDivElement> & {
    children: any;
    htmlForPrefix?: string;
    name?: string;
    selected?: string;
};
declare const RadioGroup: React.FC<RadioGroupProps>;
export default RadioGroup;
