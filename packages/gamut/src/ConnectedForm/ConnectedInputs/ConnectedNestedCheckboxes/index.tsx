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

  const flatOptions = useMemo(() => flattenOptions(options), [options]);

  const [hasExpandedInitially, setHasExpandedInitially] = useState(false);

  useEffect(() => {
    if (hasExpandedInitially || !defaultValue || defaultValue.length === 0)
      return;

    const expandedValues = [...defaultValue];
    defaultValue.forEach((value) =>
      expandedValues.push(...getAllDescendants(value, flatOptions))
    );

    setValue(name, expandedValues);
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
      render={({ field: { value = [], onChange, onBlur, ref } }) => {
        const states = calculateStates(value, flatOptions);
        return (
          <Box as="ul" m={0} p={0}>
            {flatOptions.map((option) => {
              const state = states.get(option.value)!;
              return renderCheckbox({
                option: { ...option, spacing },
                state,
                checkboxId: `${name}-${option.value}`,
                isRequired,
                isDisabled,
                onBlur,
                onChange: (event) => {
                  handleCheckboxChange({
                    option,
                    isChecked: event.target.checked,
                    selectedValues: value,
                    flatOptions,
                    onChange,
                    onUpdate,
                  });
                },
                ref,
                namePrefix: name,
              });
            })}
          </Box>
        );
      }}
      rules={validation}
    />
  );
};
