import React from 'react';
import { FormContextValues } from 'react-hook-form';
import { GridFormSelectField } from '../../types';
export declare type GridFormSelectInputProps = {
    className?: string;
    field: Omit<GridFormSelectField, 'label'>;
    register: FormContextValues['register'];
    setValue: (value: string) => void;
};
export declare const GridFormSelectInput: React.FC<GridFormSelectInputProps>;
export default GridFormSelectInput;
