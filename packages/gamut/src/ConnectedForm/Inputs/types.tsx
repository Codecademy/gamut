import { ReactNode } from 'react';
import { RegisterOptions } from 'react-hook-form';

import {
  CheckboxProps,
  InputWrapperProps,
  RadioGroupProps,
  RadioProps,
  SelectProps,
  TextAreaProps,
} from '../../Form';

export interface BaseConnectedFieldProps {
  onUpdate?: (value: boolean) => void;
  validation?: RegisterOptions;
}

export interface ConnectedFieldProps extends BaseConnectedFieldProps {
  name: string;
}

// to-do; DRY up defaultValue + name
export interface ConnectedCheckboxProps
  extends Omit<CheckboxProps, 'defaultValue' | 'name' | 'htmlFor'>,
    ConnectedFieldProps {}

export interface ConnectedInputProps
  extends Omit<InputWrapperProps, 'defaultValue' | 'name'>,
    ConnectedFieldProps {}

export interface ConnectedRadioProps
  extends Omit<RadioProps, 'defaultValue' | 'name'>,
    ConnectedFieldProps {}

export type ConnectedBaseRadioGroupProps = Omit<
  RadioGroupProps,
  'defaultValue' | 'name'
>;

export type ConnectedBaseRadioInputProps = Omit<
  RadioProps,
  'defaultValue' | 'name'
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
  extends Omit<SelectProps, 'defaultValue' | 'name'>,
    ConnectedFieldProps {}

export interface ConnectedTextAreaProps
  extends Omit<TextAreaProps, 'defaultValue' | 'name'>,
    ConnectedFieldProps {}
