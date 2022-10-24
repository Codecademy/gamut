import { useTheme } from '@emotion/react';
import { useId } from '@reach/auto-id';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Options as OptionsType, StylesConfig } from 'react-select';

import { getMemoizedStyles } from '../styles';
import { parseOptions, SelectOptionBase } from '../utils';
import {
  CustomContainer,
  DropdownButton,
  formatGroupLabel,
  formatOptionLabel,
  MultiValueRemoveButton,
  MultiValueWithColorMode,
  TypedReactSelect,
} from './elements';
import {
  BaseOnChangeProps,
  ExtendedOption,
  MultiSelectDropdownProps,
  OptionStrict,
  SelectDropdownGroup,
  SelectDropdownProps,
  SingleSelectDropdownProps,
} from './types';

const isMultipleSelectProps = (
  props: BaseOnChangeProps
): props is MultiSelectDropdownProps => !!props.multiple;

const isSingleSelectProps = (
  props: BaseOnChangeProps
): props is SingleSelectDropdownProps => !props.multiple;

const defaultProps = {
  name: undefined,
  components: {
    DropdownIndicator: DropdownButton,
    IndicatorSeparator: () => null,
    SelectContainer: CustomContainer,
    MultiValue: MultiValueWithColorMode,
    MultiValueRemove: MultiValueRemoveButton,
  },
};

const onChangeAction = 'select-option';

const isOptionGroup = (obj: any): obj is SelectDropdownGroup =>
  obj.options !== undefined;

const filterValueFromOptions = (
  options: SelectOptionBase[] | SelectDropdownGroup[],
  value: SelectDropdownProps['value'],
  optionsAreGrouped: boolean
) => {
  if (optionsAreGrouped) {
    return (options as SelectDropdownGroup[])
      .map((optionGroup) =>
        optionGroup.options.filter(
          (option) =>
            option.value === value ||
            (value as string[])?.includes(option.value)
        )
      )
      .flat();
  }
  return (options as SelectOptionBase[]).filter(
    (option: SelectOptionBase) =>
      option.value === value || (value as string[])?.includes(option.value)
  );
};

export const SelectDropdown: React.FC<SelectDropdownProps> = ({
  options,
  id,
  size,
  error,
  disabled,
  onChange,
  value,
  name,
  placeholder = 'Select an option',
  inputProps,
  multiple,
  isSearchable = false,
  shownOptionsLimit = 6,
  ...rest
}) => {
  /**
   * Currently the `id` prop isn't required, though in the future, it should be (or we should use
   * React 18: https://github.com/reactwg/react-18/discussions/111), to help enforce the ReactSelect
   * id requirement
   */
  const rawInputId = useId();
  const inputId = name ?? `${id}-select-dropdown-${rawInputId}`;
  const optionsAreGrouped = useMemo(() => {
    if (options?.length) {
      return (options as any)?.some((option: any) => isOptionGroup(option));
    }
    return false;
  }, [options]);

  const [activated, setActivated] = useState(false);

  const selectOptions = useMemo(() => {
    return parseOptions({ options: options as ExtendedOption[], id, size });
  }, [options, id, size]);

  const parsedValue = useMemo(
    () => selectOptions.find((option) => option.value === value),
    [selectOptions, value]
  );

  const [multiValues, setMultiValues] = useState(
    multiple && // To keep this efficient for non-multiSelect
      filterValueFromOptions(selectOptions, value, optionsAreGrouped)
  );

  // If the caller changes the initial value, let's update our value to match.
  useEffect(() => {
    const newMultiValues = filterValueFromOptions(
      selectOptions,
      value,
      optionsAreGrouped
    );
    if (newMultiValues !== multiValues) setMultiValues(newMultiValues);

    // For now, only handle the "change the value" case.
    // Changing the options can be looked into when this component is fleshed out (GM-354)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const changeHandler = useCallback(
    (optionEvent: OptionStrict | OptionsType<OptionStrict>) => {
      setActivated(true);

      // We have to do this because the version of typescript we have doesn't have the transitivity of these type guards yet. But, we will soon!
      // Should probably come with: https://codecademy.atlassian.net/browse/GM-354
      const onChangeProps = { onChange, multiple };

      if (isSingleSelectProps(onChangeProps)) {
        const singleOptionEvent = optionEvent as OptionStrict;

        onChangeProps.onChange?.(singleOptionEvent, {
          action: onChangeAction,
          option: singleOptionEvent,
        });
      }

      if (isMultipleSelectProps(onChangeProps)) {
        setMultiValues(optionEvent as OptionStrict[]);

        onChangeProps.onChange?.(optionEvent as OptionsType<OptionStrict>, {
          action: onChangeAction,
          option: undefined, // At the moment this isn't used, but when multi select is built for real, boom (https://codecademy.atlassian.net/browse/GM-354)
        });
      }
    },
    [onChange, multiple]
  );

  const theme = useTheme();
  const memoizedStyles = useMemo((): StylesConfig<any, false> => {
    return getMemoizedStyles(theme);
  }, [theme]);

  return (
    <TypedReactSelect
      {...defaultProps}
      id={id || rest.htmlFor}
      inputId={inputId}
      name={name}
      options={selectOptions}
      value={multiple ? multiValues : parsedValue}
      activated={activated}
      error={Boolean(error)}
      formatOptionLabel={formatOptionLabel}
      onChange={changeHandler}
      inputProps={{ ...inputProps, name }}
      placeholder={placeholder}
      styles={memoizedStyles}
      isMulti={multiple}
      isOptionDisabled={(option) => option.disabled}
      isDisabled={disabled}
      isSearchable={isSearchable}
      size={size}
      shownOptionsLimit={shownOptionsLimit}
      formatGroupLabel={formatGroupLabel}
      {...rest}
    />
  );
};
