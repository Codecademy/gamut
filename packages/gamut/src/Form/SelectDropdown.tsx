import { theme } from '@codecademy/gamut-styles';
import { css } from '@emotion/react';
import { each, isArray, isObject } from 'lodash';
import React, { ChangeEvent, useState } from 'react';
import ReactSelect, {
  components,
  IndicatorProps,
  NamedProps,
  OptionTypeBase,
  StylesConfig,
} from 'react-select';

import { SelectIcon, SelectWrapperBaseProps } from './Select';
import {
  colorStates,
  conditionalBorderStyles,
  conditionalStyleProps,
  formDropdownStyles,
  formFieldStyles,
} from './styles/shared';

type SelectDropdownProps = SelectWrapperBaseProps & NamedProps;

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
`;

const errorColorState = (error: boolean) => {
  const color = error ? colorStates.error.color : colorStates.base.color;
  return color;
};

const customStyles: StylesConfig<OptionTypeBase, false> = {
  dropdownIndicator: (provided, state) => ({
    color: errorColorState(state.selectProps.error),
    display: 'flex',
    padding: '0',
  }),

  container: (provided) => ({
    ...provided,
    pointerEvents: 'visible',
    width: '100%',
    minWidth: '7rem',
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

const DropdownIndicator = (props: IndicatorProps<OptionTypeBase, false>) => {
  return (
    <components.DropdownIndicator {...props}>
      <SelectIcon size={16} />
    </components.DropdownIndicator>
  );
};

export const SelectDropdown: React.FC<SelectDropdownProps> = ({
  options,
  error,
  id,
  disabled,
  defaultValue,
  ...rest
}) => {
  const [activated, setActivated] = useState(false);

  const changeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    rest?.onChange?.(event);
    setActivated(true);
  };

  const selectOptions: Array<OptionTypeBase> = [];

  if (options instanceof Array) {
    options.map((option) => {
      const key = id ? `${id}-${option}` : option;
      selectOptions.push({ label: key, value: option });
    });
  } else if (isObject(options)) {
    each(options, (option, val) => {
      const text = option.value ?? option;
      selectOptions.push({ label: text, value: val });
    });
  }

  const setDefaultValue = rest.placeholder
    ? null
    : defaultValue
    ? selectOptions[
        selectOptions.findIndex((option) => option.value === defaultValue)
      ]
    : selectOptions[0];

  return (
    <ReactSelect
      id={id || rest.htmlFor}
      defaultValue={setDefaultValue}
      styles={customStyles}
      activated={activated}
      error={Boolean(error)}
      components={{ DropdownIndicator, IndicatorSeparator: () => null }}
      onChange={changeHandler}
      isSearchable={false}
      isMulti={false}
      isDisabled={disabled}
      options={selectOptions}
      theme={(theme) => ({
        ...theme,
      })}
      {...rest}
    />
  );
};
