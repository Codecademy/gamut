import { ReactNode } from 'react';
import { UseFormMethods, ValidationRules } from 'react-hook-form';

import { ColumnProps } from '../Layout';
import { ToolTipProps } from '../ToolTip';

export type BaseFormField<Value> = {
  defaultValue?: Value;
  customError?: string;
  disabled?: boolean;

  /**
   * Whether the label should be hidden visually and not take up space.
   */
  hideLabel?: boolean;

  /**
   * HTML id to use instead of the name.
   */
  id?: string;

  tooltip?: ToolTipProps;

  name: string;
  onUpdate?: (value: Value) => void;
  size: ColumnProps['size'];
  rowspan?: ColumnProps['rowspan'];
};

export type GridFormCheckboxField = BaseFormField<boolean> & {
  description: React.ReactNode;
  label?: React.ReactNode;
  multiline?: boolean;
  validation?: ValidationRules;
  type: 'checkbox';
};

export type GridFormCustomFieldProps = {
  className?: string;
  error?: string;
  field: GridFormCustomField | GridFormCustomGroupField;
  register: UseFormMethods['register'];
  setValue: (value: any) => void;
};

export type GridFormCustomField = BaseFormField<any> & {
  label?: React.ReactNode;
  render: (props: GridFormCustomFieldProps) => React.ReactNode;
  validation?: ValidationRules;
  type: 'custom';
};

export type GridFormCustomGroupField = BaseFormField<any> & {
  label?: React.ReactNode;
  render: (props: GridFormCustomFieldProps) => React.ReactNode;
  validation?: ValidationRules;
  type: 'custom-group';
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
  validation?: ValidationRules;
  type: BasicInputType;
};

export type GridFormRadioOption = {
  label: ReactNode;
  value: string;
};

export type GridFormRadioGroupField = BaseFormField<string> & {
  label: string;
  options: GridFormRadioOption[];
  validation?: ValidationRules;
  type: 'radio-group';
};

export type GridFormSelectField = BaseFormField<string> & {
  label: React.ReactNode;
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
  label: React.ReactNode;
  placeholder?: string;
  validation?: ValidationRules;
  type: 'textarea';
};

type HiddenField = Omit<BaseFormField<any>, 'size' | 'rowspan'>;

export type GridFormHiddenField = HiddenField & {
  type: 'hidden';
};

export type GridFormSweetContainerField = HiddenField & {
  label: string;
  type: 'sweet-container';
};

export type GridFormField =
  | GridFormCheckboxField
  | GridFormCustomField
  | GridFormCustomGroupField
  | GridFormRadioGroupField
  | GridFormTextField
  | GridFormSelectField
  | GridFormFileField
  | GridFormTextAreaField
  | GridFormHiddenField
  | GridFormSweetContainerField;

export type GridFormSectionTitleProps = {
  title: string;
  as?: any;
  rowspan?: number;
  size?: number;
};

export type GridFormSectionType = {
  title: GridFormSectionTitleProps;
  fields: GridFormField[];
};

const isGridFormSection = (
  field: GridFormField | GridFormSectionType
): field is GridFormSectionType => {
  return (field as GridFormSectionType).title !== undefined;
};

const getFields = (fields: any) => {
  if (fields[0]?.fields) {
    return fields.flatMap((field) => field.fields);
  } else {
    return fields;
  }
};
