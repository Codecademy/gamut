import { StyleProps } from '@codecademy/variance';

import { conditionalBorderStates } from '../styles';
import { InternalInputsProps } from './component-props';

/**
 * Size variants for the SelectDropdown component.
 */
export type SelectDropdownSizes = { size?: 'small' | 'medium' };

/**
 * Shared properties available to all SelectDropdown variants.
 * These props control common behavior and styling across single and multi-select modes.
 */
export interface SharedProps extends InternalInputsProps, SelectDropdownSizes {
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
  /** Z-index for the dropdown menu */
  zIndex?: number;
}

/**
 * Style props for wrapper states like activation and error states.
 */
export interface StateStyleProps
  extends Pick<
    StyleProps<typeof conditionalBorderStates>,
    'activated' | 'error'
  > {}

/**
 * Additional props passed to the underlying react-select component.
 * Combines wrapper styles, shared props, and size variants.
 */
export interface ReactSelectAdditionalProps
  extends StateStyleProps,
    SharedProps {}

/**
 * Base props used for styling select components.
 * Contains all the styling-related properties used throughout the component.
 */
export type BaseSelectComponentProps = {
  selectProps: Omit<SharedProps, 'inputProps'> &
    StateStyleProps & {
      /** Whether multiple selection is enabled */
      isMulti?: boolean;
      /** Whether the select is searchable */
      isSearchable?: boolean;
    };
};

type InteractionStates = {
  /** Whether the control is currently focused */
  isFocused: boolean;
  /** Whether the control is disabled */
  isDisabled: boolean;
};

/**
 * State props for control components.
 * Used by react-select's control styling functions.
 */
export type ControlState = BaseSelectComponentProps &
  InteractionStates & {
    /** Whether the control has a selected value */
    hasValue: boolean;
  };

/**
 * State props for option components.
 * Used by react-select's option styling functions.
 */
export type OptionState = BaseSelectComponentProps &
  InteractionStates & {
    /** Whether the option is selected */
    isSelected: boolean;
  };
