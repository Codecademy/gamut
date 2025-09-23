import * as React from 'react';
import { DropdownIndicatorProps, GroupBase } from 'react-select';

import { SelectOptionBase } from '../../utils';
import { OptionStrict } from './options';
import { SelectDropdownSizes, SharedProps } from './styles';

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
