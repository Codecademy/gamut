import { createContext } from 'react';
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
 * Custom Input component that passes combobox props to the react-select input.
 * This allows data-* attributes and other props to be applied to the visible input element.
 */
export const CustomInput = ({
  ...rest
}: CustomSelectComponentProps<typeof SelectDropdownElements.Input>) => {
  const { inputProps } = rest.selectProps;
  const comboboxProps = inputProps?.combobox || {};

  return <SelectDropdownElements.Input {...comboboxProps} {...rest} />;
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
