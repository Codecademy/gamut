import React from 'react';
import { GridFormSubmitProps } from './GridFormSubmit';
import { GridFormField } from './types';
export declare type GridFormProps<Values extends {}> = {
    className?: string;
    children?: React.ReactNode;
    fields: GridFormField[];
    onSubmit: (values: Values) => Promise<void>;
    submit: GridFormSubmitProps;
};
export declare function GridForm<Values extends Record<string, boolean | string | undefined>>({ children, className, fields, submit, onSubmit }: GridFormProps<Values>): JSX.Element;
export default GridForm;
