import React, { HTMLAttributes } from 'react';
export declare type SelectProps = HTMLAttributes<HTMLSelectElement> & {
    className?: string;
    defaultValue?: string;
    htmlFor?: string;
    options?: string[] | {};
};
declare const Select: React.FC<SelectProps>;
export default Select;
