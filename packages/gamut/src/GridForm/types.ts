import { ValidationOptions } from 'react-hook-form';

import { ColumnSizes, ResponsiveProperty } from '../Layout';

export type BaseFormField = {
  name: string;
  size?: ResponsiveProperty<ColumnSizes>;
};

export type GridFormCheckboxField = BaseFormField & {
  description: string;
  defaultValue?: boolean;
  label?: string;
  type: 'checkbox';
};

export type GridFormTextField = BaseFormField & {
  defaultValue?: string;
  label: string;
  validation?: ValidationOptions;
  type: 'text' | 'email';
};

export type GridFormSelectField = BaseFormField & {
  defaultValue?: string;
  label: string;
  options: string[];
  type: 'select';
};

export type GridFormField =
  | GridFormCheckboxField
  | GridFormTextField
  | GridFormSelectField;
