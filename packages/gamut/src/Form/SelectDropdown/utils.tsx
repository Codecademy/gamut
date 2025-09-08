import { SelectOptionBase } from '../utils';
import {
  BaseOnChangeProps,
  ExtendedOption,
  MultiSelectDropdownProps,
  SelectDropdownGroup,
  SelectDropdownProps,
  SingleSelectDropdownProps,
} from './types';

export const isMultipleSelectProps = (
  props: BaseOnChangeProps
): props is MultiSelectDropdownProps => !!props.multiple;

export const isSingleSelectProps = (
  props: BaseOnChangeProps
): props is SingleSelectDropdownProps => !props.multiple;

export const isOptionGroup = (obj: any): obj is SelectDropdownGroup =>
  obj != null && typeof obj === 'object' && obj.options !== undefined;

export const isOptionsGrouped = (
  options: any
): options is SelectDropdownGroup[] =>
  Array.isArray(options) && options.some((option) => isOptionGroup(option));

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
