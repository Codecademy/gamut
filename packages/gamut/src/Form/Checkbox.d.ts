import React, { ReactNode, HTMLAttributes } from 'react';
export declare type CheckboxProps = HTMLAttributes<HTMLInputElement> & {
    checked?: boolean;
    className?: string;
    htmlFor: string;
    label: ReactNode;
    name?: string;
    onChange?: () => void;
    required?: boolean;
    value?: string;
};
declare const Checkbox: React.FC<CheckboxProps>;
export default Checkbox;
