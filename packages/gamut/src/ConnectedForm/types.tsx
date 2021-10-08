import { FormState } from 'react-hook-form';

import {
  ConnectedCheckbox,
  ConnectedInput,
  ConnectedRadioGroupInput,
  ConnectedSelect,
  ConnectedTextArea,
} from './Inputs';
import { BaseConnectedFieldProps } from './Inputs/types';

export type ConnectedField =
  | typeof ConnectedCheckbox
  | typeof ConnectedInput
  | typeof ConnectedRadioGroupInput
  | typeof ConnectedSelect
  | typeof ConnectedTextArea;

export interface FieldProps<FieldComponent extends ConnectedField>
  extends BaseConnectedFieldProps {
  component: FieldComponent;
}

export type FormStateCallback<Values = {}> = (
  formState: FormState<Values>
) => boolean;

export interface SubmitContextProps {
  loading?: FormStateCallback | boolean;
  disabled?: FormStateCallback | boolean;
}
