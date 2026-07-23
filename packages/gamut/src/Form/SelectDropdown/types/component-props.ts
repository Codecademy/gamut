import { Ref, SelectHTMLAttributes } from 'react';
import { Options as OptionsType, Props as NamedProps } from 'react-select';

import { SelectComponentProps } from '../../inputs/Select';
import {
  OptionStrict,
  SelectDropdownGroup,
  SelectDropdownOptions,
} from './options';
import {
  ReactSelectAdditionalProps,
  SelectDropdownSizes,
  SharedProps,
} from './styles';

/**
 * Safe props that can be passed to the combobox input element.
 * These props are filtered to only include data-*, and aria-* attributes.
 */
export type SafeInternalInputProps = {
  [K in `data-${string}` | `aria-${string}`]: string;
};

/**
 * These props target the internal hidden + combobox components
 */
export type InternalInputsProps = {
  inputProps?: {
    hidden?: SafeInternalInputProps;
    combobox?: SafeInternalInputProps;
  };
};

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
      | 'isSearchable'
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
  /**
   * Allows users to create new options by typing a value not in the options list.
   * When true, isSearchable is automatically set to true.
   * Pair with onCreateOption to persist new options.
   */
  isCreatable?: boolean;
  /**
   * Called when the user confirms a new option via the "Add" row.
   * Convenience callback for persisting the new value to your `options` list.
   * Selection updates are delivered through `onChange` with `action: 'create-option'`.
   */
  onCreateOption?: (inputValue: string) => void;
  /**
   * Customises the label shown in the "Add" row.
   * Defaults to: (inputValue) => `Add "${inputValue}"`.
   */
  formatCreateLabel?: (inputValue: string) => React.ReactNode;
  /**
   * Controls when the "Add" row is visible.
   * Receives the current input, selected values, and all options.
   * Defaults to react-select's built-in logic (hidden when input matches an existing option label).
   * Use cases: minimum-length gating, pattern validation, case-insensitive dedup, max-items cap.
   */
  isValidNewOption?: (
    inputValue: string,
    value: OptionsType<OptionStrict>,
    options: OptionsType<OptionStrict>
  ) => boolean;
  /**
   * Replaces the default "No options" text shown inside the dropdown menu
   * whenever no option matches the current input - an empty `options` array,
   * or every option filtered out by a search. Not tied to `isCreatable`; any
   * searchable SelectDropdown can use it. Accepts a `ReactNode`, or a function
   * receiving `{ inputValue }` for live, input-specific validation/error copy
   * (e.g. "No results for '{inputValue}'").
   */
  validationMessage?:
    | React.ReactNode
    | ((obj: { inputValue: string }) => React.ReactNode);
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
 * Enforces that isSearchable cannot be false when isCreatable is true.
 * Creatable mode requires the search input so users can type new option values.
 */
type CreatableConstraint =
  | { isCreatable?: false | undefined; isSearchable?: boolean }
  | { isCreatable: true; isSearchable?: true };

/**
 * Union type for all SelectDropdown prop variants.
 * Supports both single and multi-select modes through discriminated union,
 * intersected with CreatableConstraint to enforce isSearchable compatibility.
 */
export type SelectDropdownProps = (
  | SingleSelectDropdownProps
  | MultiSelectDropdownProps
) &
  CreatableConstraint;

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
 * Extends ReactSelectAdditionalProps with an optional ref and creatable flag.
 */
export interface TypedReactSelectProps
  extends ReactSelectAdditionalProps,
    Pick<SelectDropdownCoreProps, 'formatCreateLabel' | 'isValidNewOption'> {
  /** Optional ref to the underlying react-select component */
  selectRef?: Ref<any>;
  /** When true, renders CreatableSelect instead of ReactSelect */
  isCreatable?: boolean;
}
