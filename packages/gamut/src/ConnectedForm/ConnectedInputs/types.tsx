import { ReactNode } from 'react';

import {
  CheckboxLabelUnion,
  CheckboxProps,
  InputWrapperProps,
  RadioGroupProps,
  RadioProps,
  SelectProps,
  TextAreaProps,
} from '../../Form';

export interface BaseConnectedFieldProps {
  onUpdate?: (value: boolean) => void;
}

export interface ConnectedFieldProps extends BaseConnectedFieldProps {
  name: string;
}
export interface BaseConnectedCheckboxProps
  extends Omit<
      CheckboxProps,
      | 'defaultValue'
      | 'name'
      | 'htmlFor'
      | 'validation'
      | 'label'
      | 'aria-label'
    >,
    ConnectedFieldProps {}

export type ConnectedCheckboxProps = BaseConnectedCheckboxProps &
  CheckboxLabelUnion;

type FieldComponent<T> = Omit<T, 'defaultValue' | 'name' | 'validation'>;

export interface ConnectedInputProps
  extends FieldComponent<InputWrapperProps>,
    ConnectedFieldProps {}

export interface ConnectedRadioProps
  extends FieldComponent<RadioProps>,
    ConnectedFieldProps {}

export interface ConnectedBaseRadioGroupProps
  extends FieldComponent<RadioGroupProps> {}

export type ConnectedBaseRadioInputProps = Omit<
  RadioProps,
  'defaultValue' | 'name' | 'validation'
> & {
  label: ReactNode;
  value: string | number;
};

export interface ConnectedRadioGroupProps
  extends ConnectedBaseRadioGroupProps,
    ConnectedFieldProps {}

export interface ConnectedRadioGroupInputProps
  extends Omit<ConnectedBaseRadioGroupProps, 'children'>,
    ConnectedFieldProps {
  options: ConnectedBaseRadioInputProps[];
}

export interface ConnectedSelectProps
  extends Omit<SelectProps, 'defaultValue' | 'name' | 'validation'>,
    ConnectedFieldProps {}

export interface ConnectedTextAreaProps
  extends Omit<TextAreaProps, 'defaultValue' | 'name' | 'validation'>,
    ConnectedFieldProps {}

export interface NestedCheckboxOption {
  /**
   * Unique identifier for this checkbox option
   */
  value: string;
  /**
   * Display label for the checkbox
   */
  label: ReactNode;
  /**
   * Whether this option should be disabled
   */
  disabled?: boolean;
  /**
   * Child options that are nested under this option
   */
  children?: NestedCheckboxOption[];
  /**
   * Additional props to pass to the individual Checkbox component
   */
  checkboxProps?: Omit<
    CheckboxProps,
    'checked' | 'onChange' | 'name' | 'htmlFor' | 'label' | 'disabled'
  >;
}

export interface ConnectedNestedCheckboxesProps {
  /**
   * Field name for form registration
   */
  name: string;
  /**
   * Hierarchical structure of checkbox options
   */
  options: NestedCheckboxOption[];
  /**
   * Whether all checkboxes should be disabled
   */
  disabled?: boolean;
  /**
   * CSS class name for the container
   */
  className?: string;
  /**
   * Callback fired when the selection changes
   * @param selectedValues Array of selected option values
   */
  onUpdate?: (selectedValues: string[]) => void;
}
