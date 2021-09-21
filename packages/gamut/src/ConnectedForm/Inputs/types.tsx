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

export interface BaseConnectedFieldProps {
  onUpdate?: (value: boolean) => void;
  validation?: RegisterOptions;
}

export interface ConnectedFieldProps extends BaseConnectedFieldProps {
  name: string;
}

export type ConnectedBaseCheckboxProps = Omit<
  CheckboxProps,
  'defaultValue' | 'name'
>;

export type ConnectedBaseInputProps = Omit<InputProps, 'defaultValue' | 'name'>;

export type ConnectedBaseRadioProps = Omit<RadioProps, 'defaultValue' | 'name'>;

export type ConnectedBaseRadioGroupProps = Omit<
  RadioGroupProps,
  'defaultValue' | 'name'
>;

export type ConnectedBaseRadioInputProps = Omit<ConnectedRadioProps, 'name'> & {
  label: ReactNode;
  value: string | number;
};

export type ConnectedBaseRadioGroupInputProps = ConnectedBaseRadioGroupProps & {
  options: ConnectedBaseRadioInputProps[];
};
export type ConnectedBaseSelectProps = Omit<
  SelectProps,
  'defaultValue' | 'name'
>;

export type ConnectedBaseTextAreaProps = Omit<
  TextAreaProps,
  'defaultValue' | 'name'
>;

export type ConnectedCheckboxProps = ConnectedBaseCheckboxProps &
  ConnectedFieldProps;

export type ConnectedInputProps = ConnectedBaseInputProps & ConnectedFieldProps;

export type ConnectedRadioProps = Omit<RadioProps, 'defaultValue'> &
  ConnectedFieldProps;

export type ConnectedRadioGroupProps = ConnectedBaseRadioGroupProps &
  ConnectedFieldProps;

export type ConnectedRadioGroupInputProps = ConnectedBaseRadioGroupInputProps &
  ConnectedFieldProps;

export type ConnectedSelectProps = ConnectedBaseSelectProps &
  ConnectedFieldProps;

export type ConnectedTextAreaProps = ConnectedBaseTextAreaProps &
  ConnectedFieldProps;

export type CheckboxField = BaseConnectedFieldProps &
  ConnectedBaseCheckboxProps & {
    component: typeof ConnectedCheckbox;
  };

export type InputField = BaseConnectedFieldProps &
  ConnectedBaseInputProps & {
    component: typeof ConnectedInput;
  };

export type RadioGroupField = BaseConnectedFieldProps &
  ConnectedBaseRadioGroupInputProps & {
    component: typeof ConnectedRadioGroupInput;
  };

export type SelectField = BaseConnectedFieldProps &
  ConnectedBaseSelectProps & {
    component: typeof ConnectedSelect;
  };

export type TextAreaField = BaseConnectedFieldProps &
  ConnectedBaseTextAreaProps & {
    component: typeof ConnectedTextArea;
  };

export type ConnectedField =
  | CheckboxField
  | InputField
  | RadioGroupField
  | SelectField
  | TextAreaField;

const isCheckbox = (field: ConnectedField): field is CheckboxField => {
  return true;
};

const isRadioGroup = (field: ConnectedField): field is RadioGroupField => {
  return true;
};

const isSelect = (field: ConnectedField): field is SelectField => {
  return true;
};

const isTextArea = (field: ConnectedField): field is TextAreaField => {
  return true;
};

export const renderField = (field: ConnectedField, name: string) => {
  if (isCheckbox(field)) {
    const { component: Component, ...rest } = field;
    return <Component name={name} {...rest} />;
  }

  if (isRadioGroup(field)) {
    const { component: Component, ...rest } = field;
    return <Component name={name} {...rest} />;
  }

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
