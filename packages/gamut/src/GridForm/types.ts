import { FormContextValues, ValidationOptions } from 'react-hook-form';

import { ColumnProps } from '../Layout/Column';

export type BaseFormField<Value> = {
  defaultValue?: Value;

  /**
   * Whether the label should be hidden visually and not take up space.
   */
  hideLabel?: boolean;

  /**
   * HTML id to use instead of the name.
   */
  id?: string;

  name: string;
  onUpdate?: (value: Value) => void;
  size?: ColumnProps['size'];
};

export type GridFormCheckboxField = BaseFormField<boolean> & {
  description: React.ReactNode;
  label: React.ReactNode;
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
  label?: React.ReactNode;
  render: (props: GridFormCustomFieldProps) => React.ReactNode;
  validation?: ValidationOptions;
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
  label: React.ReactNode;
  placeholder?: string;
  validation?: ValidationOptions;
  type: BasicInputType;
};

export type GridFormRadioOption = {
  label: string;
  value: string;
};

export type GridFormRadioGroupField = BaseFormField<string> & {
  label: React.ReactNode;
  options: GridFormRadioOption[];
  validation?: Pick<ValidationOptions, 'required'>;
  type: 'radio-group';
};

export type GridFormSelectField = BaseFormField<string> & {
  label: React.ReactNode;
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
  label: React.ReactNode;
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
