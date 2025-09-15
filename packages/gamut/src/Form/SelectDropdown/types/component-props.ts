import { StyleProps } from '@codecademy/variance';
import { Ref, SelectHTMLAttributes } from 'react';
import { Props as NamedProps } from 'react-select';

import { SelectComponentProps } from '../../inputs/Select';
import { conditionalBorderStates } from '../styles';
import {
  OptionStrict,
  SelectDropdownGroup,
  SelectDropdownOptions,
} from './options';

/**
 * Safe props that can be passed to the combobox input element.
 * These props are filtered to only include data-*, and aria-* attributes.
 */
export type SafeInternalInputProps = {
  [K in `data-${string}` | `aria-${string}`]: string;
};

/**
 * Shared properties available to all SelectDropdown variants.
 * These props control common behavior and styling across single and multi-select modes.
 */
export interface SharedProps {
  /** Additional props to pass to the hidden input element */
  inputProps?: {
    hidden?: SafeInternalInputProps;
    combobox?: SafeInternalInputProps;
  };
  /** Maximum number of options to display in the dropdown before scrolling */
  shownOptionsLimit?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Width of the input field */
  inputWidth?: string | number;
  /** Width of the dropdown menu */
  dropdownWidth?: string | number;
  /** Alignment of the dropdown menu relative to the input
   * This is only relevant when the dropdown width is set to be larger or smaller than the input width.
   */
  menuAlignment?: 'left' | 'right';
}

/**
 * Size variants for the SelectDropdown component.
 */
export interface SelectDropdownSizes {
  /** Visual size of the component */
  size?: 'small' | 'medium';
}

/**
 * Style props for wrapper states like activation and error states.
 */
export interface WrapperStyleProps
  extends Pick<
    StyleProps<typeof conditionalBorderStates>,
    'activated' | 'error'
  > {}

/**
 * Additional props passed to the underlying react-select component.
 * Combines wrapper styles, shared props, and size variants.
 */
export interface ReactSelectAdditionalProps
  extends WrapperStyleProps,
    SharedProps,
    SelectDropdownSizes {}

/**
 * Base props for SelectDropdown, excluding props that are handled internally.
 * Extends SelectComponentProps while omitting props that are managed by the component.
 */
export type SelectDropdownBaseProps = Omit<
  SelectComponentProps,
  'onChange' | 'defaultValue' | 'options'
> &
  SelectDropdownSizes;

/**
 * Core props interface that defines the essential properties for SelectDropdown.
 * This interface combines base props with react-select props and HTML select attributes.
 */
export interface SelectDropdownCoreProps
  extends SelectDropdownBaseProps,
    Omit<
      NamedProps<OptionStrict, boolean>,
      | 'formatOptionLabel'
      | 'isDisabled'
      | 'value'
      | 'options'
      | 'components'
      | 'styles'
      | 'theme'
      | 'onChange'
      | 'multiple'
    >,
    Pick<
      SelectHTMLAttributes<HTMLSelectElement>,
      'value' | 'disabled' | 'onClick'
    >,
    SharedProps {
  /** Required name attribute for the select input */
  name: string;
  /** Placeholder text shown when no option is selected.
   * Placeholder text is not recommended for accessibility. If you need to use placeholder text,
   * please make sure the placeholder text doesn't add any new information to the input.
   * I.e - if the placeholder text describes an action you'd like the user to take, please use a label instead. */
  placeholder?: string;
  /** Array of options or option groups to display in the dropdown */
  options?: SelectDropdownOptions | SelectDropdownGroup[];
}

/**
 * Props for single-select mode.
 * When multiple is false or undefined, only one option can be selected.
 */
export interface SingleSelectDropdownProps extends SelectDropdownCoreProps {
  /** Indicates single-select mode (false or undefined) */
  multiple?: false;
  /** Callback fired when the selected value changes */
  onChange?: NamedProps<OptionStrict, false>['onChange'];
}

/**
 * Props for multi-select mode.
 * When multiple is true, multiple options can be selected.
 */
export interface MultiSelectDropdownProps extends SelectDropdownCoreProps {
  /** Indicates multi-select mode (must be true) */
  multiple: true;
  /** Callback fired when the selected values change */
  onChange?: NamedProps<OptionStrict, true>['onChange'];
}

/**
 * Union type for all SelectDropdown prop variants.
 * Supports both single and multi-select modes through discriminated union.
 */
export type SelectDropdownProps =
  | SingleSelectDropdownProps
  | MultiSelectDropdownProps;

/**
 * Base interface for onChange-related props.
 * Used internally for type checking and prop validation.
 */
export interface BaseOnChangeProps {
  /** Whether multiple selection is enabled */
  multiple?: boolean;
  /** Change handler that works for both single and multi-select modes */
  onChange?:
    | SingleSelectDropdownProps['onChange']
    | MultiSelectDropdownProps['onChange'];
}

/**
 * Props for the typed React Select component wrapper.
 * Extends ReactSelectAdditionalProps with an optional ref.
 */
export interface TypedReactSelectProps extends ReactSelectAdditionalProps {
  /** Optional ref to the underlying react-select component */
  selectRef?: Ref<any>;
}
