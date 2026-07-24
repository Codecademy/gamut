import { screenReaderOnly } from '@codecademy/gamut-styles';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { useId, useMemo, useRef, useState } from 'react';
import * as React from 'react';
import { StylesConfig } from 'react-select';

import { onFocus } from './core/accessibility';
import { getDefaultComponents } from './core/constants';
import { getMemoizedStyles } from './core/styles';
import { resolveNoOptionsMessage } from './core/utils';
import {
  formatGroupLabel,
  formatOptionLabel,
  SelectDropdownContext,
  TypedReactSelect,
} from './elements';
import { useNoOptionsAnnouncement } from './hooks/useNoOptionsAnnouncement';
import { useSelectHandlers } from './hooks/useSelectHandlers';
import { useSelectOptions } from './hooks/useSelectOptions';
import { SelectDropdownProps } from './types';

/** Announces the custom `validationMessage` menu text - see `useNoOptionsAnnouncement`. */
const NoOptionsLiveRegion = styled.div(screenReaderOnly);

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
  const inputId = name ?? `${id ?? rawInputId}-select-dropdown-${rawInputId}`;

  const removeAllButtonRef = useRef<HTMLDivElement>(null);
  const selectInputRef = useRef<HTMLDivElement>(null);

  const [currentFocusedValue, setCurrentFocusedValue] = useState(undefined);

  const { selectOptions, parsedValue } = useSelectOptions({
    options,
    id,
    size,
    value: value as string | string[] | undefined,
  });

  const noOptionsMessage = resolveNoOptionsMessage(validationMessage);
  const { noOptionsMessageComponent, announcement, announcementKey } =
    useNoOptionsAnnouncement();
  const components = useMemo(
    () => getDefaultComponents(noOptionsMessageComponent),
    [noOptionsMessageComponent]
  );

  const { activated, multiValues, changeHandler, keyPressHandler } =
    useSelectHandlers({
      onChange,
      multiple,
      onCreateOption,
      selectOptions,
      value,
      currentFocusedValue,
      removeAllButtonRef,
    });

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
        activated={activated}
        aria-live="assertive"
        ariaLiveMessages={{ onFocus }}
        components={components}
        dropdownWidth={dropdownWidth}
        error={Boolean(error)}
        formatCreateLabel={formatCreateLabel}
        formatGroupLabel={formatGroupLabel}
        formatOptionLabel={formatOptionLabel}
        id={id || rest.htmlFor || rawInputId}
        inputId={inputId}
        inputProps={{ ...inputProps }}
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
        onInputChange={onInputChange}
        onKeyDown={multiple ? keyPressHandler : undefined}
        {...rest}
      />
      <NoOptionsLiveRegion
        aria-live="polite"
        key={announcementKey}
        role="status"
      >
        {announcement}
      </NoOptionsLiveRegion>
    </SelectDropdownContext.Provider>
  );
};
