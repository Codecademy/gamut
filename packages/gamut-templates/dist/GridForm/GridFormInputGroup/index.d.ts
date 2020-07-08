import React from 'react';
import { FormContextValues } from 'react-hook-form';
import { GridFormField } from '../types';
export declare type GridFormInputGroupProps = {
    error?: string;
    field: GridFormField;
    register: FormContextValues['register'];
    setValue: (value: Required<GridFormField['defaultValue']>) => void;
};
export declare const GridFormInputGroup: React.FC<GridFormInputGroupProps>;
export default GridFormInputGroup;
