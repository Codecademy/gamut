import { MiniDeleteIcon } from '@codecademy/gamut-icons';
import { useContext } from 'react';
import {
  components as SelectDropdownElements,
  GroupBase,
  MultiValueProps,
  MultiValueRemoveProps,
} from 'react-select';

import { ExtendedOption } from '../types';
import { SelectDropdownContext } from './containers';

const { MultiValue, MultiValueRemove } = SelectDropdownElements;

/**
 * Custom multi-value component that manages focus state for keyboard navigation.
 * Tracks which multi-value is currently focused and updates the context accordingly.
 */
export const MultiValueWithColorMode = (
  props: MultiValueProps<ExtendedOption, true, GroupBase<ExtendedOption>>
) => {
  const { currentFocusedValue, setCurrentFocusedValue } = useContext(
    SelectDropdownContext
  );

  const { data } = props;

  const { value, label } = data;

  if (
    props.isFocused &&
    setCurrentFocusedValue &&
    currentFocusedValue !== value
  ) {
    setCurrentFocusedValue(value);
  }

  if (
    !props.isFocused &&
    setCurrentFocusedValue &&
    currentFocusedValue === value
  ) {
    setCurrentFocusedValue(undefined);
  }
  const displayText = data?.abbreviation ? data.abbreviation : label || '';

  return <MultiValue {...props}>{displayText}</MultiValue>;
};

/**
 * Custom remove button for multi-value items.
 * Provides accessible removal functionality with proper ARIA labels.
 */
export const MultiValueRemoveButton = (
  props: MultiValueRemoveProps<ExtendedOption, true, GroupBase<ExtendedOption>>
) => {
  const { label } = props?.data ?? { label: '' };

  props.innerProps['aria-label'] = `Remove ${label}`;

  return (
    <MultiValueRemove {...props}>
      <MiniDeleteIcon size={12} />
    </MultiValueRemove>
  );
};
