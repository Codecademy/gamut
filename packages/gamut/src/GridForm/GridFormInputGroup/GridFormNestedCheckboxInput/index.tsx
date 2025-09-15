import * as React from 'react';
import { useCallback, useMemo } from 'react';
import { Controller } from 'react-hook-form';

import { Box, Checkbox, CheckboxPaddingProps } from '../../..';
import {
  BaseFormInputProps,
  GridFormNestedCheckboxField,
  NestedGridFormCheckboxOption,
} from '../../types';

export interface GridFormNestedCheckboxInputProps extends BaseFormInputProps {
  field: GridFormNestedCheckboxField;
}

type FlatCheckboxState = Omit<NestedGridFormCheckboxOption, 'options'> &
  CheckboxPaddingProps & {
    level: number;
    parentValue?: string;
    options: string[];
  };

export const GridFormNestedCheckboxInput: React.FC<
  GridFormNestedCheckboxInputProps
> = ({ field, required, disabled, error }) => {
  const isDisabled = disabled || field.disabled;

  // Flatten the nested structure for easier state management
  const flattenOptions = useCallback(
    (opts: NestedGridFormCheckboxOption[], level = 0, parentValue?: string) => {
      const result: FlatCheckboxState[] = [];

      opts.forEach((option) => {
        // Ensure value is a string
        const optionValue = String(option.value);
        const options = option.options
          ? option.options.map((child) => String(child.value))
          : [];

        result.push({
          ...option,
          spacing: field.spacing,
          value: optionValue,
          level,
          parentValue,
          options,
        });

        if (option.options) {
          result.push(
            ...flattenOptions(option.options, level + 1, optionValue)
          );
        }
      });

      return result;
    },
    [field.spacing]
  );

  const flatOptions = useMemo(
    () => flattenOptions(field.options),
    [field.options, flattenOptions]
  );

  // Helper function to get all descendants of a given option
  const getAllDescendants = useCallback(
    (parentValue: string) => {
      const descendants: string[] = [];

      const collectDescendants = (currentParentValue: string) => {
        flatOptions.forEach((option) => {
          if (option.parentValue === currentParentValue) {
            descendants.push(String(option.value));
            // Recursively collect descendants of this option
            collectDescendants(String(option.value));
          }
        });
      };

      collectDescendants(parentValue);
      return descendants;
    },
    [flatOptions]
  );

  // Calculate checkbox states based on selected values
  const calculateStates = useCallback(
    (selectedValues: string[]) => {
      const states = new Map<string, FlatCheckboxState>();

      // Initialize all states
      flatOptions.forEach((option) => {
        states.set(String(option.value), {
          ...option,
          checked: selectedValues.includes(String(option.value)),
        });
      });

      // Calculate parent states based on all descendants (infinite levels)
      flatOptions.forEach((option) => {
        if (option.options.length > 0) {
          const allDescendants = getAllDescendants(String(option.value));
          const checkedDescendants = allDescendants.filter((descendantValue) =>
            selectedValues.includes(descendantValue)
          );

          const state = states.get(String(option.value))!;
          if (checkedDescendants.length === 0) {
            state.checked = false;
            state.indeterminate = false;
          } else if (checkedDescendants.length === allDescendants.length) {
            state.checked = true;
          } else {
            state.checked = false;
            state.indeterminate = true;
          }
        }
      });

      return states;
    },
    [flatOptions, getAllDescendants]
  );

  const handleCheckboxChange = useCallback(
    (
      currentValue: string,
      isChecked: boolean,
      selectedValues: string[],
      onChange: (values: string[]) => void
    ) => {
      const option = flatOptions.find((opt) => opt.value === currentValue);
      if (!option) return;

      let newSelectedValues = [...selectedValues];

      if (option.options.length > 0) {
        // Parent checkbox - toggle all descendants (infinite levels)
        const allDescendants = getAllDescendants(currentValue);

        if (isChecked) {
          // Add all descendants that aren't already selected
          allDescendants.forEach((descendantValue) => {
            if (!newSelectedValues.includes(descendantValue)) {
              newSelectedValues.push(descendantValue);
            }
          });
        } else {
          // Remove all descendants
          newSelectedValues = newSelectedValues.filter(
            (value) => !allDescendants.includes(value)
          );
        }
      }

      // Handle the current checkbox itself (for leaf nodes or when toggling individual items)
      if (isChecked) {
        if (!newSelectedValues.includes(currentValue)) {
          newSelectedValues.push(currentValue);
        }
      } else {
        newSelectedValues = newSelectedValues.filter(
          (value) => value !== currentValue
        );
      }

      onChange(newSelectedValues);
      field.onUpdate?.(newSelectedValues);
    },
    [flatOptions, field, getAllDescendants]
  );

  const renderCheckbox = useCallback(
    (
      option: FlatCheckboxState,
      selectedValues: string[],
      onChange: (values: string[]) => void,
      onBlur: () => void
    ) => {
      const states = calculateStates(selectedValues);
      const state = states.get(String(option.value))!;
      const checkboxId = field.id || `${field.name}-${option.value}`;

      let checkedProps = {};
      if (state.checked) {
        checkedProps = {
          checked: true,
          'aria-checked': true,
        };
      } else if (state.indeterminate) {
        checkedProps = {
          indeterminate: true,
          checked: false,
          'aria-checked': 'mixed',
        };
      } else {
        checkedProps = {
          checked: false,
          'aria-checked': false,
        };
      }

      return (
        <Box
          as="li"
          key={String(option.value)}
          listStyle="none"
          ml={(option.level * 24) as any}
        >
          <Checkbox
            aria-invalid={error}
            aria-label={
              state['aria-label'] === undefined
                ? typeof state.label === 'string'
                  ? state.label
                  : 'checkbox'
                : state['aria-label']
            }
            aria-required={required}
            disabled={isDisabled || state.disabled}
            htmlFor={checkboxId}
            id={checkboxId}
            label={state.label}
            multiline={state.multiline}
            name={`${field.name}-${option.value}`}
            spacing={state.spacing}
            onBlur={onBlur}
            onChange={(event) => {
              handleCheckboxChange(
                String(option.value),
                event.target.checked,
                selectedValues,
                onChange
              );
            }}
            {...checkedProps}
          />
        </Box>
      );
    },
    [
      calculateStates,
      field.name,
      field.id,
      required,
      isDisabled,
      handleCheckboxChange,
      error,
    ]
  );

  return (
    <Controller
      defaultValue={field.defaultValue || []}
      name={field.name}
      render={({ field: { value, onChange, onBlur } }) => (
        <Box as="ul" m={0} p={0}>
          {flatOptions.map((option) =>
            renderCheckbox(option, value || [], onChange, onBlur)
          )}
        </Box>
      )}
      rules={field.validation}
    />
  );
};
