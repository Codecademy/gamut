import React, { ReactNode } from 'react';
export declare type RadioProps = {
    checked?: boolean;
    className?: string;
    htmlFor?: string;
    id?: string;
    label?: ReactNode;
    name?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    tabIndex?: number;
    value?: string;
};
declare const Radio: React.FC<RadioProps>;
export default Radio;
