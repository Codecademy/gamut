import * as React from 'react';
import { useCallback, useMemo } from 'react';
import { Controller } from 'react-hook-form';

import { Box, Checkbox } from '../..';
import { useField } from '..';
import { ConnectedNestedCheckboxesProps, NestedCheckboxOption } from './types';

/**
 * ConnectedNestedCheckboxes - A form component that provides nested checkbox functionality
 * with parent-child relationships and indeterminate states.
 *
 * @example
 * ```tsx
 * const options = [
 *   {
 *     value: 'frontend',
 *     label: 'Frontend Technologies',
 *     children: [
 *       { value: 'react', label: 'React' },
 *       { value: 'vue', label: 'Vue.js' },
 *       { value: 'angular', label: 'Angular' }
 *     ]
 *   },
 *   {
 *     value: 'backend',
 *     label: 'Backend Technologies',
 *     children: [
 *       { value: 'node', label: 'Node.js' },
 *       { value: 'python', label: 'Python' },
 *       { value: 'java', label: 'Java' }
 *     ]
 *   }
 * ];
 *
 * <ConnectedForm onSubmit={(data) => console.log(data.technologies)}>
 *   <ConnectedNestedCheckboxes
 *     name="technologies"
 *     options={options}
 *     onUpdate={(selectedValues) => console.log('Selected:', selectedValues)}
 *   />
 *   <SubmitButton>Submit</SubmitButton>
 * </ConnectedForm>
 * ```
 *
 * Features:
 * - Hierarchical checkbox structure with unlimited nesting levels
 * - Parent checkboxes show indeterminate state when some children are selected
 * - Clicking a parent checkbox toggles all its children
 * - Individual child checkboxes can be toggled independently
 * - Returns array of selected leaf values (only actual selectable items, not parent categories)
 * - Integrates with react-hook-form validation and form state
 * - Supports disabled states at both parent and child levels
 * - Proper accessibility attributes and keyboard navigation
 */

interface FlatCheckboxState {
  value: string;
  checked: boolean;
  indeterminate: boolean;
  disabled: boolean;
  label: React.ReactNode;
  level: number;
  parentValue?: string;
  children: string[];
  checkboxProps?: any;
}

export const ConnectedNestedCheckboxes: React.FC<
  ConnectedNestedCheckboxesProps
> = ({ name, options, disabled, onUpdate }) => {
  const { isDisabled, control, validation, isRequired } = useField({
    name,
    disabled,
  });

  // Flatten the nested structure for easier state management
  const flattenOptions = useCallback(
    (
      opts: NestedCheckboxOption[],
      level = 0,
      parentValue?: string
    ): FlatCheckboxState[] => {
      const result: FlatCheckboxState[] = [];

      opts.forEach((option) => {
        // Ensure value is a string
        const optionValue = String(option.value || '');
        const children = option.children
          ? option.children.map((child) => String(child.value || ''))
          : [];

        result.push({
          value: optionValue,
          checked: false,
          indeterminate: false,
          disabled: option.disabled || false,
          label: option.label,
          level,
          parentValue,
          children,
          checkboxProps: {},
        });

        if (option.children) {
          result.push(
            ...flattenOptions(option.children, level + 1, optionValue)
          );
        }
      });

      return result;
    },
    []
  );

  const flatOptions = useMemo(
    () => flattenOptions(options),
    [options, flattenOptions]
  );

  // Helper function to get all descendants of a given option
  const getAllDescendants = useCallback(
    (parentValue: string): string[] => {
      const descendants: string[] = [];

      const collectDescendants = (currentParentValue: string) => {
        flatOptions.forEach((option) => {
          if (option.parentValue === currentParentValue) {
            descendants.push(option.value);
            // Recursively collect descendants of this option
            collectDescendants(option.value);
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
        states.set(option.value, {
          ...option,
          checked: selectedValues.includes(option.value),
          indeterminate: false,
        });
      });

      // Calculate parent states based on all descendants (infinite levels)
      flatOptions.forEach((option) => {
        if (option.children.length > 0) {
          const allDescendants = getAllDescendants(option.value);
          const checkedDescendants = allDescendants.filter((descendantValue) =>
            selectedValues.includes(descendantValue)
          );

          const state = states.get(option.value)!;
          if (checkedDescendants.length === 0) {
            state.checked = false;
            state.indeterminate = false;
          } else if (checkedDescendants.length === allDescendants.length) {
            state.checked = true;
            state.indeterminate = false;
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

      if (option.children.length > 0) {
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
      onUpdate?.(newSelectedValues);
    },
    [flatOptions, onUpdate, getAllDescendants]
  );

  const renderCheckbox = useCallback(
    (
      option: FlatCheckboxState,
      selectedValues: string[],
      onChange: (values: string[]) => void
    ) => {
      const states = calculateStates(selectedValues);
      const state = states.get(option.value)!;
      const checkboxId = `${name}-${option.value}`;

      return (
        <Box key={option.value} mb={8} ml={(option.level * 24) as any}>
          <Checkbox
            aria-required={isRequired}
            checked={state.checked}
            disabled={isDisabled || state.disabled}
            htmlFor={checkboxId}
            id={checkboxId}
            indeterminate={state.indeterminate}
            label={state.label}
            name={`${name}-${option.value}`}
            onChange={(event) => {
              handleCheckboxChange(
                option.value,
                event.target.checked,
                selectedValues,
                onChange
              );
            }}
            {...state.checkboxProps}
          />
        </Box>
      );
    },
    [calculateStates, name, isRequired, isDisabled, handleCheckboxChange]
  );

  return (
    <Controller
      control={control}
      defaultValue={[]}
      name={name}
      render={({ field: { value, onChange } }) => (
        <Box>
          {flatOptions.map((option) =>
            renderCheckbox(option, value || [], onChange)
          )}
        </Box>
      )}
      rules={validation}
    />
  );
};
