import { ColumnSizes, ResponsiveProperty } from '@codecademy/gamut/dist/Layout/types';
import { ValidationOptions } from 'react-hook-form';
export declare type BaseFormField = {
    name: string;
    size?: ResponsiveProperty<ColumnSizes>;
};
export declare type GridFormCheckboxField = BaseFormField & {
    description: string;
    defaultValue?: boolean;
    label?: string;
    type: 'checkbox';
    className?: string;
};
export declare type GridFormTextField = BaseFormField & {
    defaultValue?: string;
    label: string;
    validation?: ValidationOptions;
    type: 'text' | 'email';
};
export declare type GridFormSelectField = BaseFormField & {
    defaultValue?: string;
    label: string;
    options: string[];
    type: 'select';
};
export declare type GridFormField = GridFormCheckboxField | GridFormTextField | GridFormSelectField;
