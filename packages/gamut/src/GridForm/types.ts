import { FormContextValues, ValidationOptions } from 'react-hook-form';

import { ColumnProps } from '../Layout/Column';

export type BaseFormField<Value> = {
  defaultValue?: Value;
  name: string;
  onUpdate?: (value: Value) => void;
  size?: ColumnProps['size'];
};

export type GridFormCheckboxField = BaseFormField<boolean> & {
  description: string;
  label?: string;
  multiline?: boolean;
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
  label?: string;
  render: (props: GridFormCustomFieldProps) => React.ReactNode;
  validation?: ValidationOptions;
  type: 'custom';
};

export type GridFormTextField = BaseFormField<string> & {
  label: string;
  placeholder?: string;
  validation?: ValidationOptions;
  type: 'date' | 'email' | 'text';
};

export type GridFormRadioOption = {
  label: string;
  value: string;
};

export type GridFormRadioGroupField = BaseFormField<string> & {
  label: string;
  options: GridFormRadioOption[];
  validation?: Pick<ValidationOptions, 'required'>;
  type: 'radio-group';
};

export type GridFormSelectField = BaseFormField<string> & {
  label: string;
  options: string[] | Record<string, number | string>;
  validation?: Pick<ValidationOptions, 'required'>;
  type: 'select';
};

export type GridFormFileField = BaseFormField<FileList> & {
  label: React.ReactNode;
  validation?: ValidationOptions;
  type: 'file';
};

export type GridFormTextAreaField = BaseFormField<string> & {
  label: string;
  validation?: ValidationOptions;
  type: 'textarea';
};

export type GridFormField =
  | GridFormCheckboxField
  | GridFormCustomField
  | GridFormRadioGroupField
  | GridFormTextField
  | GridFormSelectField
  | GridFormFileField
  | GridFormTextAreaField;
