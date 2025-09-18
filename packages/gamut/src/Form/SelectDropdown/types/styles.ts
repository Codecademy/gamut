import { StyleProps } from '@codecademy/variance';

import { conditionalBorderStates } from '../styles';
import { SharedProps } from './component-props';

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
