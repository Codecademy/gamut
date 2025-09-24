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
export interface BaseConnectedCheckboxProps
  extends Omit<
      CheckboxProps,
      | 'defaultValue'
      | 'name'
      | 'htmlFor'
      | 'validation'
      | 'label'
      | 'aria-label'
    >,
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

export type ConnectedBaseRadioInputProps = Omit<
  RadioProps,
  'defaultValue' | 'name' | 'validation'
> & {
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
  extends Omit<SelectProps, 'defaultValue' | 'name' | 'validation'>,
    ConnectedFieldProps {}

export interface ConnectedTextAreaProps
  extends Omit<TextAreaProps, 'defaultValue' | 'name' | 'validation'>,
    ConnectedFieldProps {}
