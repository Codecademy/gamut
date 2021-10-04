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

// to-do; DRY up Omit?
export interface ConnectedCheckboxProps
  extends Omit<
      CheckboxProps,
      'defaultValue' | 'name' | 'htmlFor' | 'validation'
    >,
    ConnectedFieldProps {}

export interface ConnectedInputProps
  extends Omit<InputWrapperProps, 'defaultValue' | 'name' | 'validation'>,
    ConnectedFieldProps {}

export interface ConnectedRadioProps
  extends Omit<RadioProps, 'defaultValue' | 'name' | 'validation'>,
    ConnectedFieldProps {}

export type ConnectedBaseRadioGroupProps = Omit<
  RadioGroupProps,
  'defaultValue' | 'name' | 'validation'
>;

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
