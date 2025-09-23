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
    console.log('flatOptions computed:', flattened);
    return flattened;
  }, [optionsWithSpacing]);

  // Helper function to expand values to include descendants of selected parents
  const expandValues = React.useCallback(
    (values: string[]): string[] => {
      console.log('expandValues called with:', values);
      const expandedValues = [...values];

      // For each selected value, if it's a parent, add all its descendants
      values.forEach((selectedValue: string) => {
        const option = flatOptions.find((opt) => opt.value === selectedValue);
        console.log(`Checking value ${selectedValue}:`, option);
        if (option && option.options.length > 0) {
          const allDescendants = getAllDescendants(selectedValue, flatOptions);
          console.log(`Descendants for ${selectedValue}:`, allDescendants);
          allDescendants.forEach((descendantValue) => {
            if (!expandedValues.includes(descendantValue)) {
              expandedValues.push(descendantValue);
              console.log(`Added descendant: ${descendantValue}`);
            }
          });
        }
      });

      console.log('expandValues result:', expandedValues);
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
    console.log('useEffect expansion check:', {
      fieldName,
      currentFormValue,
      flatOptionsLength: flatOptions.length,
    });

    if (currentFormValue.length > 0) {
      const needsExpansion = currentFormValue.some((selectedValue: string) => {
        const option = flatOptions.find((opt) => opt.value === selectedValue);
        if (option && option.options.length > 0) {
          const allDescendants = getAllDescendants(selectedValue, flatOptions);
          const hasAllDescendants = allDescendants.every((descendant) =>
            currentFormValue.includes(descendant)
          );
          console.log(
            `Value ${selectedValue} needs expansion:`,
            !hasAllDescendants
          );
          return !hasAllDescendants;
        }
        return false;
      });

      if (needsExpansion) {
        const expandedValues = expandValues(currentFormValue);
        console.log('useEffect EXPANDING:', {
          original: currentFormValue,
          expanded: expandedValues,
        });

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
        console.log('GridForm render:', {
          fieldName: field.name,
          value,
        });

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
