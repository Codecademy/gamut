import { FieldValues, FormState } from 'react-hook-form';

import {
  ConnectedCheckbox,
  ConnectedInput,
  ConnectedNestedCheckboxes,
  ConnectedRadioGroupInput,
  ConnectedSelect,
  ConnectedTextArea,
} from './ConnectedInputs';
import { BaseConnectedFieldProps } from './ConnectedInputs/types';

export type ConnectedField =
  | typeof ConnectedCheckbox
  | typeof ConnectedInput
  | typeof ConnectedNestedCheckboxes
  | typeof ConnectedRadioGroupInput
  | typeof ConnectedSelect
  | typeof ConnectedTextArea;

export interface FieldProps<FieldComponent extends ConnectedField>
  extends BaseConnectedFieldProps {
  component: FieldComponent;
}

export type FormStateCallback<Values extends FieldValues = {}> = (
  formState: FormState<Values>
) => boolean;

export interface SubmitContextProps {
  loading?: FormStateCallback | boolean;
  disabled?: FormStateCallback | boolean;
}
