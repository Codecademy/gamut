import { SelectOptionBase } from '../utils';
import {
  BaseOnChangeProps,
  ExtendedOption,
  MultiSelectDropdownProps,
  SelectDropdownGroup,
  SelectDropdownOptions,
  SelectDropdownProps,
  SingleSelectDropdownProps,
} from './types';

export const isMultipleSelectProps = (
  props: BaseOnChangeProps
): props is MultiSelectDropdownProps => !!props.multiple;

export const isSingleSelectProps = (
  props: BaseOnChangeProps
): props is SingleSelectDropdownProps => !props.multiple;

export const isOptionGroup = (obj: unknown): obj is SelectDropdownGroup =>
  obj != null &&
  typeof obj === 'object' &&
  'options' in obj &&
  obj.options !== undefined;

export const isOptionsGrouped = (
  options: SelectDropdownOptions
): options is SelectDropdownGroup[] =>
  Array.isArray(options) && options.some((option) => isOptionGroup(option));

/**
 * Filters options based on the selected value(s).
 * Handles both single values and arrays of values, and works with both
 * flat option arrays and grouped options.
 *
 * @param options - The options to filter from
 * @param value - The value or values to filter by
 * @param optionsAreGrouped - Whether the options are grouped
 * @returns Array of matching options
 */
export const filterValueFromOptions = (
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

/**
 * Removes a value from the selected options array.
 * Handles both single values and arrays of values to remove.
 *
 * @param selectedOptions - The currently selected options
 * @param value - The value or values to remove
 * @returns New array with the specified values removed
 */
export const removeValueFromSelectedOptions = (
  selectedOptions: ExtendedOption[] | SelectOptionBase[],
  value: SelectDropdownProps['value']
) => {
  return (selectedOptions as SelectOptionBase[]).filter(
    (option: SelectOptionBase) => {
      if (Array.isArray(value)) {
        return !value.includes(option.value);
      }
      return option.value !== value;
    }
  );
};
