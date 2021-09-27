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

const FieldOmitters = 'defaultValue' || 'name';

export interface ConnectedCheckboxProps
  extends Omit<CheckboxProps, 'defaultValue' | 'name'>,
    ConnectedFieldProps {}

export interface ConnectedInputProps
  extends Omit<InputProps, 'defaultValue' | 'name'>,
    ConnectedFieldProps {}
