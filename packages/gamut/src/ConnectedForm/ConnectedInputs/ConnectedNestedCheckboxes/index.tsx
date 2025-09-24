import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { Controller } from 'react-hook-form';

import { Box } from '../../..';
import { useField } from '../..';
import { ConnectedNestedCheckboxesProps } from '../types';
import {
  calculateStates,
  flattenOptions,
  getAllDescendants,
  handleCheckboxChange,
  renderCheckbox,
} from './utils';

export const ConnectedNestedCheckboxes: React.FC<
  ConnectedNestedCheckboxesProps
> = ({ name, options, disabled, onUpdate, spacing }) => {
  const { isDisabled, control, validation, isRequired, getValues, setValue } =
    useField({
      name,
      disabled,
    });

  const defaultValue: string[] = getValues()[name];

  const optionsWithSpacing = options.map((option) => ({
    ...option,
    spacing,
  }));

  const flatOptions = useMemo(
    () => flattenOptions(optionsWithSpacing),
    [optionsWithSpacing]
  );

  const [hasExpandedInitially, setHasExpandedInitially] = useState(false);

  useEffect(() => {
    if (hasExpandedInitially || !defaultValue || defaultValue.length === 0)
      return;

    const expandedValues = [...defaultValue];
    defaultValue.forEach((value) =>
      expandedValues.push(...getAllDescendants(value, flatOptions))
    );

    setValue(name, expandedValues);
    onUpdate?.(expandedValues); // do we want to do this?
    setHasExpandedInitially(true);
  }, [
    hasExpandedInitially,
    flatOptions,
    setValue,
    defaultValue,
    name,
    onUpdate,
  ]);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value = [], onChange, onBlur, ref } }) => (
        <Box as="ul" m={0} p={0}>
          {flatOptions.map((option) => {
            const states = calculateStates(value, flatOptions);
            const state = states.get(option.value)!;
            return renderCheckbox(
              option,
              state,
              `${name}-${option.value}`,
              isRequired,
              isDisabled,
              onBlur,
              (event) => {
                handleCheckboxChange(
                  option,
                  event.target.checked,
                  value,
                  flatOptions,
                  onChange,
                  onUpdate
                );
              },
              ref
            );
          })}
        </Box>
      )}
      rules={validation}
    />
  );
};
