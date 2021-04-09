import { theme } from '@codecademy/gamut-styles';
import { css } from '@emotion/react';
import { each, isArray, isObject } from 'lodash';
import React, { ChangeEvent, forwardRef, ReactNode, useState } from 'react';
import ReactSelect, {
  components,
  IndicatorProps,
  StylesConfig,
} from 'react-select';

import { Box } from '../Box';
import { SelectIcon, SelectWrapperBaseProps } from './Select';
import {
  colorStates,
  conditionalBorderStyles,
  conditionalStyleProps,
  formDropdownStyles,
  formFieldStyles,
} from './styles/shared';

type optionsType = Array<{ value: string | number; label: string | number }>;

const selectBaseStyles = ({
  error,
  activated,
  isFocused,
  isDisabled,
}: conditionalStyleProps) => css`
  ${formFieldStyles}
  ${conditionalBorderStyles({ error, activated, isFocused, isDisabled })}
  line-height: ${theme.lineHeight['base']};
  display: flex;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
`;

const errorColorState = (error: boolean) => {
  const color = error ? colorStates.error.color : colorStates.base.color;
  return color;
};

const customStyles: StylesConfig<optionsType, false> = {
  dropdownIndicator: (provided, state) => ({
    color: errorColorState(state.selectProps.error),
    display: 'flex',
    padding: '0',
  }),

  container: (provided) => ({
    ...provided,
    pointerEvents: 'visible',
  }),

  menu: (provided) => ({
    ...provided,
    ...formDropdownStyles,
  }),

  option: (provided, state) => ({
    padding: '14px 11px 14px 11px',
    cursor: 'pointer',
    backgroundColor:
      (state.isSelected && colorStates.dropdown.selected.backgroundColor) ||
      (state.isFocused && colorStates.dropdown.focused.backgroundColor) ||
      'transparent',
    '&:hover': {
      backgroundColor: colorStates.dropdown.focused.backgroundColor,
    },
  }),

  control: (provided, state) => ({
    ...selectBaseStyles({
      error: state.selectProps.error,
      activated: state.selectProps.activated,
      isFocused: state.isFocused,
      isDisabled: state.isDisabled,
    }),
  }),

  singleValue: (provided, state) => ({
    color: errorColorState(state.selectProps.error),
  }),

  valueContainer: (provided) => ({
    ...provided,
    padding: 0,
  }),
};

const DropdownIndicator = (props: IndicatorProps<any, any>) => {
  return (
    <components.DropdownIndicator {...props}>
      <SelectIcon size={16} />
    </components.DropdownIndicator>
  );
};

export const SelectDropdown = forwardRef<
  HTMLSelectElement,
  SelectWrapperBaseProps
>(({ className, defaultValue, options, error, id, disabled, ...rest }, ref) => {
  const [activated, setActivated] = useState(false);

  const changeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    rest?.onChange?.(event);
    setActivated(true);
  };

  let selectOptions: ReactNode[] = [];

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
        id={id || rest.htmlFor}
        defaultValue={defaultValue || ''}
        styles={customStyles}
        activated={activated}
        error={Boolean(error)}
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
});
