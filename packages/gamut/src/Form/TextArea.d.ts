import React, { TextareaHTMLAttributes } from 'react';
export declare type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
    className?: string;
    error?: boolean;
    htmlFor?: string;
    name?: string;
    required?: boolean;
    value?: string;
};
declare const TextArea: React.FC<TextAreaProps>;
export default TextArea;
