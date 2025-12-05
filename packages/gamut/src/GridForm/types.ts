import { ReactNode } from 'react';
import { RegisterOptions, UseFormReturn } from 'react-hook-form';

import { BoxProps } from '../Box';
import { MinimalCheckboxProps } from '../ConnectedForm';
import { CheckboxLabelUnion, TextAreaProps } from '../Form';
import { CheckboxPaddingProps } from '../Form/types';
import { ColumnProps } from '../Layout';
import { InfoTipProps } from '../Tip/InfoTip';
import { Text, TextProps } from '../Typography/Text';

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

  /**
   * InfoTip to display next to the field label. String labels automatically
   * label the InfoTip button. For ReactNode labels, provide `ariaLabel` or
   * set `labelledByFieldLabel: true` to ensure the InfoTip is accessible.
   */
  infotip?: InfoTipProps;

  isSoloField?: boolean;
  name: string;
  onUpdate?: (value: Value) => void;
  size: ColumnProps['size'];
  rowspan?: ColumnProps['rowspan'];
};

export type GridFormCheckboxField = BaseFormField<boolean> &
  CheckboxPaddingProps & {
    description: string;
    label?: React.ReactNode;
    multiline?: boolean;
    validation?: RegisterOptions;
    type: 'checkbox';
  };

export type NestedGridFormCheckboxOption = Omit<
  MinimalCheckboxProps,
  'spacing'
> &
  CheckboxLabelUnion & {
    options?: NestedGridFormCheckboxOption[];
  };

export type GridFormNestedCheckboxField = BaseFormField<string[]> &
  CheckboxPaddingProps & {
    label?: React.ReactNode;
    options: NestedGridFormCheckboxOption[];
    validation?: RegisterOptions;
    type: 'nested-checkboxes';
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

export type GridFormRadioOption = Pick<BaseFormField<string>, 'infotip'> & {
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

export type GridFormTextAreaField = BaseFormField<string> &
  Pick<TextAreaProps, 'rows' | 'placeholder'> & {
    label: React.ReactNode;
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
  | GridFormNestedCheckboxField
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

export type GridFormRequiredTextProps = {
  /**
   * Style overrides for the required text -- required text should be spaced apart from or stylistically different from the element above it.
   */
  requiredTextProps?: React.ComponentProps<typeof Text>;
};

export type GridFormSectionTitleBaseProps = RestrictedTitleVariant & {
  title: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  layout?: 'center' | 'left';
  titleWrapperProps?: BoxProps;
};

export type GridFormSectionProps = GridFormSectionTitleBaseProps & {
  fields: GridFormField[];
};

export type GridFormFieldsProps = GridFormField | GridFormSectionProps;
