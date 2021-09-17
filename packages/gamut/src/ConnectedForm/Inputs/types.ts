import { RegisterOptions } from 'react-hook-form';

import { InputProps, SelectProps } from '../../Form';
import {
  ConnectedCheckbox,
  ConnectedInput,
  ConnectedRadioGroup,
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
