import { Box, Checkbox, CheckboxLabelUnion } from '../../..';
import { NestedGridFormCheckboxOption } from '../../../GridForm/types';
import { MinimalCheckboxProps, NestedConnectedCheckboxOption } from '../types';

type FlatCheckbox = Omit<MinimalCheckboxProps, 'value'> &
  CheckboxLabelUnion & {
    level: number;
    parentValue?: string;
    options: string[];
    value: string;
  };

type FlatCheckboxState = Pick<FlatCheckbox, 'checked' | 'indeterminate'>;

export const flattenOptions = (
  opts: NestedConnectedCheckboxOption[] | NestedGridFormCheckboxOption[],
  level = 0,
  parentValue?: string
) => {
  const result: FlatCheckbox[] = [];

  opts.forEach((option) => {
    const optionValue = String(option.value);
    const options = option.options
      ? option.options.map((child) => String(child.value))
      : [];

    result.push({
      ...option,
      value: optionValue,
      level,
      parentValue,
      options,
    });

    if (option.options) {
      result.push(...flattenOptions(option.options, level + 1, optionValue));
    }
  });

  return result;
};

export const getAllDescendants = (
  parentValue: string,
  flatOptions: FlatCheckbox[]
) => {
  const descendants: string[] = [];

  const collectDescendants = (currentParentValue: string) => {
    flatOptions.forEach((option) => {
      if (option.parentValue === currentParentValue) {
        descendants.push(option.value);
        collectDescendants(option.value);
      }
    });
  };

  collectDescendants(parentValue);
  return descendants;
};

export const calculateStates = (
  selectedValues: string[],
  flatOptions: FlatCheckbox[]
) => {
  const states = new Map<string, FlatCheckboxState>();

  // Initialize all states
  flatOptions.forEach((option) => {
    states.set(option.value, {
      checked: selectedValues.includes(option.value),
    });
  });

  // Calculate parent states based on all descendants (infinite levels)
  flatOptions.forEach((option) => {
    if (option.options.length > 0) {
      const allDescendants = getAllDescendants(option.value, flatOptions);
      const checkedDescendants = allDescendants.filter((descendantValue) =>
        selectedValues.includes(descendantValue)
      );

      const state = states.get(option.value)!;
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
};

interface HandleCheckboxChangeParams {
  option: FlatCheckbox;
  isChecked: boolean;
  selectedValues: string[];
  flatOptions: FlatCheckbox[];
  onChange: (values: string[]) => void;
  onUpdate?: (values: string[]) => void;
}

export const handleCheckboxChange = ({
  option,
  isChecked,
  selectedValues,
  flatOptions,
  onChange,
  onUpdate,
}: HandleCheckboxChangeParams) => {
  const currentValue = option.value;
  let newSelectedValues = [...selectedValues];

  if (option.options.length > 0) {
    // Parent checkbox - get all descendants (infinite levels)
    const allDescendants = getAllDescendants(currentValue, flatOptions);

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
};

interface RenderCheckboxParams {
  option: FlatCheckbox;
  state: FlatCheckboxState;
  checkboxId: string;
  isRequired: boolean;
  isDisabled: boolean;
  onBlur: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  ref: React.RefCallback<HTMLInputElement>;
  error?: boolean;
}

export const renderCheckbox = ({
  option,
  state,
  checkboxId,
  isRequired,
  isDisabled,
  onBlur,
  onChange,
  ref,
  error,
}: RenderCheckboxParams) => {
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
      key={checkboxId}
      listStyle="none"
      ml={(option.level * 24) as any}
    >
      <Checkbox
        aria-invalid={error}
        aria-label={
          option['aria-label'] === undefined
            ? typeof option.label === 'string'
              ? option.label
              : 'checkbox'
            : option['aria-label']
        }
        aria-required={isRequired}
        disabled={isDisabled || option.disabled}
        htmlFor={checkboxId}
        id={checkboxId}
        label={option.label}
        multiline={option.multiline}
        name={checkboxId}
        spacing={option.spacing}
        onBlur={onBlur}
        onChange={onChange}
        {...checkedProps}
        {...ref}
      />
    </Box>
  );
};
