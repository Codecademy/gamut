import { ComponentType } from 'react';

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

const baseDefaultComponents = {
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

/**
 * Builds the react-select `components` override map, optionally including a
 * `NoOptionsMessage` override. Callers must memoize the result (e.g. via
 * `useMemo`) - react-select treats a new `components` object identity as a
 * reason to remount its internals.
 */
export const getDefaultComponents = (
  noOptionsMessage?: ComponentType<any>
) => ({
  ...baseDefaultComponents,
  ...(noOptionsMessage && { NoOptionsMessage: noOptionsMessage }),
});

export const ON_CHANGE_ACTION = 'select-option' as const;
