import React from 'react';
import { FormContextValues } from 'react-hook-form';
import { GridFormTextField } from '../../types';
export declare type GridFormTextInputProps = {
    className?: string;
    field: Omit<GridFormTextField, 'label'>;
    setValue: (value: string) => void;
    register: FormContextValues['register'];
};
export declare const GridFormTextInput: React.FC<GridFormTextInputProps>;
export default GridFormTextInput;
