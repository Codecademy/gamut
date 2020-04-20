import { FormContextValues, ValidationOptions } from 'react-hook-form';

import { ColumnProps } from '../Layout/Column';

export type BaseFormField = {
  name: string;
  size?: ColumnProps['size'];
};

export type GridFormCheckboxField = BaseFormField & {
  description: string;
  defaultValue?: boolean;
  label?: string;
  validation?: Pick<ValidationOptions, 'required'>;
  type: 'checkbox';
};

export type GridFormCustomFieldProps = {
  className: string;
  error?: string;
  field: GridFormCustomField;
  register: FormContextValues['register'];
  setValue: (value: any) => void;
};

export type GridFormCustomField = BaseFormField & {
  defaultValue?: any;
  label?: string;
  render: (props: GridFormCustomFieldProps) => React.ReactNode;
  validation?: ValidationOptions;
  type: 'custom';
};

export type GridFormTextField = BaseFormField & {
  defaultValue?: string;
  label: string;
  placeholder?: string;
  validation?: ValidationOptions;
  type: 'text' | 'email';
};

export type GridFormSelectField = BaseFormField & {
  defaultValue?: string;
  label: string;
  options: string[] | Record<string, number | string>;
  validation?: Pick<ValidationOptions, 'required'>;
  type: 'select';
};

export type GridFormFileField = BaseFormField & {
  defaultValue?: FileList;
  label: string;
  validation?: ValidationOptions;
  type: 'file';
};

export type GridFormTextAreaField = BaseFormField & {
  defaultValue?: string;
  label: string;
  validation?: ValidationOptions;
  type: 'textarea';
};

export type GridFormField =
  | GridFormCheckboxField
  | GridFormCustomField
  | GridFormTextField
  | GridFormSelectField
  | GridFormFileField
  | GridFormTextAreaField;
