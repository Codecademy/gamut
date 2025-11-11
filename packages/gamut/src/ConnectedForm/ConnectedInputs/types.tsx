import { ReactNode } from 'react';

import {
  CheckboxLabelUnion,
  CheckboxProps,
  InputWrapperProps,
  RadioGroupProps,
  RadioProps,
  SelectProps,
  TextAreaProps,
} from '../../Form';

export interface BaseConnectedFieldProps {
  onUpdate?: (value: boolean) => void;
}
export interface ConnectedFieldProps extends BaseConnectedFieldProps {
  name: string;
}

export interface MinimalCheckboxProps
  extends Omit<
    CheckboxProps,
    'defaultValue' | 'name' | 'htmlFor' | 'validation' | 'label' | 'aria-label'
  > {}
export interface BaseConnectedCheckboxProps
  extends MinimalCheckboxProps,
    ConnectedFieldProps {}

export type ConnectedCheckboxProps = BaseConnectedCheckboxProps &
  CheckboxLabelUnion;

type FieldComponent<T> = Omit<T, 'defaultValue' | 'name' | 'validation'>;

export interface ConnectedInputProps
  extends FieldComponent<InputWrapperProps>,
    ConnectedFieldProps {}

export interface ConnectedRadioProps
  extends FieldComponent<RadioProps>,
    ConnectedFieldProps {}

export interface ConnectedBaseRadioGroupProps
  extends FieldComponent<RadioGroupProps> {}

export type ConnectedBaseRadioInputProps = FieldComponent<RadioProps> & {
  label: ReactNode;
  value: string | number;
};

export interface ConnectedRadioGroupProps
  extends ConnectedBaseRadioGroupProps,
    ConnectedFieldProps {}

export interface ConnectedRadioGroupInputProps
  extends Omit<ConnectedBaseRadioGroupProps, 'children'>,
    ConnectedFieldProps {
  options: ConnectedBaseRadioInputProps[];
}

export interface ConnectedSelectProps
  extends FieldComponent<SelectProps>,
    ConnectedFieldProps {}

export interface ConnectedTextAreaProps
  extends FieldComponent<TextAreaProps>,
    ConnectedFieldProps {}

export type NestedConnectedCheckboxOption = Omit<
  MinimalCheckboxProps,
  'spacing'
> &
  CheckboxLabelUnion & {
    options?: NestedConnectedCheckboxOption[];
  };

export interface ConnectedNestedCheckboxesProps
  extends Pick<BaseConnectedCheckboxProps, 'name' | 'disabled' | 'spacing'> {
  options: NestedConnectedCheckboxOption[];
  onUpdate?: (values: string[]) => void;
}
