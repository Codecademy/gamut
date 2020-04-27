import { FormContextValues, ValidationOptions } from 'react-hook-form';

import { ColumnProps } from '../Layout/Column';

export type BaseFormField<T> = {
  name: string;
  onUpdate?: (value: T) => void;
  size?: ColumnProps['size'];
};

export type GridFormCheckboxField = BaseFormField<boolean> & {
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

export type GridFormCustomField = BaseFormField<any> & {
  defaultValue?: any;
  label?: string;
  render: (props: GridFormCustomFieldProps) => React.ReactNode;
  validation?: ValidationOptions;
  type: 'custom';
};

export type GridFormTextField = BaseFormField<string> & {
  defaultValue?: string;
  label: string;
  placeholder?: string;
  validation?: ValidationOptions;
  type: 'text' | 'email';
};

export type GridFormSelectField = BaseFormField<string> & {
  defaultValue?: string;
  label: string;
  options: string[] | Record<string, number | string>;
  validation?: Pick<ValidationOptions, 'required'>;
  type: 'select';
};

export type GridFormFileField = BaseFormField<FileList> & {
  defaultValue?: FileList;
  label: string;
  validation?: ValidationOptions;
  type: 'file';
};

export type GridFormTextAreaField = BaseFormField<string> & {
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
