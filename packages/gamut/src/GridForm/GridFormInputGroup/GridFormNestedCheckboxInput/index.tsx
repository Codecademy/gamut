import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { Controller } from 'react-hook-form';

import { Box } from '../../..';
import {
  calculateStates,
  flattenOptions,
  getAllDescendants,
  handleCheckboxChange,
  renderCheckbox,
} from '../../../ConnectedForm/ConnectedInputs/ConnectedNestedCheckboxes/utils';
import { BaseFormInputProps, GridFormNestedCheckboxField } from '../../types';
import { GridFormInputGroupProps } from '..';

export interface GridFormNestedCheckboxInputProps extends BaseFormInputProps {
  field: GridFormNestedCheckboxField;
  setValue: GridFormInputGroupProps['setValue'];
}

export const GridFormNestedCheckboxInput: React.FC<
  GridFormNestedCheckboxInputProps
> = ({ field, required, disabled, error, setValue }) => {
  const isDisabled = disabled || field.disabled;

  const flatOptions = useMemo(
    () => flattenOptions(field.options),
    [field.options]
  );

  const [hasExpandedInitially, setHasExpandedInitially] = useState(false);

  useEffect(() => {
    if (
      hasExpandedInitially ||
      !field.defaultValue ||
      field.defaultValue.length === 0
    )
      return;

    const expandedValues = [...field.defaultValue];
    field.defaultValue.forEach((value) =>
      expandedValues.push(...getAllDescendants(value, flatOptions))
    );

    setValue(field.name, expandedValues);
    setHasExpandedInitially(true);
  }, [hasExpandedInitially, field, flatOptions, setValue]);

  return (
    <Controller
      name={field.name}
      render={({ field: { value = [], onChange, onBlur, ref } }) => {
        const states = calculateStates(value, flatOptions);
        return (
          <Box as="ul" m={0} p={0}>
            {flatOptions.map((option) => {
              const state = states.get(option.value)!;
              return renderCheckbox({
                option: { ...option, spacing: field.spacing },
                state,
                checkboxId: `${field.name}-${option.value}`,
                isRequired: !!required,
                isDisabled: !!isDisabled,
                onBlur,
                onChange: (event) => {
                  handleCheckboxChange({
                    option,
                    isChecked: event.target.checked,
                    selectedValues: value,
                    flatOptions,
                    onChange,
                    onUpdate: field.onUpdate,
                  });
                },
                ref,
                error,
                namePrefix: field.name,
              });
            })}
          </Box>
        );
      }}
      rules={field.validation}
    />
  );
};
