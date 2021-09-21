import React from 'react';
import { RegisterOptions } from 'react-hook-form';

import { InputProps, SelectProps, TextAreaProps } from '../../Form';
import { ConnectedInput, ConnectedSelect, ConnectedTextArea } from '.';

export interface BaseConnectedFieldProps {
  onUpdate?: (value: boolean) => void;
  validation?: RegisterOptions;
}

export interface ConnectedFieldProps extends BaseConnectedFieldProps {
  name: string;
}
export type ConnectedBaseInputProps = Omit<InputProps, 'defaultValue' | 'name'>;

export type ConnectedBaseSelectProps = Omit<
  SelectProps,
  'defaultValue' | 'name'
>;

export type ConnectedBaseTextAreaProps = Omit<
  TextAreaProps,
  'defaultValue' | 'name'
>;

export type ConnectedInputProps = ConnectedBaseInputProps & ConnectedFieldProps;

export type ConnectedSelectProps = ConnectedBaseSelectProps &
  ConnectedFieldProps;

export type ConnectedTextAreaProps = ConnectedBaseTextAreaProps &
  ConnectedFieldProps;

export type InputField = BaseConnectedFieldProps &
  ConnectedBaseInputProps & {
    component: typeof ConnectedInput;
  };

export type SelectField = BaseConnectedFieldProps &
  ConnectedBaseSelectProps & {
    component: typeof ConnectedSelect;
  };

export type TextAreaField = BaseConnectedFieldProps &
  ConnectedBaseTextAreaProps & {
    component: typeof ConnectedTextArea;
  };

export type ConnectedField = SelectField | InputField | TextAreaField;

const isSelect = (field: ConnectedField): field is SelectField => {
  return true;
};

const isTextArea = (field: ConnectedField): field is TextAreaField => {
  return true;
};

export const renderField = (field: ConnectedField, name: string) => {
  if (isSelect(field)) {
    const { component: Component, ...rest } = field;
    return <Component name={name} {...rest} />;
  }

  if (isTextArea(field)) {
    const { component: Component, ...rest } = field;
    return <Component name={name} {...rest} />;
  }
  const { component: Component, ...rest } = field;
  return <Component name={name} {...rest} />;
};
