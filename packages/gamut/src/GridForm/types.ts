import { ReactNode } from 'react';
import { RegisterOptions, UseFormReturn } from 'react-hook-form';

import { FormToolTipProps } from '../Form';
import { CheckboxPaddingProps } from '../Form/types';
import { ColumnProps } from '../Layout';
import { TextProps } from '../Typography/Text';

export interface BaseFormInputProps {
  className?: string;
  required?: boolean;
  disabled?: boolean;
  error?: boolean;
}

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

  tooltip?: FormToolTipProps;

  name: string;
  onUpdate?: (value: Value) => void;
  size: ColumnProps['size'];
  rowspan?: ColumnProps['rowspan'];
};

export type GridFormCheckboxField = BaseFormField<boolean> &
  CheckboxPaddingProps & {
    description: React.ReactNode;
    label?: React.ReactNode;
    multiline?: boolean;
    validation?: RegisterOptions;
    type: 'checkbox';
  };

export type GridFormCustomFieldProps = {
  className?: string;
  error?: string;
  field: GridFormCustomField | GridFormCustomGroupField;
  register: UseFormReturn['register'];
  setValue: (value: any) => void;
};

export type GridFormCustomField = BaseFormField<any> & {
  label?: React.ReactNode;
  render: (props: GridFormCustomFieldProps) => React.ReactNode;
  validation?: RegisterOptions;
  type: 'custom';
};

export type GridFormCustomGroupField = BaseFormField<any> & {
  label?: React.ReactNode;
  render: (props: GridFormCustomFieldProps) => React.ReactNode;
  validation?: RegisterOptions;
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
  validation?: RegisterOptions;
  type: BasicInputType;
};

export type GridFormRadioOption = {
  label: ReactNode;
  value: string;
};

export type GridFormRadioGroupField = BaseFormField<string> & {
  label: ReactNode | string; // If this is a string, it will also be used as the aria-label.
  options: GridFormRadioOption[];
  validation?: RegisterOptions;
  type: 'radio-group';
  ariaLabel?: string;
};

export type GridFormSelectField = BaseFormField<string> & {
  label: React.ReactNode;
  options: string[] | Record<string, number | string>;
  validation?: RegisterOptions;
  type: 'select';
};

export type GridFormFileField = BaseFormField<FileList> & {
  label: React.ReactNode;
  validation?: RegisterOptions;
  type: 'file';
};

export type GridFormTextAreaField = BaseFormField<string> & {
  label: React.ReactNode;
  placeholder?: string;
  validation?: RegisterOptions;
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

type UnionValuesStartingWith<Base, Prefix extends string> = keyof {
  [Key in Base as Extract<Key, `${Prefix}${string}`>]: true;
};

type FilterNestedEnumByPrefix<Type, Prefix extends string> = {
  [Key in keyof Type]: UnionValuesStartingWith<Type[Key], Prefix>;
};

type RestrictedTitleVariant = FilterNestedEnumByPrefix<
  Pick<TextProps, 'variant'>,
  'title'
>;

export type GridFormSectionTitleBaseProps = RestrictedTitleVariant & {
  title: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  layout?: 'center' | 'left';
};

export type GridFormSectionProps = GridFormSectionTitleBaseProps & {
  fields: GridFormField[];
};

export type GridFormFieldsProps = GridFormField | GridFormSectionProps;
