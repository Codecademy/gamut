import React, { HTMLAttributes } from 'react';
export declare type FormGroupLabelProps = FormGroupLabelPropsWithFor & FormGroupLabelPropsPlain;
export declare type FormGroupLabelPropsWithFor = HTMLAttributes<HTMLLabelElement> & {
    className?: string;
    htmlFor?: string;
};
export declare type FormGroupLabelPropsPlain = HTMLAttributes<HTMLDivElement> & {
    className?: string;
};
declare const FormGroupLabel: React.FC<FormGroupLabelProps>;
export default FormGroupLabel;
