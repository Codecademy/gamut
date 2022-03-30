import { GamutIconProps } from '@codecademy/gamut-icons';
import React, { ReactNode, SelectHTMLAttributes } from 'react';
import {
  ContainerProps,
  DropdownIndicatorProps,
  GroupBase,
  Props as NamedProps,
} from 'react-select';

import { SelectComponentProps, SelectOptions } from '../Select';

export interface IconOption {
  label: string;
  value: string;
  icon?: React.ComponentType<GamutIconProps>;
}

export interface SelectDropdownSizes {
  size?: 'small' | 'medium';
}

export type SelectDropdownBaseProps = Omit<
  SelectComponentProps,
  'onChange' | 'defaultValue' | 'options'
> &
  SelectDropdownSizes;

export type SelectDropdownOptions = SelectOptions | IconOption[];

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
    > {
  inputProps?: Record<string, string | number | boolean>;
  name: string;
  placeholder?: string;
  options?: SelectDropdownOptions;
  shownOptionsLimit?: 1 | 2 | 3 | 4 | 5 | 6;
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

export type InputProps = {
  inputProps: any;
};

export type HiProps = InputProps & SelectDropdownSizes;

export type SelectProps = {
  selectProps: HiProps;
};

export interface OptionStrict {
  label: string;
  value: string;
}

export type CustomContainerProps = ContainerProps<unknown, false> & {
  children?: ReactNode[];
} & SelectProps;

export type SizedIndicatorProps = DropdownIndicatorProps<
  unknown,
  false,
  GroupBase<OptionStrict>
> &
  SelectProps &
  InputProps;

export interface ReactSelectAdditionalProps {
  activated?: boolean;
  error?: boolean;
  size?: any;
  inputProps?: any;
  shownOptionsLimit?: any;
}
