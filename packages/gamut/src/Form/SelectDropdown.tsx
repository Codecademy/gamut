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

const selectSizeVariants = variant({
  default: 'base',
  prop: 'sizeVariant',
  variants: {
    small: {
      height: '2rem',
      paddingX: 8,
      paddingY: 0,
    },
    base: {
      height: 'auto',
    },
  },
});

const selectBaseStyles = (error: any, activated: any, isFocused: any) => css`
  ${formFieldStyles}
  ${conditionalBorderStyles({ error, activated, isFocused })}
  cursor: pointer;
  display: flex;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
`;

const selectIconStyles = (error: any) => css`
  ${conditionalColorStyles(error)};
  display: flex;
  padding: 0;
`;

const customStyles = {
  dropdownIndicator: (provided: any, state: any) => ({
    // ...provided,
    ...selectIconStyles(state.selectProps.error),
    padding: '0',
  }),
  menu: (provided: any, state: any) => ({
    ...formDropdownStyles,
  }),
  option: (provided: any, state: any) => ({
    padding: '14px 11px 14px 11px',
    '&:hover': {
      backgroundColor: colorStates.dropdownHover.backgroundColor,
    },
  }),
  control: (provided: any, state: any) => ({
    ...selectBaseStyles(
      state.selectProps.error,
      state.selectProps.activated,
      state.isFocused
    ),
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
    { className, defaultValue, options, error, id, sizeVariant, ...rest },
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
          options={selectOptions}
          theme={(theme) => ({
            ...theme,
          })}
        />
      </Box>
    );
  }
);
