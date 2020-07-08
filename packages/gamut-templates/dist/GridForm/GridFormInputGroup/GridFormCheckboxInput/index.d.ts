import React from 'react';
import { GridFormCheckboxField } from '../../types';
export declare type GridFormCheckboxInputProps = {
    className?: string;
    field: GridFormCheckboxField;
    setValue: (value: boolean) => void;
};
export declare const GridFormCheckboxInput: React.FC<GridFormCheckboxInputProps>;
export default GridFormCheckboxInput;
