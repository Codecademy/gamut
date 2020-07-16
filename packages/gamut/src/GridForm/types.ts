import { UseFormMethods, ValidationRules } from 'react-hook-form';

import { ColumnProps } from '../Layout/Column';

export type BaseFormField<Value> = {
  defaultValue?: Value;
  name: string;
  onUpdate?: (value: Value) => void;
  size: ColumnProps['size'];
  id?: string;
};

export type GridFormCheckboxField = BaseFormField<boolean> & {
  description: React.ReactNode;
  label?: string;
  multiline?: boolean;
  validation?: ValidationRules;
  type: 'checkbox';
};

export type GridFormCustomFieldProps = {
  className?: string;
  error?: string;
  field: GridFormCustomField;
  register: UseFormMethods['register'];
  setValue: (value: any) => void;
};

export type GridFormCustomField = BaseFormField<any> & {
  label?: string;
  render: (props: GridFormCustomFieldProps) => React.ReactNode;
  validation?: ValidationRules;
  type: 'custom';
};

export type BasicInputType =
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'month'
  | 'number'
  | 'password'
  | 'search'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week';

export type GridFormTextField = BaseFormField<string> & {
  label?: string;
  placeholder?: string;
  validation?: ValidationRules;
  type: BasicInputType;
};

export type GridFormRadioOption = {
  label: string;
  value: string;
};

export type GridFormRadioGroupField = BaseFormField<string> & {
  label: string;
  options: GridFormRadioOption[];
  validation?: ValidationRules;
  type: 'radio-group';
};

export type GridFormSelectField = BaseFormField<string> & {
  label: string;
  options: string[] | Record<string, number | string>;
  validation?: ValidationRules;
  type: 'select';
};

export type GridFormFileField = BaseFormField<FileList> & {
  label: React.ReactNode;
  validation?: ValidationRules;
  type: 'file';
};

export type GridFormTextAreaField = BaseFormField<string> & {
  label: string;
  validation?: ValidationRules;
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
