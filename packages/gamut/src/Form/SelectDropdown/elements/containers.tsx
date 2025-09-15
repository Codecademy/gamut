import { createContext, useLayoutEffect } from 'react';
import ReactSelect, {
  components as SelectDropdownElements,
  GroupBase,
  Props,
} from 'react-select';

import {
  CustomSelectComponentProps,
  SelectDropdownContextValueTypes,
  TypedReactSelectProps,
} from '../types';

/**
 * React context for sharing state between SelectDropdown components.
 * Provides access to focus state and refs for keyboard navigation.
 */
export const SelectDropdownContext =
  createContext<SelectDropdownContextValueTypes>({
    currentFocusedValue: undefined,
    setCurrentFocusedValue: undefined,
    selectInputRef: undefined,
    removeAllButtonRef: undefined,
  });

/**
 * Custom container component that adds a hidden input for form submission.
 * Renders the selected values as a comma-separated string in the hidden input.
 */
export const CustomContainer = ({
  children,
  ...rest
}: CustomSelectComponentProps<
  typeof SelectDropdownElements.SelectContainer
>) => {
  const { inputProps, name } = rest.selectProps;
  const hiddenProps = inputProps?.hidden || {};
  const hasHiddenProps =
    inputProps?.hidden && Object.keys(inputProps.hidden).length > 0;

  const value = rest.hasValue
    ? rest
        .getValue()
        .map(({ value }) => value)
        .join(', ')
    : '';

  return (
    <SelectDropdownElements.SelectContainer {...rest}>
      {children}
      {hasHiddenProps && (
        <input name={name} type="hidden" value={value} {...hiddenProps} />
      )}
    </SelectDropdownElements.SelectContainer>
  );
};

/**
 * Custom ValueContainer component that applies combobox props when isSearchable is false.
 * When isSearchable is false, react-select renders a dummy input (div) that doesn't accept
 * custom props, so we apply the combobox data attributes to the ValueContainer's innerProps.
 */
export const CustomValueContainer = ({
  ...rest
}: CustomSelectComponentProps<
  typeof SelectDropdownElements.ValueContainer
>) => {
  const { inputProps, isSearchable } = rest.selectProps;
  const comboboxProps = inputProps?.combobox || {};

  useLayoutEffect(() => {
    if (isSearchable === false && Object.keys(comboboxProps).length > 0) {
      // Find the input element by inputId since we can't use a ref on ValueContainer
      const { inputId } = rest.selectProps;
      if (inputId) {
        const inputElement = document.getElementById(inputId);
        if (inputElement && inputElement.getAttribute('role') === 'combobox') {
          Object.entries(comboboxProps).forEach(([key, value]) => {
            inputElement.setAttribute(key, value);
          });
        }
      }
    }
    // We only want to run this effect when isSearchable or comboboxProps change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSearchable, comboboxProps, rest.selectProps.inputId]);

  // When isSearchable is false, apply combobox props to ValueContainer's innerProps
  // since the dummy input doesn't accept custom props
  if (isSearchable === false && Object.keys(comboboxProps).length > 0) {
    const { innerProps, ...otherProps } = rest;
    const mergedInnerProps = { ...innerProps, ...comboboxProps };

    return (
      <SelectDropdownElements.ValueContainer
        {...otherProps}
        innerProps={mergedInnerProps}
      />
    );
  }

  return <SelectDropdownElements.ValueContainer {...rest} />;
};

/**
 * Custom Input component that passes combobox props to the react-select input.
 * This allows data-* attributes and other props to be applied to the visible input element.
 * Works for both searchable and non-searchable modes by using the react-select Input component.
 */
export const CustomInput = ({
  ...rest
}: CustomSelectComponentProps<typeof SelectDropdownElements.Input>) => {
  const { inputProps } = rest.selectProps;
  const comboboxProps = inputProps?.combobox || {};

  const mergedProps = { ...rest, ...comboboxProps };

  return <SelectDropdownElements.Input {...mergedProps} />;
};

/**
 * Typed wrapper around react-select component.
 * Provides type safety for the underlying react-select implementation.
 */
export function TypedReactSelect<
  OptionType,
  IsMulti extends boolean = false,
  GroupType extends GroupBase<OptionType> = GroupBase<OptionType>
>({
  selectRef,
  ...props
}: Props<OptionType, IsMulti, GroupType> & TypedReactSelectProps) {
  return <ReactSelect {...props} ref={selectRef} />;
}
