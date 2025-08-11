import * as React from 'react';
import { useCallback, useMemo } from 'react';
import { Controller } from 'react-hook-form';

import { Checkbox } from '../..';
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
> = ({ name, options, disabled, className, onUpdate }) => {
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
        const children = option.children
          ? option.children.map((child) => child.value)
          : [];

        result.push({
          value: option.value,
          checked: false,
          indeterminate: false,
          disabled: option.disabled || false,
          label: option.label,
          level,
          parentValue,
          children,
          checkboxProps: option.checkboxProps,
        });

        if (option.children) {
          result.push(
            ...flattenOptions(option.children, level + 1, option.value)
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

      // Calculate parent states based on children
      flatOptions.forEach((option) => {
        if (option.children.length > 0) {
          const checkedChildren = option.children.filter((childValue) =>
            selectedValues.includes(childValue)
          );

          const state = states.get(option.value)!;
          if (checkedChildren.length === 0) {
            state.checked = false;
            state.indeterminate = false;
          } else if (checkedChildren.length === option.children.length) {
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
    [flatOptions]
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
        // Parent checkbox - toggle all children
        if (isChecked) {
          // Add all children that aren't already selected
          option.children.forEach((childValue) => {
            if (!newSelectedValues.includes(childValue)) {
              newSelectedValues.push(childValue);
            }
          });
        } else {
          // Remove all children
          newSelectedValues = newSelectedValues.filter(
            (value) => !option.children.includes(value)
          );
        }
      } else {
        // Child checkbox
        if (isChecked) {
          if (!newSelectedValues.includes(currentValue)) {
            newSelectedValues.push(currentValue);
          }
        } else {
          newSelectedValues = newSelectedValues.filter(
            (value) => value !== currentValue
          );
        }
      }

      onChange(newSelectedValues);
      onUpdate?.(newSelectedValues);
    },
    [flatOptions, onUpdate]
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
        <div
          key={option.value}
          style={{
            marginLeft: option.level * 24,
            marginBottom: 8,
          }}
        >
          <Checkbox
            aria-required={isRequired}
            checked={state.checked}
            indeterminate={state.indeterminate}
            disabled={isDisabled || state.disabled}
            htmlFor={checkboxId}
            id={checkboxId}
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
        </div>
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
        <div className={className}>
          {flatOptions.map((option) =>
            renderCheckbox(option, value || [], onChange)
          )}
        </div>
      )}
      rules={validation}
    />
  );
};
