import * as React from 'react';
import { useMemo } from 'react';
import { Controller } from 'react-hook-form';

import { Box } from '../../..';
import { useField } from '../..';
import { ConnectedNestedCheckboxesProps } from '../types';
import {
  calculateStates,
  flattenOptions,
  handleCheckboxChange,
  renderCheckbox,
} from './utils';

export const ConnectedNestedCheckboxes: React.FC<
  ConnectedNestedCheckboxesProps
> = ({ name, options, disabled, onUpdate, spacing }) => {
  const { isDisabled, control, validation, isRequired } = useField({
    name,
    disabled,
  });

  const optionsWithSpacing = options.map((option) => ({
    ...option,
    spacing,
  }));

  const flatOptions = useMemo(
    () => flattenOptions(optionsWithSpacing),
    [optionsWithSpacing]
  );

  return (
    <Controller
      control={control}
      defaultValue={[]}
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
