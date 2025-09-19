import { render } from '@testing-library/react';

import {
  calculateStates,
  flattenOptions,
  getAllDescendants,
  handleCheckboxChange,
  renderCheckbox,
} from '../utils';

describe('ConnectedNestedCheckboxes utils', () => {
  describe('flattenOptions', () => {
    it('should flatten a single level of options', () => {
      const options = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
      ];

      const result = flattenOptions(options);

      expect(result).toHaveLength(2);
      expect(result[0]).toMatchObject({
        value: 'option1',
        label: 'Option 1',
        level: 0,
        parentValue: undefined,
        options: [],
      });
      expect(result[1]).toMatchObject({
        value: 'option2',
        label: 'Option 2',
        level: 0,
        parentValue: undefined,
        options: [],
      });
    });

    it('should flatten nested options with correct levels and parent values', () => {
      const options = [
        {
          value: 'parent1',
          label: 'Parent 1',
          options: [
            { value: 'child1', label: 'Child 1' },
            { value: 'child2', label: 'Child 2' },
          ],
        },
        { value: 'parent2', label: 'Parent 2' },
      ];

      const result = flattenOptions(options);

      expect(result).toHaveLength(4);

      // Parent 1
      expect(result[0]).toMatchObject({
        value: 'parent1',
        label: 'Parent 1',
        level: 0,
        parentValue: undefined,
        options: ['child1', 'child2'],
      });

      // Child 1
      expect(result[1]).toMatchObject({
        value: 'child1',
        label: 'Child 1',
        level: 1,
        parentValue: 'parent1',
        options: [],
      });

      // Child 2
      expect(result[2]).toMatchObject({
        value: 'child2',
        label: 'Child 2',
        level: 1,
        parentValue: 'parent1',
        options: [],
      });

      // Parent 2
      expect(result[3]).toMatchObject({
        value: 'parent2',
        label: 'Parent 2',
        level: 0,
        parentValue: undefined,
        options: [],
      });
    });

    it('should handle deeply nested options', () => {
      const options = [
        {
          value: 'level1',
          label: 'Level 1',
          options: [
            {
              value: 'level2',
              label: 'Level 2',
              options: [{ value: 'level3', label: 'Level 3' }],
            },
          ],
        },
      ];

      const result = flattenOptions(options);

      expect(result).toHaveLength(3);
      expect(result[0].level).toBe(0);
      expect(result[1].level).toBe(1);
      expect(result[2].level).toBe(2);
      expect(result[2].parentValue).toBe('level2');
    });

    it('should handle empty options array', () => {
      const result = flattenOptions([]);
      expect(result).toEqual([]);
    });

    it('should convert numeric values to strings', () => {
      const options = [{ value: 123, label: 'Numeric Option' }];

      const result = flattenOptions(options as any);

      expect(result[0].value).toBe('123');
    });

    it('should handle custom level and parentValue parameters', () => {
      const options = [{ value: 'test', label: 'Test' }];

      const result = flattenOptions(options, 2, 'customParent');

      expect(result[0].level).toBe(2);
      expect(result[0].parentValue).toBe('customParent');
    });
  });

  describe('getAllDescendants', () => {
    const flatOptions = [
      {
        value: 'parent',
        level: 0,
        parentValue: undefined,
        options: ['child1', 'child2'],
        label: 'Parent',
      },
      {
        value: 'child1',
        level: 1,
        parentValue: 'parent',
        options: ['grandchild1'],
        label: 'Child 1',
      },
      {
        value: 'child2',
        level: 1,
        parentValue: 'parent',
        options: [],
        label: 'Child 2',
      },
      {
        value: 'grandchild1',
        level: 2,
        parentValue: 'child1',
        options: [],
        label: 'Grandchild 1',
      },
      {
        value: 'orphan',
        level: 0,
        parentValue: undefined,
        options: [],
        label: 'Orphan',
      },
    ];

    it('should get all direct and indirect descendants', () => {
      const result = getAllDescendants('parent', flatOptions);
      expect(result).toEqual(['child1', 'child2', 'grandchild1']);
    });

    it('should get only direct descendants when no grandchildren exist', () => {
      const result = getAllDescendants('child2', flatOptions);
      expect(result).toEqual([]);
    });

    it('should get descendants for intermediate level nodes', () => {
      const result = getAllDescendants('child1', flatOptions);
      expect(result).toEqual(['grandchild1']);
    });

    it('should return empty array for leaf nodes', () => {
      const result = getAllDescendants('grandchild1', flatOptions);
      expect(result).toEqual([]);
    });

    it('should return empty array for non-existent parent', () => {
      const result = getAllDescendants('nonexistent', flatOptions);
      expect(result).toEqual([]);
    });

    it('should handle empty flatOptions array', () => {
      const result = getAllDescendants('parent', []);
      expect(result).toEqual([]);
    });
  });

  describe('calculateStates', () => {
    const flatOptions = [
      {
        value: 'parent1',
        level: 0,
        parentValue: undefined,
        options: ['child1', 'child2'],
        label: 'Parent 1',
      },
      {
        value: 'child1',
        level: 1,
        parentValue: 'parent1',
        options: ['grandchild1'],
        label: 'Child 1',
      },
      {
        value: 'child2',
        level: 1,
        parentValue: 'parent1',
        options: [],
        label: 'Child 2',
      },
      {
        value: 'grandchild1',
        level: 2,
        parentValue: 'child1',
        options: [],
        label: 'Grandchild 1',
      },
      {
        value: 'parent2',
        level: 0,
        parentValue: undefined,
        options: ['child3'],
        label: 'Parent 2',
      },
      {
        value: 'child3',
        level: 1,
        parentValue: 'parent2',
        options: [],
        label: 'Child 3',
      },
    ];

    it('should set parent as checked when all descendants are selected', () => {
      const selectedValues = ['child1', 'child2', 'grandchild1'];
      const states = calculateStates(selectedValues, flatOptions);

      const parent1State = states.get('parent1');
      expect(parent1State).toEqual({ checked: true });
    });

    it('should set parent as indeterminate when some descendants are selected', () => {
      const selectedValues = ['child1', 'grandchild1'];
      const states = calculateStates(selectedValues, flatOptions);

      const parent1State = states.get('parent1');
      expect(parent1State).toEqual({ checked: false, indeterminate: true });
    });

    it('should set parent as unchecked when no descendants are selected', () => {
      const selectedValues: string[] = [];
      const states = calculateStates(selectedValues, flatOptions);

      const parent1State = states.get('parent1');
      expect(parent1State).toEqual({ checked: false, indeterminate: false });
    });

    it('should set leaf nodes based on selection', () => {
      const selectedValues = ['child2', 'grandchild1'];
      const states = calculateStates(selectedValues, flatOptions);

      expect(states.get('child2')).toEqual({ checked: true });
      expect(states.get('grandchild1')).toEqual({ checked: true });
      expect(states.get('child3')).toEqual({ checked: false });
    });

    it('should handle intermediate parent states correctly', () => {
      const selectedValues = ['grandchild1'];
      const states = calculateStates(selectedValues, flatOptions);

      const child1State = states.get('child1');
      expect(child1State).toEqual({ checked: true }); // all descendants (grandchild1) are selected

      const parent1State = states.get('parent1');
      expect(parent1State).toEqual({ checked: false, indeterminate: true }); // only some descendants selected
    });

    it('should handle empty selected values', () => {
      const states = calculateStates([], flatOptions);

      flatOptions.forEach((option) => {
        const state = states.get(option.value);
        if (option.options.length > 0) {
          expect(state).toEqual({ checked: false, indeterminate: false });
        } else {
          expect(state).toEqual({ checked: false });
        }
      });
    });

    it('should handle all values selected', () => {
      const allValues = flatOptions.map((opt) => opt.value);
      const states = calculateStates(allValues, flatOptions);

      flatOptions.forEach((option) => {
        const state = states.get(option.value);
        expect(state?.checked).toBe(true);
      });
    });
  });

  describe('handleCheckboxChange', () => {
    const flatOptions = [
      {
        value: 'parent',
        level: 0,
        parentValue: undefined,
        options: ['child1', 'child2'],
        label: 'Parent',
      },
      {
        value: 'child1',
        level: 1,
        parentValue: 'parent',
        options: [],
        label: 'Child 1',
      },
      {
        value: 'child2',
        level: 1,
        parentValue: 'parent',
        options: [],
        label: 'Child 2',
      },
      {
        value: 'standalone',
        level: 0,
        parentValue: undefined,
        options: [],
        label: 'Standalone',
      },
    ];

    it('should add all descendants when parent is checked', () => {
      const onChange = jest.fn();
      const onUpdate = jest.fn();
      const parentOption = flatOptions[0];

      handleCheckboxChange(
        parentOption,
        true,
        [],
        flatOptions,
        onChange,
        onUpdate
      );

      expect(onChange).toHaveBeenCalledWith(['child1', 'child2', 'parent']);
      expect(onUpdate).toHaveBeenCalledWith(['child1', 'child2', 'parent']);
    });

    it('should remove all descendants when parent is unchecked', () => {
      const onChange = jest.fn();
      const onUpdate = jest.fn();
      const parentOption = flatOptions[0];
      const initialValues = ['parent', 'child1', 'child2', 'standalone'];

      handleCheckboxChange(
        parentOption,
        false,
        initialValues,
        flatOptions,
        onChange,
        onUpdate
      );

      expect(onChange).toHaveBeenCalledWith(['standalone']);
      expect(onUpdate).toHaveBeenCalledWith(['standalone']);
    });

    it('should add individual child when checked', () => {
      const onChange = jest.fn();
      const childOption = flatOptions[1];

      handleCheckboxChange(childOption, true, [], flatOptions, onChange);

      expect(onChange).toHaveBeenCalledWith(['child1']);
    });

    it('should remove individual child when unchecked', () => {
      const onChange = jest.fn();
      const childOption = flatOptions[1];
      const initialValues = ['child1', 'child2'];

      handleCheckboxChange(
        childOption,
        false,
        initialValues,
        flatOptions,
        onChange
      );

      expect(onChange).toHaveBeenCalledWith(['child2']);
    });

    it('should not duplicate values when adding already selected items', () => {
      const onChange = jest.fn();
      const parentOption = flatOptions[0];
      const initialValues = ['child1'];

      handleCheckboxChange(
        parentOption,
        true,
        initialValues,
        flatOptions,
        onChange
      );

      expect(onChange).toHaveBeenCalledWith(['child1', 'child2', 'parent']);
    });

    it('should handle onUpdate being undefined', () => {
      const onChange = jest.fn();
      const childOption = flatOptions[1];

      expect(() => {
        handleCheckboxChange(childOption, true, [], flatOptions, onChange);
      }).not.toThrow();

      expect(onChange).toHaveBeenCalledWith(['child1']);
    });

    it('should handle leaf node selection without affecting other nodes', () => {
      const onChange = jest.fn();
      const standaloneOption = flatOptions[3];

      handleCheckboxChange(
        standaloneOption,
        true,
        ['child1'],
        flatOptions,
        onChange
      );

      expect(onChange).toHaveBeenCalledWith(['child1', 'standalone']);
    });
  });

  describe('renderCheckbox', () => {
    const mockOption = {
      value: 'test',
      label: 'Test Label',
      level: 1,
      parentValue: 'parent',
      options: [],
    };

    const mockRef = jest.fn();
    const mockOnChange = jest.fn();
    const mockOnBlur = jest.fn();

    it('should render a checked checkbox with correct props', () => {
      const state = { checked: true };

      const result = renderCheckbox(
        mockOption,
        state,
        'test-id',
        true, // isRequired
        false, // isDisabled
        mockOnBlur,
        mockOnChange,
        mockRef
      );

      const { container } = render(result);
      const checkbox = container.querySelector('input[type="checkbox"]');

      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toBeChecked();
      expect(checkbox).toHaveAttribute('aria-checked', 'true');
      expect(checkbox).toHaveAttribute('aria-required', 'true');
    });

    it('should render an indeterminate checkbox with correct props', () => {
      const state = { checked: false, indeterminate: true };

      const result = renderCheckbox(
        mockOption,
        state,
        'test-id',
        false, // isRequired
        false, // isDisabled
        mockOnBlur,
        mockOnChange,
        mockRef
      );

      const { container } = render(result);
      const checkbox = container.querySelector('input[type="checkbox"]');

      expect(checkbox).toBeInTheDocument();
      expect(checkbox).not.toBeChecked();
      expect(checkbox).toHaveAttribute('aria-checked', 'mixed');
    });

    it('should render an unchecked checkbox with correct props', () => {
      const state = { checked: false };

      const result = renderCheckbox(
        mockOption,
        state,
        'test-id',
        false, // isRequired
        false, // isDisabled
        mockOnBlur,
        mockOnChange,
        mockRef
      );

      const { container } = render(result);
      const checkbox = container.querySelector('input[type="checkbox"]');

      expect(checkbox).toBeInTheDocument();
      expect(checkbox).not.toBeChecked();
      expect(checkbox).toHaveAttribute('aria-checked', 'false');
    });

    it('should apply correct margin based on level', () => {
      const state = { checked: false };

      const result = renderCheckbox(
        { ...mockOption, level: 2 },
        state,
        'test-id',
        false,
        false,
        mockOnBlur,
        mockOnChange,
        mockRef
      );

      const { container } = render(result);
      const listItem = container.querySelector('li');

      expect(listItem).toHaveStyle({ marginLeft: '48px' }); // 2 * 24px
    });

    it('should handle disabled state', () => {
      const state = { checked: false };

      const result = renderCheckbox(
        { ...mockOption, disabled: true },
        state,
        'test-id',
        false,
        true, // isDisabled
        mockOnBlur,
        mockOnChange,
        mockRef
      );

      const { container } = render(result);
      const checkbox = container.querySelector('input[type="checkbox"]');

      expect(checkbox).toBeDisabled();
    });

    it('should handle error state', () => {
      const state = { checked: false };

      const result = renderCheckbox(
        mockOption,
        state,
        'test-id',
        false,
        false,
        mockOnBlur,
        mockOnChange,
        mockRef,
        true // error
      );

      const { container } = render(result);
      const checkbox = container.querySelector('input[type="checkbox"]');

      expect(checkbox).toHaveAttribute('aria-invalid', 'true');
    });

    it('should use custom aria-label when provided', () => {
      const state = { checked: false };
      const optionWithAriaLabel = {
        ...mockOption,
        'aria-label': 'Custom aria label',
      };

      const result = renderCheckbox(
        optionWithAriaLabel,
        state,
        'test-id',
        false,
        false,
        mockOnBlur,
        mockOnChange,
        mockRef
      );

      const { container } = render(result);
      const checkbox = container.querySelector('input[type="checkbox"]');

      expect(checkbox).toHaveAttribute('aria-label', 'Custom aria label');
    });

    it('should fallback to label text for aria-label when label is string', () => {
      const state = { checked: false };

      const result = renderCheckbox(
        mockOption,
        state,
        'test-id',
        false,
        false,
        mockOnBlur,
        mockOnChange,
        mockRef
      );

      const { container } = render(result);
      const checkbox = container.querySelector('input[type="checkbox"]');

      expect(checkbox).toHaveAttribute('aria-label', 'Test Label');
    });

    it('should use default aria-label when label is not string', () => {
      const state = { checked: false };
      const optionWithElementLabel = {
        ...mockOption,
        label: <span>Element Label</span>,
      };

      const result = renderCheckbox(
        optionWithElementLabel,
        state,
        'test-id',
        false,
        false,
        mockOnBlur,
        mockOnChange,
        mockRef
      );

      const { container } = render(result);
      const checkbox = container.querySelector('input[type="checkbox"]');

      expect(checkbox).toHaveAttribute('aria-label', 'checkbox');
    });
  });
});
