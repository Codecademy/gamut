import {
  AbbreviatedSingleValue,
  CustomContainer,
  CustomInput,
  CustomValueContainer,
  DropdownButton,
  IconOption,
  MultiValueRemoveButton,
  MultiValueWithColorMode,
  RemoveAllButton,
} from '../elements';

export const defaultComponents = {
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
};

export const ON_CHANGE_ACTION = 'select-option' as const;
