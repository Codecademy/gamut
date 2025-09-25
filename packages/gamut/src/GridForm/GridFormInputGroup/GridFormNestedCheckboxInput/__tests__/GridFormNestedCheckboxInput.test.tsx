import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent } from '@testing-library/dom';
import { act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { GridForm } from '../../../GridForm';
import type { NestedGridFormCheckboxOption } from '../../../types';

const mockOptions: NestedGridFormCheckboxOption[] = [
  {
    value: 'frontend',
    label: 'Frontend Technologies',
    options: [
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue.js' },
      { value: 'angular', label: 'Angular' },
    ],
  },
  {
    value: 'backend',
    label: 'Backend Technologies',
    options: [
      {
        value: 'node',
        label: 'Node.js',
        options: [
          { value: 'express', label: 'Express.js' },
          { value: 'fastify', label: 'Fastify' },
        ],
      },
      { value: 'python', label: 'Python' },
      { value: 'java', label: 'Java', disabled: true },
    ],
  },
  {
    value: 'databases',
    label: 'Databases',
  },
];

const mockOnUpdate = jest.fn();
const TestForm: React.FC<{
  defaultValue?: string[];
  disabled?: boolean;
  customError?: string;
  options?: NestedGridFormCheckboxOption[];
}> = ({ defaultValue = [], disabled, customError, options = mockOptions }) => (
  <GridForm
    fields={[
      {
        type: 'nested-checkboxes',
        name: 'technologies',
        label: 'Technologies',
        size: 12,
        options,
        onUpdate: mockOnUpdate,
        defaultValue,
        disabled,
        customError,
        validation: { required: 'Please check the box to agree to the terms.' },
      },
    ]}
    submit={{
      contents: 'Submit Me!?',
      size: 4,
    }}
    validation="onSubmit"
    onSubmit={jest.fn()}
  />
);

const renderView = setupRtl(TestForm, {});

describe('GridFormNestedCheckboxInput', () => {
  describe('rendering', () => {
    it('should render all checkbox options in a flat list', () => {
      const { view } = renderView();

      // Top-level options
      view.getByLabelText('Frontend Technologies');
      view.getByLabelText('Backend Technologies');
      view.getByLabelText('Databases');

      // Frontend children
      view.getByLabelText('React');
      view.getByLabelText('Vue.js');
      view.getByLabelText('Angular');

      // Backend children
      view.getByLabelText('Node.js');
      view.getByLabelText('Python');

      // Deeply nested options
      view.getByLabelText('Express.js');
      view.getByLabelText('Fastify');
    });

    it('should render checkboxes with proper indentation levels', () => {
      const { view } = renderView();

      const frontendCheckbox = view
        .getByLabelText('Frontend Technologies')
        .closest('li');
      const reactCheckbox = view.getByLabelText('React').closest('li');
      const nodeCheckbox = view.getByLabelText('Node.js').closest('li');
      const expressCheckbox = view.getByLabelText('Express.js').closest('li');

      // Check margin-left styles for indentation
      expect(frontendCheckbox).toHaveStyle({ marginLeft: '0' }); // level 0
      expect(reactCheckbox).toHaveStyle({ marginLeft: '1.5rem' }); // level 1
      expect(nodeCheckbox).toHaveStyle({ marginLeft: '1.5rem' }); // level 1
      expect(expressCheckbox).toHaveStyle({ marginLeft: '3rem' }); // level 2
    });

    it('should render with unique IDs for each checkbox', () => {
      const { view } = renderView();

      expect(view.getByLabelText('Frontend Technologies')).toHaveAttribute(
        'id',
        'technologies-frontend'
      );
      expect(view.getByLabelText('React')).toHaveAttribute(
        'id',
        'technologies-react'
      );
      expect(view.getByLabelText('Express.js')).toHaveAttribute(
        'id',
        'technologies-express'
      );
    });
  });

  describe('default values', () => {
    it('should render with options unchecked by default', () => {
      const { view } = renderView();

      expect(view.getByLabelText('Frontend Technologies')).not.toBeChecked();
      expect(view.getByLabelText('Backend Technologies')).not.toBeChecked();
      expect(view.getByLabelText('React')).not.toBeChecked();
      expect(view.getByLabelText('Vue.js')).not.toBeChecked();
      expect(view.getByLabelText('Node.js')).not.toBeChecked();
      expect(view.getByLabelText('Python')).not.toBeChecked();
    });

    it('should render with default values checked', () => {
      const { view } = renderView({
        defaultValue: ['react', 'python'],
      });

      expect(view.getByLabelText('React')).toBeChecked();
      expect(view.getByLabelText('Python')).toBeChecked();
      expect(view.getByLabelText('Vue.js')).not.toBeChecked();
    });

    it('should render parent as indeterminate when some children are selected', () => {
      const { view } = renderView({
        defaultValue: ['react', 'vue'],
      });

      const frontendCheckbox = view.getByLabelText(
        'Frontend Technologies'
      ) as HTMLInputElement;

      expect(frontendCheckbox.indeterminate).toBe(true);
      expect(frontendCheckbox).not.toBeChecked();
    });

    it('should render parent as checked when all children are selected', () => {
      const { view } = renderView({
        defaultValue: ['react', 'vue', 'angular'],
      });

      const frontendCheckbox = view.getByLabelText('Frontend Technologies');
      expect(frontendCheckbox).toBeChecked();
    });

    it('should render deeply nested parent states correctly', () => {
      const { view } = renderView({
        defaultValue: ['express', 'fastify'],
      });
      const nodeCheckbox = view.getByLabelText('Node.js');
      const backendCheckbox = view.getByLabelText(
        'Backend Technologies'
      ) as HTMLInputElement;

      expect(nodeCheckbox).toBeChecked(); // all children selected
      expect(backendCheckbox.indeterminate).toBe(true); // only some children selected
    });

    it('should automatically check all children when parent is in default values', async () => {
      const { view } = renderView({
        defaultValue: ['backend'],
      });

      // Parent should be checked
      const backendCheckbox = view.getByLabelText('Backend Technologies');
      expect(backendCheckbox).toBeChecked();

      // All children should be automatically checked
      expect(view.getByLabelText('Node.js')).toBeChecked();
      expect(view.getByLabelText('Python')).toBeChecked();
      expect(view.getByLabelText('Java')).toBeChecked();

      // Deeply nested children should also be checked
      expect(view.getByLabelText('Express.js')).toBeChecked();
      expect(view.getByLabelText('Fastify')).toBeChecked();

      // Frontend should remain unchecked
      expect(view.getByLabelText('Frontend Technologies')).not.toBeChecked();
      expect(view.getByLabelText('React')).not.toBeChecked();
      expect(view.getByLabelText('Vue.js')).not.toBeChecked();

      // onUpdate should also have been called with all expanded values
      expect(mockOnUpdate).toHaveBeenCalledWith([
        'backend',
        'node',
        'express',
        'fastify',
        'python',
        'java',
      ]);
    });

    it('should handle multiple parent defaults correctly', async () => {
      const { view } = renderView({
        defaultValue: ['frontend', 'backend'],
      });

      // Both parents should be checked
      expect(view.getByLabelText('Frontend Technologies')).toBeChecked();
      expect(view.getByLabelText('Backend Technologies')).toBeChecked();

      // All children should be automatically checked
      expect(view.getByLabelText('React')).toBeChecked();
      expect(view.getByLabelText('Vue.js')).toBeChecked();
      expect(view.getByLabelText('Angular')).toBeChecked();
      expect(view.getByLabelText('Node.js')).toBeChecked();
      expect(view.getByLabelText('Python')).toBeChecked();
      expect(view.getByLabelText('Java')).toBeChecked();
      expect(view.getByLabelText('Express.js')).toBeChecked();
      expect(view.getByLabelText('Fastify')).toBeChecked();
    });

    it('should preserve individual child selections in default values', () => {
      const { view } = renderView({
        defaultValue: ['react', 'python'],
      });
      // Selected children should be checked
      expect(view.getByLabelText('React')).toBeChecked();
      expect(view.getByLabelText('Python')).toBeChecked();

      // Parents should be indeterminate since not all children are selected
      const frontendCheckbox = view.getByLabelText(
        'Frontend Technologies'
      ) as HTMLInputElement;
      const backendCheckbox = view.getByLabelText(
        'Backend Technologies'
      ) as HTMLInputElement;

      expect(frontendCheckbox.indeterminate).toBe(true);
      expect(backendCheckbox.indeterminate).toBe(true);

      // Other children should remain unchecked
      expect(view.getByLabelText('Vue.js')).not.toBeChecked();
      expect(view.getByLabelText('Angular')).not.toBeChecked();
      expect(view.getByLabelText('Node.js')).not.toBeChecked();
      expect(view.getByLabelText('Java')).not.toBeChecked();
      expect(view.getByLabelText('Express.js')).not.toBeChecked();
      expect(view.getByLabelText('Fastify')).not.toBeChecked();
    });

    it('should allow unchecking children that were auto-checked by default parent selection', async () => {
      const { view } = renderView({
        defaultValue: ['backend'],
      });

      // Initially all should be checked due to parent selection
      const backendCheckbox = view.getByLabelText(
        'Backend Technologies'
      ) as HTMLInputElement;
      const pythonCheckbox = view.getByLabelText('Python');

      expect(backendCheckbox).toBeChecked();
      expect(pythonCheckbox).toBeChecked();

      // User should be able to uncheck a child
      await act(async () => {
        fireEvent.click(pythonCheckbox);
      });

      // Python should now be unchecked
      expect(pythonCheckbox).not.toBeChecked();

      // Parent should now be indeterminate since not all children are checked
      expect(backendCheckbox.indeterminate).toBe(true);
      expect(backendCheckbox).not.toBeChecked();

      // Other children should remain checked
      expect(view.getByLabelText('Node.js')).toBeChecked();
      expect(view.getByLabelText('Express.js')).toBeChecked();
      expect(view.getByLabelText('Fastify')).toBeChecked();
    });
  });

  describe('user interactions', () => {
    it('should update form value when leaf checkbox is clicked', async () => {
      const { view } = renderView();

      const reactCheckbox = view.getByLabelText('React');

      await act(async () => {
        fireEvent.click(reactCheckbox);
      });

      expect(reactCheckbox).toBeChecked();

      // Verify parent state updates
      const frontendCheckbox = view.getByLabelText(
        'Frontend Technologies'
      ) as HTMLInputElement;
      expect(frontendCheckbox.indeterminate).toBe(true);
    });

    it('should select all children when parent checkbox is clicked', async () => {
      const { view } = renderView();

      const frontendCheckbox = view.getByLabelText('Frontend Technologies');

      await act(async () => {
        fireEvent.click(frontendCheckbox);
      });

      expect(frontendCheckbox).toBeChecked();
      expect(view.getByLabelText('React')).toBeChecked();
      expect(view.getByLabelText('Vue.js')).toBeChecked();
      expect(view.getByLabelText('Angular')).toBeChecked();

      // Verify onUpdate was called with correct values
      expect(mockOnUpdate).toHaveBeenCalledWith([
        'react',
        'vue',
        'angular',
        'frontend',
      ]);
    });

    it('should deselect all children when checked parent is clicked', async () => {
      const { view } = renderView({
        defaultValue: ['react', 'vue', 'angular'],
      });

      const frontendCheckbox = view.getByLabelText('Frontend Technologies');
      expect(frontendCheckbox).toBeChecked();

      await act(async () => {
        fireEvent.click(frontendCheckbox);
      });

      expect(frontendCheckbox).not.toBeChecked();
      expect(view.getByLabelText('React')).not.toBeChecked();
      expect(view.getByLabelText('Vue.js')).not.toBeChecked();
      expect(view.getByLabelText('Angular')).not.toBeChecked();
    });

    it('should handle deeply nested selections correctly', async () => {
      const { view } = renderView();

      // Click Node.js parent (should select all its children)
      const nodeCheckbox = view.getByLabelText('Node.js');

      await act(async () => {
        fireEvent.click(nodeCheckbox);
      });

      expect(nodeCheckbox).toBeChecked();
      expect(view.getByLabelText('Express.js')).toBeChecked();
      expect(view.getByLabelText('Fastify')).toBeChecked();

      // Backend should be indeterminate (only Node.js selected, not Python)
      const backendCheckbox = view.getByLabelText(
        'Backend Technologies'
      ) as HTMLInputElement;
      expect(backendCheckbox.indeterminate).toBe(true);

      // Verify onUpdate was called with correct values
      expect(mockOnUpdate).toHaveBeenCalledWith(['express', 'fastify', 'node']);
    });

    it('should handle individual child deselection affecting parent state', async () => {
      const { view } = renderView({
        defaultValue: ['react', 'vue', 'angular'],
      });

      // Frontend should be fully checked
      const frontendCheckbox = view.getByLabelText(
        'Frontend Technologies'
      ) as HTMLInputElement;
      expect(frontendCheckbox).toBeChecked();

      // Deselect one child
      const reactCheckbox = view.getByLabelText('React');
      await act(async () => {
        fireEvent.click(reactCheckbox);
      });

      expect(reactCheckbox).not.toBeChecked();
      expect(frontendCheckbox.indeterminate).toBe(true);
      expect(frontendCheckbox).not.toBeChecked();
    });
  });

  describe('onUpdate callback', () => {
    it('should call onUpdate when checkbox values change', async () => {
      const { view } = renderView();

      const reactCheckbox = view.getByLabelText('React');

      await act(async () => {
        fireEvent.click(reactCheckbox);
      });

      expect(mockOnUpdate).toHaveBeenCalledWith(['react']);
    });

    it('should call onUpdate with correct values when parent is selected', async () => {
      const { view } = renderView();

      const frontendCheckbox = view.getByLabelText('Frontend Technologies');

      await act(async () => {
        fireEvent.click(frontendCheckbox);
      });

      expect(mockOnUpdate).toHaveBeenCalledWith([
        'react',
        'vue',
        'angular',
        'frontend',
      ]);
    });

    it('should call onUpdate with empty array when all items are deselected', async () => {
      const { view } = renderView({
        defaultValue: ['react'],
      });

      const reactCheckbox = view.getByLabelText('React');

      await act(async () => {
        fireEvent.click(reactCheckbox);
      });

      expect(mockOnUpdate).toHaveBeenCalledWith([]);
    });
  });

  describe('disabled state', () => {
    it('should render all checkboxes as disabled when disabled prop is true', () => {
      const { view } = renderView({ disabled: true });

      expect(view.getByLabelText('Frontend Technologies')).toBeDisabled();
      expect(view.getByLabelText('React')).toBeDisabled();
      expect(view.getByLabelText('Databases')).toBeDisabled();
    });

    it('should not respond to clicks when disabled', async () => {
      const { view } = renderView({ disabled: true });

      const reactCheckbox = view.getByLabelText('React');
      expect(reactCheckbox).toBeDisabled();
      expect(reactCheckbox).not.toBeChecked();

      await userEvent.click(reactCheckbox);

      expect(reactCheckbox).not.toBeChecked();
      expect(mockOnUpdate).not.toHaveBeenCalled();
    });

    it('should handle individual option disabled state', () => {
      const { view } = renderView();

      expect(view.getByLabelText('Java')).toBeDisabled();
      expect(view.getByLabelText('Vue.js')).not.toBeDisabled();
    });
  });

  describe('validation', () => {
    it('should handle required validation', async () => {
      const { view } = renderView();

      // Check if checkboxes have required attribute
      expect(view.getByLabelText('Frontend Technologies')).toHaveAttribute(
        'aria-required',
        'true'
      );
      expect(view.getByLabelText('React')).toHaveAttribute(
        'aria-required',
        'true'
      );
    });

    it('should display error state when error prop is passed', () => {
      const { view } = renderView({
        customError: 'Please select at least one option',
      });

      const checkboxes = view.container.querySelectorAll(
        'input[type="checkbox"]'
      );
      checkboxes.forEach((checkbox) => {
        expect(checkbox).toHaveAttribute('aria-invalid', 'true');
      });
    });
  });

  describe('accessibility', () => {
    it('should have proper aria attributes', () => {
      const { view } = renderView();

      const checkbox = view.getByLabelText('Frontend Technologies');

      expect(checkbox).toHaveAttribute('aria-label', 'Frontend Technologies');
      expect(checkbox).toHaveAttribute('aria-checked', 'false');
    });

    it('should have proper aria-checked states for indeterminate checkboxes', () => {
      const { view } = renderView({
        defaultValue: ['react'],
      });

      const frontendCheckbox = view.getByLabelText('Frontend Technologies');

      expect(frontendCheckbox).toHaveAttribute('aria-checked', 'mixed');
    });

    it('should use proper list semantics', () => {
      const { view } = renderView();

      const list = view.container.querySelector('ul');
      const listItems = view.container.querySelectorAll('li');

      expect(list).toBeInTheDocument();
      expect(listItems).toHaveLength(11); // Total flattened options

      listItems.forEach((item) => {
        expect(item).toHaveStyle({ listStyle: 'none' });
      });
    });
  });

  describe('edge cases', () => {
    it('should handle empty options array', () => {
      const { view } = renderView({ options: [] });

      // Should render empty list
      const list = view.container.querySelector('ul');
      expect(list).toBeInTheDocument();
      expect(list?.children).toHaveLength(0);
    });

    it('should handle options without nested children', () => {
      const { view } = renderView({
        options: [
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
        ],
      });

      expect(view.getByLabelText('Option 1')).toBeInTheDocument();
      expect(view.getByLabelText('Option 2')).toBeInTheDocument();
    });

    it('should handle numeric values correctly', () => {
      const { view } = renderView({
        options: [
          {
            value: 1,
            label: 'Parent Option',
            options: [{ value: 2, label: 'Child Option' }],
          } as any, // Type assertion for testing numeric values
        ],
      });

      expect(view.getByLabelText('Parent Option')).toHaveAttribute(
        'id',
        'technologies-1'
      );
      expect(view.getByLabelText('Child Option')).toHaveAttribute(
        'id',
        'technologies-2'
      );
    });
  });
});
