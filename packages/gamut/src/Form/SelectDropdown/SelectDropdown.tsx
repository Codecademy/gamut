import { useTheme } from '@emotion/react';
import {
  KeyboardEvent,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import * as React from 'react';
import {
  InputActionMeta,
  Options as OptionsType,
  StylesConfig,
} from 'react-select';

import { parseOptions, SelectOptionBase } from '../utils';
import {
  AbbreviatedSingleValue,
  CustomContainer,
  CustomInput,
  CustomValueContainer,
  DropdownButton,
  formatGroupLabel,
  formatOptionLabel,
  IconOption,
  MultiValueRemoveButton,
  MultiValueWithColorMode,
  onFocus,
  RemoveAllButton,
  SelectDropdownContext,
  TypedReactSelect,
} from './elements';
import { getMemoizedStyles } from './styles';
import {
  OptionStrict,
  SelectDropdownGroup,
  SelectDropdownProps,
} from './types';
import {
  filterValueFromOptions,
  isMultipleSelectProps,
  isOptionsGrouped,
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
    ValueContainer: CustomValueContainer,
    MultiValue: MultiValueWithColorMode,
    MultiValueRemove: MultiValueRemoveButton,
    Option: IconOption,
    SingleValue: AbbreviatedSingleValue,
    Input: CustomInput,
  },
};
const onChangeAction = 'select-option';

/**
 * A flexible dropdown select component built on top of react-select.
 *
 * Supports both single and multi-select modes with customizable options including
 * icons, subtitles, right labels, and abbreviations. The component provides
 * accessibility features, keyboard navigation, and responsive styling.
 *
 * @example
 * ```tsx
 * // Basic single select
 * <SelectDropdown
 *   name="country"
 *   options={[
 *     { label: 'United States', value: 'us' },
 *     { label: 'Canada', value: 'ca' }
 *   ]}
 *   onChange={(option) => console.log(option)}
 * />
 *
 * // Multi-select with icons
 * <SelectDropdown
 *   name="skills"
 *   multiple
 *   options={[
 *     { label: 'React', value: 'react', icon: ReactIcon },
 *     { label: 'TypeScript', value: 'ts', icon: TypeScriptIcon }
 *   ]}
 *   onChange={(options) => console.log(options)}
 * />
 *
 * // Grouped options with extended features
 * <SelectDropdown
 *   name="category"
 *   placeholder="Default placeholder text"
 *   options={[
 *     {
 *       label: 'Frontend',
 *       options: [
 *         { label: 'React', value: 'react', subtitle: 'UI Library' },
 *         { label: 'Vue', value: 'vue', subtitle: 'Progressive Framework' }
 *       ]
 *     }
 *   ]}
 * />
 * ```
 */
export const SelectDropdown: React.FC<SelectDropdownProps> = ({
  disabled,
  dropdownWidth,
  error,
  formatCreateLabel = (inputValue: string) => `Add "${inputValue}"`,
  id,
  inputProps,
  inputWidth,
  isCreatable = false,
  isSearchable: isSearchableProp = false,
  isValidNewOption,
  menuAlignment = 'left',
  multiple,
  name,
  onChange,
  onCreateOption,
  onInputChange,
  options,
  placeholder = 'Select an option',
  shownOptionsLimit = 6,
  size,
  validationMessage,
  value,
  zIndex,
  ...rest
}) => {
  // isSearchable is forced true when isCreatable is true (CreatableSelect requires a text input)
  const isSearchable = isCreatable || isSearchableProp;
  const rawInputId = useId();
  const inputId = name ?? `${id}-select-dropdown-${rawInputId}`;

  const [activated, setActivated] = useState(false);
  const [currentFocusedValue, setCurrentFocusedValue] = useState(undefined);
  // Controlled input value for creatable mode so typed text persists across
  // blur / menu-close (react-select clears it by default).
  const [inputValue, setInputValue] = useState('');

  // these are used to programatically manage the focus state of our multi-select options + 'Remove all' button
  const removeAllButtonRef = useRef<HTMLDivElement>(null);
  const selectInputRef = useRef<HTMLDivElement>(null);

  const selectOptions = useMemo(():
    | SelectOptionBase[]
    | SelectDropdownGroup[] => {
    if (
      !options ||
      (Array.isArray(options) && !options.length) ||
      (typeof options === 'object' &&
        !Array.isArray(options) &&
        Object.keys(options).length === 0)
    ) {
      return [];
    }

    if (isOptionsGrouped(options)) {
      return options;
    }

    return parseOptions({ options, id, size });
  }, [options, id, size]);

  const parsedValue = useMemo(() => {
    if (isOptionsGrouped(selectOptions)) {
      for (const group of selectOptions) {
        if (group.options) {
          const foundOption = group.options.find(
            (option) => option.value === value
          );
          if (foundOption) return foundOption;
        }
      }
      return undefined;
    }

    return selectOptions.find((option) => option.value === value);
  }, [selectOptions, value]);

  const [multiValues, setMultiValues] = useState(
    multiple && // To keep this efficient for non-multiSelect
      filterValueFromOptions(
        selectOptions,
        value,
        isOptionsGrouped(selectOptions)
      )
  );

  // If the caller changes the initial value, let's update our value to match.
  useEffect(() => {
    const newMultiValues = filterValueFromOptions(
      selectOptions,
      value,
      isOptionsGrouped(selectOptions)
    );
    if (newMultiValues !== multiValues) setMultiValues(newMultiValues);

    // We only update this when our passed in options or value changes, not multiValues.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options, value]);

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

  const handleInputChange = useCallback(
    (newValue: string, actionMeta: InputActionMeta) => {
      if (isCreatable) {
        /* Keep typed text instead of letting react-select clear it on blur /
           menu-close. Since the value didn't actually change, we also skip
           forwarding these to the consumer so derived state (e.g. validation
           errors) isn't reset against an empty value. 'set-value' (after
           selecting/creating) still clears and forwards as normal. */
        if (
          actionMeta.action === 'input-blur' ||
          actionMeta.action === 'menu-close'
        ) {
          return;
        }
        setInputValue(newValue);
      }
      onInputChange?.(newValue, actionMeta);
    },
    [isCreatable, onInputChange]
  );

  const noOptionsMessage =
    validationMessage === undefined
      ? undefined // fall back to react-select default ("No options")
      : typeof validationMessage === 'function'
      ? (validationMessage as (obj: { inputValue: string }) => React.ReactNode)
      : () => validationMessage;

  const theme = useTheme();
  const memoizedStyles = useMemo((): StylesConfig<any, false> => {
    return getMemoizedStyles(theme, zIndex);
  }, [theme, zIndex]);

  return (
    <SelectDropdownContext.Provider
      value={{
        currentFocusedValue,
        setCurrentFocusedValue,
        removeAllButtonRef,
        selectInputRef,
      }}
    >
      <TypedReactSelect
        {...defaultProps}
        activated={activated}
        aria-live="assertive"
        ariaLiveMessages={{
          onFocus,
        }}
        dropdownWidth={dropdownWidth}
        error={Boolean(error)}
        formatCreateLabel={formatCreateLabel}
        formatGroupLabel={formatGroupLabel}
        formatOptionLabel={formatOptionLabel}
        id={id || rest.htmlFor || rawInputId}
        inputId={inputId}
        inputProps={{ ...inputProps }}
        inputValue={isCreatable ? inputValue : undefined}
        inputWidth={inputWidth}
        isCreatable={isCreatable}
        isDisabled={disabled}
        isMulti={multiple}
        isOptionDisabled={(option) => option.disabled}
        isSearchable={isSearchable}
        isValidNewOption={isValidNewOption}
        menuAlignment={menuAlignment}
        name={name}
        noOptionsMessage={noOptionsMessage}
        options={selectOptions}
        placeholder={placeholder}
        selectRef={selectInputRef}
        shownOptionsLimit={shownOptionsLimit}
        size={size}
        styles={memoizedStyles}
        value={multiple ? multiValues : parsedValue}
        onChange={changeHandler}
        onCreateOption={onCreateOption}
        onInputChange={handleInputChange}
        onKeyDown={multiple ? (e) => keyPressHandler(e) : undefined}
        {...rest}
      />
    </SelectDropdownContext.Provider>
  );
};
