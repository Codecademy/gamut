import { RegisterOptions } from 'react-hook-form';

import { SelectProps } from '../../Form';
import {
  ConnectedCheckbox,
  ConnectedInput,
  ConnectedRadioGroup,
  ConnectedSelect,
  ConnectedTextArea,
} from '.';

export interface SuperBasedConnectedInputProps {
  onUpdate?: (value: boolean) => void;
  validation?: RegisterOptions;
}

export interface BaseConnectedInputProps extends SuperBasedConnectedInputProps {
  name: string;
}

export type ConnectedBaseSelectProps = Omit<
  SelectProps,
  'defaultValue' | 'name'
>;

export type ConnectedSelectProps = ConnectedBaseSelectProps &
  BaseConnectedInputProps;

export type SelectField = SuperBasedConnectedInputProps &
  ConnectedBaseSelectProps & {
    component: typeof ConnectedSelect;
  };

export type ConnectedField = SelectField;
