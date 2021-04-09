import { variant } from '@codecademy/gamut-styles';
import { css } from '@emotion/react';
import { each, isArray, isObject } from 'lodash';
import React, {
  ChangeEvent,
  forwardRef,
  SelectHTMLAttributes,
  useState,
} from 'react';
import ReactSelect, { components } from 'react-select';

import { Box } from '../Box';
import { SelectIcon } from './Select';
import {
  colorStates,
  conditionalBorderStyles,
  conditionalColorStyles,
  conditionalStyleProps,
  formDropdownStyles,
  formFieldStyles,
} from './styles/shared';

export type SelectDropdownWrapperProps = SelectHTMLAttributes<HTMLSelectElement> & {
  error?: boolean;
  htmlFor?: string;
  options?: string[] | Record<string, number | string>;
  id?: string;
  sizeVariant?: 'small' | 'base';
};

export interface SelectDropdownProps extends SelectDropdownWrapperProps {
  activated?: boolean;
}

const selectBaseStyles = ({
  error,
  activated,
  isFocused,
  isDisabled,
}: conditionalStyleProps) => css`
  ${formFieldStyles}
  ${conditionalBorderStyles({ error, activated, isFocused, isDisabled })}
  display: flex;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
`;

const selectIconStyles = (error: boolean) => css`
  ${conditionalColorStyles(error)};
  display: flex;
  padding: 0;
`;

const customStyles = {
  dropdownIndicator: (provided, state: any) => ({
    // ...provided,
    ...selectIconStyles(state.selectProps.error),
    padding: '0',
  }),
  container: (provided: any, state: any) => ({
    ...provided,
    pointerEvents: 'visible',
  }),
  menu: (provided: any, state: any) => ({
    ...formDropdownStyles,
  }),
  option: (provided: any, state: any) => ({
    padding: '14px 11px 14px 11px',
    cursor: 'pointer',
    backgroundColor:
      state.isSelected && colorStates.dropdown.isSelected.backgroundColor,
    '&:hover': {
      backgroundColor: colorStates.dropdown.hover.backgroundColor,
    },
  }),
  control: (provided: any, state: any) => ({
    ...selectBaseStyles({
      error: state.selectProps.error,
      activated: state.selectProps.activated,
      isFocused: state.isFocused,
      isDisabled: state.isDisabled,
    }),
  }),
  singleValue: (provided: any, state: any) => ({
    ...conditionalColorStyles(state.selectProps.error),
  }),
  valueContainer: (provided: any, state: any) => ({
    ...provided,
    padding: 0,
  }),
};

const DropdownIndicator = (props: any) => {
  return (
    <components.DropdownIndicator {...props}>
      <SelectIcon size={16} />
    </components.DropdownIndicator>
  );
};

export const SelectDropdown = forwardRef<
  HTMLSelectElement,
  SelectDropdownWrapperProps
>(
  (
    {
      className,
      defaultValue,
      options,
      error,
      id,
      sizeVariant,
      disabled,
      ...rest
    },
    ref
  ) => {
    const [activated, setActivated] = useState(false);

    const changeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
      rest?.onChange?.(event);
      setActivated(true);
    };

    let selectOptions: any = [];

    if (isArray(options)) {
      options.map((option) => {
        const key = id ? `${id}-${option}` : option;
        selectOptions.push({ value: option, label: key });
      });
    } else if (isObject(options)) {
      each(options, (text, val) => {
        selectOptions.push({ value: val, label: text });
      });
    }

    return (
      <Box
        width="100%"
        textColor={error ? 'red' : 'navy'}
        minWidth="7rem"
        className={className}
      >
        <ReactSelect
          defaultValue={selectOptions[0]}
          styles={customStyles}
          activated={activated}
          error={error}
          components={{ DropdownIndicator, IndicatorSeparator: () => null }}
          onChange={changeHandler}
          isSearchable={false}
          isDisabled={disabled}
          options={selectOptions}
          theme={(theme) => ({
            ...theme,
          })}
        />
      </Box>
    );
  }
);
