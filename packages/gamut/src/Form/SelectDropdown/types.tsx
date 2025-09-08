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

export interface OptionStrict {
  label: string;
  value: string;
}

export interface IconOption {
  label: string;
  value: string;
  icon?: React.ComponentType<GamutIconProps>;
}

export interface ExtendedOption extends IconOption {
  subtitle?: string;
  disabled?: boolean;
  rightLabel?: string;
  size?: string;
  /** The abbreviated text shown in the input when selected */
  abbreviation?: string;
}

export interface ExtendedOptions {
  label: string;
  value: string;
  icon?: React.ComponentType<GamutIconProps>;
}

export interface SelectDropdownGroup extends GroupBase<ExtendedOption> {
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

export interface SharedProps {
  inputProps?: Record<string, string | number | boolean>;
  shownOptionsLimit?: 1 | 2 | 3 | 4 | 5 | 6;
  inputWidth?: string | number;
  dropdownWidth?: string | number;
}

export interface SelectDropdownSizes {
  size?: 'small' | 'medium';
}

export interface WrapperStyleProps
  extends Pick<
    StyleProps<typeof conditionalBorderStates>,
    'activated' | 'error'
  > {}

export interface ReactSelectAdditionalProps
  extends WrapperStyleProps,
    SharedProps,
    SelectDropdownSizes {}

export type SelectDropdownBaseProps = Omit<
  SelectComponentProps,
  'onChange' | 'defaultValue' | 'options'
> &
  SelectDropdownSizes;

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
  name: string;
  placeholder?: string;
  options?: SelectDropdownOptions | SelectDropdownGroup[];
}

export interface SingleSelectDropdownProps extends SelectDropdownCoreProps {
  multiple?: false;
  onChange?: NamedProps<OptionStrict, false>['onChange'];
}

export interface MultiSelectDropdownProps extends SelectDropdownCoreProps {
  multiple: true;
  onChange?: NamedProps<OptionStrict, true>['onChange'];
}

export type SelectDropdownProps =
  | SingleSelectDropdownProps
  | MultiSelectDropdownProps;

export interface BaseOnChangeProps {
  multiple?: boolean;
  onChange?:
    | SingleSelectDropdownProps['onChange']
    | MultiSelectDropdownProps['onChange'];
}

export interface TypedReactSelectProps extends ReactSelectAdditionalProps {
  selectRef?: Ref<any>;
}

/*
 * ============================================================================
 * Internal component types
 * ============================================================================
 */

export type InternalSelectProps = {
  selectProps: Pick<SharedProps, 'inputProps'> & SelectDropdownSizes;
};

export type ProgramaticFocusRef =
  | React.MutableRefObject<HTMLDivElement>
  | React.MutableRefObject<null>;

export interface SelectDropdownContextValueTypes {
  currentFocusedValue?: SelectOptionBase['value'];
  setCurrentFocusedValue?: React.Dispatch<React.SetStateAction<unknown>>;
  selectInputRef?: ProgramaticFocusRef;
  removeAllButtonRef?: ProgramaticFocusRef;
}

export type SizedIndicatorProps = DropdownIndicatorProps<
  unknown,
  false,
  GroupBase<OptionStrict>
> &
  InternalSelectProps;

export type CustomSelectComponentProps<
  T extends React.JSXElementConstructor<unknown>
> = React.ComponentProps<T> & InternalSelectProps;

/*
 * ============================================================================
 * Style types
 * ============================================================================
 */

export type BaseSelectProps = {
  size?: 'small' | 'medium';
  isMulti?: boolean;
  isSearchable?: boolean;
  error?: boolean;
  activated?: boolean;
  inputWidth?: string | number;
  dropdownWidth?: string | number;
  shownOptionsLimit?: number;
};

export type ContainerState = {
  selectProps: BaseSelectProps;
};

export type ControlState = {
  isFocused: boolean;
  isDisabled: boolean;
  hasValue: boolean;
  selectProps: BaseSelectProps;
};

export type MenuState = {
  selectProps: BaseSelectProps;
};

export type MenuListState = {
  selectProps: BaseSelectProps;
};

export type OptionState = {
  isFocused: boolean;
  isDisabled: boolean;
  isSelected: boolean;
  selectProps: BaseSelectProps;
};
