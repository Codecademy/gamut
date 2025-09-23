import * as React from 'react';
import { useEffect, useMemo, useRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { Box } from '../../..';
import {
  calculateStates,
  flattenOptions,
  getAllDescendants,
  handleCheckboxChange,
  renderCheckbox,
} from '../../../ConnectedForm/ConnectedInputs/ConnectedNestedCheckboxes/utils';
import { BaseFormInputProps, GridFormNestedCheckboxField } from '../../types';

export interface GridFormNestedCheckboxInputProps extends BaseFormInputProps {
  field: GridFormNestedCheckboxField;
}

export const GridFormNestedCheckboxInput: React.FC<
  GridFormNestedCheckboxInputProps
> = ({ field, required, disabled, error }) => {
  const isDisabled = disabled || field.disabled;

  const optionsWithSpacing = field.options.map((option) => ({
    ...option,
    spacing: field.spacing,
  }));

  const flatOptions = useMemo(() => {
    const flattened = flattenOptions(optionsWithSpacing);
    return flattened;
  }, [optionsWithSpacing]);

  // Helper function to expand values to include descendants of selected parents
  const expandValues = React.useCallback(
    (values: string[]): string[] => {
      const expandedValues = [...values];

      // For each selected value, if it's a parent, add all its descendants
      values.forEach((selectedValue: string) => {
        const option = flatOptions.find((opt) => opt.value === selectedValue);
        if (option && option.options.length > 0) {
          const allDescendants = getAllDescendants(selectedValue, flatOptions);
          allDescendants.forEach((descendantValue) => {
            if (!expandedValues.includes(descendantValue)) {
              expandedValues.push(descendantValue);
            }
          });
        }
      });

      return expandedValues;
    },
    [flatOptions]
  );

  // Track if we've done initial expansion
  const hasExpandedInitially = useRef(false);
  const { setValue } = useFormContext();

  // Extract field properties for stable dependencies
  const fieldName = field.name;
  const fieldDefaultValue = field.defaultValue;
  const fieldOnUpdate = field.onUpdate;

  // Handle expansion in useEffect instead of render function
  useEffect(() => {
    if (hasExpandedInitially.current) return;

    // Get current form value
    const currentFormValue = fieldDefaultValue || [];

    if (currentFormValue.length > 0) {
      const needsExpansion = currentFormValue.some((selectedValue: string) => {
        const option = flatOptions.find((opt) => opt.value === selectedValue);
        if (option && option.options.length > 0) {
          const allDescendants = getAllDescendants(selectedValue, flatOptions);
          const hasAllDescendants = allDescendants.every((descendant) =>
            currentFormValue.includes(descendant)
          );
          return !hasAllDescendants;
        }
        return false;
      });

      if (needsExpansion) {
        const expandedValues = expandValues(currentFormValue);

        // Use setValue to update the form state
        setValue(fieldName, expandedValues);
        fieldOnUpdate?.(expandedValues);
        hasExpandedInitially.current = true;
      }
    }
  }, [
    fieldName,
    fieldDefaultValue,
    fieldOnUpdate,
    flatOptions,
    expandValues,
    setValue,
  ]);

  return (
    <Controller
      name={field.name}
      render={({ field: { value = [], onChange, onBlur, ref } }) => {
        const states = calculateStates(value, flatOptions);
        return (
          <Box as="ul" m={0} p={0}>
            {flatOptions.map((option) => {
              const state = states.get(option.value)!;
              return renderCheckbox(
                option,
                state,
                `${field.name}-${option.value}`,
                !!required,
                !!isDisabled,
                onBlur,
                (event) => {
                  handleCheckboxChange(
                    option,
                    event.target.checked,
                    value,
                    flatOptions,
                    onChange,
                    field.onUpdate
                  );
                },
                ref,
                error
              );
            })}
          </Box>
        );
      }}
      rules={field.validation}
    />
  );
};
