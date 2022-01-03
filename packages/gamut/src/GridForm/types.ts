import { ReactNode } from 'react';
import { RegisterOptions, UseFormMethods } from 'react-hook-form';

import { CheckboxPaddingProps } from '../Form/types';
import { ColumnProps } from '../Layout';
import { ToolTipProps } from '../ToolTip';
import { TextProps } from '../Typography/Text';

export interface BaseFormInputProps {
  className?: string;
  required?: boolean;
  disabled?: boolean;
  error?: boolean;
}

export interface BaseFormInputValidatedProps extends BaseFormInputProps {
  validation?: RegisterOptions;
}

export interface BaseFormField<Value> {
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
}

export interface BaseFormFieldValidated<Value> extends BaseFormField<Value> {
  validation?: RegisterOptions;
}

export type GridFormCheckboxField = BaseFormFieldValidated<boolean> &
  CheckboxPaddingProps & {
    description: React.ReactNode;
    label?: React.ReactNode;
    multiline?: boolean;
    type: 'checkbox';
  };

export type GridFormCustomFieldProps = {
  className?: string;
  error?: string;
  field: GridFormCustomField | GridFormCustomGroupField;
  register: UseFormMethods['register'];
  setValue: (value: any) => void;
};

export type GridFormCustomField = BaseFormFieldValidated<any> & {
  label?: React.ReactNode;
  render: (props: GridFormCustomFieldProps) => React.ReactNode;
  type: 'custom';
};

export type GridFormCustomGroupField = BaseFormFieldValidated<any> & {
  label?: React.ReactNode;
  render: (props: GridFormCustomFieldProps) => React.ReactNode;
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

export type GridFormTextField = BaseFormFieldValidated<string> & {
  label: React.ReactNode;
  placeholder?: string;
  type: BasicInputType;
};

export type GridFormRadioOption = {
  label: ReactNode;
  value: string;
};

export type GridFormRadioGroupField = BaseFormFieldValidated<string> & {
  label: ReactNode | string; // If this is a string, it will also be used as the aria-label.
  options: GridFormRadioOption[];
  type: 'radio-group';
  ariaLabel?: string;
};

export type GridFormSelectField = BaseFormFieldValidated<string> & {
  label: React.ReactNode;
  options: string[] | Record<string, number | string>;
  type: 'select';
};

export type GridFormFileField = BaseFormFieldValidated<FileList> & {
  label: React.ReactNode;
  type: 'file';
};

export type GridFormTextAreaField = BaseFormFieldValidated<string> & {
  label: React.ReactNode;
  placeholder?: string;
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

export type GridFormSectionBreakTypes = 'none' | 'default';

export interface GridFormSectionBreakProps {
  breakType?: GridFormSectionBreakTypes;
}
