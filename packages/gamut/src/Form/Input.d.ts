import React, { InputHTMLAttributes } from 'react';
export declare type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    className?: string;
    error?: boolean;
    htmlFor?: string;
    name?: string;
    placeholder?: string;
    required?: boolean;
    type?: string;
};
declare const Input: React.FC<InputProps>;
export default Input;
