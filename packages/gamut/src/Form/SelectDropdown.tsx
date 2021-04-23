import { ArrowChevronDownIcon } from '@codecademy/gamut-icons';
import { theme } from '@codecademy/gamut-styles';
import { css } from '@emotion/react';
import { each, isObject } from 'lodash';
import React, { useMemo, useState } from 'react';
import ReactSelect, {
  components as SelectDropdownElements,
  IndicatorProps,
  NamedProps,
  OptionTypeBase,
  StylesConfig,
} from 'react-select';

import { SelectWrapperBaseProps } from './Select';
import {
  colorStates,
  conditionalBorderStyles,
  conditionalStyleProps,
  formDropdownStyles,
  formFieldStyles,
} from './styles/shared';

type ReactSelectNamedProps = Omit<NamedProps, 'options' | 'defaultValue'>;
type SelectDropdownBaseProps = Omit<SelectWrapperBaseProps, 'onChange'>;
type SelectDropdownProps = SelectDropdownBaseProps & ReactSelectNamedProps;
type OptionStrict = {
  label: string;
  value: string;
};

// type ReactRecurlyInput = InputProps & {
//   'data-recurly'?: string;
//   id?: string;
// };

const { DropdownIndicator } = SelectDropdownElements;

const selectBaseStyles = ({
  error,
  activated,
  isFocused,
  isDisabled,
}: conditionalStyleProps) => css`
  ${formFieldStyles}
  ${conditionalBorderStyles({ error, activated, isFocused, isDisabled })}
  line-height: ${theme.lineHeight.base};
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
    pointerEvents: 'none',
  }),

  container: (provided) => ({
    ...provided,
    pointerEvents: 'visible',
    width: '100%',
    minWidth: '7rem',
  }),

  menu: (provided, state) => ({
    ...provided,
    ...formDropdownStyles(state.selectProps.error),
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
    display: 'flex',
  }),

  valueContainer: (provided) => ({
    ...provided,
    padding: 0,
  }),
};

const ChevronDropdown = (props: IndicatorProps<OptionTypeBase, false>) => {
  return (
    <DropdownIndicator {...props}>
      <ArrowChevronDownIcon size={16} />
    </DropdownIndicator>
  );
};

export const SelectDropdown: React.FC<SelectDropdownProps> = ({
  options,
  error,
  id,
  disabled,
  defaultValue,
  onChange,
  value,
  ...rest
}) => {
  const [activated, setActivated] = useState(false);

  const changeHandler = (optionEvent: OptionStrict) => {
    onChange?.(optionEvent, {
      action: 'select-option',
      option: optionEvent,
    });
    setActivated(true);
  };

  const selectOptions: Array<OptionTypeBase> = useMemo(() => {
    const parsedOptions: Array<OptionTypeBase> = [];
    if (options instanceof Array) {
      options.forEach((option) => {
        const key = id ? `${id}-${option}` : option;
        parsedOptions.push({ label: key, value: option });
      });
    } else if (isObject(options)) {
      each(options, (text, val) => {
        parsedOptions.push({ label: text, value: val });
      });
    }
    return parsedOptions;
  }, [options, id]);

  const parsedDefaultValue = useMemo(() => {
    const currentValue = selectOptions.find(
      ({ value: optionValue }) => optionValue === defaultValue
    );

    return currentValue ? currentValue[0] : null;
  }, [selectOptions, defaultValue]);

  const parsedValue = useMemo(() => {
    const currentValue = selectOptions.find(
      ({ value: optionValue }) => optionValue === value
    );

    return currentValue ? currentValue[0] : null;
  }, [selectOptions, value]);

  return (
    <ReactSelect
      id={id || rest.htmlFor}
      value={parsedValue}
      styles={customStyles}
      activated={activated}
      error={Boolean(error)}
      components={{
        DropdownIndicator: ChevronDropdown,
        IndicatorSeparator: () => null,
      }}
      onChange={changeHandler}
      isSearchable={false}
      isMulti={false}
      isDisabled={disabled}
      options={selectOptions}
      {...rest}
    />
  );
};
