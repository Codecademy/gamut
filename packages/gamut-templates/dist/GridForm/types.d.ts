import { ColumnSizes, ResponsiveProperty } from '@codecademy/gamut/dist/Layout/types';
import { ValidationOptions } from 'react-hook-form';
export declare type BaseFormField = {
    defaultValue?: string;
    label: string;
    name: string;
    size?: ResponsiveProperty<ColumnSizes>;
};
export declare type GridFormTextField = BaseFormField & {
    validation?: ValidationOptions;
    type: 'text' | 'email';
};
export declare type GridFormSelectField = BaseFormField & {
    options: string[];
    type: 'select';
};
export declare type GridFormField = GridFormTextField | GridFormSelectField;
