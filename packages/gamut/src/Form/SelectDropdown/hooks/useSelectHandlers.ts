import { KeyboardEvent, useCallback, useEffect, useState } from 'react';
import * as React from 'react';
import { ActionMeta, Options as OptionsType } from 'react-select';

import { SelectOptionBase } from '../../utils';
import { ON_CHANGE_ACTION } from '../core/constants';
import {
  filterValueFromOptions,
  getCreatedOptionValue,
  isMultipleSelectProps,
  isOptionsGrouped,
  isSingleSelectProps,
  removeValueFromSelectedOptions,
} from '../core/utils';
import {
  MultiSelectDropdownProps,
  OptionStrict,
  SelectDropdownGroup,
  SelectDropdownProps,
  SingleSelectDropdownProps,
} from '../types';

interface UseSelectHandlersArgs {
  onChange?:
    | SingleSelectDropdownProps['onChange']
    | MultiSelectDropdownProps['onChange'];
  multiple?: boolean;
  onCreateOption?: (inputValue: string) => void;
  selectOptions: SelectOptionBase[] | SelectDropdownGroup[];
  value?: SelectDropdownProps['value'];
  currentFocusedValue: unknown;
  removeAllButtonRef: React.MutableRefObject<HTMLDivElement | null>;
}

interface UseSelectHandlersReturn {
  activated: boolean;
  multiValues: OptionStrict[] | false;
  changeHandler: (
    optionEvent: OptionStrict | OptionsType<OptionStrict>,
    actionMeta: ActionMeta<OptionStrict>
  ) => void;
  keyPressHandler: (e: KeyboardEvent<HTMLDivElement>) => void;
}

export const useSelectHandlers = ({
  onChange,
  multiple,
  onCreateOption,
  selectOptions,
  value,
  currentFocusedValue,
  removeAllButtonRef,
}: UseSelectHandlersArgs): UseSelectHandlersReturn => {
  const [activated, setActivated] = useState(false);
  const [multiValues, setMultiValues] = useState(
    multiple &&
      filterValueFromOptions(
        selectOptions,
        value,
        isOptionsGrouped(selectOptions)
      )
  );

  // Sync multi-select value from props when controlled (`value` is a string[]).
  // Uncontrolled multi (`value` undefined or '') keeps selection in local state.
  useEffect(() => {
    if (!multiple || !Array.isArray(value)) return;

    const newMultiValues = filterValueFromOptions(
      selectOptions,
      value,
      isOptionsGrouped(selectOptions)
    );
    if (newMultiValues !== multiValues) setMultiValues(newMultiValues);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectOptions, value, multiple]);

  const changeHandler = useCallback(
    (
      optionEvent: OptionStrict | OptionsType<OptionStrict>,
      actionMeta: ActionMeta<OptionStrict>
    ) => {
      setActivated(true);

      if (actionMeta.action === 'create-option') {
        const createdValue = getCreatedOptionValue(
          optionEvent,
          actionMeta,
          multiple
        );
        if (createdValue) onCreateOption?.(createdValue);
      }

      const onChangeProps = { onChange, multiple };
      const forwardedMeta: ActionMeta<OptionStrict> =
        actionMeta.action === 'create-option'
          ? actionMeta
          : {
              action: ON_CHANGE_ACTION,
              option: isMultipleSelectProps(onChangeProps)
                ? undefined
                : (optionEvent as OptionStrict),
            };

      if (isSingleSelectProps(onChangeProps)) {
        onChangeProps.onChange?.(optionEvent as OptionStrict, forwardedMeta);
      }

      if (isMultipleSelectProps(onChangeProps)) {
        setMultiValues(optionEvent as OptionStrict[]);
        onChangeProps.onChange?.(
          optionEvent as OptionsType<OptionStrict>,
          forwardedMeta
        );
      }
    },
    [onChange, multiple, onCreateOption]
  );

  const keyPressHandler = (e: KeyboardEvent<HTMLDivElement>) => {
    if (multiple && e.key === 'Enter' && currentFocusedValue && multiValues) {
      const newMultiValues = removeValueFromSelectedOptions(
        multiValues,
        currentFocusedValue as SelectDropdownProps['value']
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

  return { activated, multiValues, changeHandler, keyPressHandler };
};
