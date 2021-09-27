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

export type ConnectedBaseInputProps = Omit<InputProps, 'defaultValue'>;

export type ConnectedBaseRadioProps = Omit<RadioProps, 'defaultValue'>;

export type ConnectedBaseRadioGroupProps = Omit<
  RadioGroupProps,
  'defaultValue'
>;

export type ConnectedBaseRadioInputProps = Omit<ConnectedRadioProps, 'name'> & {
  label: ReactNode;
  value: string | number;
};

export type ConnectedBaseRadioGroupInputProps = ConnectedBaseRadioGroupProps & {
  options: ConnectedBaseRadioInputProps[];
};
export type ConnectedBaseSelectProps = Omit<SelectProps, 'defaultValue'>;

export type ConnectedBaseTextAreaProps = Omit<TextAreaProps, 'defaultValue'>;

export interface ConnectedCheckboxProps
  extends Omit<ConnectedBaseCheckboxProps, 'htmlFor'>,
    ConnectedFieldProps {}

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

export type ConnectedField2 =
  | typeof ConnectedCheckbox
  | typeof ConnectedInput
  | typeof ConnectedRadioGroupInput
  | typeof ConnectedSelect
  | typeof ConnectedTextArea;

export type ConnectedField3 =
  | React.FC<ConnectedCheckboxProps>
  | React.FC<ConnectedInputProps>
  | React.FC<ConnectedRadioGroupInputProps>
  | React.FC<ConnectedSelectProps>
  | React.FC<ConnectedTextAreaProps>;

const isCheckbox2 = (
  component: ConnectedField2
): component is typeof ConnectedCheckbox => {
  return true;
};

const isCheckbox3 = (
  props: React.ComponentProps<ConnectedField2>
): props is typeof ConnectedCheckbox => {
  return true;
};

/// TRY PROPS IS TYPEOF HERE

const isRadioGroup2 = (
  component: ConnectedField2
): component is typeof ConnectedRadioGroupInput => {
  return true;
};

const isSelect2 = (
  component: ConnectedField2
): component is typeof ConnectedSelect => {
  return true;
};

const isTextArea2 = (
  component: ConnectedField2
): component is typeof ConnectedTextArea => {
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

export const renderField2 = <T extends ConnectedField3>({
  field,
  name,
}: MySweetFunc<T>) => {
  if (isCheckbox2(field.component)) {
    if (isCheckbox3(field.props)) {
      const { component: Component, props, ...rest } = field;
      return <Component {...props} />;
    }
  }

  if (isRadioGroup2(field.component)) {
    const { component: Component, props, ...rest } = field;
    return <Component name={name} {...props} />;
  }

  if (isSelect2(field.component)) {
    const { component: Component, props, ...rest } = field;
    return <Component name={name} {...(rest, props)} />;
  }

  if (isTextArea2(field.component)) {
    const { component: Component, props, ...rest } = field;
    return <Component name={name} {...rest} />;
  }

  const { component: Component, props, ...rest } = field;
  return <Component name={name} {...rest} />;
};

export interface IFieldProps<P extends ConnectedField2> {
  is: React.ComponentType<P>;
  props: BaseProps & React.ComponentProps<P>;
}

interface BaseProps {
  onUpdate?: (value: boolean) => void;
  validation?: RegisterOptions;
}
export interface ConnectTestProp<T extends ConnectedField3> {
  component: ConnectedField3;
  // to-do : how do i do this w/o nesting
  props: React.ComponentProps<T>;
  onUpdate?: (value: boolean) => void;
  validation?: RegisterOptions;
}

export interface MySweetFunc<T extends ConnectedField3> {
  field: ConnectTestProp<T>;
  name: string;
}
export const renderField22 = <C extends ConnectedField3>({
  field,
  name,
}: MySweetFunc<C>) => {
  type P = React.ComponentProps<C>;

  const { component: Component, props, ...rest } = field;
  const newProps = { ...props, ...rest };

  return <Component {...(newProps as P)} />;
};
