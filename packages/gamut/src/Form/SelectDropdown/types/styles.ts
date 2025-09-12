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
