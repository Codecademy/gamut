import React, { ReactNode } from 'react';
import { RegisterOptions } from 'react-hook-form';

import {
  CheckboxProps,
  InputProps,
  RadioGroupProps,
  RadioProps,
  SelectProps,
  TextAreaProps,
} from '../../Form';
import {
  ConnectedCheckbox,
  ConnectedInput,
  ConnectedRadioGroupInput,
  ConnectedSelect,
  ConnectedTextArea,
} from '.';

export interface ConnectedFieldProps {
  onUpdate?: (value: boolean) => void;
  validation?: RegisterOptions;
  name: string;
}

export type TestConnectedField =
  | typeof ConnectedCheckbox
  | typeof ConnectedInput
  | typeof ConnectedRadioGroupInput
  | typeof ConnectedSelect
  | typeof ConnectedTextArea;

export interface ConnectTestProp<T extends TestConnectedField> {
  onUpdate?: (value: boolean) => void;
  validation?: RegisterOptions;
  component?: T;
  testProps?: Omit<React.ComponentProps<T>, 'name' | 'children'>;
}

export interface TestProps<T extends TestConnectedField> {
  field: ConnectTestProp<T>;
}

export type ConnectedBaseCheckboxProps = Omit<
  CheckboxProps,
  'defaultValue' | 'name' | 'htmlFor'
>;

export type ConnectedBaseInputProps = Omit<InputProps, 'defaultValue' | 'name'>;

export type ConnectedBaseRadioInputProps = Omit<ConnectedRadioProps, 'name'> & {
  label: ReactNode;
  value: string | number;
};

export type ConnectedCheckboxProps = ConnectedBaseCheckboxProps &
  ConnectedFieldProps;

export type ConnectedInputProps = ConnectedBaseInputProps & ConnectedFieldProps;

export type ConnectedRadioProps = Omit<RadioProps, 'defaultValue'> &
  ConnectedFieldProps;

export type ConnectedRadioGroupProps = Omit<
  RadioGroupProps,
  'defaultValue' | 'name'
> &
  ConnectedFieldProps;

export type ConnectedRadioGroupInputProps = Omit<
  RadioProps,
  'defaultValue' | 'name'
> & {
  options: ConnectedBaseRadioInputProps[];
} & ConnectedFieldProps;

export type ConnectedSelectProps = Omit<SelectProps, 'defaultValue' | 'name'> &
  ConnectedFieldProps;

export type ConnectedTextAreaProps = Omit<
  TextAreaProps,
  'defaultValue' | 'name'
> &
  ConnectedFieldProps;
