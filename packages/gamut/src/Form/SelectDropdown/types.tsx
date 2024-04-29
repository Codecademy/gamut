import { GamutIconProps } from '@codecademy/gamut-icons';
import { StyleProps } from '@codecademy/variance';
import { ReactNode, Ref, SelectHTMLAttributes } from 'react';
import * as React from 'react';
import {
  ContainerProps,
  DropdownIndicatorProps,
  GroupBase,
  Props as NamedProps,
} from 'react-select';

import { SelectComponentProps, SelectOptions } from '../Select';
import { SelectOptionBase } from '../utils';
import { conditionalBorderStates } from './styles';

export interface SharedProps {
  inputProps?: Record<string, string | number | boolean>;
  shownOptionsLimit?: 1 | 2 | 3 | 4 | 5 | 6;
}

export interface SelectDropdownGroup extends GroupBase<ExtendedOption> {
  divider?: boolean;
}

export interface WrapperStyleProps
  extends Pick<
    StyleProps<typeof conditionalBorderStates>,
    'activated' | 'error'
  > {}

export interface SelectDropdownSizes {
  size?: 'small' | 'medium';
}

export interface ReactSelectAdditionalProps
  extends WrapperStyleProps,
    SharedProps,
    SelectDropdownSizes {}

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
}

export interface ExtendedOptions {
  label: string;
  value: string;
  icon?: React.ComponentType<GamutIconProps>;
}

export type SelectDropdownBaseProps = Omit<
  SelectComponentProps,
  'onChange' | 'defaultValue' | 'options'
> &
  SelectDropdownSizes;

export type SelectDropdownOptions =
  | SelectOptions
  | IconOption[]
  | ExtendedOption[];

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

export type InternalSelectProps = {
  selectProps: Pick<SharedProps, 'inputProps'> & SelectDropdownSizes;
};

export interface OptionStrict {
  label: string;
  value: string;
}

export interface CustomContainerProps extends ContainerProps<unknown, false> {
  children: ReactNode[];
}

export type ProgramaticFocusRef =
  | React.MutableRefObject<HTMLDivElement>
  | React.MutableRefObject<null>;
export interface SelectDropdownContextValueTypes {
  currentFocusedValue?: SelectOptionBase['value'];
  setCurrentFocusedValue?: React.Dispatch<React.SetStateAction<unknown>>;
  selectInputRef?: ProgramaticFocusRef;
  removeAllButtonRef?: ProgramaticFocusRef;
  highlightedOption: string;
  setHighlightedOption: React.Dispatch<React.SetStateAction<unknown>>;
}
export type SizedIndicatorProps = DropdownIndicatorProps<
  unknown,
  false,
  GroupBase<OptionStrict>
> &
  InternalSelectProps;

export interface TypedReactSelectProps extends ReactSelectAdditionalProps {
  selectRef?: Ref<any>;
}
