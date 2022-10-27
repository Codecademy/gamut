import { SelectOptionBase } from '../utils';
import {
  BaseOnChangeProps,
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
  obj.options !== undefined;

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
