import { GamutIconProps } from '@codecademy/gamut-icons';
import { StyleProps } from '@codecademy/variance';
import { Ref, SelectHTMLAttributes } from 'react';
import * as React from 'react';
import {
  DropdownIndicatorProps,
  GroupBase,
  Props as NamedProps,
} from 'react-select';

import { SelectComponentProps, SelectOptions } from '../inputs/Select';
import { SelectOptionBase } from '../utils';
import { conditionalBorderStates } from './styles';

/*
 * ============================================================================
 * Option types
 * ============================================================================
 */

/**
 * Basic option structure with required label and value properties.
 * This is the minimal interface that all select options must implement.
 */
export interface OptionStrict {
  /** The display text for the option */
  label: string;
  /** The unique value for the option */
  value: string;
}

/**
 * Option with optional icon support.
 * Extends the basic option structure to include an icon component.
 */
export interface IconOption {
  /** The display text for the option */
  label: string;
  /** The unique value for the option */
  value: string;
  /** Optional icon component to display alongside the label */
  icon?: React.ComponentType<GamutIconProps>;
}

/**
 * Extended option with additional display features.
 * Supports icons, subtitles, right labels, abbreviations, and disabled state.
 */
export interface ExtendedOption extends IconOption {
  /** Optional subtitle text displayed below the main label */
  subtitle?: string;
  /** Whether the option is disabled and cannot be selected */
  disabled?: boolean;
  /** Optional text displayed on the right side of the option */
  rightLabel?: string;
  /** Size specification for the option (typically 'small' or 'medium') */
  size?: string;
  /** The abbreviated text shown in the input when selected */
  abbreviation?: string;
}

/**
 * Group structure for organizing options into categories.
 * Extends react-select's GroupBase with optional divider support.
 */
export interface SelectDropdownGroup extends GroupBase<ExtendedOption> {
  /** Whether to show a visual divider above this group */
  divider?: boolean;
}

export type SelectDropdownOptions =
  | SelectOptions
  | IconOption[]
  | ExtendedOption[]
  | SelectDropdownGroup[];

/*
 * ============================================================================
 * Component props types
 * ============================================================================
 */

/**
 * Shared properties available to all SelectDropdown variants.
 * These props control common behavior and styling across single and multi-select modes.
 */
export interface SharedProps {
  /** Additional props to pass to the hidden input element */
  inputProps?: Record<string, string | number | boolean>;
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

/*
 * ============================================================================
 * Internal component types
 * ============================================================================
 */

/**
 * Internal props passed to custom select components.
 * Contains select-specific props and size information.
 */
export type InternalSelectProps = {
  selectProps: Pick<SharedProps, 'inputProps'> & SelectDropdownSizes;
};

/**
 * Ref type for programmatic focus management.
 * Used for managing focus on select input and remove all button.
 */
export type ProgramaticFocusRef =
  | React.MutableRefObject<HTMLDivElement>
  | React.MutableRefObject<null>;

/**
 * Context value for SelectDropdown internal state management.
 * Provides access to focus state and refs for keyboard navigation.
 */
export interface SelectDropdownContextValueTypes {
  /** Currently focused option value for keyboard navigation */
  currentFocusedValue?: SelectOptionBase['value'];
  /** Function to update the currently focused value */
  setCurrentFocusedValue?: React.Dispatch<React.SetStateAction<unknown>>;
  /** Ref to the select input for programmatic focus */
  selectInputRef?: ProgramaticFocusRef;
  /** Ref to the remove all button for programmatic focus */
  removeAllButtonRef?: ProgramaticFocusRef;
}

/**
 * Props for sized indicator components (dropdown arrow, search icon, etc.).
 * Combines react-select's DropdownIndicatorProps with internal select props.
 */
export type SizedIndicatorProps = DropdownIndicatorProps<
  unknown,
  false,
  GroupBase<OptionStrict>
> &
  InternalSelectProps;

/**
 * Generic props for custom select components.
 * Combines component props with internal select props for type safety.
 */
export type CustomSelectComponentProps<
  T extends React.JSXElementConstructor<unknown>
> = React.ComponentProps<T> & InternalSelectProps;

/*
 * ============================================================================
 * Style types
 * ============================================================================
 */

/**
 * Base props used for styling select components.
 * Contains all the styling-related properties used throughout the component.
 */
export type BaseSelectProps = {
  /** Visual size of the component */
  size?: 'small' | 'medium';
  /** Whether multiple selection is enabled */
  isMulti?: boolean;
  /** Whether the select is searchable */
  isSearchable?: boolean;
  /** Whether the select is in an error state */
  error?: boolean;
  /** Whether the select is activated/focused */
  activated?: boolean;
  /** Width of the input field */
  inputWidth?: string | number;
  /** Width of the dropdown menu */
  dropdownWidth?: string | number;
  /** Maximum number of options to show before enabling scroll
   * Computedmax height of the dropdown menu
   */
  shownOptionsLimit?: number;
  /** Alignment of the dropdown menu relative to the input */
  menuAlignment?: 'left' | 'right';
};

/**
 * State props for container components.
 * Used by react-select's container styling functions.
 */
export type ContainerState = {
  selectProps: BaseSelectProps;
};

/**
 * State props for control components.
 * Used by react-select's control styling functions.
 */
export type ControlState = {
  /** Whether the control is currently focused */
  isFocused: boolean;
  /** Whether the control is disabled */
  isDisabled: boolean;
  /** Whether the control has a selected value */
  hasValue: boolean;
  selectProps: BaseSelectProps;
};

/**
 * State props forthe dropdown menu components.
 * Used by react-select's menu styling functions.
 */
export type MenuState = {
  selectProps: BaseSelectProps;
};

/**
 * State props for menu list components.
 * Used by react-select's menu list styling functions.
 */
export type MenuListState = {
  selectProps: BaseSelectProps;
};

/**
 * State props for option components.
 * Used by react-select's option styling functions.
 */
export type OptionState = {
  /** Whether the option is currently focused */
  isFocused: boolean;
  /** Whether the option is disabled */
  isDisabled: boolean;
  /** Whether the option is selected */
  isSelected: boolean;
  selectProps: BaseSelectProps;
};
