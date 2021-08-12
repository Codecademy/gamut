import { ArrowChevronDownIcon } from '@codecademy/gamut-icons';
import { useTheme } from '@emotion/react';
import React, {
  ReactNode,
  SelectHTMLAttributes,
  useMemo,
  useState,
} from 'react';
import ReactSelect, {
  components as SelectDropdownElements,
  ContainerProps,
  IndicatorProps,
  NamedProps,
  OptionTypeBase,
  StylesConfig,
} from 'react-select';

import { SelectComponentProps } from './Select';
import {
  conditionalBorderStates,
  dropdownBorderStates,
  dropdownBorderStyles,
  optionBackground,
  placeholderColor,
  selectDropdownStyles,
  textColor,
} from './styles';
import { parseOptions } from './utils';

const { DropdownIndicator, SelectContainer } = SelectDropdownElements;

type SelectDropdownBaseProps = Omit<
  SelectComponentProps,
  'onChange' | 'defaultValue'
>;
interface SelectDropdownProps
  extends SelectDropdownBaseProps,
    Pick<NamedProps, 'onChange' | 'isSearchable'>,
    Pick<SelectHTMLAttributes<HTMLSelectElement>, 'value' | 'disabled'> {
  inputProps?: Record<string, string | number | boolean>;
  name?: string;
  placeholder?: string;
}

type OptionStrict = {
  label: string;
  value: string;
};

type CustomContainerProps = ContainerProps<OptionStrict, false> & {
  children?: ReactNode[];
};

const ChevronDropdown = (props: IndicatorProps<OptionTypeBase, false>) => {
  return (
    <DropdownIndicator {...props}>
      <ArrowChevronDownIcon
        size={16}
        color={props.isDisabled ? 'text-disabled' : 'text'}
      />
    </DropdownIndicator>
  );
};

const CustomContainer = ({ children, ...rest }: CustomContainerProps) => {
  const { inputProps, name } = rest.selectProps;
  const value = rest.hasValue ? rest.getValue()[0].value : '';

  return (
    <SelectContainer {...rest}>
      {children}
      <input type="hidden" value={value} name={name} {...inputProps} />
    </SelectContainer>
  );
};

const defaultProps = {
  name: undefined,
  isMulti: false,
  components: {
    DropdownIndicator: ChevronDropdown,
    IndicatorSeparator: () => null,
    SelectContainer: CustomContainer,
  },
};

export const SelectDropdown: React.FC<SelectDropdownProps> = ({
  options,
  error,
  id,
  disabled,
  onChange,
  value = undefined,
  name,
  placeholder = 'Select an option',
  inputProps,
  isSearchable = false,
  ...rest
}) => {
  const [activated, setActivated] = useState(false);
  const baseInputProps = { name };

  const changeHandler = (optionEvent: OptionStrict) => {
    onChange?.(optionEvent, {
      action: 'select-option',
      option: optionEvent,
    });
    setActivated(true);
  };

  const theme = useTheme();

  const memoizedStyles: StylesConfig<OptionTypeBase, false> = useMemo(() => {
    return {
      container: (provided, state) => ({
        ...provided,
        pointerEvents: 'visible',
        cursor: state.selectProps.isSearchable ? 'text' : 'pointer',
        width: '100%',
        minWidth: '7rem',
      }),

      control: (provided, state) => {
        return {
          ...selectDropdownStyles({ theme }),
          ...conditionalBorderStates({
            isFocused: state.isFocused,
            isDisabled: state.isDisabled,
            error: state.selectProps.error,
            activated: state.selectProps.activated,
            theme,
          }),
        };
      },

      dropdownIndicator: (provided, state) => ({
        color: 'currentColor',
        display: 'flex',
        padding: '0',
        pointerEvents: 'none',
      }),

      input: (provided, state) => ({
        ...textColor({ theme }),
        padding: '0',
        margin: '0',
      }),

      menu: (provided, state) => ({
        ...provided,
        ...dropdownBorderStyles({ theme }),
        ...dropdownBorderStates({ error: state.selectProps.error, theme }),
      }),

      placeholder: (provided, state) => ({
        ...provided,
        ...placeholderColor({ theme }),
      }),

      option: (provided, state) => ({
        padding: '14px 11px 14px 11px',
        cursor: 'pointer',
        ...optionBackground(state.isSelected, state.isFocused)({ theme }),
      }),

      singleValue: (provided, state) => ({
        ...textColor({ theme }),
        display: 'flex',
      }),

      valueContainer: (provided) => ({
        ...provided,
        padding: 0,
      }),
    };
  }, [theme]);

  const selectOptions = useMemo(() => {
    return parseOptions({ options, id });
  }, [options, id]);

  const parsedValue = useMemo(() => {
    const currentValue = selectOptions.find(
      ({ value: optionValue }) => optionValue === value
    );

    return currentValue;
  }, [selectOptions, value]);

  return (
    <ReactSelect
      {...defaultProps}
      id={id || rest.htmlFor}
      value={parsedValue}
      activated={activated}
      error={Boolean(error)}
      onChange={changeHandler}
      inputProps={{ ...inputProps, ...baseInputProps }}
      isDisabled={disabled}
      options={selectOptions}
      placeholder={placeholder}
      styles={memoizedStyles}
      isSearchable={isSearchable}
      {...rest}
    />
  );
};
