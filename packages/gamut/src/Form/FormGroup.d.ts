import React, { HTMLAttributes } from 'react';
export declare type FormGroupProps = HTMLAttributes<HTMLDivElement> & {
    label?: string;
    htmlFor?: string;
    className?: string;
    description?: string;
};
declare const FormGroup: React.FC<FormGroupProps>;
export default FormGroup;
