import React from 'react';
import { RegisterOptions } from 'react-hook-form';

import { InputProps, SelectProps } from '../../Form';
import { ConnectedInput, ConnectedSelect } from '.';

export interface BaseConnectedFieldProps {
  onUpdate?: (value: boolean) => void;
  validation?: RegisterOptions;
}

export interface ConnectedFieldProps extends BaseConnectedFieldProps {
  name: string;
}

export type ConnectedBaseSelectProps = Omit<
  SelectProps,
  'defaultValue' | 'name'
>;

export type ConnectedBaseInputProps = Omit<InputProps, 'defaultValue' | 'name'>;

export type ConnectedInputProps = ConnectedBaseInputProps & ConnectedFieldProps;

export type ConnectedSelectProps = ConnectedBaseSelectProps &
  ConnectedFieldProps;

export type SelectField = BaseConnectedFieldProps &
  ConnectedBaseSelectProps & {
    component: typeof ConnectedSelect;
  };

export type InputField = BaseConnectedFieldProps &
  ConnectedBaseInputProps & {
    component: typeof ConnectedInput;
  };

export type ConnectedField = SelectField | InputField;
const isSelect = (field: ConnectedField): field is SelectField => {
  return true;
};

export const renderComponent = (field: ConnectedField, name: string) => {
  if (isSelect(field)) {
    const { component: Component, ...rest } = field;
    return <Component name={name} {...rest} />;
  }
  const { component: Component, ...rest } = field;
  return <Component name="not hey" {...rest} />;
};
