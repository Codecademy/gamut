import React, { ComponentType } from 'react';
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
    component: ComponentType<ConnectedSelectProps>;
    // type: 'select';
  };

export type InputField = BaseConnectedFieldProps &
  ConnectedBaseInputProps & {
    component: ComponentType<ConnectedInputProps>;
    // type: 'input';
  };

export type ConnectedField = SelectField | InputField;

// export const renderField = (field: ConnectedField, name: string) => {
//   switch (field.type) {
//     case 'select':
//       return <ConnectedSelect name={name} {...field} />;
//     case 'input':
//       return <ConnectedInput name={name} {...field} />;
//   }
// };

// export const renderComponent = (field: ConnectedField, name: string) => {
//   switch (field.component) {
//     case (React.FC<ConnectedSelectProps>):
//       return <field.component name={name} {...field} />;
//     case ConnectedInput:
//       return <field.component name={name} {...field} />;
//   }
// };
