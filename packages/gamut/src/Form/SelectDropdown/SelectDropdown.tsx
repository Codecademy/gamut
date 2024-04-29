import { useTheme } from '@emotion/react';
import { useId } from '@reach/auto-id';
import {
  KeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import * as React from 'react';
import { Options as OptionsType, StylesConfig } from 'react-select';

import { getMemoizedStyles } from '../styles';
import { parseOptions } from '../utils';
import {
  CustomContainer,
  DropdownButton,
  formatGroupLabel,
  formatOptionLabel,
  MultiValueRemoveButton,
  MultiValueWithColorMode,
  onFocus,
  RemoveAllButton,
  SelectDropdownContext,
  SelectDropdownOption,
  TypedReactSelect,
} from './elements';
import { ExtendedOption, OptionStrict, SelectDropdownProps } from './types';
import {
  filterValueFromOptions,
  isMultipleSelectProps,
  isOptionGroup,
  isSingleSelectProps,
  removeValueFromSelectedOptions,
} from './utils';

const defaultProps = {
  name: undefined,
  components: {
    DropdownIndicator: DropdownButton,
    IndicatorSeparator: () => null,
    ClearIndicator: RemoveAllButton,
    SelectContainer: CustomContainer,
    MultiValue: MultiValueWithColorMode,
    MultiValueRemove: MultiValueRemoveButton,
    Option: SelectDropdownOption,
  },
};

const onChangeAction = 'select-option';

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
  const rawInputId = useId();
  const inputId = name ?? `${id}-select-dropdown-${rawInputId}`;

  const [activated, setActivated] = useState(false);
  const [currentFocusedValue, setCurrentFocusedValue] = useState(undefined);

  // these are used to programatically manage the focus state of our multi-select options + 'Remove all' button
  const removeAllButtonRef = useRef<HTMLDivElement>(null);
  const selectInputRef = useRef<HTMLDivElement>(null);
  const [highlightedOption, setHighlightedOption] = useState('');

  const optionsAreGrouped = useMemo(() => {
    if (options?.length) {
      return (options as any)?.some((option: any) => isOptionGroup(option));
    }
    return false;
  }, [options]);

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

  useEffect(() => {
    if (inputId) {
      const inputelemet = document.getElementById(inputId);
      inputelemet?.setAttribute('aria-activedescendant', highlightedOption);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [highlightedOption]);

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

  const keyPressHandler = (e: KeyboardEvent<HTMLDivElement>) => {
    if (multiple && e.key === 'Enter' && currentFocusedValue && multiValues) {
      const newMultiValues = removeValueFromSelectedOptions(
        multiValues,
        currentFocusedValue
      );

      if (newMultiValues !== multiValues) setMultiValues(newMultiValues);
    }
    if (
      removeAllButtonRef.current !== null &&
      e.key === 'ArrowRight' &&
      multiValues &&
      currentFocusedValue === multiValues[multiValues.length - 1].value
    ) {
      removeAllButtonRef.current.focus();
    }
  };

  const theme = useTheme();
  const memoizedStyles = useMemo((): StylesConfig<any, false> => {
    return getMemoizedStyles(theme);
  }, [theme]);

  return (
    <SelectDropdownContext.Provider
      value={{
        currentFocusedValue,
        setCurrentFocusedValue,
        removeAllButtonRef,
        selectInputRef,
        highlightedOption,
        setHighlightedOption,
      }}
    >
      <TypedReactSelect
        {...defaultProps}
        activated={activated}
        error={Boolean(error)}
        ariaLiveMessages={{
          onFocus,
        }}
        formatGroupLabel={formatGroupLabel}
        formatOptionLabel={formatOptionLabel}
        id={id || rest.htmlFor || rawInputId}
        inputId={inputId}
        inputProps={{ ...inputProps, name }}
        isDisabled={disabled}
        isMulti={multiple}
        isOptionDisabled={(option) => option.disabled}
        isSearchable={isSearchable}
        name={name}
        onChange={changeHandler}
        onKeyDown={multiple ? (e) => keyPressHandler(e) : undefined}
        options={selectOptions}
        placeholder={placeholder}
        shownOptionsLimit={shownOptionsLimit}
        size={size}
        styles={memoizedStyles}
        value={multiple ? multiValues : parsedValue}
        selectRef={selectInputRef}
        {...rest}
      />
    </SelectDropdownContext.Provider>
  );
};
