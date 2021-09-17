import {
  ArrowChevronDownIcon,
  GamutIconProps,
  MiniChevronDownIcon,
} from '@codecademy/gamut-icons';
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

import { Box } from '../Box';
import { SelectComponentProps, SelectOptions } from './Select';
import {
  conditionalBorderStates,
  dropdownBorderStates,
  dropdownBorderStyles,
  optionBackground,
  placeholderColor,
  selectDropdownStyles,
  sizeVariants,
  textColor,
} from './styles';
import { parseOptions } from './utils';

export interface IconOption {
  label: string;
  value: string;
  icon?: React.ComponentType<GamutIconProps>;
}

export interface SelectDropdownSizes {
  size?: 'small' | 'medium';
}

type SelectDropdownBaseProps = Omit<
  SelectComponentProps,
  'onChange' | 'defaultValue' | 'options'
> &
  SelectDropdownSizes;

export type SelectDropdownOptions = SelectOptions | IconOption[];

interface SelectDropdownProps
  extends SelectDropdownBaseProps,
    Pick<NamedProps, 'onChange' | 'isSearchable' | 'onInputChange'>,
    Pick<SelectHTMLAttributes<HTMLSelectElement>, 'value' | 'disabled'> {
  inputProps?: Record<string, string | number | boolean>;
  name?: string;
  placeholder?: string;
  options?: SelectDropdownOptions;
  shownOptionsLimit?: 1 | 2 | 3 | 4 | 5 | 6;
}

const { DropdownIndicator, SelectContainer } = SelectDropdownElements;

export interface OptionStrict {
  label: string;
  value: string;
}

type CustomContainerProps = ContainerProps<OptionStrict, false> & {
  children?: ReactNode[];
};

const indicatorSizes = {
  small: {
    size: 12,
    icon: MiniChevronDownIcon,
  },
  medium: {
    size: 16,
    icon: ArrowChevronDownIcon,
  },
};

interface SizedIndicatorProps extends IndicatorProps<OptionTypeBase, false> {
  selectProps: SelectDropdownSizes;
}

const ChevronDropdown = (props: SizedIndicatorProps) => {
  const { size } = props.selectProps;
  const color = props.isDisabled ? 'text-disabled' : 'text';
  const { icon: IndicatorIcon, ...iconProps } = indicatorSizes[
    size ?? 'medium'
  ];

  return (
    <DropdownIndicator {...props}>
      <IndicatorIcon {...iconProps} color={color} />
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

const formatOptionLabel = ({ label, icon: Icon, size }: any) => {
  return (
    <Box display="flex" alignItems="center">
      {Icon && <Icon size={size === 'small' ? 16 : 24} color="text" ml={4} />}
      <Box as="span" pl={Icon ? 16 : 0}>
        {label}
      </Box>
    </Box>
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
  shownOptionsLimit = 6,
  size,
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
          ...sizeVariants({ size: state.selectProps.size, theme }),
          ...conditionalBorderStates({
            isFocused: state.isFocused,
            isDisabled: state.isDisabled,
            error: state.selectProps.error,
            activated: state.selectProps.activated,
            theme,
          }),
        };
      },

      dropdownIndicator: () => ({
        color: 'currentColor',
        display: 'flex',
        padding: '0',
        pointerEvents: 'none',
      }),

      input: () => ({
        ...textColor({ theme }),
        padding: '0',
        margin: '0',
      }),

      menu: (provided, state) => ({
        ...provided,
        ...dropdownBorderStyles({ theme }),
        ...dropdownBorderStates({ error: state.selectProps.error, theme }),
      }),

      menuList: (provided, state) => {
        const sizeInteger = state.selectProps.size === 'small' ? 2 : 3;
        const maxHeight = `${
          state.selectProps.shownOptionsLimit * sizeInteger
        }rem`;
        return {
          ...provided,
          maxHeight,
        };
      },

      placeholder: (provided) => ({
        ...provided,
        ...placeholderColor({ theme }),
      }),

      option: (provided, state) => ({
        padding: state.selectProps.size === 'small' ? '3px 14px' : '11px 14px',
        cursor: 'pointer',
        ...optionBackground(state.isSelected, state.isFocused)({ theme }),
      }),

      singleValue: () => ({
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
    return parseOptions({ options, id, size, type: 'dropdown' });
  }, [options, id, size]);

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
      formatOptionLabel={formatOptionLabel}
      onChange={changeHandler}
      inputProps={{ ...inputProps, ...baseInputProps }}
      isDisabled={disabled}
      options={selectOptions}
      placeholder={placeholder}
      styles={memoizedStyles}
      isSearchable={isSearchable}
      size={size}
      shownOptionsLimit={shownOptionsLimit}
      {...rest}
    />
  );
};
